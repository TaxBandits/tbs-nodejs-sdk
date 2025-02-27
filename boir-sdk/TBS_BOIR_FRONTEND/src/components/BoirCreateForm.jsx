import React from 'react';

const BoirCreateForm = () => {
  return (
    <div>
      <div className="row d-flex justify-content-center mb-15px">
        <div className="col-md-5">
          <label htmlFor="selectReportType" className="control-label">
            <span className="text-danger">*</span>Report Type:
          </label>
          <select className="form-control form-select" id="selectReportType">
            <option disabled selected value="INITIAL">Initial</option>
          </select>
        </div>
        <div className="col-md-5"></div>
      </div>
      {/* Add other forms here in a similar fashion */}
    </div>
  );
};

export default BoirCreateForm;
