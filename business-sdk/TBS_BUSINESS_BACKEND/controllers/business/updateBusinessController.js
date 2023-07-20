const axios = require('axios') /*Using axios to consume API service*/
const { publicAPIAuthentication } = require('../user/userController') /*Importing publicAPIAuthentication from user controller for JWT token */

//Update Business
//Updating a Business by hitting TBS public API with request body and JWT token as header
const updateBusiness = async (req, res) => {

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
            //TBS PUBLIC API to Update business
            const updateBusinessResponse = await axios.put(`${process.env.TBS_PUBLIC_API_BASE_URL}/Business/Update`, requestBody, config)

            res.status(200).send(updateBusinessResponse?.data)
    } catch(e) {
        res.status(400).send(e?.response?.data)
    }
}

//Exporting updateBusiness
module.exports = {
    updateBusiness
}