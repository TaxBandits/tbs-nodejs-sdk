const axios = require('axios') /*Using axios to consume API service*/
const moment = require('moment') /*Using moment for date formatting*/
const { publicAPIAuthentication } = require('../user/userController') /*Importing publicAPIAuthentication from user controller for JWT token */

const listBusiness = async (req, res) => {
    //Default values loaded from .env
    const Page = process.env.PAGE
    const PageSize = process.env.PAGE_SIZE
    const FromDate = process.env.FROM_DATE
    const ToDate = moment(new Date()).format('MM/DD/YYYY')

    //Getting JWT token by using oauth api function
    const JWTAccessToken = await publicAPIAuthentication()

    const config = {
        headers: {
            Authorization: `Bearer ${JWTAccessToken}` /*Passing JWT token in Authorization */
        }
    }

    try {
        // PUBLIC API LIST BUSINESS
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
