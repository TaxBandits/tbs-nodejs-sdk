import React from 'react'

const StatusModal = (statusData) => {
  return (
    <>
      <div className="modal fade" id="statusModal" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1" >
        <div className="modal-dialog modal-dialog-centered modal-l">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalToggleLabel">Get TIN Matching Status</h5>
              <button type="button" className="btn-close bg-white rounded-circle border-0 fw-bold position-absolute end-n-10 top-n-13 modal-close button-hide fs-18 fw-500" data-bs-dismiss="modal" aria-label="Close">X</button>
            </div>
            <div className="table-container m-3">
              <table>
                <tbody>
                  <tr className="fw-600 ">
                    <th className="taL bg-white border">SubmissionId</th>
                    <td className="taL">
                      {statusData?.statusData?.SubmissionId}
                    </td>
                  </tr>
                  <tr className="fw-600 ">
                    <th className="taL bg-white border">RecordId</th>
                    <td className="taL">
                      {statusData?.statusData?.RecordId}
                    </td>
                  </tr>
                  <tr className="fw-600 ">
                    <th className="taL bg-white border">SequenceId</th>
                    <td className="taL border-radious-bottom-right">
                      {statusData?.statusData?.SequenceId}
                    </td>
                  </tr>
                  <tr className="fw-600 ">
                    <th className="taL bg-white border">RecipientId</th>
                    <td className="taL border-radious-bottom-right">
                      {statusData?.statusData?.RecipientId !== null ? statusData?.statusData?.RecipientId : '-'}
                    </td>
                  </tr>
                  <tr className="fw-600 ">
                    <th className="taL bg-white border">Name</th>
                    <td className="taL">
                      {statusData?.statusData?.Name}
                    </td>
                  </tr>
                  <tr className="fw-600 ">
                    <th className="taL bg-white border">TIN Type</th>
                    <td className="taL">
                      {statusData?.statusData?.TINType}
                    </td>
                  </tr>
                  <tr className="fw-600 ">
                    <th className="taL bg-white border">TIN</th>
                    <td className="taL border-radious-bottom-right">
                      {statusData?.statusData?.TIN}
                    </td>
                  </tr>
                  <tr className="fw-600 ">
                    <th className="taL bg-white border">Status</th>
                    <td className="taL border-radious-bottom-right">
                      {statusData?.statusData?.Status}
                    </td>
                  </tr>
                  <tr className="fw-600 ">
                    <th className="taL bg-white border">StatusTs</th>
                    <td className="taL border-radious-bottom-right">
                      {statusData?.statusData?.StatusTs}
                    </td>
                  </tr>
                  <tr className="fw-600 ">
                    <th className="taL bg-white border">NumOfAttemptsRmng</th>
                    <td className="taL border-radious-bottom-right">
                      {statusData?.statusData?.NumOfAttemptsRmng === null ? "-" : statusData?.statusData?.NumOfAttemptsRmng}
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default StatusModal
