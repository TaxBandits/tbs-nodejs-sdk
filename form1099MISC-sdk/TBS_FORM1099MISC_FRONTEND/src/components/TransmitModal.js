import React from 'react'

const TransmitModal = ({ transmitSuccess, transmitError }) => {

  return (

    <>
      <div class="modal fade" id="transmitModal" aria-hidden="true" aria-labelledby="deleteModal" tabindex="-1" >
        <div class="modal-dialog modal-dialog-centered modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalToggleLabel">Transmit Response</h5>
              <button type="button" class="btn-close bg-white rounded-circle border-0 fw-bold position-absolute end-n-10 top-n-13 modal-close button-hide fs-18 fw-500" data-bs-dismiss="modal" aria-label="Close">X</button>
            </div>
            {transmitSuccess !== null ?
              <>
                <div className="modal-body">
                  <h2 className="tabel-sub-head">Success Records</h2>

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
                            {transmitSuccess?.StatusCode}
                          </td>
                          <td class="text-center align-top">
                            {transmitSuccess?.StatusName}
                          </td>
                          <td class="text-center border-radious-bottom-right align-top text-success">
                            {transmitSuccess?.StatusMessage}
                          </td>
                        </tr>

                      </tbody>
                    </table>
                  </div>
                  <h2 class="tabel-sub-head">Transmit Records</h2>
                  <div class="table-container mb-3">
                    <table>
                      <tbody>
                        <tr class="fw-600 ">
                          <th class="text-center fw-600">SequenceId</th>
                          <th class="text-center">RecordId</th>
                          <th class="text-center">Status</th>
                          <th class="text-center">StatusTs</th>
                        </tr>

                        <tr>
                          <td class="text-center align-top">
                            {transmitSuccess?.Form1099Records?.SuccessRecords[0]?.SequenceId}
                          </td>
                          <td class="text-center align-top">
                            {transmitSuccess?.Form1099Records?.SuccessRecords[0]?.RecordId}
                          </td>
                          <td class="text-center border-radious-bottom-right align-top">
                            {transmitSuccess?.Form1099Records?.SuccessRecords[0]?.Status}
                          </td>
                          <td class="text-center border-radious-bottom-right align-top">
                            {transmitSuccess?.Form1099Records?.SuccessRecords[0]?.StatusTs}
                          </td>
                        </tr>

                      </tbody>
                    </table>
                  </div>


                </div>
              </> :
              <>
                <div className="modal-body">
                  <h2 className="tabel-sub-head">Error Records</h2>

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
                            {transmitError?.StatusCode}
                          </td>
                          <td class="text-center align-top">
                            {transmitError?.StatusName}
                          </td>
                          <td class="text-center border-radious-bottom-right align-top text-danger">
                            {transmitError?.StatusMessage}
                          </td>
                        </tr>

                      </tbody>
                    </table>
                  </div>
                  <h2 class="tabel-sub-head">Transmit Records</h2>
                  <div class="table-container mb-3">
                    <table>
                      <tbody>
                        <tr class="fw-600 ">
                          <th class="text-center fw-600">Id</th>
                          <th class="text-center">Name</th>
                          <th class="text-center">Message</th>
                        </tr>

                        <tr>
                          <td class="text-center align-top">
                            {transmitError?.Errors[0]?.Id}
                          </td>
                          <td class="text-center align-top">
                            {transmitError?.Errors[0]?.Name}
                          </td>
                          <td class="text-center border-radious-bottom-right align-top">
                            {transmitError?.Errors[0]?.Message}
                          </td>
                        </tr>

                      </tbody>
                    </table>
                  </div>


                </div>
              </>}
          </div>
        </div>
      </div>
    </>
  )
}

export default TransmitModal