const axios = require('axios') /*Using axios to consume API service*/
const { publicAPIAuthentication } = require('../user/userController') /*Importing publicAPIAuthentication from user controller for JWT token */

//Get TIN Matching Recipient Status using TBS API.
const statusTinmatchingRecipients = async (req, res) => {
     //Accessing the Data from Query
    const SubmissionId = req?.query?.SubmissionId
    const RecordId = req?.query?.RecordId

    //Getting JWT token by using oauth api function
    const JWTAccessToken = await publicAPIAuthentication()

    //Defining the Headers
    const config = {
        headers: {
            Authorization: `Bearer ${JWTAccessToken}` /*Passing JWT token in Authorization */
        }
    }

    //TBS Public API to get Status of the TIN Matching Recipient
    try {  
        const tinMatchingStatusResponse = await axios.get(`${process.env.TBS_PUBLIC_API_BASE_URL}/TINMatchingRecipients/Status?SubmissionId=${SubmissionId}&RecordId=${RecordId}`,
            config
        )

        res.status(200).send(tinMatchingStatusResponse?.data)
    } catch (e) {
        res.status(400).send(e)
    }
}

//Exporting TIN Matching Recipients Status
module.exports = {
    statusTinmatchingRecipients
}
