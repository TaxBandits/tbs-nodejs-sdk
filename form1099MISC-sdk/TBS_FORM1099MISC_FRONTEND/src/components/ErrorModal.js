import React from 'react'

const ErrorModal = (errorData) => {

  return (
    <>
      <div class="modal fade" id="errorModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1" >
        <div class="modal-dialog modal-dialog-centered modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalToggleLabel">Response / Status</h5>
              <button type="button" class="btn-close bg-white rounded-circle border-0 fw-bold position-absolute end-n-10 top-n-13 modal-close button-hide fs-18 fw-500" data-bs-dismiss="modal" aria-label="Close">X</button>
            </div>
            <div class="modal-body">
              <div class="table-container mt-2 mb-4">
                <table>
                  <tbody>
               
                    <tr class="fw-600 ">
                      <th class="text-center fw-600 bg-dull-blue" width="25%">Status Code</th>
                      <th class="text-center" width="30%">Status Name</th>
                      <th class="text-center" width="35%">Status Message</th>
                    </tr>

                    <tr>
                      {console.log("errorData",errorData)}
                      <td class="text-center align-top">
                        {errorData?.errorData?.StatusCode}
                      </td>
                      <td class="text-center align-top">
                        {errorData?.errorData?.StatusName}
                      </td>
                      <td class="text-center border-radious-bottom-right align-top text-danger">
                        {errorData?.errorData?.StatusMessage}
                      </td>
                    </tr>

                  </tbody>
                </table>
              </div>

              <h2 class="tabel-sub-head">Error Records</h2>
              <div class="table-container mb-3">
                <table>
                  <tbody>
                    <tr class="fw-600 ">
                      <th class="text-center fw-600" width="30%">Id</th>
                      <th class="text-center" width="35%">Name</th>
                      <th class="text-center" width="35%">Message</th>
                      <th class="text-center" width="35%">Type</th>
                    </tr>
                    {console.log("errorData?.errorData?.Errors",errorData)}
                    {errorData?.errorData?.Errors !== null ? 
                    (errorData?.errorData?.Errors?.map(error => {
                      return (
                        <tr>
                          <td class="text-center align-top">
                            {error?.Id}
                          </td>
                          <td class="text-center align-top">
                            {error?.Name}
                          </td>
                          <td class="text-center border-radious-bottom-right align-top">
                            {error?.Message}
                          </td>
                          <td class="text-center border-radious-bottom-right align-top">
                            <span class="error-label">Error</span>
                          </td>
                        </tr>
                      )
                    })) :
                    errorData?.errorData?.ErrorRecords ?
                    (errorData?.errorData?.ErrorRecords[0]?.Errors.map(error => {
                      return (
                        <tr>
                        <td class="text-center align-top">
                          {error?.Id}
                        </td>
                        <td class="text-center align-top">
                          {error?.Name}
                        </td>
                        <td class="text-center border-radious-bottom-right align-top">
                          {error?.Message}
                        </td>
                        <td class="text-center border-radious-bottom-right align-top">
                          <span class="error-label">Error</span>
                        </td>
                      </tr>
                      )
                    }) ) :
                    (errorData?.errorData?.Form1099Records?.ErrorRecords[0]?.Errors.map(error => {
                      return (
                        <tr>
                        <td class="text-center align-top">
                          {error?.Id}
                        </td>
                        <td class="text-center align-top">
                          {error?.Name}
                        </td>
                        <td class="text-center border-radious-bottom-right align-top">
                          {error?.Message}
                        </td>
                        <td class="text-center border-radious-bottom-right align-top">
                          <span class="error-label">Error</span>
                        </td>
                      </tr>
                      )
                    }) )
                    }

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

export default ErrorModal