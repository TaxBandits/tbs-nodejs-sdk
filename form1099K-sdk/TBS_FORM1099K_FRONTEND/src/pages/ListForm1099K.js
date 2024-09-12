import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios' //Axios to make HTTP calls
import { FaEdit } from 'react-icons/fa' // Importing Edit Icon from react icons
import logo from '../images/tbsLogo.png' // Importing images
import * as bootstrap from 'bootstrap/dist/js/bootstrap' // Importing bootstrap for bootstrap modal
import Spinner from '../components/Spinner' // Importing Spinner component for loader
import StatusModal from '../components/StatusModal' //Importing Status Modal
import DeleteModal from '../components/DeleteModal' //Importing Delete Modal
import TransmitModal from '../components/TransmitModal' //Importing Transmit Modal
import ReviewModal from '../components/ReviewModal'
import ViewPdfUrlModal from '../components/ViewPdfUrlModal'
import RequestDraftPdfErrorModal from '../components/RequestDraftPDFErrorModal'
import RequestPdfErrorModal from '../components/RequestPdfErrorModal'

//Form1099K List
const ListForm1099k = () => {

  const [noListFound, setNoListFound] = useState(false) // Initializing state for listing error response
  const [form1099KList, setform1099KList] = useState([]) // Initializing state for business list
  const [loading, setLoading] = useState(false) // Initializing state for loading
  const [statusData, setStatusData] = useState([]) //Initializing state for status api response
  const [deleteData, setDeleteData] = useState([]) //Initializing state for delete api response
  const [transmitSuccess, setTransmitSuccess] = useState([]) //Initializing state for transmit api response
  const [transmitError, setTransmitError] = useState([]) //Initializing state for transmit api response
  const [reviewPdfData, setReviewPdfData] = useState([])
  const [viewPdfUrlData, setViewPdfUrlData] = useState([])
  const [draftpdfErrorData, setDraftpdfErrorData] = useState([])
  const [pdfErrorData, setPdfErrorData] = useState([])
  const [pdfHeader, setPdfHeader] = useState('')

  useEffect(() => {
    listForm1099K()
  }, [])

  //Initializing state for business details
  const [businessData, setBusinessData] = useState({
    BusinessName: "",
    EINOrSSN: "",
    IsEIN: false
  })

  //Defining params 
  const params = useParams()
  //Accessing the Data from params
  const businessId = params?.businessId
  const businessName = params?.businessName
  //To navigate between pages using useNavigate Hook
  const navigate = useNavigate()

  // Function for navigating to Home page
  const navigateToListBusiness = () => {
    navigate('/listBusiness')
  }

  //Form 1099K List endpoint
  const listForm1099K = async () => {
    try {
      setLoading(true)
      const listForm1099KResponse = await axios.get(`${process.env.REACT_APP_TBS_BACKEND_URL}/form1099K/List/${businessId}`)

      if (listForm1099KResponse?.data?.StatusCode === 200) {
        setNoListFound(false)
        setBusinessData({
          ...businessData,
          BusinessName: listForm1099KResponse?.data?.Form1099Records[0]?.BusinessNm,
          EINOrSSN: listForm1099KResponse?.data?.Form1099Records[0]?.EINorSSN,
          IsEIN: listForm1099KResponse?.data?.Form1099Records[0]?.IsEIN
        })
        setform1099KList(listForm1099KResponse?.data?.Form1099Records)
      }
      setLoading(false)
    } catch (e) {
      setform1099KList([])
      setNoListFound(true)
      setLoading(false)
    }

  }

  //Form 1099K Status endpoint
  const viewStatus = async (SubmissionId, RecordIds) => {
    try {
      setLoading(true)
      const getStatusResponse = await axios.get(`${process.env.REACT_APP_TBS_BACKEND_URL}/form1099K/Status?SubmissionId=${SubmissionId}&RecordIds=${RecordIds}`)
      setStatusData(getStatusResponse?.data)

      //Modal to show the Success or Failure Response from the form1099K/Status Endpoint.
      let statusModal = new bootstrap.Modal(document.getElementById('statusModal'))
      statusModal.show()
      setLoading(false)
    } catch (e) {
      setLoading(false)
    }
  }

  //Form 1099K Delete endpoint
  const deleteForm = async (SubmissionId, RecordId) => {
    try {
      setLoading(true)
      const deleteForm1099KResponse = await axios.delete(`${process.env.REACT_APP_TBS_BACKEND_URL}/form1099K/Delete?SubmissionId=${SubmissionId}&RecordId=${RecordId}`)
      setDeleteData(deleteForm1099KResponse?.data)
      //Modal to show the Success or Failure Response from the form1099K/Delete Endpoint.
      let deleteSuccessModal = new bootstrap.Modal(document.getElementById('deleteModal'))
      deleteSuccessModal.show()
      await listForm1099K()
      setLoading(false)
    } catch (e) {
      setLoading(true)
      setDeleteData(e?.response?.data?.Form1099Records)
      //Modal to show the Success or Failure Response from the form1099K/Delete Endpoint.
      let deleteErrorModal = new bootstrap.Modal(document.getElementById('deleteModal'))
      deleteErrorModal.show()
      setLoading(false)
    }
  }

  //Form 1099K RequestDraftPdfUrl endpoint
  const requestDraftPdfUrl = async (RecordId) => {
    try {
      setLoading(true)
      const requestDraftPdfData = {
        TaxYear: null,
        RecordId: RecordId,
        Business: null,
        Recipient: null
      }
      const requestDraftPdfUrlResponse = await axios.post(`${process.env.REACT_APP_TBS_BACKEND_URL}/form1099K/RequestDraftPdfUrl`, requestDraftPdfData)
      setLoading(false)
      const url = requestDraftPdfUrlResponse.data.DraftPdfUrl
      if (url != null) {
        setLoading(true)
        const decryptPdfResponse = await axios(`${process.env.REACT_APP_TBS_BACKEND_URL}/form1099K/decryptPdf`, {
          method: 'post',
          responseType: 'blob',
          data: {
            urlLink: url
          }
        },
        )
        const pdfData = await decryptPdfResponse.data

        const file = new Blob(
          [pdfData],
          { type: 'application/pdf' })

        const fileURL = URL.createObjectURL(file)
        setReviewPdfData(fileURL)
        setPdfHeader('Request Draft Pdf Preview')

        //Modal to show the pdf from the form1099K/decrypt Endpoint.
        let draftPdfSuccessModal = new bootstrap.Modal(document.getElementById('review'))
        draftPdfSuccessModal.show()

        setLoading(false)
      } else {
        setDraftpdfErrorData(requestDraftPdfUrl?.data)
      }

      setLoading(false)
    } catch (e) {
      setLoading(true)
      setDraftpdfErrorData(e?.response?.data)
      //Modal to show the Success or Failure Response from the form1099K/RequestDraftPdfUrl Endpoint.
      let draftpdfErrorModal = new bootstrap.Modal(document.getElementById('draftpdfErrorModal'))
      draftpdfErrorModal.show()
      setLoading(false)
    }
  }

  //Form 1099K RequestPdfUrl endpoint
  const requestPdfUrl = async (SubmissionId, RecordId) => {
    try {
      setLoading(true)
      const requestPdfData = {
        SubmissionId: SubmissionId,
        RecordIds: [
          {
            RecordId: RecordId
          }
        ],
        Customization: {
          TINMaskType: "Masked"
        }
      }
      const requestFormPdfUrlResponse = await axios.post(`${process.env.REACT_APP_TBS_BACKEND_URL}/form1099K/RequestPdfURLs`, requestPdfData)
      setViewPdfUrlData(requestFormPdfUrlResponse?.data)
      //Modal to show the Response from the form1099K/RequestPdfUrl Endpoint.
      let requestpdfSuccessModal = new bootstrap.Offcanvas(document.getElementById('viewPdfModal'))
      requestpdfSuccessModal.show()
      setLoading(false)
    } catch (e) {
      setLoading(true)
      setPdfErrorData(e?.response?.data)
      //Modal to show the Success or Failure Response from the form1099K/RequestPdfUrl Endpoint.
      let requestpdferrorModal = new bootstrap.Modal(document.getElementById('requestpdferrorModal'))
      requestpdferrorModal.show()
      setLoading(false)
    }
  }

  //Form 1099K Transmit endpoint
  const transmitForm = async (SubmissionId, RecordId) => {
    try {
      setLoading(true)
      const transmitData = {
        SubmissionId: SubmissionId,
        RecordIds: [
          RecordId
        ]
      }
      const transmitFormResponse = await axios.post(`${process.env.REACT_APP_TBS_BACKEND_URL}/form1099K/Transmit`, transmitData)
      setTransmitSuccess(transmitFormResponse?.data)
      setTransmitError(null)
      //Modal to show the Success or Failure Response from the form1099K/Transmit Endpoint.
      let transmitSuccessModal = new bootstrap.Modal(document.getElementById('transmitModal'))
      transmitSuccessModal.show()
      setLoading(false)
    } catch (e) {
      setLoading(true)
      setTransmitSuccess(null)
      setTransmitError(e?.response?.data)
      //Modal to show the Success or Failure Response from the form1099K/Transmit Endpoint.
      let transmitErrorModal = new bootstrap.Modal(document.getElementById('transmitModal'))
      transmitErrorModal.show()
      setLoading(false)
    }
  }

  return (
    <>
      <div className="header text-center mb-3">
        <img src={logo} alt="tbsLogo" />
      </div>

      {/*Checks loader state and displays spinner component*/}
      {loading &&
        <div className='mt-3'>
          <Spinner />
        </div>
      }

      {/*Checks no list found state and displays create business button*/}
      {noListFound && (
        <>
          <div className='container mx-auto mt-5'>
            <div className="text-center">
              <p>There are no 1099-K forms created under the business {businessName}. Click "Create Form1099-K" to create a new Form 1099-K.</p>
              <Link className='btn btn_primary btn_md' to={`/createForm1099K/${businessId}`}>Create Form1099-K</Link>
            </div>
            <div className='text-start'>
              <button className='btn btn_back mb-3' onClick={navigateToListBusiness}>Back</button>
            </div>
          </div>
        </>)
      }

      <div className="container">
        <div className="text-center mb-3">
          {/*Checks business list length and displays list business*/}
          {form1099KList.length > 0 && (
            <>
              <div className="d-flex align-items-center fs-20 text-dark">
                <h1 className='head-1 mt-3 me-3'>{businessData.BusinessName}</h1><span className="text-muted fs-14 mt-2"> ( {businessData.IsEIN === false ? 'SSN' : 'EIN'} : {businessData.EINOrSSN} )</span>
              </div>

              <div className="response-table p-1">
                <div className='d-flex align-items-center justify-content-between'>
                  <div>
                    <h1 className='head-1'>List form1099K</h1>
                    <div className="heading-bottom-line position-relative pb-0  mb-3"></div>
                  </div>
                </div>
                <table className="table table-striped mt-2 table-bordered">
                  <thead>

                    <th>SubmissionId</th>
                    <th>RecordId</th>
                    <th>RecipientId</th>
                    <th>Recipient Name</th>
                    <th>Actions</th>

                  </thead>
                  <tbody>
                    {form1099KList.map((form1099K, i) => {
                      return (

                        <tr key={i}>
                          <td className='text-start'>{form1099K?.SubmissionId}</td>
                          <td className='text-start'>{form1099K?.Recipient?.RecordId}</td>
                          <td className='text-start'>{form1099K?.Recipient?.RecipientId}</td>
                          <td className='text-start'>{form1099K?.Recipient?.RecipientNm == null ? form1099K?.Recipient?.FirstNm : form1099K?.Recipient?.RecipientNm }</td>
                          <td className='text-center'>

                            <div
                              className="dropdown dropdown-scroll action d-md-flex justify-content-between align-items-center px-4">
                              <Link className='btn btn-primary status-btn btn_smm'
                                to={`/Update/${form1099K?.SubmissionId}/${form1099K?.Recipient?.RecordId}`}>
                                <FaEdit />
                              </Link>
                              <button type="button"
                                className="btn-rounded-hover rounded-circle p-2 lh-1 border-0"
                                data-bs-toggle="dropdown" aria-expanded="false"><i
                                  className="mdi mdi-dots-vertical text-muted fs-4"></i>
                              </button>
                              <ul className="dropdown-menu">
                                <li><button className="dropdown-item text-dark" onClick={() => { viewStatus(form1099K?.SubmissionId, form1099K?.Recipient?.RecordId) }}
                                >View Status</button></li>
                                <li><button className="dropdown-item text-dark" onClick={() => { requestDraftPdfUrl(form1099K?.Recipient?.RecordId) }}
                                >Request Draft Pdf Url</button></li>
                                <li><button className="dropdown-item text-dark" onClick={() => { requestPdfUrl(form1099K?.SubmissionId, form1099K?.Recipient?.RecordId) }}
                                >Request Pdf Url</button></li>
                                <li><button className="dropdown-item text-dark" onClick={() => { transmitForm(form1099K?.SubmissionId, form1099K?.Recipient?.RecordId) }}
                                >Transmit</button></li>
                                <li><button className="dropdown-item text-dark" onClick={() => { deleteForm(form1099K?.SubmissionId, form1099K?.Recipient?.RecordId) }}
                                >Delete</button></li>

                              </ul>
                            </div>

                          </td>

                        </tr>
                      )
                    })}
                  </tbody>
                </table>
                <div className='text-start'>
                  <button className='btn btn_back mb-3' onClick={navigateToListBusiness}>Back</button>
                </div>
              </div>

            </>
          )}

        </div>
      </div>
      <StatusModal
        statusData={statusData} //Status Modal for k
      />
      <DeleteModal
        deleteData={deleteData}
      />
      <TransmitModal
        transmitSuccess={transmitSuccess}
        transmitError={transmitError}
      />
      <ReviewModal
        reviewPdfData={reviewPdfData}
        pdfHeader={pdfHeader}
      />
      <ViewPdfUrlModal
        viewPdfUrlData={viewPdfUrlData}
        setReviewPdfData={setReviewPdfData}
        setPdfHeader={setPdfHeader}
        pdfHeader={pdfHeader}
        reviewPdfData={reviewPdfData}
      />
      <RequestDraftPdfErrorModal
        draftpdfErrorData={draftpdfErrorData}
      />
      <RequestPdfErrorModal
        pdfErrorData={pdfErrorData}
      />
    </>
  )
}

export default ListForm1099k