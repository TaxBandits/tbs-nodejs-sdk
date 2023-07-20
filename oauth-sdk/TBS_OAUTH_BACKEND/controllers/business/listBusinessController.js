const axios = require('axios') /*Using axios to consume API service*/
const moment = require('moment') /*Using moment for date formatting*/

// List Business
// Listing the business by passing JWT token as header and passing page,page size, from date, to date from env files to TBS public API List method
const listBusiness = async (req,res) => {
    const Page = process.env.PAGE 
    const PageSize = process.env.PAGE_SIZE
    const FromDate = process.env.FROM_DATE
    const ToDate = moment(new Date()).format('MM/DD/YYYY')
    //Getting JWT token by using oauth api function
    const JWTAccessToken = req.headers.authorization

    const config = {
        headers: {
            Authorization: JWTAccessToken /*Passing JWT token in Authorization */
        }
    }

    try{
        //PUBLIC API CREATE BUSINESS
        const getBusinessList = await axios.get(`${process.env.TBS_PUBLIC_API_BASE_URL}/Business/List?Page=${Page}&PageSize=${PageSize}&FromDate=${FromDate}&ToDate=${ToDate}`,
        config
        )
        res.status(200).send(getBusinessList.data)

    }catch(e){
        res.status(400).send([e.response.data])
    }
}

// Exporting listBusiness
module.exports = {
    listBusiness
}
