import React from "react";

const RequestDraftPDFErrorModal = (draftpdfErrorData) => {
  return (
    <>
      <div
        class="modal fade"
        id="draftpdfErrorModal"
        aria-hidden="true"
        aria-labelledby="draftpdfErrorModal"
        tabindex="-1"
      >
        <div class="modal-dialog modal-dialog-centered modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="draftpdfErrorModal">
                Error Response
              </h5>
              <button
                type="button"
                class="btn-close bg-white rounded-circle border-0 fw-bold position-absolute end-n-10 top-n-13 modal-close button-hide fs-18 fw-500"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                X
              </button>
            </div>

            <div className="modal-body">
              <div class="table-container mb-3">
                <table>
                  <tbody>
                    <tr class="fw-600 ">
                      <th class="text-center fw-600">Id</th>
                      <th class="text-center">Name</th>
                      <th class="text-center">Message</th>
                    </tr>

                    <tr>
                      <td class="taL">
                        {draftpdfErrorData?.draftpdfErrorData?.Error?.Id}
                      </td>
                      <td class="taL">
                        {draftpdfErrorData?.draftpdfErrorData?.Error?.Name}
                      </td>
                      <td class="taL">
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
  );
};

export default RequestDraftPDFErrorModal;