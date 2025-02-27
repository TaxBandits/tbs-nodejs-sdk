import React from 'react';

const BoirModal = () => {
  return (
    <div>
      <div className="text-center p-10">
        <button className="btn btn_primary shadow btn_md" id="createBOIRButton">
          Create BOIR
          <i className="fa fa-spinner fa-spin" aria-hidden="true" id="createBOIRProgressBar" style={{ display: 'none' }}></i>
        </button>
      </div>
      <button className="btn_cancel shadow mt-3 mb-3">Back</button>

      {/* Modal */}
      <div className="modal fade" id="createBOIRModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
        <div className="modal-dialog modal-xl">
          <div className="modal-content" id="ModelBody">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalToggleLabel">Create BOIR Response</h5>
              <button type="button" className="btn-close bg-white rounded-circle border-0 fw-bold position-absolute end-n-10 top-n-13 modal-close button-hide fs-18 fw-500" data-bs-dismiss="modal" aria-label="Close">X</button>
            </div>
            <div className="modal-body">
              {/* Modal Body */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoirModal;
