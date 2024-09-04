import React from 'react'

//Modal to show success and error records from Delete Form1099-NEC Endpoint
const DeleteModal = (deleteData) => {

  return (
    <>
      <div className="modal fade" id="deleteModal" aria-hidden="true" aria-labelledby="deleteModal" tabindex="-1" >
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalToggleLabel">Response / Status</h5>
              <button type="button" className="btn-close bg-white rounded-circle border-0 fw-bold position-absolute end-n-10 top-n-13 modal-close button-hide fs-18 fw-500" data-bs-dismiss="modal" aria-label="Close">X</button>
            </div>
            <div className="modal-body">

              {deleteData?.deleteData?.ErrorRecords?.length > 0 ?
                <>
                  <h2 className="tabel-sub-head">Delete Records</h2>
                  <div className="table-container mb-3">
                    <table>
                      <tbody>
                        <tr className="fw-600 ">
                          <th className="text-center fw-600" width="30%">Id</th>
                          <th className="text-center" width="35%">Name</th>
                          <th className="text-center" width="35%">Message</th>
                        </tr>
                        <tr>
                          <td className="text-center align-top">
                            {deleteData?.deleteData?.ErrorRecords[0]?.Errors[0]?.Id}
                          </td>
                          <td className="text-center align-top">
                            {deleteData?.deleteData?.ErrorRecords[0]?.Errors[0]?.Name}
                          </td>
                          <td className="text-center border-radious-bottom-right align-top">
                            {deleteData?.deleteData?.ErrorRecords[0]?.Errors[0]?.Message}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
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
                            {deleteData?.deleteData?.StatusCode}
                          </td>
                          <td className="text-center align-top">
                            {deleteData?.deleteData?.StatusName}
                          </td>
                          <td className="text-center border-radious-bottom-right align-top text-success">
                            {deleteData?.deleteData?.StatusMessage}
                          </td>
                        </tr>

                      </tbody>
                    </table>
                  </div>
                  <h2 className="tabel-sub-head">Delete Records</h2>
                  <div className="table-container mb-3">
                    <table>
                      <tbody>
                        <tr className="fw-600 ">
                          <th className="text-center fw-600" width="30%">SequenceId</th>
                          <th className="text-center" width="35%">RecordId</th>
                          <th className="text-center" width="35%">Status</th>
                        </tr>

                        <tr>
                          <td className="text-center align-top">
                            {deleteData?.deleteData?.Form1099Records?.SuccessRecords[0]?.SequenceId}
                          </td>
                          <td className="text-center align-top">
                            {deleteData?.deleteData?.Form1099Records?.SuccessRecords[0]?.RecordId}
                          </td>
                          <td className="text-center border-radious-bottom-right align-top">
                            {deleteData?.deleteData?.Form1099Records?.SuccessRecords[0]?.Status}
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

export default DeleteModal