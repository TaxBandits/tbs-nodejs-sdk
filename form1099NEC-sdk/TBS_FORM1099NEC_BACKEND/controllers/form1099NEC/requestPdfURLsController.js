const axios = require('axios') /*Using axios to consume API service*/
const { publicAPIAuthentication } = require('../user/userController') /*Importing publicAPIAuthentication from user controller for JWT token */

const requestPdfURLs = async (req, res) => {

    //Getting JWT token by using oauth api function
    const JWTAccessToken = await publicAPIAuthentication()

    //Defining headers 
    const config = {
        headers: {
            Authorization: `Bearer ${JWTAccessToken}` /*Passing JWT token in Authorization */
        }
    }
    
    try {
        //TBS Public API to request pdf url for Form 1099 NEC
        const requestPdfUrlsResponse = await axios.post(`${process.env.TBS_PUBLIC_API_BASE_URL}/Form1099NEC/RequestPdfURLs`,
            req?.body, config)

        res.status(200).send(requestPdfUrlsResponse?.data)
    } catch (e) {
        res.status(400).send(e?.response?.data)
    }
}

//Exporting requestPdfURLs
module.exports = { 
    requestPdfURLs 
}