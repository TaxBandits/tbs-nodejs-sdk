import React, { useEffect, useState } from 'react';
import axios from 'axios';
import logo from '../images/tbslogo.png';

const BOIRPreview = () => {
  const [data, setData] = useState(null);
  const API_Url=process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_Url}/Get?SubmissionId=bd5cef7e-a795-48b3-994d-31c80efe634b`
        );
        if (response.data && response.data.StatusCode === 200) {
          setData(response.data);
        } else {
          console.error('API call unsuccessful', response.data.StatusMessage);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const { BOIRRecords } = data;

  return (
    <div>
      {/* Header */}
      <div className="col-md-12 text-center mt-3">
        <img src={logo} alt="TaxBandits Logo" className="mb-5 logo" />
      </div>

      {/* Main Content */}
      <div className="container" id="divPage">
        <div className="w-75 m-auto">
          <div className='card border-0 shadow-medium rounded'>
            <div className='card-header bg-white px-3 px-2'>
              <h1 className="head-1 mb-0">Preview - BOIR</h1>
            </div>
            <div className='card-body'>

            <div className="row mb-3">
              <div className="col-md-10">
                 <div className='d-flex align-items-center'>
                 <label className="control-label me-2">Report Type:</label>
                 <p className="fs-14px fw-medium mb-0" id="labelReportType">{data?.ReportType}</p>
                 </div>
              </div>
            </div>
 <hr></hr>
            {/* Reporting Company */}
            <div className='mb-3'>
              <div className="row">
                <div className="col-md-11">
                <h2 className="head-2">
                  Reporting Company
                </h2>
                </div>
              </div>
              <div className="row">
                <div className="col-md-10 mb-12px">
                  <label id="labelLegalName" className='fw-medium'>{BOIRRecords?.ReportingCompany?.LegalNm}</label>
                </div>
                <div className="col-md-10 mb-12px">
                  <label id="labelAddress" className='fw-medium'>
                    {BOIRRecords?.ReportingCompany?.USAddress?.StreetAddress},{' '}
                    {BOIRRecords?.ReportingCompany?.USAddress?.City},{' '}
                    {BOIRRecords?.ReportingCompany?.USAddress?.State},{' '}
                    {BOIRRecords?.ReportingCompany?.USAddress?.ZipCd}
                  </label>
                </div>
              </div>
              <div className="row">
                <div className="col-md-5">
                  <label className="control-label me-2">TIN:</label>
                  <label className='fs-14px fw-medium mb-0' id="labelTinType">{BOIRRecords?.ReportingCompany?.TINType}</label> - (
                  <label className="fs-14px fw-medium mb-0" id="labelTin">{BOIRRecords?.ReportingCompany?.TIN}</label>)
                </div>
                <div className="col-md-5">
                  <label className="control-label me-2">Report Number:</label>
                  <label className="fs-14px fw-medium mb-0" id="labelReportNumber">{data?.ReportNumber}</label>
                </div>
              </div>
            </div>
            <hr></hr>

            {/* Company Applicant Information */}
            {BOIRRecords?.CompanyApplicants?.length > 0 && (
              <div id="divCompanyApplicant" className='mb-3'>
                <div className="row">
                  <div className="col-md-11">
                    <h2 className="head-2">Company Applicant Information</h2>
                  </div>
                </div>
                {BOIRRecords?.CompanyApplicants.map((applicant, index) => (
                  <div key={index}>
                    <div className="row mb-12px">
                      <div className="col-md-5">
                        <label className="control-label me-2">Name:</label>
                        <label className='fs-14px fw-medium' id="labelFullNameCA">
                          {applicant.FirstNm} {applicant.LastNm}
                        </label>
                      </div>
                      <div className="col-md-6">
                        <label className='control-label me-2' id="labelAddressTypeCA">{applicant.AddressType}</label>
                        <label className='fs-14px fw-medium' id="labelAddressCA">
                          {applicant.Address?.Address1}, {applicant.Address?.City},{' '}
                          {applicant.Address?.State}, {applicant.Address?.ZipCd}, {applicant.Address?.Country}
                        </label>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-5">
                        <label className="control-label me-2">Identifying document type:</label>
                        <label className='fs-14px fw-medium' id="labelDocumentTypeCA">{applicant.FormOfIdentification?.DocumentType}</label>
                      </div>
                      <div className="col-md-5">
                        <label className="control-label me-2">Identifying document number:</label>
                        <label className='fs-14px fw-medium' id="labelDocumentNumberCA">
                          {applicant.FormOfIdentification?.DocumentNumber}
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
 <hr></hr>
            {/* Beneficial Owners */}
            {BOIRRecords?.BeneficialOwners?.length > 0 && (
              <div id="divBeneficialOwner" className='mb-3'>
                <div className="row">
                  <div className="col-md-11">
                    <h2 className="head-2">
                      Beneficial Owner
                    </h2>
                  </div>
                </div>
                {BOIRRecords?.BeneficialOwners.map((owner, index) => (
                  <div key={index}>
                    <div className="row">
                      <div className="col-md-5">
                        <label className="control-label me-2">Name:</label>
                        <label id="labelFullNameBO" className='fs-14px fw-medium'>
                          {owner.FirstNm} {owner.LastNm}
                        </label>
                      </div>
                      <div className="col-md-6">
                        <label id="labelAddressTypeBO" className='control-label me-2'>Residential:</label>
                        <label id="labelAddressBO" className='fs-14px fw-medium'>
                          {owner.ResidentialAddress?.StreetAddress}, {owner.ResidentialAddress?.City},{' '}
                          {owner.ResidentialAddress?.State}, {owner.ResidentialAddress?.ZipCd},{' '}
                          {owner.ResidentialAddress?.Country}
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
 <hr></hr>
            {/* Submitter Information */}
            <div>
              <div className="row">
                <div className="col-md-11">
                  <h2 className="head-2">Submitter Information</h2>
                </div>
              </div>
              <div className="row mb-12px">
                <div className="col-md-5">
                  <label className="control-label me-2">First name:</label>
                  <label id="labelFirstNameSI" className="fs-14px fw-medium">{BOIRRecords?.SubmitterInformation?.FirstNm}</label>
                </div>
                <div className="col-md-5">
                  <label className="control-label me-2">Last name:</label>
                  <label id="labelLastNameSI" className="fs-14px fw-medium">{BOIRRecords?.SubmitterInformation?.LastNm}</label>
                </div>
              </div>
              <div className="row">
                <div className="col-md-5">
                  <label className="control-label me-2">Email:</label>
                  <label id="labelEmailSI" className="fs-14px fw-medium">{BOIRRecords?.SubmitterInformation?.Email}</label>
                </div>
              </div>
            </div>

            {/* Create New BOIR Button */}
            <div className="mt-3 text-center">
              <button className="btn btn_primary shadow btn_md" onClick={() => (window.location.href = '/createBOIR')}>
                Create new BOIR
              </button>
            </div>

            </div>
          </div>
        
        </div>
      </div>
    </div>
  );
};

export default BOIRPreview;
