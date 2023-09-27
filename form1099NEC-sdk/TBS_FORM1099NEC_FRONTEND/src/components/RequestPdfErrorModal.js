import React from 'react'

//Modal to show error records from Request Pdf Url Form1099-NEC Endpoint
const RequestPdfErrorModal = (pdfErrorData) => {

  return (
    <>
      <div className="modal fade" id="requestpdferrorModal" aria-hidden="true" aria-labelledby="requestpdferrorModal" tabindex="-1" >
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="requestpdferrorModal">Error Response</h5>
              <button type="button" className="btn-close bg-white rounded-circle border-0 fw-bold position-absolute end-n-10 top-n-13 modal-close button-hide fs-18 fw-500" data-bs-dismiss="modal" aria-label="Close">X</button>
            </div>
            <div className="modal-body">
              <div className="table-container mb-3">
                <table>
                  <tbody>
                    <tr className="fw-600 ">
                      <th className="text-center fw-600" width="30%">RecordId</th>
                      <th className="text-center" width="35%">Status</th>
                      <th className="text-center" width="35%">Message</th>
                    </tr>
                    <tr>
                      <td className="text-center align-top">
                        {pdfErrorData?.pdfErrorData?.Form1099NecRecords?.ErrorRecords[0]?.RecordId}
                      </td>
                      <td className="text-center align-top">
                        {pdfErrorData?.pdfErrorData?.Form1099NecRecords?.ErrorRecords[0]?.Status}
                      </td>
                      <td className="text-center border-radious-bottom-right align-top">
                        {pdfErrorData?.pdfErrorData?.Form1099NecRecords?.ErrorRecords[0]?.Message}
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

export default RequestPdfErrorModal
