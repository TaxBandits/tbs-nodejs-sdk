const axios = require('axios')
const { publicAPIAuthentication } = require('../user/userController')

//Form 1099K RequestPdfUrls
const requestPdfURLs = async (req, res) => {
    const requestBody = req?.body

    //Getting JWT token by using oauth api function
    const JWTAccessToken = await publicAPIAuthentication()

    //Defining headers 
    const config = {
        headers: {
            Authorization: `Bearer ${JWTAccessToken}` /*Passing JWT token in Authorization */
        }
    }

    try {
        //TBS Public API to request pdf url for Form 1099k
        const requestPdfURLsResponse = await axios.post(`${process.env.TBS_PUBLIC_API_BASE_URL}/Form1099K/RequestPdfURLs`,
            requestBody, config)

        res.status(200).send(requestPdfURLsResponse?.data)
    } catch (e) {
        res.status(400).send(e?.response?.data)
    }
}

module.exports = {
    requestPdfURLs
}