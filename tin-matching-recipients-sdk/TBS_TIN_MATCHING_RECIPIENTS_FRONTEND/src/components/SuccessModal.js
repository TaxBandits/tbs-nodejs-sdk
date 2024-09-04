import React from 'react'

//TIN Matching Recipient - Request Endpoint - Success Modal
const SuccessModal = (successData) => {
  return (
    <>
      <div className="modal fade" id="successModal" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1" >
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalToggleLabel">TIN Matching Response</h5>
              <button type="button" className="btn-close bg-white rounded-circle border-0 fw-bold position-absolute end-n-10 top-n-13 modal-close button-hide fs-18 fw-500" data-bs-dismiss="modal" aria-label="Close">X</button>
            </div>
            <div className="modal-body">
              <div class="form-label fw-500 text-muted mb-0">Business Id</div>
              <div class=" text-dark fw-500 mb-3">{successData?.successData?.BusinessId}</div>
              <div class="border border-1 rounded">
                <div class="d-flex justify-content-between align-items-center px-3 rounded-top light-gray-bg">
                  <div class="fs-5 mb-1 fw-bold">Success Records </div>
                  <div class="px-0 me-2">
                  </div>
                </div>
                <div class="row pb-3 ps-4  ">
                  <div class="border-bottom row py-3">
                    <div class="col-6 ps-lg-4">
                      <div class="form-label fw-500 text-muted mb-0">Submission Id</div>
                      <div class=" text-dark fw-500">{successData?.successData?.SubmissionId}</div>
                    </div>
                  </div>
                </div>
                <table>
                  <tbody>
                    <tr className="fw-600 ">
                      <th className="text-center fw-600" width="30%">Sequence Id</th>
                      <th className="text-center" width="35%">Status</th>
                      <th className="text-center" width="35%">Record Id</th>
                    </tr>
                    {successData?.successData?.TINMatchingRecords?.SuccessRecords?.length &&

                      (successData?.successData?.TINMatchingRecords?.SuccessRecords?.map((data) => {
                        return (
                          <>
                            <tr>
                              <td className="taL">
                                {data?.SequenceId}
                              </td>
                              <td className="taL">
                                {data?.Status}
                              </td>
                              <td className="taL">
                                {data?.RecordId}
                              </td>
                            </tr>
                          </>
                        )
                      }))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SuccessModal
