import React from 'react'
import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { TINType } from '../utils/constants' //Importing static values from utils

// Request Recipient Modal
const Recipient = ({ businessName, TIN, handleRequest, setInputData }) => {

  // Initializing state for Recipient input fields
  const [inputFields, setInputFields] = useState([{
    SequenceId: '',
    Name: '',
    TIN: '',
    TINType: ''
  }])

  setInputData(inputFields)

  // Storing key values of TIN Type into new array for Dropdown
  const TINTypeOptions = []
  for (const key in TINType) {
    TINTypeOptions.push({
      value: TINType[key],
      label: TINType[key],
      key: key,
    })
  }

  // Function to handle add recipient
  const addInputField = () => {
    setInputFields([...inputFields, {
      SequenceId: '',
      Name: '',
      TIN: '',
      TINType: ''
    }])
  }

  //To navigate between pages using useNavigate Hook
  const navigate = useNavigate()

  // Function for navigating to List page
  const navigateToListBusiness = () => {
    navigate('/list')
  }

  //Function to handle remove recipient
  const removeInputFields = (index) => {
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
    <div className='container mt-5'>
      {/* <div class="fs-20 text-dark p-3"> */}
      <div class=" fs-20 text-dark align-text-center"><h1 class="head-1 ">Request TIN Matching</h1> </div>
      <div className="d-flex  align-items-center fs-20 text-dark">
        <h1 class="head-1 me-3">{businessName}</h1> <span class="text-muted fs-14"> ( {TIN?.length > 10 ? 'SSN' : 'EIN'} : {TIN} )</span>
      </div>
      <div className="heading-bottom-line position-relative pb-0  mb-3"></div>

      <div className="table-responsive overflow-hidden">
        <div className="fs-6 mb-2 mt-1"><b>Note:</b> In Sandbox, any TINs that ends with three zeros will return the status as "Failed". The status of all other TINs will be "Success"</div>
        <table className="table table-bordered text-field-table w-100 mx-auto">
          <thead>
            <tr className="bg-gray">
              <th className="fw-500 text-dark" width="75px" scope="col">S.NO</th>
              <th className="fw-500 text-dark" scope="col"><span className="text-danger">*</span>Sequence Id</th>
              <th className="fw-500 text-dark" scope="col"><span className="text-danger">*</span>Recipient Name</th>
              <th className="fw-500 text-dark position-relative" scope="col"><span className="text-danger">*</span>TIN Type </th>
              <th className="fw-500 text-dark" scope="col"><span className="text-danger">*</span>TIN</th>
              <th className="fw-500 text-dark text-center" scope="col" width="75px"></th>
            </tr>
          </thead>
          <tbody>
            {
              inputFields?.map((data, index) => {
                const { SequenceId, Name, TIN, TINType } = data
                return (
                  <>
                    <tr className="align-middle">
                      <td className="text-center">{index + 1}
                      </td>
                      <td>
                        <div className=" error">
                          <input type="text" className="form-control" id="floatingInput" onChange={(e) => handleChange(index, e)} value={SequenceId} name="SequenceId" placeholder="Sequence Id" />
                        </div>
                      </td>
                      <td>
                        <div className=" error">
                          <input type="text" className="form-control" id="floatingInput" onChange={(e) => handleChange(index, e)} value={Name} name="Name" placeholder="Recipient Name" />
                        </div>

                      </td>
                      <td>
                        <div className=" error">
                          <select className="form-control form-select" value={TINType} name="TINType" onChange={(e) => handleChange(index, e)}>
                            {TINTypeOptions?.map((TINTypeOption, index) => {
                              return <option key={TINTypeOption?.key} selected={TINTypeOption?.key === inputFields.TINType ? `selected` : ``} value={TINTypeOption?.label}>
                                {TINTypeOption?.label}
                              </option>
                            })}
                          </select>
                        </div>

                      </td>
                      <td>
                        <div className=" error">
                          <input type="text" className="form-control" id="floatingInput" onChange={(e) => handleChange(index, e)} value={TIN} name="TIN" placeholder="TIN" />
                        </div>

                      </td>
                      <td>
                        {(inputFields?.length !== 1) ?
                          <button type="button" onClick={()=>{removeInputFields(index)}} className="btn-rounded-hover rounded-circle p-2 lh-1"><i className="mdi mdi-delete-outline text-muted fs-4" data-bs-toggle="tooltip" data-bs-placement="bottom" role="button" aria-label="delete" data-bs-original-title="delete" title="Delete"></i>
                          </button> : ''}
                      </td>
                    </tr>
                  </>
                )
              })
            }
            <tr>
              <td>
                <button type="button" onClick={addInputField} className="btn-rounded-hover rounded-circle lh-1"><i className="mdi mdi-plus-circle-outline text-muted fs-4" data-bs-toggle="tooltip" data-bs-placement="bottom" role="button" aria-label="delete" data-bs-original-title="Add"  title="Add"></i>
                </button>
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <button className='btn_back btn-md fw-500' onClick={navigateToListBusiness}>Back</button>
        <button type='submit' className='btn btn_primary btn-md shadow fw-500 text-white' onClick={handleRequest}>Submit</button>
      </div>
    </div>
  )
}

export default Recipient