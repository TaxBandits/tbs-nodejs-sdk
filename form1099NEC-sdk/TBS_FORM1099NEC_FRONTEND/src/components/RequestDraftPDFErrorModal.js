import React from 'react'

//Modal to show error records from Request Draft Pdf Url Form1099-NEC Endpoint
const RequestDraftPDFErrorModal = (draftpdfErrorData) => {

  return (
    <>
      <div className="modal fade" id="draftpdfErrorModal" aria-hidden="true" aria-labelledby="draftpdfErrorModal" tabindex="-1" >
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="draftpdfErrorModal">Error Response</h5>
              <button type="button" className="btn-close bg-white rounded-circle border-0 fw-bold position-absolute end-n-10 top-n-13 modal-close button-hide fs-18 fw-500" data-bs-dismiss="modal" aria-label="Close">X</button>
            </div>
            <div className="modal-body">
              <div className="table-container mb-3">
                <table>
                  <tbody>
                    <tr className="fw-600 ">
                      <th className="text-center fw-600">Id</th>
                      <th className="text-center">Name</th>
                      <th className="text-center">Message</th>
                    </tr>
                    <tr>
                      <td className="taL">
                        {draftpdfErrorData?.draftpdfErrorData?.Error?.Id}
                      </td>
                      <td className="taL">
                        {draftpdfErrorData?.draftpdfErrorData?.Error?.Name}
                      </td>
                      <td className="taL">
                        {draftpdfErrorData?.draftpdfErrorData?.Error?.Message}
                      </td>
                    </tr>
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

export default RequestDraftPDFErrorModal
