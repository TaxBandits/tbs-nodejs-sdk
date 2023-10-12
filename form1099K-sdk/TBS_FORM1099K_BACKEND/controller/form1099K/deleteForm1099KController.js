const axios = require('axios') /*Using axios to consume API service*/
const { publicAPIAuthentication } = require('../user/userController') /*Importing publicAPIAuthentication from user controller for JWT token */

//Delete Form 1099 K
const deleteForm1099K = async (req, res) => {
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

    try {
        //TBS Public API for delete Form 1099 k
        const deleteForm1099KResponse = await axios.delete(`${process.env.TBS_PUBLIC_API_BASE_URL}/Form1099K/Delete?SubmissionId=${SubmissionId}&RecordIds=${RecordId}`, config)

        res.status(200).send(deleteForm1099KResponse?.data)
    } catch (e) {
        res.status(400).send(e?.response?.data)
    }
}

module.exports = {
    deleteForm1099K
}