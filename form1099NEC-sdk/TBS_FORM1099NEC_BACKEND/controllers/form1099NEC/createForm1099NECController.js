const axios = require('axios') /*Using axios to consume API service*/
const { publicAPIAuthentication } = require('../user/userController') /*Importing publicAPIAuthentication from user controller for JWT token */

const createForm1099NEC = async (req, res) => {

    //Getting JWT token by using oauth api function
    const JWTAccessToken = await publicAPIAuthentication()
    
    //Defining headers 
    const config = {
        headers: {
            Authorization: `Bearer ${JWTAccessToken}` /*Passing JWT token in Authorization */
        }
    }

    try {
        //TBS Public API to Create Form 1099 NEC
        const createForm1099NECResponse = await axios.post(`${process.env.TBS_PUBLIC_API_BASE_URL}/Form1099NEC/Create`, req?.body, config)

        res.status(200).send(createForm1099NECResponse?.data)
    } catch (e) {
        res.status(400).send(e?.response?.data)
    }
}

//Exporting createForm1099NEC
module.exports = { 
    createForm1099NEC 
}