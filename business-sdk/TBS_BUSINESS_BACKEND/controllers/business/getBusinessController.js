const axios = require('axios') /*Using axios to consume API service*/
const { publicAPIAuthentication } = require('../user/userController') /*Importing publicAPIAuthentication from user controller for JWT token */


const getBusiness = async (req, res) => {
    // Getting Business Id from request params
    const BusinessId = req?.params?.BusinessId

    // Getting JWT token by using oauth api function
    const JWTAccessToken = await publicAPIAuthentication()

    const config = {
        headers: {
            Authorization: `Bearer ${JWTAccessToken}`/*Passing JWT token in Authorization */
        }
    }

    try {
        // PUBLIC API GET BUSINESS
        const getBusinessResponse = await axios.get(`${process.env.TBS_PUBLIC_API_BASE_URL}/Business/Get?BusinessId=${BusinessId}`, config)

        res.status(200).send(getBusinessResponse?.data)
    } catch (e) {
        res.status(400).send(e)
    }
}

//Exporting getBusiness
module.exports = {
    getBusiness
}