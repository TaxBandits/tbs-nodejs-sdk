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
import ReviewModal from '../components/ReviewModal' //Importing Transmit Modal
import ViewPdfUrlModal from '../components/ViewPdfUrlModal' //Importing ViewPdfUrl Modal
import RequestDraftPdfErrorModal from '../components/RequestDraftPDFErrorModal' //Importing RequestDraftPdfUrl Error Modal
import RequestPdfErrorModal from '../components/RequestPdfErrorModal' //Importing RequestPdfUrl Error Modal

//List Form1099NEC page
const ListForm1099NEC = () => {

  // Calling get business list function in Use Effect
  useEffect(() => {
    getListForm1099NEC()
  }, [])

  const [noListFound, setNoListFound] = useState(false) // Initializing state for listing error response
  const [form1099NECList, setForm1099NECList] = useState([]) // Initializing state for business list
  const [loading, setLoading] = useState(false) // Initializing state for loading
  const [statusData, setStatusData] = useState([]) //Initializing state for status api response
  const [deleteData, setDeleteData] = useState([]) //Initializing state for delete api response
  const [transmitSuccess, setTransmitSuccess] = useState([]) //Initializing state for transmit api response
  const [transmitError, setTransmitError] = useState([]) //Initializing state for transmit api response
  const [reviewPdfData, setReviewPdfData] = useState([]) //Initializing state for pdf url data
  const [viewPdfUrlData, setViewPdfUrlData] = useState([]) //Initializing state for RequestPdfUrl Api response data
  const [draftpdfErrorData, setDraftpdfErrorData] = useState([]) //Initializing state for RequestDraftPdfUrl Api response error data
  const [pdfErrorData, setPdfErrorData] = useState([]) // Initializing state for RequestPdfUrl Api response error data
  const [pdfHeader, setPdfHeader] = useState('') //Initializing state for pdf preview modal header
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

  //Navigating to list business page
  const navigateToListBusiness = () => {
    navigate('/listBusiness')
  }

  // To list Form1099NEC by requesting list form1099NEC API
  const getListForm1099NEC = async () => {
    try {
      setLoading(true)
      const listForm1099NECResponse = await axios.get(`${process.env.REACT_APP_TBS_BACKEND_URL}/Form1099NEC/List/${businessId}`)
      if (listForm1099NECResponse?.data?.StatusCode === 200) {
        setNoListFound(false)
        setBusinessData({
          ...businessData,
          BusinessName: listForm1099NECResponse?.data?.Form1099Records[0]?.BusinessNm,
          EINOrSSN: listForm1099NECResponse?.data?.Form1099Records[0]?.EINorSSN,
          IsEIN: listForm1099NECResponse?.data?.Form1099Records[0]?.IsEIN
        })
        setForm1099NECList(listForm1099NECResponse?.data?.Form1099Records)
      }
      setLoading(false)
    } catch (e) {
      setForm1099NECList([])
      setNoListFound(true)
      setLoading(false)
    }
  }

  // Getting Form1099-NEC status by requesting Form1099NEC API Status method
  const viewStatus = async (SubmissionId, RecordIds) => {
    try {
      setLoading(true)
      const viewStatusResponse = await axios.get(`${process.env.REACT_APP_TBS_BACKEND_URL}/Form1099NEC/Status?SubmissionId=${SubmissionId}&RecordIds=${RecordIds}`)
      setStatusData(viewStatusResponse?.data)
      //Modal to show the Success or Failure Response from the Form1099NEC/Status Endpoint.
      let viewStatusModal = new bootstrap.Modal(document.getElementById('statusModal'))
      viewStatusModal.show()
      setLoading(false)
    } catch (e) {
      setLoading(false)
    }
  }

  //Generating Form1099-NEC Delete Request by requesting Form1099-NEC API Delete method
  const deleteForm = async (SubmissionId, RecordId) => {
    try {
      setLoading(true)
      const deleteFormResponse = await axios.delete(`${process.env.REACT_APP_TBS_BACKEND_URL}/Form1099NEC/Delete?SubmissionId=${SubmissionId}&RecordId=${RecordId}`)
      setDeleteData(deleteFormResponse?.data)
      //Modal to show the Success Response from the Form1099NEC/Delete Endpoint.
      let deleteFormSuccessModal = new bootstrap.Modal(document.getElementById('deleteModal'))
      deleteFormSuccessModal.show()
      await getListForm1099NEC()
      setLoading(false)
    } catch (e) {
      setLoading(true)
      setDeleteData(e?.response?.data?.Form1099Records)
      //Modal to show the Error Response from the Form1099NEC/Delete Endpoint.
      let deleteFormErrorModal = new bootstrap.Modal(document.getElementById('deleteModal'))
      deleteFormErrorModal.show()
      setLoading(false)
    }
  }

  //Generating Form1099-NEC RequestDraftPdfUrl Request by requesting Form1099-NEC API RequestDraftPdfUrl method
  const requestDraftPdfUrl = async (RecordId) => {
    try {
      setLoading(true)
      const requestDraftPdfData = {
        TaxYear: null,
        RecordId: RecordId,
        Business: null,
        Recipient: null
      }
      const requestDraftPdfUrlResponse = await axios.post(`${process.env.REACT_APP_TBS_BACKEND_URL}/Form1099NEC/RequestDraftPdfUrl`, requestDraftPdfData)
      setLoading(false)
      const url = requestDraftPdfUrlResponse?.data?.DraftPdfUrl
      if (url != null) {
        setLoading(true)
        // Decrypt pdf by requesting decryptPdf endpoint
        const decryptPdfResponse = await axios(`${process.env.REACT_APP_TBS_BACKEND_URL}/Form1099NEC/decryptPdf`, {
          method: 'post',
          responseType: 'blob',
          data: {
            urlLink: url
          }
        }
        )

        const pdfData = await decryptPdfResponse?.data

        const file = new Blob(
          [pdfData],
          { type: 'application/pdf' })

        const fileURL = URL.createObjectURL(file)
        setReviewPdfData(fileURL)
        setPdfHeader('Request Draft Pdf Preview')

        //Modal to show the pdf from the Form1099NEC/decrypt Endpoint.
        let requestDraftPdfUrlSuccessModal = new bootstrap.Modal(document.getElementById('review'))
        requestDraftPdfUrlSuccessModal.show()

        setLoading(false)
      } else {
        setDraftpdfErrorData(requestDraftPdfUrlResponse?.data)
      }

      setLoading(false)
    } catch (e) {
      setLoading(true)
      setDraftpdfErrorData(e?.response?.data)

      //Modal to show the Failure Response from the Form1099NEC/RequestDraftPdfUrl Endpoint.
      let requestDraftPdfUrlErrorModal = new bootstrap.Modal(document.getElementById('draftpdfErrorModal'))
      requestDraftPdfUrlErrorModal.show()
      setLoading(false)
    }
  }

  //Generating Form1099-NEC RequestPdfUrl Request by requesting Form1099-NEC API RequestPdfUrl method
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
      const requestPdfUrlResponse = await axios.post(`${process.env.REACT_APP_TBS_BACKEND_URL}/Form1099NEC/RequestPdfURLs`, requestPdfData)
      setViewPdfUrlData(requestPdfUrlResponse?.data)

      //Modal to show the Success Response from the Form1099NEC/RequestPdfUrl Endpoint.
      let requestPdfUrlSuccessModal = new bootstrap.Offcanvas(document.getElementById('viewPdfModal'))
      requestPdfUrlSuccessModal.show()
      setLoading(false)
    } catch (e) {
      setLoading(true)
      setPdfErrorData(e?.response?.data)

      //Modal to show the Failure Response from the Form1099NEC/RequestPdfUrl Endpoint.
      let requestPdfUrlErrorModal = new bootstrap.Modal(document.getElementById('requestpdferrorModal'))
      requestPdfUrlErrorModal.show()
      setLoading(false)
    }
  }

  //Generating Transmit Form1099-NEC Request by requesting Form1099-NEC API Transmit method
  const transmitForm = async (SubmissionId, RecordId) => {
    try {
      setLoading(true)
      const transmitData = {
        SubmissionId: SubmissionId,
        RecordIds: [
          RecordId
        ]
      }
      const transmitFormResponse = await axios.post(`${process.env.REACT_APP_TBS_BACKEND_URL}/Form1099NEC/Transmit`, transmitData)
      setTransmitSuccess(transmitFormResponse?.data)
      setTransmitError(null)

      //Modal to show the Success Response from the Form1099NEC/Transmit Endpoint.
      let transmitFormSuccessModal = new bootstrap.Modal(document.getElementById('transmitModal'))
      transmitFormSuccessModal.show()
      setLoading(false)
    } catch (e) {
      setLoading(true)
      setTransmitSuccess(null)
      setTransmitError(e?.response?.data)
      //Modal to show the Failure Response from the Form1099NEC/Transmit Endpoint.
      let transmitFormErrorModal = new bootstrap.Modal(document.getElementById('transmitModal'))
      transmitFormErrorModal.show()
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

      {/*Checks no list found state and displays create Form1099NEC button*/}
      {noListFound && (
        <>
          <div className='container mx-auto mt-5'>
            <div className="text-center">
              <p>There are no 1099-NEC forms created under the business {businessName}. Click "Create Form1099NEC" to create a new Form 1099-NEC.</p>
              <Link className='btn btn_primary btn_md' to={`/createForm1099NEC/${businessId}`}>Create Form1099NEC</Link>
            </div>
            <div className='text-start'>
              <button className='btn_back mb-3' onClick={navigateToListBusiness}>Back</button>
            </div>
          </div>
        </>)
      }

      <div className="container">
        <div className="text-center mb-3">
          {/*Checks Form1099NEC list length and displays list Form1099NEC*/}
          {form1099NECList?.length > 0 && (
            <>
              <div className="d-flex align-items-center fs-20 text-dark">
                <h1 className="head-1 mt-3 me-3">{businessData.BusinessName}</h1> <span className="text-muted fs-14 mt-2"> ( {!businessData.IsEIN ? 'SSN' : 'EIN'} : {businessData.EINOrSSN} )</span>
              </div>
              <div className="response-table p-3">
                <div className='d-flex align-items-center justify-content-between'>
                  <div >
                    <h1 className='head-1'>Form 1099-NECs</h1>
                    <div className="heading-bottom-line position-relative pb-0  mb-3"></div>
                  </div>
                </div>
                <table className="table table-striped mt-2 table-bordered">
                  <thead>
                    <tr>
                      <th>SubmissionId</th>
                      <th>RecordId</th>
                      <th>RecipientId</th>
                      <th>Recipient Name</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {form1099NECList?.map((form1099NEC, i) => {
                      return (
                        <tr>
                          <td className='taL'>{form1099NEC?.SubmissionId}</td>
                          <td className='taL'>{form1099NEC?.Recipient?.RecordId}</td>
                          <td className='taL'>{form1099NEC?.Recipient?.RecipientId}</td>
                          <td className='taL'>{form1099NEC?.Recipient?.RecipientNm === null ?form1099NEC?.Recipient?.FirstNm :form1099NEC?.Recipient?.RecipientNm }</td>
                          <td className='text-center'>
                            <div
                              className="dropdown dropdown-scroll action d-md-flex justify-content-between align-items-center px-4">
                              <Link className='btn btn-primary status-btn btn_smm' to={`/Update/${form1099NEC?.SubmissionId}/${form1099NEC?.Recipient?.RecordId}`}><FaEdit /></Link>
                              <button type="button"
                                className="btn-rounded-hover rounded-circle p-2 lh-1 border-0"
                                data-bs-toggle="dropdown" aria-expanded="false"><i
                                  className="mdi mdi-dots-vertical text-muted fs-4"></i>
                              </button>
                              <ul className="dropdown-menu">
                                <li><button className="dropdown-item text-dark" onClick={() => { viewStatus(form1099NEC?.SubmissionId, form1099NEC?.Recipient?.RecordId) }}
                                >View Status</button></li>
                                <li><button className="dropdown-item text-dark" onClick={() => { requestDraftPdfUrl(form1099NEC?.Recipient?.RecordId) }}
                                >Request Draft Pdf Url</button></li>
                                <li><button className="dropdown-item text-dark" onClick={() => { requestPdfUrl(form1099NEC?.SubmissionId, form1099NEC?.Recipient?.RecordId) }}
                                >Request Pdf Url</button></li>
                                <li><button className="dropdown-item text-dark" onClick={() => { transmitForm(form1099NEC?.SubmissionId, form1099NEC?.Recipient?.RecordId) }}
                                >Transmit</button></li>
                                <li><button className="dropdown-item text-dark" onClick={() => { deleteForm(form1099NEC?.SubmissionId, form1099NEC?.Recipient?.RecordId) }}
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
                  <button className='btn_back mb-3' onClick={navigateToListBusiness}>Back</button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <StatusModal
        statusData={statusData} //Status Method Response Modal for Form1099-NEC 
      />

      <DeleteModal
        deleteData={deleteData} //Delete Method Response Modal for Form1099-NEC 
      />

      <TransmitModal
        transmitSuccess={transmitSuccess} //Transmit Method Response Modal for Form1099-NEC 
        transmitError={transmitError}
      />

      <ReviewModal
        reviewPdfData={reviewPdfData} //Pdf Preview Modal for Form1099-NEC RequestDraftPdfUrl and RequestPdfUrl method
        pdfHeader={pdfHeader}
      />

      <ViewPdfUrlModal
        viewPdfUrlData={viewPdfUrlData} //RequestPdfUrl Method Success Response Modal for Form1099-NEC 
        setReviewPdfData={setReviewPdfData}
        setPdfHeader={setPdfHeader}
        pdfHeader={pdfHeader}
        reviewPdfData={reviewPdfData}
      />

      <RequestDraftPdfErrorModal
        draftpdfErrorData={draftpdfErrorData} //RequestDraftPdfUrl Method Error Response Modal for Form1099-NEC 
      />
      
      <RequestPdfErrorModal
        pdfErrorData={pdfErrorData} //RequestPdfUrl Method Error Response Modal for Form1099-NEC 
      />
    </>
  )
}

export default ListForm1099NEC