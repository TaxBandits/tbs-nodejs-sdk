const axios = require('axios') /*Using axios to consume API service*/
const { publicAPIAuthentication } = require('../user/userController') /*Importing publicAPIAuthentication from user controller for JWT token */

const deleteForm1099NEC = async (req, res) => {

    // Accessing Submission Id and Record Id from request query
    const SubmissionId = req?.query?.SubmissionId
    const RecordId = req?.query?.RecordId

    //Getting JWT token by using oauth api function
    const JWTAccessToken = await publicAPIAuthentication()
    
    //Defining Headers
    const config = {
        headers: {
            Authorization: `Bearer ${JWTAccessToken}` /*Passing JWT token in Authorization */
        }
    }

    try {
        //TBS Public API to delete Form 1099 NEC
        const deleteForm1099NECResponse = await axios.delete(`${process.env.TBS_PUBLIC_API_BASE_URL}/Form1099NEC/Delete?SubmissionId=${SubmissionId}&RecordIds=${RecordId}`,
            config
        )

        res.status(200).send(deleteForm1099NECResponse?.data)
    } catch (e) {
        res.status(400).send(e?.response?.data)
    }
}

//Exporting deleteForm1099NEC
module.exports = {
    deleteForm1099NEC
}