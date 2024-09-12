import React from 'react'
import { useNavigate } from 'react-router-dom'

//Modal to show success records from Validate Form, Create and Update Form1099-NEC Endpoint
const SuccessModal = ({ successData, businessData, status }) => {

  //To navigate between pages using useNavigate Hook
  const navigate = useNavigate()

  //Navigating to List Form1099NEC Page
  const name = businessData?.BusinessName == null ? businessData?.FirstNm : businessData?.BusinessName
  const navigateToList = () => {
    navigate(`/listForm1099NEC/${businessData?.BusinessId}/${name}`)
  }

  return (
    <>
      <div className="modal fade" id="successModalToggle" aria-hidden="true" aria-labelledby="successModalToggleLabel" tabindex="-1" >
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalToggleLabel">Response / Status</h5>
              {status === 'validateForm' ?
                <button type="button" className="btn-close bg-white rounded-circle border-0 fw-bold position-absolute end-n-10 top-n-13 modal-close button-hide fs-18 fw-500" data-bs-dismiss="modal" aria-label="Close">X</button>
                :
                <button type="button" className="btn-close bg-white rounded-circle border-0 fw-bold position-absolute end-n-10 top-n-13 modal-close button-hide fs-18 fw-500" onClick={navigateToList} data-bs-dismiss="modal" aria-label="Close">X</button>
              }
            </div>
            <div className="modal-body">
              {successData.BusinessId ?
                <>
                  <div className="table-container mt-2 mb-4">
                    <table>
                      <tbody>
                        <tr className="fw-600 ">
                          <th className="text-center fw-600 bg-dull-blue" width="25%">Status Code</th>
                          <th className="text-center" width="30%">Status Name</th>
                          <th className="text-center" width="35%">Status Message</th>
                        </tr>
                        <tr>
                          <td className="text-center align-top">
                            {successData?.StatusCode}
                          </td>
                          <td className="text-center align-top">
                            {successData?.StatusName}
                          </td>
                          <td className="text-center border-radious-bottom-right align-top text-success">
                            {successData?.StatusMessage}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <h2 className="tabel-sub-head">Success Records</h2>
                  <div className="table-container mb-3">
                    <table>
                      <tbody>
                        <tr className="fw-600 ">
                          <th className="text-center fw-600" width="30%">BusinessId</th>
                          <th className="text-center" width="35%">SubmissionId</th>
                          <th className="text-center" width="35%">RecordId</th>
                        </tr>
                        <tr>
                          <td className="taL">
                            {successData?.BusinessId}
                          </td>
                          <td className="taL">
                            {successData?.SubmissionId}
                          </td>
                          <td className="taL">
                            {successData?.Form1099Records?.SuccessRecords[0]?.RecordId}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  {successData?.Form1099Records?.SuccessRecords[0]?.OnlineAccess?.Status==="NOT_CREATED" &&
                     <div className="table-container mb-3">
                       <h2 className="tabel-sub-head">Online Access Response: (Warning)</h2>
                     <table>
                       <tbody>
                         <tr className="fw-600 ">
                           <th className="text-center fw-600" width="30%">Status</th>
                           <th className="text-center" width="35%">Email</th>
                           <th className="text-center" width="35%">Info</th>
                         </tr>
                         <tr>
                           <td className="taL text-center">
                             {successData?.Form1099Records?.SuccessRecords[0]?.OnlineAccess?.Status}
                           </td>
                           <td className="taL text-center">
                             {successData?.Form1099Records?.SuccessRecords[0]?.OnlineAccess?.Email==null?'---':successData?.Form1099Records?.SuccessRecords[0]?.OnlineAccess?.Email}
                           </td>
                           <td className="taL text-center">
                             {successData?.Form1099Records?.SuccessRecords[0]?.OnlineAccess?.Info}
                           </td>
                         </tr>
                       </tbody>
                     </table>
                   </div>
                  }
                  {successData?.Form1099Records?.SuccessRecords[0]?.Postal?.Status==="NOTCREATED" &&
                     <div className="table-container mb-3">
                       <h2 className="tabel-sub-head">Postal Response: (Warning)</h2>
                     <table>
                       <tbody>
                         <tr className="fw-600 ">
                           <th className="text-center fw-600" width="30%">Status</th>
                           <th className="text-center" width="35%">StatusTs</th>
                           <th className="text-center" width="35%">Info</th>
                         </tr>
                         <tr>
                           <td className="taL text-center">
                             {successData?.Form1099Records?.SuccessRecords[0]?.Postal?.Status}
                           </td>
                           <td className="taL text-center">
                             {successData?.Form1099Records?.SuccessRecords[0]?.Postal?.StatusTs=== null ? "---" :successData?.Form1099Records?.SuccessRecords[0]?.Postal?.StatusTs}
                           </td>
                           <td className="taL text-center">
                             {successData?.Form1099Records?.SuccessRecords[0]?.Postal?.Info}
                           </td>
                         </tr>
                       </tbody>
                     </table>
                   </div>
                  }
                </> :
                <>
                  <div className="table-container mt-2 mb-4">
                    <table>
                      <tbody>
                        <tr className="fw-600 ">
                          <th className="text-center fw-600 bg-dull-blue" width="25%">Status Code</th>
                          <th className="text-center" width="30%">Status Name</th>
                          <th className="text-center" width="35%">Status Message</th>
                        </tr>
                        <tr>
                          <td className="text-center align-top">
                            {successData?.StatusCode}
                          </td>
                          <td className="text-center align-top">
                            {successData?.StatusName}
                          </td>
                          <td className="text-center border-radious-bottom-right align-top text-success">
                            {successData?.StatusMessage}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                </>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SuccessModal