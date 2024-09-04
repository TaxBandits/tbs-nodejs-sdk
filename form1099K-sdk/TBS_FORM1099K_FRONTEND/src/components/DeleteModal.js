import React from 'react'

const DeleteModal = (deleteData) => {

  return (

    <>
      <div class="modal fade" id="deleteModal" aria-hidden="true" aria-labelledby="deleteModal" tabindex="-1" >
        <div class="modal-dialog modal-dialog-centered modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalToggleLabel">Form1099k Response</h5>
              <button type="button" class="btn-close bg-white rounded-circle border-0 fw-bold position-absolute end-n-10 top-n-13 modal-close button-hide fs-18 fw-500" data-bs-dismiss="modal" aria-label="Close">X</button>
            </div>
            <div class="modal-body">

              {deleteData?.deleteData?.ErrorRecords?.length > 0 ?
                <>
                  <h2 class="tabel-sub-head">Delete Records</h2>
                  <div class="table-container mb-3">
                    <table>
                      <tbody>
                        <tr class="fw-600 ">
                          <th class="text-center fw-600" width="30%">Id</th>
                          <th class="text-center" width="35%">Name</th>
                          <th class="text-center" width="35%">Message</th>
                        </tr>

                        <tr>
                          <td class="text-center align-top">
                            {deleteData?.deleteData?.ErrorRecords[0]?.Errors[0]?.Id}
                          </td>
                          <td class="text-center align-top">
                            {deleteData?.deleteData?.ErrorRecords[0]?.Errors[0]?.Name}
                          </td>
                          <td class="text-center border-radious-bottom-right align-top">
                            {deleteData?.deleteData?.ErrorRecords[0]?.Errors[0]?.Message}
                          </td>
                        </tr>

                      </tbody>
                    </table>
                  </div>

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
                            {deleteData?.deleteData?.StatusCode}
                          </td>
                          <td class="text-center align-top">
                            {deleteData?.deleteData?.StatusName}
                          </td>
                          <td class="text-center border-radious-bottom-right align-top text-success">
                            {deleteData?.deleteData?.StatusMessage}
                          </td>
                        </tr>

                      </tbody>
                    </table>
                  </div>
                  <h2 class="tabel-sub-head">Delete Records</h2>
                  <div class="table-container mb-3">
                    <table>
                      <tbody>
                        <tr class="fw-600 ">
                          <th class="text-center fw-600" width="30%">SequenceId</th>
                          <th class="text-center" width="35%">RecordId</th>
                          <th class="text-center" width="35%">Status</th>
                        </tr>

                        <tr>
                          <td class="text-center align-top">
                            {deleteData?.deleteData?.Form1099Records?.SuccessRecords[0]?.SequenceId}
                          </td>
                          <td class="text-center align-top">
                            {deleteData?.deleteData?.Form1099Records?.SuccessRecords[0]?.RecordId}
                          </td>
                          <td class="text-center border-radious-bottom-right align-top">
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