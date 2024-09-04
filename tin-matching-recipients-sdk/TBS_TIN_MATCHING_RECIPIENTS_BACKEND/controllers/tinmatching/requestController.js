const axios = require('axios') /*Using axios to consume API service*/
const { publicAPIAuthentication } = require('../user/userController') /*Importing publicAPIAuthentication from user controller for JWT token */

//Request TIN Matching Recipient using TBS API.
const requestTinMatching = async (req, res) => {
    //Accessing data from request body
    const requestBody = req?.body

    //Getting JWT token by using oauth api function
    const JWTAccessToken = await publicAPIAuthentication()

    //Defining the Headers
    const config = {
        headers: {
            Authorization: `Bearer ${JWTAccessToken}` /*Passing JWT token in Authorization */
        }
    }

    //TBS Public API to Request TIN Matching Recipients
    try {  
        const requestTinMatchingResponse = await axios.post(`${process.env.TBS_PUBLIC_API_BASE_URL}/TINMatchingRecipients/Request`, requestBody, config)

        res.send(requestTinMatchingResponse?.data)
    } catch (e) {
        res.send(e?.response?.data?.TINMatchingRecords?.ErrorRecords)
    }
}

//Exporting TIN Matching Recipients Request
module.exports = {
    requestTinMatching
}