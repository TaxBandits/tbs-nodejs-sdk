import React from "react";
import axios from "axios"; //Axios to make HTTP calls
import { useState } from "react";
import logo from '../images/tbsLogo.png' // Importing images
import consoleApp from '../images/consoleApp.png' // Importing images
import {FaClipboard} from 'react-icons/fa'
import Spinner from '../components/Spinner';

const GenerateJWTToken = () => {

  const [jwsFormData, setJwsFormData] = useState({
    clientId: "",
    userToken: "",
    secretKey: "",
  });
  const [jwsKey, setJwsKey] = useState("");
  const [jwtToken, setJwtToken] = useState("");
  const [businessList, setBusinessList] = useState([])
  const [listErrorData, setListErrorData] = useState([])
  const [createErrorData, setCreateErrorData] = useState([])
  const [loading,setLoading] = useState([])

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
    } catch (e) {
      alert(e.response.data)
    }
  };

  const listBusiness = async () => {
    setLoading(true)
    const JWTAccessToken = jwtToken
    try {
      const res = await axios.get(`${process.env.REACT_APP_TBS_OAUTH_BACKEND_URL}/business/list`, {
        headers: {
          Authorization: 'Bearer ' + JWTAccessToken,
        }
      })
      console.log('data',res.data)
      setBusinessList(res.data.Businesses)
    } catch (e) {
      console.log('error',e)
      createBusiness()
      //setListErrorData(e.response.data)
    }
    setLoading(false)
  }

  const createBusiness = async () => {
    const JWTAccessToken = jwtToken
    try {
      const res = await axios.post(`${process.env.REACT_APP_TBS_OAUTH_BACKEND_URL}/business/create`,"",{
        headers: {
          Authorization: 'Bearer ' + JWTAccessToken,
        }
      })
      console.log('createbus data',res.data)
      listBusiness()
      //setBusinessCreate(res.data)
    } catch (e) {
      console.log('create error',e)
      setCreateErrorData(e.response.data)
    }
  }
  
  // To verify JWT token by hitting Public list business API
  const verifyJWT = () => {
    listBusiness()
  }

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
    }
    alert("Copied to Clipboard")
  };

  return (
    <>
      <div className="header text-center mb-3">
        <img src={logo} alt="tbsLogo" />
      </div>
      <div className="container">
        <main>
          <div className="row">
            <div className="col-6">
              <div className="credentials">
                <div className="my-3">
                  <label className="mb-1 ps-1 fw-bold">Cilent ID:</label> {/*Issuer: Client ID retrieved from the console site*/}
                  <input type="text" className="form-control"  name="clientId"
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
                          <FaClipboard/> Copy
                          </button>
                        </div>
                      </div>
                        <div className="bg-light-blue p-3">

                          <label className="labeljws word-wrap w-100" id="copyjws">
                            {jwsKey}

                          </label>
                          
                        </div>


                        <button type="button" id="jwt" className="btn btn-primary mt-3 mb-5"
                          onClick={getJWTToken}
                        >
                          Get JWT
                        </button>
                      </div>
                    </div>

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
                        <FaClipboard/> Copy
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
              </div>
            </div>
            <div className="col-6">
              <div className="instructions shadow bg-light-blue p-3">
                <p className="infoTitle fw-bold">Instructions to get user credentials</p>
                <ol>
                  <li>Login/Signup to TBS API Sandbox Console Site using below link <br/><span><a href="https://sandbox.taxbandits.com/">Click here</a></span>
                  </li><br />
                  <li>After login, navigate to Settings &#8594; API Credentials</li><br/>
                  <span><img src={consoleApp} alt="consoleApp" width={400} className="img-fluid" /></span><br/><br/>
                  <li>Within API Credentials you'll get credentials needed for generating JWS key</li>
                </ol>
                <p className="ref">For more reference look into <span><a href="https://developer.taxbandits.com/docs/intro/">developer.taxbandits.com</a></span></p>
              </div>
            </div>

          </div>
          {
          jwtToken &&
          <div>
                      <span><strong>API Version</strong> : 1.7.3</span><br/>
                      <span><strong>Sandbox API URL</strong> : {process.env.REACT_APP_SANDBOX_API_URL}</span><br/>
                      <span><strong>Create Business Method</strong> : Business/Create</span><br/>
                      <span><strong>List Business Method</strong> : Business/List</span><br/><br/>
                      <p>Note : By Clicking on Verify JWT Button, we will do the following functionalities to verify your JWT.</p>
                      <ol>
                        <li>
                        If you already have business, list of business is shown below by requesting Business/List API.
                        </li>
                        <li>
                        If you already don’t have any business,a new business is created by requesting Business/Create and shown below by requesting Business/List.
                        </li>
                      </ol><br/>
                      <p>Table will be shown here.</p>
          </div>
          }
          {loading === true && 
            <Spinner/>
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
          {createErrorData.length > 0 &&
                      <div className="noteJWT1 pb-10">
                        While requesting create business it shows 401 error, reponse is displayed below
                        <div className="bg-light-blue p-3">
                        <label className="labeljws word-wrap w-100">{createErrorData.map((error) => {
                          return <>
                            {JSON.stringify(error)}
                          </>
                        })}</label>
                        </div>
                      </div>
          }
          {businessList.length > 0 && (
              <div className="response-table">
                <table className="table table-striped mt-4 table-bordered">
                  <thead>
                    <tr>
                      <th>BusinessId</th>
                      <th>BusinessName</th>
                      <th>Email</th>
                    </tr>
                  </thead>
                  <tbody>
                    {businessList.map(business => {
                      return (
                        <tr>
                          <td key={business.BusinessId}>{business.BusinessId}</td>
                          <td key={business.BusinessId}>{business.BusinessNm}</td>
                          <td key={business.BusinessId}>{business.Email}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )
          }
        </main >
      </div >



    </>
  );
}

export default GenerateJWTToken;
