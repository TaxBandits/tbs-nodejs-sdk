import React from 'react'

//Modal to show decrypted pdf preview from RequestDraftPdf Url and RequestPdf Url Form1099-NEC Endpoint
const ReviewModal = ({ reviewPdfData, pdfHeader }) => {

  return (
    <>
      <div className="modal fade" id="review" aria-hidden="true" aria-labelledby="review" tabindex="-1" >
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalToggleLabel">{pdfHeader}</h5>
              <button type="button" className="btn-close bg-white rounded-circle border-0 fw-bold position-absolute end-n-10 top-n-13 modal-close button-hide fs-18 fw-500" data-bs-dismiss="modal" aria-label="Close">X</button>
            </div>
            <div className="modal-body select-business p-12 overflow-hidden">
              <iframe className="w-100 h-100vh" src={reviewPdfData}></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ReviewModal