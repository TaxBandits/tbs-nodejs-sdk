const axios = require('axios') /*Using axios to consume API service*/
const { publicAPIAuthentication } = require('../user/userController') /*Importing publicAPIAuthentication from user controller for JWT token */

//Form 1099 K Validate Endpoint
const validateForm1099K = async (req, res) => {
    const requestBody = req?.body

    //Getting JWT token by using oauth api function
    const JWTAccessToken = await publicAPIAuthentication()

    //Defining headers 
    const config = {
        headers: {
            Authorization: `Bearer ${JWTAccessToken}` /*Passing JWT token in Authorization */
        }
    }
    try {
        //TBS Public API to validate Form 1099k
        const validateForm1099KResponse = await axios.post(`${process.env.TBS_PUBLIC_API_BASE_URL}/Form1099K/ValidateForm`, requestBody, config)

        res.status(200).send(validateForm1099KResponse?.data)
    } catch (e) {
        res.status(400).send(e?.response?.data)
    }
}

module.exports = { 
    validateForm1099K 
}