const axios = require('axios') /*Using axios to consume API service*/
const jws = require('jws') /*Using JWS for authentication*/
const { convertToUnixEpochString } = require('../../utils/unixEpoch') /*Importing convertToUnixEpochString from utils for Unix Epoch time conversion */


// JWS Authentication
// It returns a JSON Web Signature (JWS) for a header and a payload 
// Once we receive a JWS from the client, OAuth API will provide the JWT 
const publicAPIAuthentication = async(req,res) => {
    const signature = req.headers.authentication
    try{
        //PUBLIC API OAUTH (GETTING JWT TOKEN USING JWS TOKEN) v2
        const oauthResponse = await axios.get(`${process.env.TBS_PUBLIC_API_OAUTH}/tbsauth`,{
            headers: {
                Authentication:signature // Pass JWS as Authentication in headers
            }
        });

        res.status(200).json(oauthResponse.data.AccessToken)
    }catch (e) {
        res.status(400).json(e.response.data.StatusMessage)
    }
}

// To generate JWS with the Client ID, Client Secret and User Token from the API Console.
const generateJWS = async(req,res) =>{
    const clientId = req.body.clientId
    const userToken = req.body.userToken
    const secretKey = req.body.secretKey
    const unixEpochStringConversion = convertToUnixEpochString(new Date()) // UNIX EPOCH TIME
    try{

    const header = {
        "alg": "HS256", /*Algorithm = HS256*/
        "typ": "JWT" /*Type = JSON Web Token (JWT)*/
    }


    const payload = {
        "iss": clientId, /*Issuer: Client ID retrieved from the console site*/
        "sub": clientId, /*Subject: Client ID retrieved from the console site*/
        "aud": userToken,  /*Audience: User Token retrieved from the console site*/
        "iat": parseInt(unixEpochStringConversion)  /*Issued at: Number of seconds from Jan 1 1970 00:00:00 (Unix epoch format)*/
    }


    // Generate Signature using JWS npm package
    const signature = jws.sign({
        header: header, 
        payload: payload,
        secret: secretKey, /*Client Secret retrieved from the console site*/
    });
    
    res.status(200).send(signature)
    }catch(e){
        res.status(400).send(e)
    }
}

//Exporting publicAPIAuthentication,generateJWS
module.exports = {
    publicAPIAuthentication,
    generateJWS
}