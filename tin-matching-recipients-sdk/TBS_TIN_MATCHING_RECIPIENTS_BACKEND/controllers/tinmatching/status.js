const axios = require('axios') /*Using axios to consume API service*/
const { publicAPIAuthentication } = require('../user/userController') /*Importing publicAPIAuthentication from user controller for JWT token */


const statusTinmatchingRecipients = async(req,res)=>{
    const SubmissionId = req.query.SubmissionId
    const RecordId = req.query.RecordId

    const JWTAccessToken = await publicAPIAuthentication()
     //Defining the Headers
    const config = {
        headers: {
            Authorization: `Bearer ${JWTAccessToken}` /*Passing JWT token in Authorization */
        }
    }

    try{  //TBS Public API for to get Status of Form 1099 NEC
        const statusform =await axios.get(`${process.env.TBS_PUBLIC_API_BASE_URL}TINMatchingRecipients/Status?SubmissionId=${SubmissionId}&RecordId=${RecordId}`,
        config
        )
        res.status(200).send(statusform.data)
        
    }catch(e){
        res.status(400).send(e)
       
    }
}

module.exports = {
    statusTinmatchingRecipients
}
