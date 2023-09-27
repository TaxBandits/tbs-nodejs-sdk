const axios = require('axios') /*Using axios to consume API service*/
const { publicAPIAuthentication } = require('../user/userController') /*Importing publicAPIAuthentication from user controller for JWT token */

const listBusiness = async (req, res) => {
    //Default values loaded from .env
    const Page = process.env.PAGE
    const PageSize = process.env.PAGE_SIZE

    //Getting JWT token by using oauth api function
    const JWTAccessToken = await publicAPIAuthentication()
    console.log('token',JWTAccessToken)
    //Defining the Headers
    const config = {
        headers: {
            Authorization: `Bearer ${JWTAccessToken}` /*Passing JWT token in Authorization */
        }
    }

    try {
        // PUBLIC API to list business
        const listBusinessResponse = await axios.get(`${process.env.TBS_PUBLIC_API_BASE_URL}/Business/List?Page=${Page}&PageSize=${PageSize}`,
            config
        )

        res.status(200).send(listBusinessResponse?.data)
    } catch (e) {
        res.status(400).send(e)
    }
}

//Exporting listBusiness
module.exports = {
    listBusiness
}