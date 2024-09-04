import React from "react";

const SuccessModal = (statusData) => {
  console.log("statusData", statusData);
  return (
    <>
      <div className="modal fade" id="statusModal" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalToggleLabel">
                Status Response
              </h5>
              <button type="button" className="btn-close bg-white rounded-circle border-0 fw-bold position-absolute end-n-10 top-n-13 modal-close button-hide fs-18 fw-500" data-bs-dismiss="modal" aria-label="Close">X</button>
            </div>
            <div className="modal-body">
              <div className="table-container mt-2 mb-2">
                <table>
                  <tbody>
                    <tr className="fw-600 ">
                      <th
                        className="text-center fw-600 bg-dull-blue"
                        width="25%"
                      >
                        Status Code
                      </th>
                      <th className="text-center" width="30%">
                        Status Name
                      </th>
                      <th className="text-center" width="35%">
                        Status Message
                      </th>
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
              <div className="d-flex justify-content-between align-items-center p-3">
                <div>
                  <div className="form-label fw-500 text-muted mb-0">
                    Business Id
                  </div>
                  <div className=" text-dark fw-600 mb-3">
                    {statusData?.statusData?.BusinessId}
                  </div>
                </div>
                <div>
                  <div className="form-label fw-500 text-muted mb-0">
                    Submission Id
                  </div>
                  <div className=" text-dark fw-600 mb-3">
                    {statusData?.statusData?.SubmissionId}
                  </div>
                </div>
                <div>
                  <div className="form-label fw-500 text-muted mb-0">
                    Payer Ref
                  </div>
                  <div className="text-dark fw-600 text-center mb-3">
                    {statusData?.statusData?.PayerRef === null
                      ? "-"
                      : statusData?.statusData?.PayerRef}
                  </div>
                </div>
              </div>

              <div className="border border-1 rounded-4px">
                <div className="d-flex justify-content-between align-items-center px-2 rounded-4px bg-grey">
                  <div className="fs-6 p-1 fw-bold">Success Records </div>
                </div>
                <div className="d-flex justify-content-between align-items-center p-3  border-bottom-1">
                  <div>
                    <div className="form-label fw-500 text-muted mb-0">
                      SequenceId
                    </div>
                    <div className=" text-dark fw-600">
                      {
                        statusData?.statusData?.Form1099Records
                          ?.SuccessRecords[0]?.SequenceId
                      }
                    </div>
                  </div>
                  <div>
                    <div className="form-label fw-500 text-muted mb-0">
                      RecipientId
                    </div>
                    <div className=" text-dark fw-600">
                      {
                        statusData?.statusData?.Form1099Records
                          ?.SuccessRecords[0]?.RecipientId
                      }
                    </div>
                  </div>
                  <div>
                    <div className="fs-6 fw-500 text-muted mb-0">RecordId</div>
                    <div className="text-dark fw-600 text-center">
                      {
                        statusData?.statusData?.Form1099Records
                          ?.SuccessRecords[0]?.RecordId
                      }
                    </div>
                  </div>
                </div>
                {statusData?.statusData?.Form1099Records?.SuccessRecords[0]
                  ?.FederalReturn !== null ? (
                  <>
                    <div class="mb-3 border-top px-4">
                      <div class="fs-5 mt-2 mb-2">Federal Return</div>
                      <div class="pb-2 row">
                        <div class="col-4">
                          <div class="form-label fw-500 text-muted  mb-0">
                            Status
                          </div>
                          <div class="fw-bold text-dark">
                            {
                              statusData?.statusData?.Form1099Records
                                ?.SuccessRecords[0]?.FederalReturn?.Status
                            }
                          </div>
                        </div>
                        <div class="col-4">
                          <div class="form-label fw-500 text-muted mb-0">
                            StatusTs
                          </div>
                          <div class="fw-bold text-dark">
                            {
                              statusData?.statusData?.Form1099Records
                                ?.SuccessRecords[0]?.FederalReturn?.StatusTs
                            }
                          </div>
                        </div>
                        <div class="col-4">
                          <div class="d-flex">
                            <div class="pe-3">
                              <div class="form-label fw-500 text-muted  mb-0">
                                Info
                              </div>
                              <div class="fw-bold text-dark">
                                {statusData?.statusData?.Form1099Records
                                  ?.SuccessRecords[0]?.FederalReturn?.Info ===
                                  null
                                  ? "-"
                                  : statusData?.statusData?.Form1099Records
                                    ?.SuccessRecords[0]?.FederalReturn?.Info}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}

                {statusData?.statusData?.Form1099Records?.SuccessRecords[0]
                  ?.PostalResponse !== null ? (
                  <>
                    <div class="mb-3 border-top px-4">
                      <div class="fs-5 mt-2 mb-2">Postal Mailing</div>
                      <div class="pb-2 row">
                        <div class="col-4">
                          <div class="form-label fw-500 text-muted  mb-0">
                            Status
                          </div>
                          <div class="fw-bold text-dark">
                            {
                              statusData?.statusData?.Form1099Records
                                ?.SuccessRecords[0]?.PostalResponse?.Status
                            }
                          </div>
                        </div>
                        <div class="col-4">
                          <div class="form-label fw-500 text-muted mb-0">
                            StatusTs
                          </div>
                          <div class="fw-bold text-dark">
                            {
                              statusData?.statusData?.Form1099Records
                                ?.SuccessRecords[0]?.PostalResponse?.StatusTs
                            }
                          </div>
                        </div>
                        <div class="col-4">
                          <div class="d-flex">
                            <div class="pe-3">
                              <div class="form-label fw-500 text-muted  mb-0">
                                Info
                              </div>
                              <div class="fw-bold text-dark">
                                {statusData?.statusData?.Form1099Records
                                  ?.SuccessRecords[0]?.PostalResponse?.Info ===
                                  null
                                  ? "-"
                                  : statusData?.statusData?.Form1099Records
                                    ?.SuccessRecords[0]?.PostalResponse?.Info}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                {statusData?.statusData?.Form1099Records?.SuccessRecords[0]
                  ?.OnlineAccess !== null ? (
                  <>
                    <div class="mb-3 border-top px-4">
                      <div class="fs-5 mt-2 mb-2">Online Access</div>
                      <div class="pb-2 row">
                        <div class="col-4">
                          <div class="form-label fw-500 text-muted  mb-0">
                            Status
                          </div>
                          <div class="fw-bold text-dark">
                            {
                              statusData?.statusData?.Form1099Records
                                ?.SuccessRecords[0]?.OnlineAccess?.Status
                            }
                          </div>
                        </div>
                        <div class="col-4">
                          <div class="form-label fw-500 text-muted mb-0">
                            Email
                          </div>
                          <div class="fw-bold text-dark">
                            {
                              statusData?.statusData?.Form1099Records
                                ?.SuccessRecords[0]?.OnlineAccess?.Email
                            }
                          </div>
                        </div>
                        <div class="col-4">
                          <div class="d-flex">
                            <div class="pe-3">
                              <div class="form-label fw-500 text-muted  mb-0">
                                Info
                              </div>
                              <div class="fw-bold text-dark">
                                {
                                  statusData?.statusData?.Form1099Records
                                    ?.SuccessRecords[0]?.OnlineAccess?.Info
                                }
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuccessModal;