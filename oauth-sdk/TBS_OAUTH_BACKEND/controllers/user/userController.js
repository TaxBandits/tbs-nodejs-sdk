const axios = require('axios') /*Using axios to consume API service*/
const jwt = require('jsonwebtoken') /* Using JWT npm for authentication */

// JWS Authentication
// It returns a JSON Web Signature (JWS) for a header and a payload 
// Once we receive a JWS from the client, OAuth API will provide the JWT 
const publicAPIAuthentication = async (req, res) => {
    const signature = req.headers.authentication
    try {
        //PUBLIC API OAUTH (GETTING JWT TOKEN USING JWS TOKEN) v2
        const oauthResponse = await axios.get(`${process.env.TBS_PUBLIC_API_OAUTH}/tbsauth`, {
            headers: {
                Authentication: signature // Pass JWS as Authentication in headers
            }
        });

        res.status(200).json(oauthResponse.data.AccessToken)
    } catch (e) {
        res.status(400).json(e.response.data)
    }
}
// Get ServerTime 

const getServerTime=async(req,res) =>{
    const signature = req.headers.authentication
    try{
        const serverTimeRespone =await axios.get(`${process.env.TBS_PUBLIC_API_OAUTH}/getservertime`,{
            headers: {
                Authentication: signature // Pass JWS as Authentication in headers
            }
        })
        res.status(200).json(serverTimeRespone.data)
    }catch (e) {
        res.status(400).json(e.response.data)
    }
}


// To generate JWS with the Client ID, Client Secret and User Token from the API Console.
const generateJWS = async (req, res) => {
    const clientId = req.body.clientId
    const userToken = req.body.userToken
    const secretKey = req.body.secretKey

    try {
        //Payload to generate jws.
        const payload = {
            "iss": clientId, /*Issuer: Client ID retrieved from the console site*/
            "sub": clientId, /*Subject: Client ID retrieved from the console site*/
            "aud": userToken,  /*Audience: User Token retrieved from the console site*/
            "iat": Math.floor(new Date().getTime() / 1000) , /*Issued at: Number of seconds from Jan 1 1970 00:00:00 (Unix epoch format)*/
            
         }
        console.log("time",Math.floor(new Date().getTime() / 1000));
        const jwsToken = jwt.sign(payload, secretKey);

        res.status(200).send(jwsToken)
    } catch (e) {
        res.status(400).send(e)
    }
}

//Ping Api
// Verify JWT using Ping Api

const pingApi = async (req, res) => {
    const jwtToken= req.headers.authorization
    try{
        const pingApiResponse =await axios.get(`${process.env.TBS_PUBLIC_API_BASE_URL}/Utility/Ping`,{
            headers: {
                Authorization: jwtToken // Pass JWS as Authentication in headers
            }
        })
        res.status(200).json(pingApiResponse.data) 
    }catch(e){
        res.status(400).send(e)
    }
}


//Exporting publicAPIAuthentication,generateJWS
module.exports = {
    publicAPIAuthentication,
    generateJWS,
    pingApi,
    getServerTime
}