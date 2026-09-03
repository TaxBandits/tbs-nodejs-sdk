const axios = require('axios'); /*Using axios to consume API service*/
const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');
const { publicAPIAuthentication } = require('../user/userController'); /*Importing publicAPIAuthentication from user controller for JWT token */

// Function to decrypt pdf url
const decryptPdf = async (req, res) => {
    try {
        const url = req.body.urlLink;
        const urlParts = url.split('.com/'); //Remove the main domain from the file path

        // AWS account credentials
        const AWS_Credentials = {
            accessKey: process.env.AWS_ACCESS_KEY_ID,
            secretKey: process.env.AWS_SECRET_KEY_ID,
            bucketName: process.env.BUCKET_NAME,
        };

        // Initialize S3 Client (v3)
        const s3Client = new S3Client({
            region: "us-east-1",
            credentials: {
                accessKeyId: AWS_Credentials.accessKey,
                secretAccessKey: AWS_Credentials.secretKey
            }
        });

        // Generate encryption key
        const ssecKey = Buffer.alloc(32, process.env.AWS_ENCRYPTION_KEY, 'base64');

        // Determine the key based on environment
        let key = urlParts[1];
        if (process.env.ENVIRONMENT === 'production') {
            key = urlParts[urlParts.length - 1];
        }

        // Create GetObject command (v3)
        const params = {
            Bucket: AWS_Credentials.bucketName,
            Key: key,
            SSECustomerAlgorithm: "AES256",
            SSECustomerKey: ssecKey
        };

        const command = new GetObjectCommand(params);
        
        // Send the command (v3 - no .promise() needed)
        const download = await s3Client.send(command);

        // In v3, the Body is a ReadableStream
        // Convert stream to buffer
        const chunks = [];
        for await (const chunk of download.Body) {
            chunks.push(chunk);
        }
        const fileBuffer = Buffer.concat(chunks);

        // Send the file
        res.send(fileBuffer);

    } catch (e) {
        console.log(`error`, e);
        res.status(500).send({ error: 'Failed to decrypt PDF' });
    }
};

const requestDraftPdfUrl = async (req, res) => {
    const requestBody = req?.body;

    // Getting JWT token by using oauth api function
    const JWTAccessToken = await publicAPIAuthentication();

    // Defining headers
    const config = {
        headers: {
            Authorization: `Bearer ${JWTAccessToken}` /*Passing JWT token in Authorization */
        }
    };

   try{
            //TBS Public API to request draft pdf url for Form 1099MISC
            const requestDraftPdfUrlResponse = await axios.post(`${process.env.TBS_PUBLIC_API_BASE_URL}/Form1099K/RequestDraftPdfUrl`,requestBody,config)
                
                 if(requestDraftPdfUrlResponse.data.statusCode=200){
                    res.status(200).send(requestDraftPdfUrlResponse.data)
                 }else{
                  res.status(400).send(requestDraftPdfUrlResponse.data)
                 }
                }
        
    catch(e){
      res.status(400).send(e?.response?.data)
     }
};

module.exports = {
    requestDraftPdfUrl,
    decryptPdf
};