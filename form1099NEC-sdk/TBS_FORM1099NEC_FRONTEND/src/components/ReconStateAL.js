import React from "react"
import { useState, useEffect } from "react"

// Recon State Details for AL
const ReconStateAL = ({ reconStateAL, setReconALInput, reconALInput, handleReconStateAL, monthOptions, overPaymentTypeOptions, paymentMethodOptions, bankAccountTypeOptions, statesOptions, setInputData }) => {

  // Initializing state for count length for IncomeTaxWHAndRemittValues data
  const [countLength, setCountLength] = useState(0)

  // Updating Input Fields of IncomeTaxWHAndRemitt in Use Effect
  useEffect(() => {
    if (reconStateAL?.IncomeTaxWHAndRemitt?.length > 0) {
      const incomeTaxWHAndRemittValues = reconStateAL?.IncomeTaxWHAndRemitt?.map((data, i) => {
        setCountLength(i + 1)
        return {
          Month: data?.Month,
          TaxWH: data?.TaxWH,
          TaxRemitt: data?.TaxRemitt
        }
      })

      setInputFields(incomeTaxWHAndRemittValues)
    }
  }, [reconStateAL])

  // Initializing state for IncomeTaxWHAndRemitt input fields
  const [inputFields, setInputFields] = useState([{
    Month: "",
    TaxWH: 0,
    TaxRemitt: 0
  }])
  setInputData(inputFields)

  // Function to handle add IncomeTaxWHAndRemitt input fields
  const addInputField = () => {
    setCountLength(countLength + 1)
    setInputFields([...inputFields, {
      Month: "",
      TaxWH: 0,
      TaxRemitt: 0
    }])
  }

  //Function to handle remove IncomeTaxWHAndRemitt input fields
  const removeInputFields = (index) => {
    setCountLength(countLength - 1)
    const rows = [...inputFields]
    rows.splice(index, 1)
    setInputFields(rows)
  }

  //Handle onchange function for input values
  const handleChange = (index, e) => {
    const { name, value } = e.target
    const list = [...inputFields]
    list[index][name] = value
    setInputFields(list)
  }

  return (
    <>
      <h5 className="sub-head text-left mt-4 mb-3" style={{ fontWeight: 'bold' }}>Form 1099-NEC Recon State Details - AL</h5>
      <div className="row d-flex justify-content-center mb-15px">
        <div className="col-md-6">
          <div className="labelName">
            <label className="control-label"><span className="text-danger">*</span>WithHoldingID:</label>
            <input type="text" className='form-control' name='ALWithHoldingID' value={reconStateAL?.ALWithHoldingID} onChange={(e) => { handleReconStateAL(e) }} />
          </div>
        </div>
        <div className="col-md-6">
          <div className="labelName">
            <label className="control-label"><span className="text-danger">*</span>NumOf1099W2:</label>
            <input type="text" className='form-control' name='NumOf1099W2' value={reconStateAL?.NumOf1099W2} onChange={(e) => { handleReconStateAL(e) }} />
          </div>
        </div>
      </div>
      <h5 className="sub-head text-left mt-4 mb-3" style={{ fontWeight: 'bold' }}>IncomeTax WH And Remitt</h5>
      <table className="table table-bordered text-field-table w-100 mx-auto">
        <thead>
          <tr className="bg-gray">
            <th className="fw-500 text-dark text-center" width="75px" scope="col">S.NO</th>
            <th className="fw-500 text-dark text-center" scope="col">Month</th>
            <th className="fw-500 text-dark text-center" scope="col">Tax WithHeld</th>
            <th className="fw-500 text-dark text-center position-relative" scope="col">Tax Remitt</th>
            <th className="fw-500 text-dark text-center" scope="col" width="75px"></th>
          </tr>
        </thead>
        <tbody>
          {
            inputFields?.map((data, index) => {
              const { Month, TaxWH, TaxRemitt } = data

              return (
                <>
                  <tr className="align-middle">
                    <td className="text-center">{index + 1}
                    </td>
                    <td>
                      <div className="error">
                        <select className="form-control form-select" value={Month} name="Month" onChange={(e) => handleChange(index, e)}>
                          {monthOptions?.map((monthOption, index) => {
                            return <option key={monthOption?.key} selected={monthOption?.value === data.Month ? `selected` : ``} value={monthOption?.label}>
                              {monthOption?.label}
                            </option>
                          })}
                        </select>
                      </div>

                    </td>
                    <td>
                      <div className="error">
                        <input type="text" className="form-control" id="floatingInput" onChange={(e) => handleChange(index, e)} value={TaxWH} name="TaxWH" />
                      </div>
                    </td>
                    <td>
                      <div className="error">
                        <input type="text" className="form-control" id="floatingInput" onChange={(e) => handleChange(index, e)} value={TaxRemitt} name="TaxRemitt" />
                      </div>

                    </td>

                    <td>
                      {(inputFields?.length !== 1) ?
                        <button type="button" onClick={() => { removeInputFields(index) }} className="btn-rounded-hover rounded-circle p-2 lh-1"><i className="mdi mdi-delete-outline text-muted fs-4" data-bs-toggle="tooltip" data-bs-placement="bottom" role="button" aria-label="delete" data-bs-original-title="delete" title="Delete"></i>
                        </button> : ''}
                    </td>
                  </tr>

                </>
              )
            })
          }
          <tr>
            {countLength === 11 ?
              <td></td> :
              <td>
                <button type="button" onClick={() => { addInputField() }} className="btn-rounded-hover rounded-circle lh-1"><i className="mdi mdi-plus-circle-outline text-muted fs-4" data-bs-toggle="tooltip" data-bs-placement="bottom" role="button" aria-label="delete" data-bs-original-title="Add" title="Add"></i>
                </button>
              </td>
            }
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <div className="row d-flex justify-content-center mb-15px">
        <div className="col-md-6">
          <div className="labelName">
            <label className="control-label">Total TaxWH1099W2:</label>
            <input type="text" className='form-control' name='TotTaxWH1099W2' value={reconStateAL?.TotTaxWH1099W2} onChange={(e) => { handleReconStateAL(e) }} />
          </div>
        </div>
        <div className="col-md-6">
          <div className="labelName">
            <label className="control-label">Total TaxRemitt:</label>
            <input type="text" className='form-control' name='TotTaxRemitt' value={reconStateAL?.TotTaxRemitt} onChange={(e) => { handleReconStateAL(e) }} />
          </div>
        </div>
      </div>
      <div className="row d-flex justify-content-center mb-15px">
        <div className="col-md-6">
          <div className="labelName">
            <label className="control-label">Total TaxDue:</label>
            <input type="text" className='form-control' name='TotTaxDue' value={reconStateAL?.TotTaxDue} onChange={(e) => { handleReconStateAL(e) }} />
          </div>
        </div>
        <div className="col-md-6">
          <div className="labelName">
            <label className="control-label">Total Overpayment:</label>
            <input type="text" className='form-control' name='TotOverpayment' value={reconStateAL?.TotOverpayment} onChange={(e) => { handleReconStateAL(e) }} />
            <span></span><input className="form-check-input cursor-pointer mb-2" type="checkbox" name='IsInternationalACHTxn' onClick={(e) => { handleReconStateAL(e) }} checked={reconStateAL?.IsInternationalACHTxn} />IsInternationalACHTxn<span />
          </div>
        </div>
      </div>
      <div className="row d-flex justify-content-center mb-15px">
        <div className="col-md-6">
          <div className="labelName">
            <label className="control-label">Payment Method:</label>
            <select className='form-control form-select' name='PaymentMethod' value={reconStateAL?.PaymentMethod} onChange={(e) => { handleReconStateAL(e) }}  >
              {paymentMethodOptions.map((paymentMethodOption, index) => {
                return <option key={paymentMethodOption.key} selected={paymentMethodOption.value === reconStateAL.PaymentMethod ? `selected` : ``} value={paymentMethodOption.label}>
                  {paymentMethodOption.label}
                </option>
              })}
            </select>
          </div>
        </div>
        <div className="col-md-6">
          <div className="labelName">
            <label className="control-label">Over Payment Type:</label>
            <select className='form-control form-select' name='OverPaymentType' value={reconStateAL?.OverPaymentType} onChange={(e) => { handleReconStateAL(e) }}  >
              {overPaymentTypeOptions.map((overPaymentTypeOption, index) => {
                return <option key={overPaymentTypeOption.key} selected={overPaymentTypeOption.value === reconStateAL.OverPaymentType ? `selected` : ``} value={overPaymentTypeOption.label}>
                  {overPaymentTypeOption.label}
                </option>
              })}
            </select>
          </div>
        </div>
      </div>
      {reconStateAL.PaymentMethod === "EFT Debit" ?
        <>
          <div className="row d-flex justify-content-center mb-15px">
            <div className="col-md-6">
              <div className="labelName">
                <label className="control-label">Bank Account Type:</label>
                <select className='form-control form-select' name='BankAccType' value={reconStateAL?.BankAccType} onChange={(e) => { handleReconStateAL(e) }}  >
                  {bankAccountTypeOptions.map((bankAccountTypeOption, index) => {
                    return <option key={bankAccountTypeOption.key} selected={bankAccountTypeOption.value == reconStateAL.BankAccType ? `selected` : ``} value={bankAccountTypeOption.label}>
                      {bankAccountTypeOption.label}
                    </option>
                  })}
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="labelName">
                <label className="control-label">BankAccNum:</label>
                <input type="text" className='form-control' name='BankAccNum' value={reconStateAL?.BankAccNum} maxLength="20" onChange={(e) => { handleReconStateAL(e) }} />
              </div>
            </div>
          </div>
          <div className="row d-flex justify-content-center mb-15px">
            <div className="col-md-6">
              <div className="labelName">
                <label className="control-label">Bank Routing Number:</label>
                <input type="text" className='form-control' name='BankRoutingNum' value={reconStateAL?.BankRoutingNum} maxLength="9" onChange={(e) => { handleReconStateAL(e) }} />
              </div>
            </div>
            <div className="col-md-6">
              <label className="control-label">Payment Date:</label>
              <input type="text" className='form-control' name='PaymentDate' value={reconStateAL?.PaymentDate} onChange={(e) => { handleReconStateAL(e) }} />
            </div>
          </div>
        </> :
        <></>
      }
      {reconStateAL?.IsInternationalACHTxn ?
        <>
          <div className="row d-flex justify-content-center mb-15px">
            <div className="col-md-6">
              <div className="labelName">
                <label className="control-label">Address:</label>
                <input type="text" className='form-control' name='Address' value={reconStateAL?.Address} onChange={(e) => { handleReconStateAL(e) }} />
              </div>
            </div>
            <div className="col-md-6">
              <div className="labelName">
                <label className="control-label">City:</label>
                <input type="text" className='form-control' name='City' value={reconStateAL?.City} onChange={(e) => { handleReconStateAL(e) }} />
              </div>
            </div>
          </div>
          <div className="row d-flex justify-content-center mb-15px">
            <div className="col-md-6">
              <div className="labelName">
                <label className="control-label">State:</label>
                <select className="form-control form-select" name='State' value={reconStateAL?.State} onChange={(e) => { handleReconStateAL(e) }}   >
                  {statesOptions?.map((stateOption, index) => {
                    return <option key={index} selected={stateOption?.code === reconStateAL?.State ? `selected` : ``} value={stateOption?.code}>
                      {stateOption?.label}
                    </option>
                  })}
                </select>
              </div>
            </div>
            <div className="col-md-6">
              <div className="labelName">
                <label className="control-label">Zip:</label>
                <input type="text" className='form-control' name='Zip' value={reconStateAL?.Zip} onChange={(e) => { handleReconStateAL(e) }} />
              </div>
            </div>
          </div>
          <div className="row d-flex justify-content-center mb-15px">
            <div className="col-md-6">
              <div className="labelName">
                <label className="control-label">ZipExtn:</label>
                <input type="text" className='form-control' name='ZipExtn' value={reconStateAL?.ZipExtn} onChange={(e) => { handleReconStateAL(e) }} />
              </div>
            </div>
            <div className="col-md-6"></div>
          </div>
        </> :
        <></>
      }
    </>
  )
}
export default ReconStateAL