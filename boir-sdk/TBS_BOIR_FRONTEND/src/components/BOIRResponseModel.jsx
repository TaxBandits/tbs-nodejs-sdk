import React, { useEffect, useState } from "react";

const BOIRResponseModal = ({ response,isModalOpen,onCLose }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  useEffect(() => {
    isModalOpen ? setIsModalVisible(true) : setIsModalVisible(false);
 },[isModalVisible]); // Run effect on route change


  // Destructure response
  const {
    StatusCode,
    StatusName,
    StatusMessage,
    BOIRRecords,
    Errors
  } = response;

  const { SuccessRecords, ErrorRecords } = BOIRRecords || {};
  const { CompanyApplicants, BeneficialOwners } = SuccessRecords || {};


 
  const closeModal = () => {setIsModalVisible(false);
    onCLose()};

  return (
    <>
   

      {isModalOpen && (
        <div
          className="modal fade show d-block modal-backdrop"
          id="createBOIRModalToggle"
          aria-labelledby="exampleModalToggleLabel"
          tabIndex="-1"
          data-bs-backdrop="static" data-bs-keyboard="false"  aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered max-w-520px">
            <div className="modal-content rounded-1 border-0" id="ModelBody">
              <div className="modal-header rounded-0 border-top-left-radius-4px border-top-right-radius-4px border-0 p-2px bg-secondary1">
               
                
              </div>

              <div className="modal-body position-relative">
              <h2 className="head-2 text-tertiary" id="exampleModalToggleLabel">
                  Create BOIR Response 
                </h2>
                {/* Success Records Section */}
                {SuccessRecords && (
                  <div id="divSuccessRecordsBody">
                    <h2 className="tabel-sub-head">Company Applicants</h2>
                    <div className="table-responsive w-100">
                      {CompanyApplicants && CompanyApplicants.length > 0 ? (
                        <table className='table table-bordered border border-disable mb-0'>
                          <thead>
                            <tr className="fw-600">
                              <th className="text-center fw-600 bg-dull-blue" width="20%">
                                SequenceId
                              </th>
                              <th className="text-center" width="55%">
                                CompanyApplicantId
                              </th>
                              <th className="text-center" width="25%">
                                Status
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {CompanyApplicants.map((applicant, index) => (
                              <tr key={index}>
                                <td className="text-center">{applicant.SequenceId}</td>
                                <td className="text-center">{applicant.CompanyApplicantId}</td>
                                <td className="text-center">{applicant.Status}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <p className="text-center">No Company Applicants</p>
                      )}
                    </div>

                    <h2 className="tabel-sub-head mt-4">Beneficial Owners</h2>
                    <div className="table-container mt-2 mb-4">
                      {BeneficialOwners && BeneficialOwners.length > 0 ? (
                        <table>
                          <thead>
                            <tr className="fw-600">
                              <th className="text-center fw-600 bg-dull-blue" width="20%">
                                SequenceId
                              </th>
                              <th className="text-center" width="55%">
                                BeneficialOwnerId
                              </th>
                              <th className="text-center" width="25%">
                                Status
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {BeneficialOwners.map((owner, index) => (
                              <tr key={index}>
                                <td className="text-center">{owner.SequenceId}</td>
                                <td className="text-center">{owner.BeneficialOwnerId}</td>
                                <td className="text-center">{owner.Status}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <p className="text-center">No Beneficial Owners</p>
                      )}
                    </div>
                  </div>
                )}

                {/* Error Records Section */}
                {ErrorRecords && (
  <div>
    {/* Beneficial Owners Error Records */}
    {ErrorRecords.BeneficialOwners && ErrorRecords.BeneficialOwners.length > 0 && (
      <div>
        <h2 className="tabel-sub-head">Beneficial Owners Error Records</h2>
        <div className="table-responsive w-100">
          <table className="table table-bordered border border-disable mb-0">
            <thead>
              <tr className="fw-600">
                <th className="text-center fw-600">ID</th>
                <th className="text-center">Name</th>
                <th className="text-center">Message</th>
              </tr>
            </thead>
            <tbody>
              {ErrorRecords.BeneficialOwners.map((beneficialOwner, index) =>
                beneficialOwner.Errors && beneficialOwner.Errors.length > 0 ? (
                  beneficialOwner.Errors.map((error, errorIndex) => (
                    <tr key={`bo-${index}-${errorIndex}`}>
                      <td className="text-center">{error.Id}</td>
                      <td className="text-center">{error.Name}</td>
                      <td className="text-center">{error.Message}</td>
                    </tr>
                  ))
                ) : (
                  <tr key={`bo-${index}`}>
                    <td className="text-center" colSpan="3">
                      No errors found for Beneficial Owner ID: {beneficialOwner.BeneficialOwnerId}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    )}

    {/* Company Applicants Error Records */}
    {ErrorRecords.CompanyApplicants && ErrorRecords.CompanyApplicants.length > 0 && (
      <div>
        <h2 className="tabel-sub-head">Company Applicants Error Records</h2>
        <div className="table-responsive w-100">
          <table className="table table-bordered border border-disable mb-0">
            <thead>
              <tr className="fw-600">
                <th className="text-center fw-600">ID</th>
                <th className="text-center">Name</th>
                <th className="text-center">Message</th>
              </tr>
            </thead>
            <tbody>
              {ErrorRecords.CompanyApplicants.map((companyApplicant, index) =>
                companyApplicant.Errors && companyApplicant.Errors.length > 0 ? (
                  companyApplicant.Errors.map((error, errorIndex) => (
                    <tr key={`ca-${index}-${errorIndex}`}>
                      <td className="text-center">{error.Id}</td>
                      <td className="text-center">{error.Name}</td>
                      <td className="text-center">{error.Message}</td>
                    </tr>
                  ))
                ) : (
                  <tr key={`ca-${index}`}>
                    <td className="text-center" colSpan="3">
                      No errors found for Company Applicant ID: {companyApplicant.CompanyApplicantId}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    )}
  </div>
)}


{Errors && (
                  <div id="divErrorBody">
                    <h2 className="tabel-sub-head">Error Records</h2>
                    <div className="table-responsive w-100">
                      <table className="table table-bordered border border-disable mb-0">
                        <thead>
                          <tr className="fw-600">
                            <th className="text-center fw-600">ID</th>
                            <th className="text-center">Name</th>
                            <th className="text-center">Message</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Errors.map((error, index) => (
                            <tr key={index}>
                              <td className="text-center">{error.Id}</td>
                              <td className="text-center">{error.Name}</td>
                              <td className="text-center">{error.Message}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

          
              </div>
              <button
                  type="button"
                  className="d-flex align-items-center justify-content-center rounded-circle bg-disable position-absolute  cursor-pointer glow-360deg modal-closebtn border-tertiary"
                  onClick={closeModal}
                >
                  X
                </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BOIRResponseModal;
