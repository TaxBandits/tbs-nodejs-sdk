import React from "react";

const RequestPdfErrorModal = (pdfErrorData) => {
  return (
    <>
      <div
        class="modal fade"
        id="requestpdferrorModal"
        aria-hidden="true"
        aria-labelledby="requestpdferrorModal"
        tabindex="-1"
      >
        <div class="modal-dialog modal-dialog-centered modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="requestpdferrorModal">
                Error Response
              </h5>
              <button type="button" class="btn-close bg-white rounded-circle border-0 fw-bold position-absolute end-n-10 top-n-13 modal-close button-hide fs-18 fw-500" data-bs-dismiss="modal" aria-label="Close"> X </button>
            </div>
            <div class="modal-body">
              <div class="table-container mb-3">
                <table>
                  <tbody>
                    <tr class="fw-600 ">
                      <th class="text-center fw-600" width="30%">
                        RecordId
                      </th>
                      <th class="text-center" width="35%">
                        Status
                      </th>
                      <th class="text-center" width="35%">
                        Message
                      </th>
                    </tr>

                    <tr>
                      <td class="text-center align-top">
                        {
                          pdfErrorData?.pdfErrorData?.Form1099KRecords
                            ?.ErrorRecords[0]?.RecordId
                        }
                      </td>
                      <td class="text-center align-top">
                        {
                          pdfErrorData?.pdfErrorData?.Form1099KRecords
                            ?.ErrorRecords[0]?.Status
                        }
                      </td>
                      <td class="text-center border-radious-bottom-right align-top">
                        {
                          pdfErrorData?.pdfErrorData?.Form1099KRecords
                            ?.ErrorRecords[0]?.Message
                        }
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
  );
};

export default RequestPdfErrorModal;
