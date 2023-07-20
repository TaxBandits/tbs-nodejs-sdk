import React from 'react'

//TIN Matching Recipient - Cancel Endpoint Modal
const CancelModal = ({ cancelSuccessData, cancelErrorData }) => {
    return (
        <>
            <div className="modal fade" id="cancelModal" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1" >
                <div className="modal-dialog modal-dialog-centered modal-l">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalToggleLabel">Cancel TIN Matching</h5>
                            <button type="button" className="btn-close bg-white rounded-circle border-0 fw-bold position-absolute end-n-10 top-n-13 modal-close button-hide fs-18 fw-500" data-bs-dismiss="modal" aria-label="Close">X</button>
                        </div>
                        {/*Cancel Endpoint - Success Scenario */}
                        {cancelSuccessData?.TINMatchingRecords?.SuccessRecords ?
                            <>
                                <div className="modal-body">
                                    <h2 className="tabel-sub-head">Success Records</h2>
                                    <div className="table-container m-1">
                                        <table>
                                            <tbody>
                                                <tr className="fw-600">
                                                    <th className="taL bg-white border" width="35%">SequenceId</th>
                                                    <td className="taL">
                                                        {cancelSuccessData?.TINMatchingRecords?.SuccessRecords[0]?.SequenceId}
                                                    </td>
                                                </tr>
                                                <tr className="fw-600">
                                                    <th className="taL bg-white border">RecordId</th>
                                                    <td className="taL">
                                                        {cancelSuccessData?.TINMatchingRecords?.SuccessRecords[0]?.RecordId}
                                                    </td>
                                                </tr>
                                                <tr className="fw-600">
                                                    <th className="taL bg-white border">Requested Type</th>
                                                    <td className="taL border-radious-bottom-right">
                                                        {cancelSuccessData?.TINMatchingRecords?.SuccessRecords[0]?.RequestedType}
                                                    </td>
                                                </tr>
                                                <tr className="fw-600">
                                                    <th className="taL bg-white border">Status</th>
                                                    <td className="taL border-radious-bottom-right">
                                                        {cancelSuccessData?.TINMatchingRecords?.SuccessRecords[0]?.Status}
                                                    </td>
                                                </tr>
                                                <tr className="fw-600">
                                                    <th className="taL bg-white border">StatusTs</th>
                                                    <td className="taL">
                                                        {cancelSuccessData?.TINMatchingRecords?.SuccessRecords[0]?.StatusTs}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </>
                            :
                            <>
                            {/*Cancel Endpoint - Error Scenario */}
                                {cancelErrorData ?
                                    <>
                                        <div className="modal-body">
                                            <h2 className="tabel-sub-head">Error Records</h2>
                                            <div className="table-container m-1">
                                                <table>
                                                    <tbody>
                                                        <tr className="fw-600 ">
                                                            <th className="taL bg-white border"  width="35%">SequenceId</th>
                                                            <td className="taL">
                                                                {cancelErrorData[0]?.SequenceId}
                                                            </td>
                                                        </tr>
                                                        <tr className="fw-600 ">
                                                            <th className="taL bg-white border" >RecordId</th>
                                                            <td className="taL">
                                                                {cancelErrorData[0]?.RecordId}
                                                            </td>
                                                        </tr>
                                                        <tr className="fw-600 ">
                                                            <th className="taL bg-white border" >Requested Type</th>
                                                            <td className="taL border-radious-bottom-right">
                                                                {cancelErrorData[0]?.RequestedType}
                                                            </td>
                                                        </tr>
                                                        <tr className="fw-600 ">
                                                            <th className="taL bg-white border" >Id</th>
                                                            <td className="taL border-radious-bottom-right">
                                                                {cancelErrorData[0]?.Errors[0]?.Id}
                                                            </td>
                                                        </tr>
                                                        <tr className="fw-600 ">
                                                            <th className="taL bg-white border" >Name</th>
                                                            <td className="taL">
                                                                {cancelErrorData[0]?.Errors[0]?.Name}
                                                            </td>
                                                        </tr>
                                                        <tr className="fw-600 ">
                                                            <th className="taL bg-white border" >Message</th>
                                                            <td className="taL">
                                                                {cancelErrorData[0]?.Errors[0]?.Message}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </> :
                                    <>
                                    </>
                                }
                            </>
                        }

                    </div>
                </div>
            </div>
        </>
    )
}

export default CancelModal
