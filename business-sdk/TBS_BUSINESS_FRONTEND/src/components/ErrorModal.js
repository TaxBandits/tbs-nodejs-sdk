import React from 'react'

const ErrorModal = (errorData) => {

  return (
    <>
      <div className="modal fade" id="errorModal" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1" >
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalToggleLabel">Response / Status</h5>
              <button type="button" className="btn-close bg-white rounded-circle border-0 fw-bold position-absolute end-n-10 top-n-13 modal-close button-hide fs-18 fw-500" data-bs-dismiss="modal" aria-label="Close">X</button>
            </div>
            <div className="modal-body">
              <div className="table-container mt-2 mb-4">
                <table>
                  <tbody>
                    <tr className="fw-600 ">
                      <th className="text-center fw-600 bg-dull-blue" width="25%">Status Code</th>
                      <th className="text-center" width="30%">Status Name</th>
                      <th className="text-center" width="35%">Status Message</th>
                    </tr>
                    <tr key={errorData?.errorData?.statusCode}>
                      <td className="text-center align-top">
                        {errorData?.errorData?.statusCode}
                      </td>
                      <td className="text-center align-top">
                        {errorData?.errorData?.statusName}
                      </td>
                      <td className="text-center border-radious-bottom-right align-top text-danger">
                        {errorData?.errorData?.statusMessage}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {errorData?.errorData?.Errors !== "" ?
                <>
                  <h2 className="tabel-sub-head">Error Records</h2>
                  <div className="table-container mb-3">
                    <table>
                      <tbody>
                        <tr className="fw-600 ">
                          <th className="text-center fw-600">Id</th>
                          <th className="text-center">Name</th>
                          <th className="text-center">Message</th>
                          <th className="text-center">Type</th>
                        </tr>

                        {errorData?.errorData?.Errors?.map((error, index) => {
                          return (
                            <tr key={index}>
                              <td className="text-center align-top">
                                {error?.Id}
                              </td>
                              <td className="text-center align-top">
                                {error?.Name}
                              </td>
                              <td className="text-center border-radious-bottom-right align-top">
                                {error?.Message}
                              </td>
                              <td className="text-center border-radious-bottom-right align-top">
                                <span className="error-label">Error</span>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </> :
                <div>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ErrorModal
