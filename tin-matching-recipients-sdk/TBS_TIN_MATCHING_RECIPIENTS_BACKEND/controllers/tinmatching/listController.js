const axios = require('axios') /*Using axios to consume API service*/
const { publicAPIAuthentication } = require('../user/userController') /*Importing publicAPIAuthentication from user controller for JWT token */

//List TIN Matching Recipient using TBS API.
const listTinmatchingRecipients = async (req, res) => {
    //Accessing the Data from Query
    const BusinessId = req?.query?.BusinessId

    //Getting JWT token by using oauth api function
    const JWTAccessToken = await publicAPIAuthentication()

    //Defining the Headers
    const config = {
        headers: {
            Authorization: `Bearer ${JWTAccessToken}` /*Passing JWT token in Authorization */
        }
    }

    //TBS Public API to List TIN Matching Request
    try {
        const getTinMatchingList = await axios.get(`${process.env.TBS_PUBLIC_API_BASE_URL}/TINMatchingRecipients/List?BusinessId=${BusinessId}`, config)

        res.status(200).send(getTinMatchingList?.data)
    } catch (e) {
        res.status(400).send(e)
    }
}

//Exporting TIN Matching Recipients List
module.exports = {
    listTinmatchingRecipients
}
