const axios = require('axios') /*Using axios to consume API service*/
const { publicAPIAuthentication } = require('../user/userController') /*Importing publicAPIAuthentication from user controller for JWT token */


const listForm1099MISC = async (req,res) => {
    
    //Accessing Data from Params
    const BusinessId = req?.params?.BusinessId
    //Default values loaded from .env
    const Page = process.env.PAGE
    const PageSize = process.env.PAGE_SIZE
    //Getting JWT token by using oauth api function
    const JWTAccessToken = await publicAPIAuthentication()
    const config = {
        headers: {
            Authorization:`Bearer ${JWTAccessToken}` /*Passing JWT token in Authorization */
        }
    }

    try{
         //TBS Public API to List Form 1099MISC
        const listForm1099MISCResponse = await axios.get(`${process.env.TBS_PUBLIC_API_BASE_URL}/Form1099MISC/List?BusinessId=${BusinessId}&Page=${Page}&PageSize=${PageSize}`,
        config
        )      
        res.status(200).send(listForm1099MISCResponse?.data)

    }catch(e){
        res.status(400).send(e)
    }
}

module.exports = {
    listForm1099MISC
}
