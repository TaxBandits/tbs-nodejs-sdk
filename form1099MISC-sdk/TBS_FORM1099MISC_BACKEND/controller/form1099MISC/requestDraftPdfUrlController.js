const axios = require('axios') /*Using axios to consume API service*/
const AWS = require('aws-sdk')
const { publicAPIAuthentication } = require('../user/userController') /*Importing publicAPIAuthentication from user controller for JWT token */

// Function to decrypt pdf url
const decryptPdf = async (req, res) => {
    console.log("req", req)
    try {
    const url = req.body.urlLink
    const urlParts = url.split('.com/') //Remove the main domain from the file path
    // AWS account credentials
    const AWS_Credentials = {
        accessKey: process.env.AWS_ACCESS_KEY_ID,
        secretKey: process.env.AWS_SECRET_KEY_ID,
        bucketName: process.env.BUCKET_NAME, 
    }
    AWS.config.update({ region: "us-east-1" })

    const s3 = new AWS.S3({
        accessKeyId: AWS_Credentials.accessKey,
        secretAccessKey: AWS_Credentials.secretKey
    })
    const ssecKey = Buffer.alloc(32, process.env.AWS_ENCRYPTION_KEY, 'base64')
    let params = {
        Bucket: AWS_Credentials.bucketName,
        Key: urlParts[1],
        SSECustomerAlgorithm: "AES256",
        SSECustomerKey: ssecKey
    }

    if(process.env.ENVIRONMENT == 'production')
    {
        params = {
            Bucket: AWS_Credentials.bucketName,
            Key: urlParts[urlParts.length-1],
            SSECustomerAlgorithm: "AES256",
            SSECustomerKey: ssecKey
        }
    }

    const download = await s3?.getObject(params)?.promise()    
    res.send(download.Body)
        
} catch (e) {
        res.send(e)
        console.log(`error`,e)
}
}


const requestDraftPdfUrl = async (req,res) => {
   
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
            //TBS Public API to request draft pdf url for Form 1099MISC
            const requestDraftPdfUrlResponse = await axios.post(`${process.env.TBS_PUBLIC_API_BASE_URL}/Form1099MISC/RequestDraftPdfUrl`,requestBody,config)
                
                 if(requestDraftPdfUrlResponse.data.statusCode=200){
                    res.status(200).send(requestDraftPdfUrlResponse.data)
                 }else{
                  res.status(400).send(requestDraftPdfUrlResponse.data)
                 }
                }
        
    catch(e){
      res.status(400).send(e?.response?.data)
     }
}
module.exports={
    requestDraftPdfUrl,
    decryptPdf
}