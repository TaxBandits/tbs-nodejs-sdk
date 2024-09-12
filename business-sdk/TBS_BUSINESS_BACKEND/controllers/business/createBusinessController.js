const axios = require('axios') /*Using axios to consume API service*/
const { publicAPIAuthentication } = require('../user/userController') /*Importing publicAPIAuthentication from user controller for JWT token */

// Create Business
// Creating a Business by hitting TBS public API with request body and JWT token as header
const createBusiness = async (req, res) => {

    const requestBody = req?.body

    //Getting JWT token by using oauth api function
    const JWTAccessToken = await publicAPIAuthentication()
    console.log("token-->", JWTAccessToken)
    //Defining headers 
    const config = {
        headers: {
            Authorization: `Bearer ${JWTAccessToken}` /*Passing JWT token in Authorization */
        }
    }

    try {
        //TBS PUBLIC API to create business
        const createBusinessResponse = await axios.post(`${process.env.TBS_PUBLIC_API_BASE_URL}/Business/Create`, requestBody, config)

        res.status(200).send(createBusinessResponse?.data)
    } catch (e) {
        res.status(400).send(e?.response?.data)
    }
}

//Exporting createBusiness
module.exports = {
    createBusiness
}