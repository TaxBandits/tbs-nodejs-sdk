const axios = require('axios') /*Using axios to consume API service*/
const { publicAPIAuthentication } = require('../user/userController') /*Importing publicAPIAuthentication from user controller for JWT token */

const transmitForm1099NEC = async (req, res) => {

    //Getting JWT token by using oauth api function
    const JWTAccessToken = await publicAPIAuthentication()

    //Defining headers 
    const config = {
        headers: {
            Authorization: `Bearer ${JWTAccessToken}` /*Passing JWT token in Authorization */
        }
    }

    try {
        //TBS Public API to transmit Form 1099 NEC
        const transmitForm1099NECResponse = await axios.post(`${process.env.TBS_PUBLIC_API_BASE_URL}/Form1099NEC/Transmit`, req?.body, config)

        res.status(200).send(transmitForm1099NECResponse?.data)
    } catch (e) {
        res.status(400).send(e?.response?.data)
    }
}

//Exporting transmitForm1099NEC
module.exports = { 
    transmitForm1099NEC 
}