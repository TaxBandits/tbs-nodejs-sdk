const axios = require('axios') /*Using axios to consume API service*/
const { publicAPIAuthentication } = require('../user/userController') /*Importing publicAPIAuthentication from user controller for JWT token */


const getform1099K = async(req,res)=>{
    const SubmissionId = req?.query?.SubmissionId
    const RecordIds = req?.query?.RecordIds
  
    const JWTAccessToken = await publicAPIAuthentication()
     //Defining the Headers
    const config = {
        headers: {
            Authorization: `Bearer ${JWTAccessToken}` /*Passing JWT token in Authorization */
        }
    }

    try{  
        //TBS Public API for getting Form 1099 k
        const getform1099KResponse =await axios.get(`${process.env.TBS_PUBLIC_API_BASE_URL}/Form1099K/Get?SubmissionId=${SubmissionId}&RecordIds=${RecordIds}`,config)
        
        res.status(200).send(getform1099KResponse?.data)

    }catch(e){
        res.status(400).send(e)     
    }
}

module.exports = {
    getform1099K
}
