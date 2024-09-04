import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios' // Importing Axios to make HTTP calls.
import Spinner from '../components/Spinner' //Importing Spinner Component for loader
import logo from '../images/tbsLogo.png' // Importing images
import * as bootstrap from 'bootstrap/dist/js/bootstrap' // Importing bootstrap for bootstrap modal
import StatusModal from '../components/StatusModal' //Importing Status Modal
import CancelModal from '../components/CancelModal' //Importing Cancel Modal

// List TIN Matching Recipient Endpoint
const ListTinMatchingRecipient = () => {

  // Calling Tin Matching Recipient list function in Use Effect
  useEffect(() => {
    listTinMatchingRecipients()
  }, [])

  const [noListFound, setNoListFound] = useState() // Initializing state for list api error response
  const [loading, setLoading] = useState(false) // Initializing state for loading
  const [tinMatchingList, setTinMatchingList] = useState([]) // Initializing state for list api success response
  const [statusData, setStatusData] = useState([]) //Initializing state for status api response
  const [cancelSuccessData, setCancelSuccessData] = useState([]) //Initializing state for cancel api success response
  const [cancelErrorData, setCancelErrorData] = useState([]) //Initializing state for cancel api error response

  //Defining params 
  const params = useParams()
  //Accessing the Data from params
  const BusinessId = params?.BusinessId
  const BusinessName = params?.BusinessName
  const TIN = params?.TIN

  //To navigate between pages using useNavigate Hook
  const navigate = useNavigate()

  // Function for navigating to List Business page
  const navigateToListBusiness = () => {
    navigate('/list')
  }

  // Navigating to TIN Matching Request Page 
  const navigateToTINMatchingRequest = () => {
    navigate(`/request/${BusinessId}/${BusinessName}/${TIN}`)
  }

  //Getting TIN Matching Status by requesting TIN Matching API Status method
  const viewStatus = async (SubmissionId, RecordId) => {
    try {
      setLoading(true)
      const viewStatusData = await axios.get(`${process.env.REACT_APP_TBS_TIN_MATCHING_RECIPIENTS_BACKEND_URL}/TINMatchingRecipients/Status?SubmissionId=${SubmissionId}&RecordId=${RecordId}`)
      setStatusData(viewStatusData?.data)

      //Modal to show the Success or Failure Response from the Business/Create Endpoint.
      let awaitingModal = new bootstrap.Modal(document.getElementById('statusModal'))
      awaitingModal.show()
      setLoading(false)
    } catch (e) {
      setLoading(false)
    }
  }

  //Generating TIN Matching Cancel Request by requesting TIN Matching API Cancel method
  const cancelRequest = async (SubmissionId, RecordId) => {
    try {
      setLoading(true)
      const cancelRequest = await axios.put(`${process.env.REACT_APP_TBS_TIN_MATCHING_RECIPIENTS_BACKEND_URL}/TINMatchingRecipients/CancelRequest?SubmissionId=${SubmissionId}&RecordIds=${RecordId}`)
      setCancelSuccessData(cancelRequest?.data)
      setCancelErrorData(null)
      //Modal to show the Success or Failure Response from the Business/Create Endpoint.
      let awaitingModal = new bootstrap.Modal(document.getElementById('cancelModal'))
      awaitingModal.show()
      listTinMatchingRecipients()
      setLoading(false)
    } catch (e) {
      setCancelSuccessData(null)
      setCancelErrorData(e?.response?.data?.ErrorRecords)
      //Modal to show the Success or Failure Response from the Business/Create Endpoint.
      let awaitingModal = new bootstrap.Modal(document.getElementById('cancelModal'))
      awaitingModal.show()
      setLoading(false)
    }
  }

  //Get TIN Matching Recipient List by Business Id
  const listTinMatchingRecipients = async () => {
    try {
      setNoListFound(false)
      setLoading(true)
      const listResponse = await axios.get(`${process.env.REACT_APP_TBS_TIN_MATCHING_RECIPIENTS_BACKEND_URL}/TINMatchingRecipients/List?BusinessId=${BusinessId}`)
      setTinMatchingList(listResponse?.data)
      setLoading(false)
      setNoListFound(false)
    } catch (e) {
      setTinMatchingList([])
      setLoading(false)
      setNoListFound(true)
    }
  }

  return (
    <>
      <div className="header text-center">
        <img src={logo} alt="tbsLogo" />
      </div>

      {/*Checks loader state and displays spinner component*/}
      {loading === true &&
        <div className='mt-3'>
          <Spinner />
        </div>
      }

      {/*Checks no list found state and displays create business button*/}
      {noListFound === true ? (
        <>
          <div className='container mx-auto mt-5'>
            <div className="text-center">
              <p>There are no TIN Match requests for this Business({BusinessName}). To submit new TIN Match requests, click 'Request TIN Match Button' </p>
              <button className='btn btn_primary shadow btn_md' onClick={navigateToTINMatchingRequest}>Request TIN Match</button>
            </div>
            <div className='text-start'>
              <button className='btn_back mb-3' onClick={navigateToListBusiness}>Back</button>
            </div>
          </div>
        </>)
        : (
          <>
            <div className="container">
              <div className="text-center mb-3">
                {/*Checks business list length and displays list business*/}
                {tinMatchingList?.TINMatchingRecords?.length > 0 && (
                  <>
                    <div className="response-table p-5">
                      <div className='d-flex align-items-center justify-content-between'>
                        <div>
                          <h1 className='head-1'>List TIN Matching Recipients</h1>
                          <div className="heading-bottom-line position-relative pb-0  mb-3"></div>
                        </div>
                      </div>
                      <table className="table table-striped mt-2 table-bordered">
                        <thead>
                          <tr>
                            <th>S.No</th>
                            <th>SequenceId</th>
                            <th>SubmissionId</th>
                            <th>RecordId</th>
                            <th>TIN Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tinMatchingList?.TINMatchingRecords?.map((tinMatchingListItem, i) => {
                            return (
                              <tr key={i}>
                                <td className='taL'>{i + 1}</td>
                                <td className='taL'>{tinMatchingListItem?.SequenceId}</td>
                                <td className='taL'>{tinMatchingListItem?.SubmissionId}</td>
                                <td className='taL'>{tinMatchingListItem?.RecordId}</td>
                                <td className='taL'>{tinMatchingListItem?.Status}</td>
                                <td className='text-center d-flex flex-row justify-content-center'>

                                  <div className='col-6 me-1'>
                                    <button className='btn btn-primary status-btn btn_smm' onClick={() => { viewStatus(tinMatchingListItem?.SubmissionId, tinMatchingListItem?.RecordId) }}>Get Status</button>
                                  </div>
                                  <div className='col-6 me-2'>
                                    <button className='btn_cancel btn_smm1' onClick={() => { cancelRequest(tinMatchingListItem?.SubmissionId, tinMatchingListItem?.RecordId) }}><span class="mdi mdi-close pe-1"></span>Cancel</button>
                                  </div>

                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                      <div className='text-start'>
                        <button className='btn_back mb-3' onClick={navigateToListBusiness}>Back</button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </>)}

      {/* Status Modal for TIN Matching Recipients  */}
      <StatusModal
        statusData={statusData} 
      />

      {/* Cancel Modal for TIN Matching Recipients  */}
      <CancelModal
        cancelSuccessData={cancelSuccessData} 
        cancelErrorData={cancelErrorData}
      />
    </>
  )
}

export default ListTinMatchingRecipient