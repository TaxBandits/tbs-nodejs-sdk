import React from "react";
import axios from "axios"; //Axios to make HTTP calls
import { useState } from "react";
import logo from '../images/tbsLogo.png' // Importing images
import consoleApp from '../images/consoleApp.png' // Importing images
import { FaClipboard } from 'react-icons/fa'
import Spinner from '../components/Spinner';

const GenerateJWTToken = () => {

  const [jwsFormData, setJwsFormData] = useState({
    clientId: "",
    userToken: "",
    secretKey: "",
  });
  const [jwsKey, setJwsKey] = useState("");
  const [jwtToken, setJwtToken] = useState("");
  const [serverTime, setServerTime] = useState("")
  const [pingResponse, setPingResponse] = useState()
  const [listErrorData, setListErrorData] = useState([])
  const [createErrorData, setCreateErrorData] = useState([])
  const [loading, setLoading] = useState([])

  const scrollToBottom = () => {
    setTimeout(() => {
      const ele = document.getElementById("main")
      ele.scrollIntoView({ block: "end" })
    }, 1000)
  }

  // To get the JWS
  const generateJWSKey = async () => {
    try {
      if (jwsFormData?.clientId && jwsFormData.userToken && jwsFormData.secretKey) {
        const data = {
          clientId: jwsFormData?.clientId,
          userToken: jwsFormData?.userToken,
          secretKey: jwsFormData?.secretKey,
        };

        const signature = await axios.post(`${process.env.REACT_APP_TBS_OAUTH_BACKEND_URL}/user/generateJWS`,
          data
        );

        setJwsKey(signature?.data);
        scrollToBottom()
      } else {
        alert("Please fill all fields")
      }
    } catch (e) {
      console.log("e", e);
    }
  };

  // To get the JWT from the TBS Public OAuth API
  const getJWTToken = async () => {
    try {
      const jwtAccessToken = await axios.get(`${process.env.REACT_APP_TBS_OAUTH_BACKEND_URL}/user/publicAPIAuthentication`,
        {
          headers: {
            Authentication: jwsKey,
          },
        }
      );
      setJwtToken(jwtAccessToken?.data);
      scrollToBottom()
    } catch (e) {
      alert(e.response.data)
    }
  };

  const pingApi = async () => {
    setLoading(true)
    const JWTAccessToken = jwtToken
    try {
      const res = await axios.get(`${process.env.REACT_APP_TBS_OAUTH_BACKEND_URL}/user/ping`, {
        headers: {
          Authorization: JWTAccessToken,
        }
      })
      console.log('data', res.data)
      setPingResponse(res.data)
      scrollToBottom()
    } catch (e) {
      console.log('error', e)

      setListErrorData(e.response.data)
    }
    setLoading(false)
  }

  const getServerTime = async () => {
    const JWSAccessToken = jwsKey
    try {
      const res = await axios.get(`${process.env.REACT_APP_TBS_OAUTH_BACKEND_URL}/user/getservertime`, {
        headers: {
          Authentication: JWSAccessToken,
        }
      })
      console.log('createbus data', res.data)
      setServerTime(res.data)
      scrollToBottom()
    } catch (e) {
      console.log('create error', e)
      setCreateErrorData(e.response.data)
    }
  }

  // To verify JWT token by hitting Public list business API
  const verifyJWT = () => {
    pingApi()
  }

  const formattedString = Object.keys(serverTime)
    .map(key => {
      const value = serverTime[key];
      return `"${key}": ${JSON.stringify(value)}`;
    })
    .join(',\n');

  const jsonString = `{\n${formattedString}\n}`;

  // To handle onChange of user credential inputs
  const handleJWSChange = (e) => {
    const { name, value } = e.target;
    setJwsFormData({
      ...jwsFormData,
      [name]: value,
    });
  };

  // To copy data to Clipboard
  const copyToClipBoard = (data) => {
    if (data == "jws") {
      navigator.clipboard.writeText(jwsKey);
    } else if (data == "jwt") {
      navigator.clipboard.writeText(jwtToken);
    } else if (data == "servertime") {
      navigator.clipboard.writeText(JSON.stringify(serverTime));
    }
    else if (data == "verifyjwt") {
      navigator.clipboard.writeText(JSON.stringify(pingResponse));
    }
    alert("Copied to Clipboard")
  };

  return (
    <>
      <div className="header text-center mb-3">
        <img src={logo} alt="tbsLogo" />
      </div>
      <div className="container" id="main">
        <main>
          <div className="row">
            <div className="col-6">
              <div className="credentials">
                <div className="my-3">
                  <label className="mb-1 ps-1 fw-bold">Cilent ID:</label> {/*Issuer: Client ID retrieved from the console site*/}
                  <input type="text" className="form-control" name="clientId"
                    onChange={(e) => {
                      handleJWSChange(e);
                    }}
                  />
                </div>
                <div className="my-3">
                  <label className="mb-1 ps-1 fw-bold">Cilent Secret:</label> {/*Client Secret retrieved from the console site*/}
                  <input type="text" className="form-control" placeholder="" name="secretKey"
                    onChange={(e) => {
                      handleJWSChange(e);
                    }}
                  />
                </div>
                <div className="my-3">
                  <label className="mb-1 ps-1 fw-bold">User Token:</label> {/*Audience: User Token retrieved from the console site*/}
                  <input type="text" className="form-control" placeholder="" name="userToken"
                    onChange={(e) => {
                      handleJWSChange(e);
                    }}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={generateJWSKey}
                >
                  Generate JWS
                </button>

                {
                  jwsKey &&
                  <>
                    <div>
                      <div className="mt-3">
                        <div className="row d-flex justify-content-between mb-2 mt-2 ">
                          <div className="col-md-5 mt-3 fw-bold">JSON WEB SIGNATURE:</div>
                          <div className="col-md-5 d-flex justify-content-end">
                            <button
                              type="button"
                              id="jws"
                              className="btn btn-blue mt-2"
                              onClick={() => { copyToClipBoard("jws") }}
                            >
                              <FaClipboard /> Copy
                            </button>
                          </div>
                        </div>
                        <div className="bg-light-blue p-3">
                          <label className="labeljws word-wrap w-100" id="copyjws">
                            {jwsKey}
                          </label>
                        </div>
                        <button type="button" id="jwt" className="btn btn-primary mt-3 mb-3"
                          onClick={getServerTime}
                        >
                          Get ServerTime
                        </button>
                      </div>
                    </div>

                  </>
                }

                {
                  serverTime &&
                  <>
                    <div className="row d-flex justify-content-between mb-3">
                      <span><strong>Sandbox OAUTH API URL</strong> : https://testoauth.expressauth.net/V2</span><br />
                      <span><strong>Request Method </strong> : getservertime</span><br />
                      <span><strong>Note:</strong> You can use the GetServerTime endpoint to get the timezone, current date, and time of our server. This helps you make sure that the server time of your application is aligned with our API’s server time. </span>
                      <div className="col-md-4 mt-3 fw-bold">SERVER TIME (optional):</div>
                      <div className="col-md-5 d-flex justify-content-end">
                        <button
                          type="button"
                          id="servertime"
                          className="btn btn-blue mt-2"
                          onClick={() => { copyToClipBoard("servertime") }}
                        >
                          <FaClipboard /> Copy
                        </button>
                      </div>
                    </div>
                    {console.log("jsonString123", jsonString)}
                    <div className="bg-light-blue p-3">
                      <label className="labeljws word-wrap w-100" id="copyjwt">
                        {JSON.stringify(serverTime)}
                      </label>
                    </div>
                    <button type="button" className="btn btn-primary mt-3 mb-3" onClick={getJWTToken} >
                      Get JWT
                    </button>
                  </>
                }

                {
                  jwtToken &&
                  <>
                    <div className="border border-warning p-2 rounded mt-3">
                      <div className="note"><b>Note:</b> Generated JWT will expire in 1 hour</div>
                    </div>
                    <div className="row d-flex justify-content-between mb-2 mt-2">
                      <div className="col-md-4 mt-3 fw-bold">JSON WEB TOKEN:</div>
                      <div className="col-md-5 d-flex justify-content-end">
                        <button
                          type="button"
                          className="btn btn-blue mt-2"
                          onClick={() => { copyToClipBoard("jwt") }}
                        >
                          <FaClipboard /> Copy
                        </button>
                      </div>
                    </div>
                    <div className="bg-light-blue p-3">
                      <label className="labeljws word-wrap w-100" id="copyjwt">
                        {jwtToken}
                      </label>
                    </div>
                    <button type="button" className="btn btn-primary mt-3 mb-3" onClick={verifyJWT} >
                      Verify JWT
                    </button>
                  </>
                }

                {
                  pingResponse &&
                  <>
                    <br />
                    <span><strong>API Version</strong> : 1.7.3</span><br />
                    <span><strong>Sandbox API URL</strong> : {process.env.REACT_APP_SANDBOX_API_URL}</span><br />
                    <span><strong>Request Method </strong> : Utility/Ping </span><br />
                    <span><strong>Note:</strong> By Clicking on Verify JWT Button you can verify the created JWT is valid or not and also helps you identify any connectivity issues between your software and our API server before requesting our other endpoints. </span>
                    <span>Verify Response will be shown below.</span>
                    <div className="row d-flex justify-content-between mb-2 mt-2">
                      <div className="col-md-4 mt-3 fw-bold">PING API RESPONSE:</div>
                      <div className="col-md-5 d-flex justify-content-end">
                        <button
                          type="button"
                          className="btn btn-blue mt-2"
                          id="verifyjwt"
                          onClick={() => { copyToClipBoard("verifyjwt") }}
                        >
                          <FaClipboard /> Copy
                        </button>
                      </div>
                    </div>
                    <div className="bg-light-blue p-3">
                      <label className="labeljws word-wrap w-100" id="copyjwt">
                        {JSON.stringify(pingResponse)}
                      </label>

                    </div>
                  </>
                }
              </div>
            </div>
            <div className="col-6">
              <div className="instructions shadow bg-light-blue p-3">
                <p className="infoTitle fw-bold">Instructions to get user credentials</p>
                <ol>
                  <li>Login/Signup to TBS API Sandbox Console Site using below link <br /><span><a href="https://sandbox.taxbandits.com/">Click here</a></span>
                  </li><br />
                  <li>After login, navigate to Settings &#8594; API Credentials</li><br />
                  <span><img src={consoleApp} alt="consoleApp" width={400} className="img-fluid" /></span><br /><br />
                  <li>Within API Credentials you'll get credentials needed for generating JWS key</li>
                </ol>
                <p className="ref">For more reference look into <span><a href="https://developer.taxbandits.com/docs/intro/">developer.taxbandits.com</a></span></p>
              </div>
            </div>
          </div>

          {loading === true &&
            <Spinner />
          }

          {listErrorData.length > 0 &&
            <div className="noteJWT1">
              Since there is no business found,You'll be getting 404 error, response is displayed below
              <div className="bg-light-blue p-3">
                <label className="labeljws word-wrap w-100">{listErrorData.map((error) => {
                  return <>
                    {JSON.stringify(error)}
                  </>
                })}</label>
              </div>
            </div>
          }
        </main >
      </div >
    </>
  );
}

export default GenerateJWTToken;