const axios = require('axios') /*Using axios to consume API service*/
const { publicAPIAuthentication } = require('../user/userController') /*Importing publicAPIAuthentication from user controller for JWT token */

const getForm1099NEC = async (req, res) => {

    // Accessing Submission Id and Record Ids from request query
    const SubmissionId = req?.query?.SubmissionId
    const RecordIds = req?.query?.RecordIds

    //Getting JWT token by using oauth api function
    const JWTAccessToken = await publicAPIAuthentication()
    
    //Defining Headers
    const config = {
        headers: {
            Authorization: `Bearer ${JWTAccessToken}` /*Passing JWT token in Authorization */
        }
    }

    try {
        //TBS Public API to get Form 1099 NEC
        const getForm1099NECResponse = await axios.get(`${process.env.TBS_PUBLIC_API_BASE_URL}/Form1099NEC/Get?SubmissionId=${SubmissionId}&RecordIds=${RecordIds}`,
            config
        )

        res.status(200).send(getForm1099NECResponse?.data)
    } catch (e) {
        res.status(400).send(e)
    }
}

//Exporting getForm1099NEC
module.exports = {
    getForm1099NEC
}