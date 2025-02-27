const axios = require('axios') /*Using axios to consume API service*/
const { publicAPIAuthentication } = require('../user/userController') /*Importing publicAPIAuthentication from user controller for JWT token */

const transmitBusiness = async (req, res) => {
    // Accessing Business Id from request params
    

    // Getting JWT token by using oauth api function
    const JWTAccessToken = await publicAPIAuthentication()

    const {
      SubmissionId,
      ReportNumber,
    } = req.body;

    const headers= {
      Authorization: `Bearer ${JWTAccessToken}`,
    }
    const body ={
      SubmissionId:SubmissionId,
      ReportNumber:""
    }

    try {
        // PUBLIC API to get business
        const getTransmitResponse = await axios.post(`${process.env.TBS_PUBLIC_API_BASE_URL}/BOIR/Transmit`, body, {headers});

        res.status(200).send(getTransmitResponse?.data);
    } catch (error) {
      res.status(400).send(error?.response?.data);
    }
}

module.exports={
  transmitBusiness
}


