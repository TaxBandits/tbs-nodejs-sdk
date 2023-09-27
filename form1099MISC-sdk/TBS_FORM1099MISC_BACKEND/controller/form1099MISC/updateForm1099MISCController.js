const axios = require('axios') /*Using axios to consume API service*/
const { publicAPIAuthentication } = require('../user/userController') /*Importing publicAPIAuthentication from user controller for JWT token */

const updateForm1099MISC = async (req,res) => {
   
    const  requestBody= req?.body
   
    //Getting JWT token by using oauth api function
    const JWTAccessToken = await publicAPIAuthentication()

    //Defining headers 
    const config = {
        headers: {
            Authorization: `Bearer ${JWTAccessToken}` /*Passing JWT token in Authorization */
        }
    }

    try{
            //TBS Public API to update Form 1099MISC
            const updateForm1099MISCResponse = await axios.put(`${process.env.TBS_PUBLIC_API_BASE_URL}/Form1099MISC/Update`,requestBody,config)
                
             if(updateForm1099MISCResponse.statusCode=200){
                res.status(200).send([updateForm1099MISCResponse?.data])
            }else{
                res.status(400).send(updateForm1099MISCResponse?.data)

            }
    }
    catch(e){
      res.status(400).send(e?.response?.data)
     }
    }
module.exports={updateForm1099MISC}