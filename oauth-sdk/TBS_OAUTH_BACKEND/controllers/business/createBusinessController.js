const axios = require('axios') /*Using axios to consume API service*/

// Create Business
// Creating a Business by hitting TBS public API with request body and JWT token as header
const createBusiness = async(req,res) => {

    const requestBody = {
        BusinessNm: "Eastman Kodak Company",
        PayerRef: "Pe126145",
        TradeNm: "Kodak",
        IsEIN: "true",
        EINorSSN: "003313330",
        Email: "john@gmail.com",
        ContactNm: "John",
        Phone: "1234567890",
        PhoneExtn: "12345",
        Fax: "1234567890",
        BusinessType: "ESTE",
        SigningAuthority: {
            Name: "John",
            Phone: "1234567890",
            BusinessMemberType: "ADMINISTRATOR"
        },
        KindOfEmployer: "FEDERALGOVT",
        KindOfPayer: "REGULAR941",
        IsBusinessTerminated: false,
        IsForeign: true,
        USAddress: {
            Address1: null,
            Address2: null,
            City: null,
            State: null,
            ZipCd: null
        },
        ForeignAddress: {
            Address1: "22 St",
            Address2: "Clair Ave E",
            City: "Toronto",
            ProvinceOrStateNm: "Ontario",
            Country: "CA",
            PostalCd: "M1R 0E9"
   }
    }
    //Getting JWT token by using oauth api function
    const JWTAccessToken = req.headers.authorization

    //Defining headers 
    const config = {
        headers: {
            Authorization: JWTAccessToken /*Passing JWT token in Authorization */
        }
    }

    try{
        
        //Checks if Foreign Address
        if(requestBody.IsForeign){
        if(
            (requestBody.BusinessNm != '' ) &&
            (requestBody.EINorSSN != '') &&
            (requestBody.KindOfEmployer != '') &&
            (requestBody.KindOfPayer != '') &&
            (requestBody.ForeignAddress.Address1 != '') &&
            (requestBody.ForeignAddress.City != '') &&
            (requestBody.ForeignAddress.ProvinceOrStateNm != '') &&
            (requestBody.ForeignAddress.Country != '') &&
            (requestBody.ForeignAddress.PostalCd != '') 
        ){
            //TBS PUBLIC API to create business
            const insertBusinessTBS = await axios.post(`${process.env.TBS_PUBLIC_API_BASE_URL}/Business/Create`,
            requestBody,config
            )
            if(insertBusinessTBS.data.StatusCode == 200){
                res.status(200).send([insertBusinessTBS.data])
            }else{
                res.status(400).send(insertBusinessTBS.data)
            }
        }else{
            res.status(400).send(
                {
                    statusCode: 400,
                    status: "Error",
                    message: "Please fill all the required fields",
                    reposnse: []
                })

        }}else{ /*Checks if not Foreign Address*/
            if(
                (requestBody.BusinessNm != '' ) &&
                (requestBody.EINorSSN != '') &&
                (requestBody.KindOfEmployer != '') &&
                (requestBody.KindOfPayer != '') &&
                (requestBody.USAddress.Address1 != '') &&
                (requestBody.USAddress.City != '') &&
                (requestBody.USAddress.State != '') &&
                (requestBody.USAddress.ZipCd != '') 
            ){
                //TBS PUBLIC API to create business
                const insertBusinessTBS = await axios.post(`${process.env.TBS_PUBLIC_API_BASE_URL}/Business/Create`,
                requestBody,config
                )
                if(insertBusinessTBS.data.StatusCode == 200){
                    res.status(200).send([insertBusinessTBS.data])
                }else{
                    res.status(400).send(insertBusinessTBS.data)
                }
            }else{
                res.status(400).send(
                    {
                        statusCode: 400,
                        status: "Error",
                        message: "Please fill all the required",
                        reposnse: []
                    })
            }

        }
    
    }catch(e){
        res.status(400).send([e.response.data])
    }
}

//Exporting createBusiness
module.exports = {
    createBusiness
}