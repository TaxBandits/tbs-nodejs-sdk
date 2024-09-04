import React from "react"

// Recon State Details for WV
const ReconStateWV = ({ reconstateWV, handleReconStateWV }) => {

    return (
        <>
            <h5 className="sub-head text-left mt-4 mb-3 " style={{ fontWeight: 'bold' }}>Form 1099-NEC Recon State Details - WV</h5>
            <div className="row d-flex justify-content-center mb-15px">
                <div className="col-md-6">
                    <div className="labelName">
                        <label className="control-label"><span className="text-danger">*</span>WithHoldingID:</label>
                        <input type="text" className='form-control' name='WVWithHoldingID' value={reconstateWV?.WVWithHoldingID} onChange={(e) => { handleReconStateWV(e) }} />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="labelName">
                        <label className="control-label"><span className="text-danger">*</span>NumOf1099W2:</label>
                        <input type="text" className='form-control' name='NumOf1099W2' value={reconstateWV?.NumOf1099W2} onChange={(e) => { handleReconStateWV(e) }} />
                    </div>
                </div>
            </div>
            <div className="row d-flex justify-content-center mb-15px">
                <div className="col-md-6">
                    <div className="labelName">
                        <label className="control-label">TotalTaxWH1099W2:</label>
                        <input type="text" className='form-control' name='TotalTaxWH1099W2' value={reconstateWV?.TotalTaxWH1099W2} onChange={(e) => { handleReconStateWV(e) }} />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="labelName">
                        <label className="control-label">WVTaxQ1:</label>
                        <input type="text" className='form-control' name='WVTaxQ1' value={reconstateWV?.WVTaxQ1} onChange={(e) => { handleReconStateWV(e) }} />
                    </div>
                </div>
            </div>
            <div className="row d-flex justify-content-center mb-15px">
                <div className="col-md-6">
                    <div className="labelName">
                        <label className="control-label">WVTaxQ2:</label>
                        <input type="text" className='form-control' name='WVTaxQ2' value={reconstateWV?.WVTaxQ2} onChange={(e) => { handleReconStateWV(e) }} />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="labelName">
                        <label className="control-label">WVTaxQ3:</label>
                        <input type="text" className='form-control' name='WVTaxQ3' value={reconstateWV?.WVTaxQ3} onChange={(e) => { handleReconStateWV(e) }} />
                    </div>
                </div>
            </div>
            <div className="row d-flex justify-content-center mb-15px">
                <div className="col-md-6">
                    <div className="labelName">
                        <label className="control-label">WVTaxQ4:</label>
                        <input type="text" className='form-control' name='WVTaxQ4' value={reconstateWV?.WVTaxQ4} onChange={(e) => { handleReconStateWV(e) }} />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="labelName">
                        <label className="control-label">TotalForYear:</label>
                        <input type="text" className='form-control' name='TotalForYear' value={reconstateWV?.TotalForYear} onChange={(e) => { handleReconStateWV(e) }} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReconStateWV