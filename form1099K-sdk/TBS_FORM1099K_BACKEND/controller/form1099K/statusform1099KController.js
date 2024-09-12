const axios = require('axios') /*Using axios to consume API service*/
const { publicAPIAuthentication } = require('../user/userController') /*Importing publicAPIAuthentication from user controller for JWT token */

const statusForm1099K = async (req, res) => {
    // Accessing data from request query
    const SubmissionId = req?.query?.SubmissionId
    const RecordIds = req?.query?.RecordIds

    //Getting JWT token by using oauth api function
    const JWTAccessToken = await publicAPIAuthentication()

    //Defining the Headers
    const config = {
        headers: {
            Authorization: `Bearer ${JWTAccessToken}` /*Passing JWT token in Authorization */
        }
    }

    try {
        //TBS Public API for to get Status of Form 1099k
        const statusForm1099KResponse = await axios.get(`${process.env.TBS_PUBLIC_API_BASE_URL}/Form1099K/Status?SubmissionId=${SubmissionId}&RecordIds=${RecordIds}`, config)

        res.status(200).send(statusForm1099KResponse?.data)
    } catch (e) {
        res.status(400).send(e)
    }
}

module.exports = {
    statusForm1099K
}