import React, { useState } from 'react'
import Recipient from '../components/Recipient'
import { useParams } from 'react-router-dom'
import * as bootstrap from 'bootstrap/dist/js/bootstrap' // Importing bootstrap for bootstrap modal
import axios from 'axios' // Importing Axios to make HTTP calls
import logo from '../images/tbsLogo.png' // Importing images
import Spinner from '../components/Spinner' //Importing Spinner Component for loader
import SuccessModal from '../components/SuccessModal' // Importing Success Modal
import ErrorModal from '../components/ErrorModal' // Importing Error Modal

//TIN Matching Recipient Request Endpoint
const Request = () => {

  const [inputData, setInputData] = useState([]) // Initializing state for recipient data
  const [loading, setLoading] = useState(false) // Initializing state for loader
  const [errorData, setErroData] = useState([]) // Initializing state for error response modal
  const [successData, setSuccessData] = useState([]) // Initializing state for success response modal

  //Defining params 
  const params = useParams()
  //Accessing the Data from params
  const businessId = params?.BusinessId
  const businessName = params?.BusinessName
  const TIN = params?.TIN

  //Defining function for recipients input data
  const requestTINData = () => {
    const reqdata = inputData?.map((data) => {
      return {
        SequenceId: data.SequenceId,
        RecipientId: null,
        Name: data.Name,
        TINType: data.TINType,
        TIN: data.TIN
      }
    })

    return reqdata
  }

  //Request Tin Matching Recipients by requesting TINMatchingRecipients API request method
  const handleRequest = async (e) => {
    const tinData = requestTINData()

    try {
      e.preventDefault()
      setLoading(true)
      const requestData = {
        "TINMatchingDetails": {
          "Business": {
            "BusinessId": businessId,
            "TIN": null
          },
          "Recipients": tinData
        }
      }

      const requestTINMatching = await axios.post(`${process.env.REACT_APP_TBS_TIN_MATCHING_RECIPIENTS_BACKEND_URL}/TINMatchingRecipients/Request`, requestData)
      if (requestTINMatching?.data?.TINMatchingRecords?.SuccessRecords?.length > 0) {
        setSuccessData(requestTINMatching?.data, tinData)

        //Modal to show the Success or Failure Response from the Business/Create Endpoint.
        let awaitingModal = new bootstrap.Modal(document.getElementById('successModal'))
        awaitingModal.show()
      } else if (requestTINMatching?.data?.TINMatchingRecords?.ErrorRecords?.length > 0) {
        setErroData(requestTINMatching?.data, tinData)

        //Modal to show the Success or Failure Response from the Business/Create Endpoint.
        let awaitingModal = new bootstrap.Modal(document.getElementById('errorModal'))
        awaitingModal.show()
      } else if (requestTINMatching?.data?.length > 0) {
        setErroData(requestTINMatching?.data, tinData)

        //Modal to show the Success or Failure Response from the Business/Create Endpoint.
        let awaitingModal = new bootstrap.Modal(document.getElementById('errorModal'))
        awaitingModal.show()
      }
      setInputData([])
    } catch (e) {
      setErroData(e?.response?.data.TINMatchingRecords?.ErrorRecords)
      //Modal to show the Success or Failure Response from the Business/Create Endpoint.
      let awaitingModal = new bootstrap.Modal(document.getElementById('errorModal'))
      awaitingModal.show()
    }
    setLoading(false)
  }

  return (
    <>
      <div className="header text-center">
        <img src={logo} alt="tbsLogo" />
      </div>
      {loading === true &&
        <Spinner />
      }
      <Recipient //Recipient Modal 
        businessId={businessId}
        businessName={businessName}
        TIN={TIN}
        handleRequest={handleRequest}
        setInputData={setInputData}
      />
      
      <ErrorModal
        errorData={errorData} //Error Modal for Create Business
      />
      <SuccessModal
        successData={successData} //Success Modal for Create Business
      />
    </>
  )
}

export default Request
