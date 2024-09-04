import React from 'react'

//Modal to show success records from Status Form1099-NEC Endpoint
const StatusModal = (statusData) => {

  return (
    <>
      <div className="modal fade" id="statusModal" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1" >
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalToggleLabel">Status Response</h5>
              <button type="button" className="btn-close bg-white rounded-circle border-0 fw-bold position-absolute end-n-10 top-n-13 modal-close button-hide fs-18 fw-500" data-bs-dismiss="modal" aria-label="Close">X</button>
            </div>
            <div className="modal-body">
              <div className="table-container mt-2 mb-2">
                <table>
                  <tbody>
                    <tr className="fw-600 ">
                      <th className="text-center fw-600 bg-dull-blue" width="25%">Status Code</th>
                      <th className="text-center" width="30%">Status Name</th>
                      <th className="text-center" width="35%">Status Message</th>
                    </tr>
                    <tr>
                      <td className="text-center align-top">
                        {statusData?.statusData?.StatusCode}
                      </td>
                      <td className="text-center align-top">
                        {statusData?.statusData?.StatusName}
                      </td>
                      <td className="text-center border-radious-bottom-right align-top text-success">
                        {statusData?.statusData?.StatusMessage}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className='d-flex justify-content-between align-items-center p-3'>
                <div >
                  <div className="form-label fw-500 text-muted mb-0">Business Id</div>
                  <div className=" text-dark fw-600 mb-3">{statusData?.statusData?.BusinessId}</div>
                </div>
                <div>
                  <div className="form-label fw-500 text-muted mb-0">Submission Id</div>
                  <div className=" text-dark fw-600 mb-3">{statusData?.statusData?.SubmissionId}</div>
                </div>
                <div>
                  <div className="form-label fw-500 text-muted mb-0">Payer Ref</div>
                  <div className="text-dark fw-600 mb-3">{statusData?.statusData?.PayerRef === null ? <span className='text-center'>-</span> : statusData?.statusData?.PayerRef}</div>
                </div>
              </div>
              <div className="border border-1 rounded-4px">
                <div className="d-flex justify-content-between align-items-center px-2 rounded-4px bg-grey">
                  <div className="fs-6 p-1 fw-bold">Success Records </div>
                </div>
                <div className='d-flex justify-content-between align-items-center p-3  border-bottom-1'>
                  <div >
                    <div className="form-label fw-500 text-muted mb-0">SequenceId</div>
                    <div className=" text-dark fw-600">{statusData?.statusData?.Form1099Records?.SuccessRecords[0]?.SequenceId}</div>
                  </div>
                  <div>
                    <div className="form-label fw-500 text-muted mb-0">RecipientId</div>
                    <div className=" text-dark fw-600">{statusData?.statusData?.Form1099Records?.SuccessRecords[0]?.RecipientId}</div>
                  </div>
                  <div>
                    <div className="fs-6 fw-500 text-muted mb-0">RecordId</div>
                    <div className="text-dark fw-600 text-center">{statusData?.statusData?.Form1099Records?.SuccessRecords[0]?.RecordId}</div>
                  </div>
                </div>
                {statusData?.statusData?.Form1099Records?.SuccessRecords[0]?.FederalReturn !== null ?
                  <>
                    <div className="mb-3 border-top px-4">
                      <div className="fs-5 mt-2 mb-2">Federal Return</div>
                      <div className="pb-2 row">
                        <div className="col-4">
                          <div className="form-label fw-500 text-muted  mb-0">Status</div>
                          <div className="fw-bold text-dark">{statusData?.statusData?.Form1099Records?.SuccessRecords[0]?.FederalReturn?.Status}</div>
                        </div>
                        <div className="col-4">
                          <div className="form-label fw-500 text-muted mb-0">StatusTs</div>
                          <div className="fw-bold text-dark">{statusData?.statusData?.Form1099Records?.SuccessRecords[0]?.FederalReturn?.StatusTs}</div>
                        </div>
                        <div className="col-4">
                          <div className="d-flex">
                            <div className="pe-3">
                              <div className="form-label fw-500 text-muted mb-0">Info</div>
                              <div className="fw-bold text-dark">{statusData?.statusData?.Form1099Records?.SuccessRecords[0]?.FederalReturn?.Info === null ? <span className='text-center'>-</span> : statusData?.statusData?.Form1099Records?.SuccessRecords[0]?.FederalReturn?.Info}</div>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </>
                  : <></>
                }
                {statusData?.statusData?.Form1099Records?.SuccessRecords[0]?.StateReturns !== null ?
                  <>
                    <div className="mb-3 border-top px-4">
                      <div className="fs-5 mt-2 mb-2">State Return</div>
                      <div className="table-container mt-2 mb-2">
                        <table>
                          <tbody>
                            <tr className="fw-600 ">
                              <th className="text-center fw-600 bg-dull-blue" width="25%">State Code</th>
                              <th className="text-center" width="30%">Status</th>
                              <th className="text-center" width="35%">Status Ts</th>
                            </tr>
                            {statusData?.statusData?.Form1099Records?.SuccessRecords[0]?.StateReturns.map((states) => {
                              return (
                                <tr>
                                  <td className="text-center">
                                    {states?.StateCd}
                                  </td>
                                  <td className="text-center">
                                    {states?.Status}
                                  </td>
                                  <td className="text-center">
                                    {states?.StatusTs === "" ? <span>-</span> : states?.StatusTs}
                                  </td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </> :
                  <></>}
                {statusData?.statusData?.Form1099Records?.SuccessRecords[0]?.Postal !== null ?
                  <>
                    <div className="mb-3 border-top px-4">
                      <div className="fs-5 mt-2 mb-2">Postal Mailing</div>
                      <div className="pb-2 row">
                        <div className="col-4">
                          <div className="form-label fw-500 text-muted  mb-0">Status</div>
                          <div className="fw-bold text-dark">{statusData?.statusData?.Form1099Records?.SuccessRecords[0]?.Postal?.Status}</div>
                        </div>
                        <div className="col-4">
                          <div className="form-label fw-500 text-muted mb-0">StatusTs</div>
                          <div className="fw-bold text-dark">{statusData?.statusData?.Form1099Records?.SuccessRecords[0]?.Postal?.StatusTs}</div>
                        </div>
                        <div className="col-4">
                          <div className="d-flex">
                            <div className="pe-3">
                              <div className="form-label fw-500 text-muted mb-0">Info</div>
                              <div className="fw-bold text-dark">{statusData?.statusData?.Form1099Records?.SuccessRecords[0]?.Postal?.Info === null ? <span className='text-center'>-</span> : statusData?.statusData?.Form1099Records?.SuccessRecords[0]?.Postal?.Info}</div>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </> :
                  <></>}
                {statusData?.statusData?.Form1099Records?.SuccessRecords[0]?.OnlineAccess !== null ?
                  <>
                    <div className="mb-3 border-top px-4">
                      <div className="fs-5 mt-2 mb-2">Online Access</div>
                      <div className="pb-2 row">
                        <div className="col-4">
                          <div className="form-label fw-500 text-muted  mb-0">Status</div>
                          <div className="fw-bold text-dark">{statusData?.statusData?.Form1099Records?.SuccessRecords[0]?.OnlineAccess?.Status}</div>
                        </div>
                        <div className="col-4">
                          <div className="form-label fw-500 text-muted mb-0">Email</div>
                          <div className="fw-bold text-dark">{statusData?.statusData?.Form1099Records?.SuccessRecords[0]?.OnlineAccess?.Email === null ? <span className='text-center'>-</span> : statusData?.statusData?.Form1099Records?.SuccessRecords[0]?.OnlineAccess?.Email}</div>
                        </div>
                        <div className="col-4">
                          <div className="d-flex">
                            <div className="pe-3">
                              <div className="form-label fw-500 text-muted mb-0">Info</div>
                              <div className="fw-bold text-dark">{statusData?.statusData?.Form1099Records?.SuccessRecords[0]?.OnlineAccess?.Info === null ? <span className='text-center'>-</span> : statusData?.statusData?.Form1099Records?.SuccessRecords[0]?.OnlineAccess?.Info}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </> :
                  <></>}
                {statusData?.statusData?.Form1099Records?.SuccessRecords[0]?.ScheduleFiling !== null ?
                  <>
                    <div className="mb-3 border-top px-4">
                      <div className="fs-5 mt-2 mb-2">Schedule Filing</div>
                      <div className="pb-2 row">
                        <div className="col-4">
                          <div className="form-label fw-500 text-muted  mb-0">ScheduledOn</div>
                          <div className="fw-bold text-dark">{statusData?.statusData?.Form1099Records?.SuccessRecords[0]?.ScheduleFiling?.ScheduledOn === null ? <span className='text-center'>-</span> : statusData?.statusData?.Form1099Records?.SuccessRecords[0]?.ScheduleFiling?.ScheduledOn}</div>
                        </div>
                        <div className="col-4">
                          <div className="form-label fw-500 text-muted mb-0">Info</div>
                          <div className="fw-bold text-dark">{statusData?.statusData?.Form1099Records?.SuccessRecords[0]?.ScheduleFiling?.Info === null ? <span className='text-center'>-</span> : statusData?.statusData?.Form1099Records?.SuccessRecords[0]?.ScheduleFiling?.Info}</div>
                        </div>
                      </div>
                    </div>
                  </> :
                  <></>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default StatusModal