import React from 'react'

//Modal to show success and error records from Transmit Form1099-NEC Endpoint
const TransmitModal = ({ transmitSuccess, transmitError }) => {

  return (
    <>
      <div className="modal fade" id="transmitModal" aria-hidden="true" aria-labelledby="deleteModal" tabindex="-1" >
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalToggleLabel">Transmit Response</h5>
              <button type="button" className="btn-close bg-white rounded-circle border-0 fw-bold position-absolute end-n-10 top-n-13 modal-close button-hide fs-18 fw-500" data-bs-dismiss="modal" aria-label="Close">X</button>
            </div>
            {transmitSuccess !== null ?
              <>
                <div className="modal-body">
                  <h2 className="tabel-sub-head">Success Records</h2>
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
                            {transmitSuccess?.StatusCode}
                          </td>
                          <td className="text-center align-top">
                            {transmitSuccess?.StatusName}
                          </td>
                          <td className="text-center border-radious-bottom-right align-top text-success">
                            {transmitSuccess?.StatusMessage}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <h2 className="tabel-sub-head">Transmit Records</h2>
                  <div className="table-container mb-3">
                    <table>
                      <tbody>
                        <tr className="fw-600 ">
                          <th className="text-center fw-600">SequenceId</th>
                          <th className="text-center">RecordId</th>
                          <th className="text-center">Status</th>
                          <th className="text-center">StatusTs</th>
                        </tr>
                        <tr>
                          <td className="text-center align-top">
                            {transmitSuccess?.Form1099Records?.SuccessRecords[0]?.SequenceId}
                          </td>
                          <td className="text-center align-top">
                            {transmitSuccess?.Form1099Records?.SuccessRecords[0]?.RecordId}
                          </td>
                          <td className="text-center border-radious-bottom-right align-top">
                            {transmitSuccess?.Form1099Records?.SuccessRecords[0]?.Status}
                          </td>
                          <td className="text-center border-radious-bottom-right align-top">
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
                            {transmitError?.StatusCode}
                          </td>
                          <td className="text-center align-top">
                            {transmitError?.StatusName}
                          </td>
                          <td className="text-center border-radious-bottom-right align-top text-danger">
                            {transmitError?.StatusMessage}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <h2 className="tabel-sub-head">Transmit Records</h2>
                  <div className="table-container mb-3">
                    <table>
                      <tbody>
                        <tr className="fw-600 ">
                          <th className="text-center fw-600">Id</th>
                          <th className="text-center">Name</th>
                          <th className="text-center">Message</th>
                        </tr>
                        <tr>
                          <td className="text-center align-top">
                            {transmitError?.Errors[0]?.Id}
                          </td>
                          <td className="text-center align-top">
                            {transmitError?.Errors[0]?.Name}
                          </td>
                          <td className="text-center border-radious-bottom-right align-top">
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