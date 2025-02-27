import React, { useEffect, useState } from "react";

const BOIRAttachmentResponse = ({ response,isModalOpen,onCLose }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  useEffect(() => {
    isModalOpen ? setIsModalVisible(true) : setIsModalVisible(false);
 },[isModalVisible]); // Run effect on route change


  // Destructure response
  const {
    CompanyApplicantAttachments ,
    BeneficialOwnerAttachments ,

  } = response;
 
  const closeModal = () => {setIsModalVisible(false);
    onCLose()};
  return (
    <>
   

      {isModalOpen && (
        <div
          className="modal fade show d-block"
          id="createBOIRModalToggle"
          aria-hidden="false"
          aria-labelledby="exampleModalToggleLabel"
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered max-w-520px">
            <div className="modal-content rounded-1 border-0" id="ModelBody">
              <div className="modal-header rounded-0 border-top-left-radius-4px border-top-right-radius-4px border-0 p-2px bg-secondary1">
               
                
              </div>

              <div className="modal-body position-relative">
              <h2 className="head-2 text-tertiary" id="exampleModalToggleLabel">
                 Attach Document Response
                </h2>
             

                {/* Error Records Section */}
                {BeneficialOwnerAttachments && (
  <div>
    {/* Beneficial Owners Error Records */}
    {BeneficialOwnerAttachments.ErrorRecords && BeneficialOwnerAttachments.ErrorRecords.length > 0 && (
      <div>
        <h2 className="tabel-sub-head">Beneficial Owners Attchment Error Records</h2>
        <div className="table-container mb-3">
          <table>
            <thead>
              <tr className="fw-600">
                <th className="text-center fw-600">ID</th>
                <th className="text-center">Name</th>
                <th className="text-center">Message</th>
              </tr>
            </thead>
            <tbody>
            {BeneficialOwnerAttachments?.ErrorRecords?.length > 0 ? (
  BeneficialOwnerAttachments.ErrorRecords.map((beneficialOwner, index) => (
    <tr key={`bo-${index}`}>
      <td className="text-center">{beneficialOwner.Id}</td>
      <td className="text-center">{beneficialOwner.Name}</td>
      <td className="text-center">{beneficialOwner.Message}</td>
    </tr>
  ))
) : (
  <tr>
    <td className="text-center" colSpan="3">
      No errors found for Beneficial Attachments
    </td>
  </tr>
)}

            </tbody>
          </table>
        </div>
      </div>
    )}


  </div>
)}

{CompanyApplicantAttachments && (
  <div>
    {/* Beneficial Owners Error Records */}
    {CompanyApplicantAttachments.ErrorRecords && CompanyApplicantAttachments.ErrorRecords.length > 0 && (
      <div>
        <h2 className="tabel-sub-head">Company Applicant Attchment Error Records</h2>
        <div className="table-container mb-3">
          <table>
            <thead>
              <tr className="fw-600">
                <th className="text-center fw-600">ID</th>
                <th className="text-center">Name</th>
                <th className="text-center">Message</th>
              </tr>
            </thead>
            <tbody>
            {CompanyApplicantAttachments?.ErrorRecords?.length > 0 ? (
  CompanyApplicantAttachments.ErrorRecords.map((companyapplicant, index) => (
    <tr key={`bo-${index}`}>
      <td className="text-center">{companyapplicant.Id}</td>
      <td className="text-center">{companyapplicant.Name}</td>
      <td className="text-center">{companyapplicant.Message}</td>
    </tr>
  ))
) : (
  <tr>
    <td className="text-center" colSpan="3">
      No errors found for Company Attachments
    </td>
  </tr>
)}

            </tbody>
          </table>
        </div>
      </div>
    )}


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

export default BOIRAttachmentResponse;
