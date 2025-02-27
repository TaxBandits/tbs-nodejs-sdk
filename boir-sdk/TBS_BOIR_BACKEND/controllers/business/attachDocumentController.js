const axios = require('axios') /*Using axios to consume API service*/
const { publicAPIAuthentication } = require('../user/userController') /*Importing publicAPIAuthentication from user controller for JWT token */

const attachDocument = async (req, res) => {
    // Accessing Business Id from request params
    let requestBody = req?.body;

   if(requestBody?.CompanyApplicantAttachments?.length > 0){
    const pdfBytesData = requestBody.CompanyApplicantAttachments[0].PDFByte;
    const dataArray = Object.values(pdfBytesData);
    let pdfbytes = Uint8Array.from(dataArray);
    requestBody.CompanyApplicantAttachments[0].PDFByte = Buffer.from(pdfbytes).toString('base64');
   }
   else if(requestBody?.BeneficialOwnerAttachments?.length > 0){
    const pdfBytesData = requestBody.BeneficialOwnerAttachments[0].PDFByte;
    const dataArray = Object.values(pdfBytesData);
    let pdfbytes = Uint8Array.from(dataArray);
    requestBody.BeneficialOwnerAttachments[0].PDFByte = Buffer.from(pdfbytes).toString('base64');
   }

    // Getting JWT token by using oauth api function
    const JWTAccessToken = await publicAPIAuthentication()

    const config =  {
        headers: {
            Authorization: `Bearer ${JWTAccessToken}`/*Passing JWT token in Authorization */
        }
    }

    try {
        // PUBLIC API to get business
        const getDocumentResponse = await axios.post(`${process.env.TBS_PUBLIC_API_BASE_URL}/BOIR/AttachDocuments`,requestBody, config)

        res.status(200).send(getDocumentResponse?.data)
    } catch (e) {
        res.status(400).send(e?.response?.data)
    }
}

//Exporting getBusiness
module.exports = {
    attachDocument
}