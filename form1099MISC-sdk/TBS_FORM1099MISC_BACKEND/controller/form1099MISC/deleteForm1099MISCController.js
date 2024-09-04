const axios = require('axios') /*Using axios to consume API service*/
const { publicAPIAuthentication } = require('../user/userController') /*Importing publicAPIAuthentication from user controller for JWT token */


const deleteForm1099MISC = async(req,res)=>{
    const SubmissionId = req?.query?.SubmissionId
    const RecordId = req?.query?.RecordId
  
    const JWTAccessToken = await publicAPIAuthentication()
     //Defining the Headers
    const config = {
        headers: {
            Authorization: `Bearer ${JWTAccessToken}` /*Passing JWT token in Authorization */
        }
    }

    try{  
        //TBS Public API for delete Form 1099 MISC
        const deleteForm1099MISCResponse =await axios.delete(`${process.env.TBS_PUBLIC_API_BASE_URL}/Form1099MISC/Delete?SubmissionId=${SubmissionId}&RecordIds=${RecordId}`,
        config
        )
        res.status(200).send(deleteForm1099MISCResponse?.data)
        
    }catch(e){
        res.status(400).send(e?.response?.data)
    }
}

module.exports = {
    deleteForm1099MISC
}
