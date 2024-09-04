const axios = require('axios') /*Using axios to consume API service*/
const jwt = require('jsonwebtoken') /* Using JWT npm for authentication */

// JWS Authentication
// It returns a JSON Web Signature (JWS) for a header and a payload 
// Once we receive a JWS from the client, OAuth API will provide the JWT 
const publicAPIAuthentication = async() => {

    const secretKey=process.env.TBS_API_CONSOLE_CLIENT_SECRET_KEY /*Secret Key retrieved from the console site*/

    //Payload to generate jws.
    const payload = {
        "iss": process.env.TBS_API_CONSOLE_CLIENT_ID, /*Issuer: Client ID retrieved from the console site*/
        "sub": process.env.TBS_API_CONSOLE_CLIENT_ID, /*Subject: Client ID retrieved from the console site*/
        "aud":  process.env.TBS_API_CONSOLE_USER_TOKEN, /*Audience: User Token retrieved from the console site*/
        "iat": Math.floor(new Date().getTime() / 1000)  /*Issued at: Number of seconds from Jan 1 1970 00:00:00 (Unix epoch format)*/
    };

    const jwsToken = jwt.sign(payload, secretKey, { expiresIn: "1h" });

    try {
        //PUBLIC API OAUTH (GETTING JWT TOKEN USING JWS TOKEN) v2
        const oauthResponse = await axios.get(`${process.env.TBS_PUBLIC_API_OAUTH}/tbsauth`, {
            headers: {
                Authentication:jwsToken, // Pass JWS as Authentication in headers
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

