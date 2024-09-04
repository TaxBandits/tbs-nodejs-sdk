import React from 'react'

//TIN Matching Recipient - Request Endpoint - Error Modal
const ErrorModal = (errorData) => {
  return (
    <>
      <div className="modal fade" id="errorModal" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1" >
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalToggleLabel">TIN Matching Response</h5>
              <button type="button" className="btn-close bg-white rounded-circle border-0 fw-bold position-absolute end-n-10 top-n-13 modal-close button-hide fs-18 fw-500" data-bs-dismiss="modal" aria-label="Close">X</button>
            </div>
            <div className="modal-body">
              <div className="table-container ">
                {errorData?.errorData?.length < 0 ?
                  <table>
                    <tbody>
                      <tr className="fw-600 ">
                        <th className="text-center fw-600 bg-dull-blue" width="25%">Business Id</th>
                      </tr>
                      <tr>
                        <td className="text-center align-top">
                          {errorData?.errorData?.BusinessId}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  :
                  <>
                  </>
                }
              </div>

              <h2 className="tabel-sub-head">Error Records</h2>
              <div className="table-container mb-3">

                {errorData?.errorData?.length > 0 ?

                  (errorData?.errorData?.map((errorRec) => {
                    return (
                      <>
                        {errorRec.SequenceId !== null ?
                          <div className="form-label fw-500 text-muted mt-2">Sequence Id : <span className="text-dark fw-500 mb-3">{errorRec.SequenceId}</span></div>
                          :
                          <div className='mt-2'></div>
                        }
                        <table>
                          <tbody>
                            <tr className="fw-600 ">
                              <th className="text-center fw-600" width="30%">Id</th>
                              <th className="text-center" width="35%">Name</th>
                              <th className="text-center" width="35%">Message</th>
                            </tr>
                            {errorRec?.Errors?.map((error) => {
                              return (
                                <>
                                  <tr>
                                    <td className="text-center align-top">
                                      {error?.Id}
                                    </td>
                                    <td className="text-center align-top">
                                      {error?.Name}
                                    </td>
                                    <td className="text-center border-radious-bottom-right align-top">
                                      {error?.Message}
                                    </td>
                                  </tr>
                                </>)
                            })}
                          </tbody>
                        </table>
                      </>
                    )

                  })) :
                  (errorData?.errorData?.map((error) => {
                    return (
                      <>
                        <table>
                          <tbody>
                            <tr className="fw-600 ">
                              <th className="text-center fw-600" width="30%">Id</th>
                              <th className="text-center" width="35%">Name</th>
                              <th className="text-center" width="35%">Message</th>
                            </tr>
                            <tr>
                              <td className="text-center align-top">
                                {error?.Id}
                              </td>
                              <td className="text-center align-top">
                                {error?.Name}
                              </td>
                              <td className="text-center border-radious-bottom-right align-top">
                                {error?.Message}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </>
                    )
                  }))
                }

              </div>
              <div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ErrorModal
