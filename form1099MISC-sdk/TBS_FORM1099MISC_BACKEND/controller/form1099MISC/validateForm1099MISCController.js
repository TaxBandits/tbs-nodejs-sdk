const axios = require('axios') /*Using axios to consume API service*/
const { publicAPIAuthentication } = require('../user/userController') /*Importing publicAPIAuthentication from user controller for JWT token */

const validateForm1099MISC = async(req,res) =>{
  
    const requestBody = req?.body

    //Getting JWT token by using oauth api function
    const JWTAccessToken = await publicAPIAuthentication()

    //Defining headers 
    const config = {
        headers: {
            Authorization: `Bearer ${JWTAccessToken}` /*Passing JWT token in Authorization */
        }
    }
    try{
        //TBS Public API to validate Form 1099MISC
        const validateForm1099MISCResponse = await axios.post(`${process.env.TBS_PUBLIC_API_BASE_URL}/Form1099MISC/ValidateForm`,requestBody,config)
                
        res.status(200).send(validateForm1099MISCResponse?.data)
              
      }
    catch(e){
        res.status(400).send(e?.response?.data)
     }
}

module.exports={validateForm1099MISC}
