import React from "react";

const ReviewModal = ({ reviewPdfData, pdfHeader }) => {
  return (
    <>
      <div
        class="modal fade"
        id="review"
        aria-hidden="true"
        aria-labelledby="review"
        tabindex="-1"
      >
        <div class="modal-dialog modal-dialog-centered modal-xl">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalToggleLabel">
                {pdfHeader}
              </h5>
              <button type="button" class="btn-close bg-white rounded-circle border-0 fw-bold position-absolute end-n-10 top-n-13 modal-close button-hide fs-18 fw-500" data-bs-dismiss="modal" aria-label="Close">X</button>
            </div>
            <div class="modal-body select-business p-12 overflow-hidden">
              <iframe className="w-100 h-100vh" src={reviewPdfData}></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewModal;