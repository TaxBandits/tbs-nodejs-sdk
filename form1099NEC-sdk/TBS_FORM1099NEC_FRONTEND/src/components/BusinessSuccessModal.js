import React from 'react'
import { useNavigate } from 'react-router-dom'

//Modal to show success records from Create Business Endpoint
const BusinessSuccessModal = (successData) => {
 
  //To navigate between pages using useNavigate Hook
  const navigate = useNavigate()

  const navigateToList = () => {
    navigate(`/listBusiness`)
  }
  
  return (
    <>
      <div className="modal fade" id="successModal" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1" >
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalToggleLabel">Create Business Response</h5>
              <button type="button" className="btn-close bg-white rounded-circle border-0 fw-bold position-absolute end-n-10 top-n-13 modal-close button-hide fs-18 fw-500"
               onClick={navigateToList} data-bs-dismiss="modal" aria-label="Close">X</button>
            </div>
            <div className="modal-body">
              <div className="table-container mt-2 mb-4">
                <table>
                  <tbody>
                    <tr className="fw-600 ">
                      <th className="text-center fw-600 bg-dull-blue" width="25%">Status Code</th>
                      <th className="text-center" width="30%">Status Name</th>
                      <th className="text-center" width="45%">Status Message</th>
                    </tr>
                    <tr key={successData?.successData?.StatusCode}>
                      <td className="text-center align-top">
                        {successData?.successData?.StatusCode}
                      </td>
                      <td className="text-center align-top">
                        {successData?.successData?.StatusName}
                      </td>
                      <td className="text-center border-radious-bottom-right align-top text-success">
                        {successData?.successData?.StatusMessage}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <h2 className="tabel-sub-head">Success Records</h2>
              <div className="table-container mb-3">
                <table>
                  <tbody>
                    <tr className="fw-600 ">
                      <th className="text-center fw-600" width="30%">BusinessId</th>
                      <th className="text-center" width="10%">Is EIN</th>
                      <th className="text-center" width="15%">EIN or SSN</th>
                      <th className="text-center" width="45%">Business Name</th>
                    </tr>
                    <tr key={successData?.successData?.BusinessId}>
                      <td className="text-center align-top">
                        {successData?.successData?.BusinessId}
                      </td>
                      <td className="text-center align-top">
                        {`${successData?.successData?.IsEIN}`}
                      </td>
                      <td className="text-center border-radious-bottom-right align-top">
                        {successData?.successData?.EINorSSN}
                      </td>
                      <td className="text-center border-radious-bottom-right align-top">
                        {successData?.successData?.BusinessNm == null ? successData?.successData?.FirstNm : successData?.successData?.BusinessNm }
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

export default BusinessSuccessModal