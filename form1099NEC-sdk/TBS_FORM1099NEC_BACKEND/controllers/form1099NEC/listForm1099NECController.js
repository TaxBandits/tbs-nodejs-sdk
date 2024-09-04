const axios = require('axios') /*Using axios to consume API service*/
const { publicAPIAuthentication } = require('../user/userController') /*Importing publicAPIAuthentication from user controller for JWT token */

const listForm1099NEC = async (req, res) => {

    //Accessing Business Id from Params
    const BusinessId = req?.params?.BusinessId
    //Default values loaded from .env
    const Page = process.env.PAGE
    const PageSize = process.env.PAGE_SIZE

    //Getting JWT token by using oauth api function
    const JWTAccessToken = await publicAPIAuthentication()
    //Defining the Headers
    const config = {
        headers: {
            Authorization: `Bearer ${JWTAccessToken}` /*Passing JWT token in Authorization */
        }
    }

    try {
        //TBS Public API to List Form 1099 NEC
        const listForm1099NECResponse = await axios.get(`${process.env.TBS_PUBLIC_API_BASE_URL}/Form1099NEC/List?BusinessId=${BusinessId}&Page=${Page}&PageSize=${PageSize}`,
            config
        )

        res.status(200).send(listForm1099NECResponse?.data)
    } catch (e) {
        res.status(400).send(e)
    }
}

//Exporting listForm1099NEC
module.exports = {
    listForm1099NEC
}