const axios = require('axios') /*Using axios to consume API service*/
const { publicAPIAuthentication } = require('../user/userController') /*Importing publicAPIAuthentication from user controller for JWT token */

//Cancel TIN Matching Recipient using TBS API.
const cancelTinMatchingRequest = async (req, res) => {
    //Accessing the Data from Query
    const SubmissionId = req?.query?.SubmissionId
    const RecordId = req?.query?.RecordIds

    //Getting JWT token by using oauth api function
    const JWTAccessToken = await publicAPIAuthentication()

    //Defining the Headers
    const config = {
        headers: {
            Authorization: `Bearer ${JWTAccessToken}` /*Passing JWT token in Authorization */
        }
    }

    //TBS Public API to cancel TIN Matching Request 
    try { 
        const cancelTinMatchingResponse = await axios.put(`${process.env.TBS_PUBLIC_API_BASE_URL}/TINMatchingRecipients/CancelRequest?SubmissionId=${SubmissionId}&RecordIds=${RecordId}`, '',
            config
        )

        res.status(200).send(cancelTinMatchingResponse?.data)
    } catch (e) {
        res.status(400).send(e?.response?.data?.TINMatchingRecords)
    }
}

//Exporting TIN Matching Recipients Cancel Request
module.exports = {
    cancelTinMatchingRequest
}
