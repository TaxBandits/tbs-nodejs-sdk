const axios = require('axios') /*Using axios to consume API service*/
const jws = require('jws') /*Using JWS for authentication*/
const { convertToUnixEpochString } = require('../../utils/unixEpoch')

// JWS Authentication
// It returns a JSON Web Signature (JWS) for a header and a payload 
// Once we receive a JWS from the client, OAuth API will provide the JWT 
const publicAPIAuthentication = async() => {

    const unixEpochStringConversion = convertToUnixEpochString(new Date())

    const header = {
        "alg": "HS256", /*Algorithm = HS256*/
        "typ": "JWT" /*Type = JSON Web Token (JWT)*/
    }

    const payload = {
        "iss": process.env.TBS_API_CONSOLE_CLIENT_ID, /*Issuer: Client ID retrieved from the console site*/
        "sub": process.env.TBS_API_CONSOLE_CLIENT_ID, /*Subject: Client ID retrieved from the console site*/
        "aud": process.env.TBS_API_CONSOLE_USER_TOKEN,  /*Audience: User Token retrieved from the console site*/
        "iat": parseInt(unixEpochStringConversion)  /*Issued at: Number of seconds from Jan 1 1970 00:00:00 (Unix epoch format)*/
    }

    // Generate Signature using JWS npm package
    const signature = jws.sign({
        header: header, 
        payload: payload,
        secret: process.env.TBS_API_CONSOLE_CLIENT_SECRET_KEY, /*Client Secret retrieved from the console site*/
    })

    try {
        //PUBLIC API OAUTH (GETTING JWT TOKEN USING JWS TOKEN) v2
        const oauthResponse = await axios.get(`${process.env.TBS_PUBLIC_API_OAUTH}/tbsauth`, {
            headers: {
                Authentication:signature, // Pass JWS as Authentication in headers
            }
        })

       return(oauthResponse?.data?.AccessToken)
    } catch (e) {
        return(e)
    }
}

//Exporting publicAPIAuthentication
module.exports = {
    publicAPIAuthentication
}

