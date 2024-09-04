import React from 'react'
import { useNavigate } from 'react-router-dom'

const SuccessModal = ({ successData, businessData, status }) => {

  const navigate = useNavigate()

  const navigateToList = () => {
    navigate(`/listForm1099MISC/${businessData?.BusinessId}`)
  }

  return (

    <>
      <div class="modal fade" id="successModalToggle" aria-hidden="true" aria-labelledby="successModalToggleLabel" tabindex="-1" >
        <div class="modal-dialog modal-dialog-centered modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalToggleLabel">Response / Status</h5>
              {status === 'validateForm' ?
                <button type="button" className="btn-close bg-white rounded-circle border-0 fw-bold position-absolute end-n-10 top-n-13 modal-close button-hide fs-18 fw-500" data-bs-dismiss="modal" aria-label="Close">X</button>
                :
                <button type="button" className="btn-close bg-white rounded-circle border-0 fw-bold position-absolute end-n-10 top-n-13 modal-close button-hide fs-18 fw-500" onClick={navigateToList} data-bs-dismiss="modal" aria-label="Close">X</button>
              }
            </div>
            <div class="modal-body">


              {successData.BusinessId ?
                <>
                  <div class="table-container mt-2 mb-4">
                    <table>
                      <tbody>

                        <tr class="fw-600 ">
                          <th class="text-center fw-600 bg-dull-blue" width="25%">Status Code</th>
                          <th class="text-center" width="30%">Status Name</th>
                          <th class="text-center" width="35%">Status Message</th>
                        </tr>

                        <tr>
                          <td class="text-center align-top">
                            {successData?.StatusCode}
                          </td>
                          <td class="text-center align-top">
                            {successData?.StatusName}
                          </td>
                          <td class="text-center border-radious-bottom-right align-top text-success">
                            {successData?.StatusMessage}
                          </td>
                        </tr>

                      </tbody>
                    </table>
                  </div>
                  <h2 class="tabel-sub-head">Success Records</h2>
                  <div class="table-container mb-3">
                    <table>
                      <tbody>
                        <tr class="fw-600 ">
                          <th class="text-center fw-600" width="30%">BusinessId</th>
                          <th class="text-center" width="35%">SubmissionId</th>
                          <th class="text-center" width="35%">RecordId</th>
                        </tr>

                        <tr>
                          <td class="taL">
                            {successData?.BusinessId}
                          </td>
                          <td class="taL">
                            {successData?.SubmissionId}
                          </td>
                          <td class="taL">
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
                             {successData?.Form1099Records?.SuccessRecords[0]?.OnlineAccess?.Email}
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
                  <div class="table-container mt-2 mb-4">
                    <table>
                      <tbody>

                        <tr class="fw-600 ">
                          <th class="text-center fw-600 bg-dull-blue" width="25%">Status Code</th>
                          <th class="text-center" width="30%">Status Name</th>
                          <th class="text-center" width="35%">Status Message</th>
                        </tr>

                        <tr>
                          <td class="text-center align-top">
                            {successData?.StatusCode}
                          </td>
                          <td class="text-center align-top">
                            {successData?.StatusName}
                          </td>
                          <td class="text-center border-radious-bottom-right align-top text-success">
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