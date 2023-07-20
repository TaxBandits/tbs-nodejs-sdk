import React from 'react'

const SuccessModal = (successData) => {
    return (
      <>
        <div className="modal fade" id="successModal" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1" >
          <div className="modal-dialog modal-dialog-centered modal-xl">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalToggleLabel">Response / Status</h5>
                <button type="button" className="btn-close bg-white rounded-circle border-0 fw-bold position-absolute end-n-10 top-n-13 modal-close button-hide fs-18 fw-500" data-bs-dismiss="modal" aria-label="Close">X</button>
              </div>
              <div className="modal-body">
                <div className="table-container mt-2 mb-4">
                  <table>
                    <tbody>
                      <tr className="fw-600 ">
                        <th className="text-center fw-600 bg-dull-blue" width="25%">Status Code</th>
                        <th className="text-center" width="30%">Status Name</th>
                        <th className="text-center" width="35%">Status Message</th>
                      </tr>
                      <tr key={successData?.successData?.StatusCode}>
                        <td className="text-center align-top">
                          {successData?.successData?.StatusCode}
                        </td>
                        <td className="text-center align-top">
                          {successData?.successData?.StatusName}
                        </td>
                        <td className="text-center border-radious-bottom-right align-top text-danger">
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
                        <th className="text-center" width="35%">IsEIN</th>
                        <th className="text-center" width="35%">EINorSSN</th>
                        <th className="text-center" width="35%">BusinessName</th>
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
                          {successData?.successData?.BusinessNm}
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

export default SuccessModal
