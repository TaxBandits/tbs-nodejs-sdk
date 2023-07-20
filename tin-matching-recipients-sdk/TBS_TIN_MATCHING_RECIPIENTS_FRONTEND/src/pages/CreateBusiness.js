import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios' // Importing Axios to make HTTP calls.
import * as bootstrap from 'bootstrap/dist/js/bootstrap' // Importing bootstrap for bootstrap modal
import logo from '../images/tbsLogo.png' // Importing Images
import Spinner from '../components/Spinner' // Importing spinner for loader
import { countries, states, statesShort, countryShorts, businessType, businessTypeShorts, EstateBusinessMembers, PartnershipBusinessMembers, SoleProprietorshipBusinessMembers, ExemptOrganizationBusinessMembers, CorporationBusinessMembers, kindOfEmployer, kindOfPayer } from '../utils/constants' // Importing static values from utils
import BusinessErrorModal from '../components/BusinessErrorModal' // Importing Error Modal
import BusinessSuccessModal from '../components/BusinessSuccessModal' // Importing Success Modal

//Create Business Page.
const CreateBusiness = () => {
    //To navigate between pages using useNavigate Hook
    const navigate = useNavigate()

    // To navigate to List page
    const navigateToBusinessList = () => {
        navigate('/list')
    }

    //State
    const [loading, setLoading] = useState(false) // Initializing state for loading
    const [errorData, setErroData] = useState([]) // Initializing state for error response modal
    const [successData, setSuccessData] = useState([]) // Initializing state for success response modal
    const [options, setOptions] = useState([]) // Initializing state for business member type options
    // Defining state for create business details
    const [businessDetails, setBusinessDetails] = useState({
        BusinessName: "",
        PayerRef: "",
        TradeName: "",
        EINOrSSN: "",
        IsEIN: false,
        EmailAddress: "",
        ContactName: "",
        Phone: "",
        PhoneExtn: "",
        Fax: "",
        BusinessType: "",
        BusinessMemberType: "",
        IsBusinessTerminated: false,
        SigningAuthorityName: "",
        SigningAuthorityPhone: "",
        KindOfEmployer: "",
        KindOfPayer: "",
        Address1: "",
        Address2: "",
        IsForeign: false,
        City: "",
        State: "",
        ProvinceOrStateNm: "",
        ZipCode: "",
        PostalCode: "",
        Country: ""
    })

    // Storing key values of Business Type into new array for Dropdown
    const businessTypeOptions = []
    for (const key in businessType) {
        businessTypeOptions.push({
            value: businessType[key],
            label: businessType[key],
            key: key,
            code: businessTypeShorts[key]
        })
    }

    // Storing key values of Kind of Employer into new array for Dropdown
    const kindOfEmployerOptions = []
    for (const key in kindOfEmployer) {
        kindOfEmployerOptions.push({
            value: kindOfEmployer[key],
            label: kindOfEmployer[key],
            key: key,
        })
    }

    // Storing key values of Kind of Payer into new array for Dropdown
    const kindOfPayerOptions = []
    for (const key in kindOfPayer) {
        kindOfPayerOptions.push({
            value: kindOfPayer[key],
            label: kindOfPayer[key],
            key: key,
        })
    }

    // Storing key values of States into new array for Dropdown
    const statesOptions = []
    for (const key in states) {
        statesOptions.push({
            value: states[key],
            label: states[key],
            key: key,
            code: statesShort[key]
        })
    }

    // Storing key values of Countries into new array for Dropdown
    const countriesOptions = []
    for (const key in countries) {
        countriesOptions.push({
            value: countries[key],
            label: countries[key],
            key: key,
            code: countryShorts[key]
        })
    }

    // To create business by passing input data from state to create business API
    const handleCreateBusinessSubmit = async (e) => {
        try {
            e.preventDefault()
            setLoading(true)
            const requestData = {
                BusinessNm: businessDetails?.BusinessName,
                PayerRef: businessDetails?.PayerRef,
                TradeNm: businessDetails?.TradeName,
                EINorSSN: businessDetails?.EINOrSSN,
                IsEIN: businessDetails?.IsEIN,
                Email: businessDetails?.EmailAddress,
                ContactNm: businessDetails?.ContactName,
                Phone: businessDetails?.Phone,
                PhoneExtn: businessDetails?.PhoneExtn,
                Fax: businessDetails?.Fax,
                BusinessType: businessDetails?.BusinessType,
                SigningAuthority: {
                    Name: businessDetails?.SigningAuthorityName,
                    Phone: businessDetails?.SigningAuthorityPhone,
                    BusinessMemberType: businessDetails?.BusinessMemberType,
                },
                IsBusinessTerminated: businessDetails?.IsBusinessTerminated,
                KindOfEmployer: businessDetails?.KindOfEmployer,
                KindOfPayer: businessDetails?.KindOfPayer,
                IsForeign: businessDetails?.IsForeign,
                USAddress: {
                    Address1: businessDetails?.IsForeign === false ? businessDetails?.Address1 : "",
                    Address2: businessDetails?.IsForeign === false ? businessDetails?.Address2 : "",
                    City: businessDetails?.IsForeign === false ? businessDetails?.City : "",
                    State: businessDetails?.IsForeign === false ? businessDetails?.State : "",
                    ZipCd: businessDetails?.IsForeign === false ? businessDetails?.ZipCode : "",
                },
                ForeignAddress: {
                    Address1: businessDetails?.IsForeign === true ? businessDetails?.Address1 : "",
                    Address2: businessDetails?.IsForeign === true ? businessDetails?.Address2 : "",
                    City: businessDetails?.IsForeign === true ? businessDetails?.City : "",
                    ProvinceOrStateNm: businessDetails?.IsForeign === true ? businessDetails?.ProvinceOrStateNm : "",
                    Country: businessDetails?.IsForeign === true ? businessDetails?.Country : "",
                    PostalCd: businessDetails?.IsForeign === true ? businessDetails?.PostalCode : "",
                }
            }

            const createBusinessResponse = await axios.post(`${process.env.REACT_APP_TBS_TIN_MATCHING_RECIPIENTS_BACKEND_URL}/Business/Create`, requestData)

            //When 200 from the Create Business
            if (createBusinessResponse?.data?.StatusCode === 200) {
                setBusinessDetails({
                    BusinessName: "",
                    PayerRef: "",
                    TradeName: "",
                    EINOrSSN: "",
                    IsEIN: false,
                    EmailAddress: "",
                    ContactName: "",
                    Phone: "",
                    PhoneExtn: "",
                    Fax: "",
                    BusinessType: "",
                    BusinessMemberType: "",
                    IsBusinessTerminated: false,
                    SigningAuthorityName: "",
                    SigningAuthorityPhone: "",
                    KindOfEmployer: "",
                    KindOfPayer: "",
                    Address1: "",
                    Address2: "",
                    IsForeign: false,
                    City: "",
                    State: "",
                    ProvinceOrStateNm: "",
                    ZipCode: "",
                    PostalCode: "",
                    Country: "",
                })

                setSuccessData(createBusinessResponse?.data)

                //Modal to show the Success or Failure Response from the Business/Create Endpoint.
                let awaitingModal = new bootstrap.Modal(document.getElementById('successModal'))
                awaitingModal.show()
            }
        } catch (e) {
            if (e?.response?.data?.StatusMessage === "Validation error has occurred") {
                const errorResponse = {
                    statusCode: e?.response?.data?.StatusCode,
                    statusName: e?.response?.data?.StatusName,
                    statusMessage: e?.response?.data?.StatusMessage,
                    Errors: e?.response?.data?.Errors
                }

                setErroData(errorResponse)
            } else if (e?.response?.data?.message === "Please fill all the required") {
                const errorResponse = {
                    statusCode: e?.response?.data?.statusCode,
                    statusName: e?.response?.data?.status,
                    statusMessage: e?.response?.data?.message,
                    Errors: ""
                }

                setErroData(errorResponse)
            }

            //Modal to show the Success or Failure Response from the Business/Create Endpoint.
            let awaitingModal = new bootstrap.Modal(document.getElementById('errorModal'))
            awaitingModal.show()
        }

        setLoading(false)
    }

    // Handle onchange function for input values
    const handleChangeValidation = (e) => {
        const { name, value, checked } = e.target

        if (name === "IsEIN" || name === "IsBusinessTerminated") {
            if (checked === true) {
                setBusinessDetails({
                    ...businessDetails,
                    [name]: checked
                })
            } else if (checked === false) {
                setBusinessDetails({
                    ...businessDetails,
                    [name]: checked
                })
            }
        } else if (name === "IsForeign") {
            if (checked === true) {
                setBusinessDetails({
                    ...businessDetails,
                    Address1: "",
                    Address2: "",
                    City: "",
                    ProvinceOrStateNm: "",
                    PostalCode: "",
                    Country: "",
                    [name]: checked
                })
            } else if (checked === false) {
                setBusinessDetails({
                    ...businessDetails,
                    Address1: "",
                    Address2: "",
                    City: "",
                    State: "",
                    ZipCode: "",
                    [name]: checked
                })
            }
        } else if (name === "BusinessType") {
            // Storing key values of Business Member Type into new array
            let businessMemberTypeOptions = []
            setBusinessDetails({
                ...businessDetails,
                BusinessType: value,
                BusinessMemberType: ""
            })

            if (value === "ESTE") {
                for (const key in EstateBusinessMembers) {
                    businessMemberTypeOptions.push({
                        value: EstateBusinessMembers[key],
                        label: EstateBusinessMembers[key],
                        key: key,
                    })
                }
            } else if (value === "PART") {
                for (const key in PartnershipBusinessMembers) {
                    businessMemberTypeOptions.push({
                        value: PartnershipBusinessMembers[key],
                        label: PartnershipBusinessMembers[key],
                        key: key,
                    })
                }
            } else if (value === "CORP") {
                for (const key in CorporationBusinessMembers) {
                    businessMemberTypeOptions.push({
                        value: CorporationBusinessMembers[key],
                        label: CorporationBusinessMembers[key],
                        key: key,
                    })
                }
            } else if (value === "EORG") {
                for (const key in ExemptOrganizationBusinessMembers) {
                    businessMemberTypeOptions.push({
                        value: ExemptOrganizationBusinessMembers[key],
                        label: ExemptOrganizationBusinessMembers[key],
                        key: key,
                    })
                }
            } else if (value === "SPRO") {
                for (const key in SoleProprietorshipBusinessMembers) {
                    businessMemberTypeOptions.push({
                        value: SoleProprietorshipBusinessMembers[key],
                        label: SoleProprietorshipBusinessMembers[key],
                        key: key,
                    })
                }
            }

            setOptions(businessMemberTypeOptions)
        } else {
            setBusinessDetails({
                ...businessDetails,
                [name]: value
            })
        }
    }

    return (
        <>
            <div className="header text-center mt-3 mb-3">
                <img src={logo} alt="tbsLogo" />
            </div>
            
            {/*Checks loader state and displays spinner component*/}
            {loading === true &&
                <div className='mt-3'>
                    <Spinner />
                </div>
            }

            <div className="container">
                <div className="w-75 m-auto">
                    <div className="border-1 border rounded-2 pb-4">
                        <h2 className="head-h1 px-12px">Create Business</h2>
                        <form className='form d-block' onSubmit={handleCreateBusinessSubmit}>

                            <div className="row d-flex justify-content-center mb-15px">
                                <div className="col-md-5">
                                    <div className="labelName">
                                        <label className="control-label"><span className="text-danger">*</span>Business Name:</label>
                                        <input type="text" className='form-control' name='BusinessName' value={businessDetails?.BusinessName} onChange={(e) => { handleChangeValidation(e) }} />
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div className="labelName">
                                        <label className="control-label"><span className="text-danger"></span>Payer Ref:</label>
                                        <input type="text" className='form-control' name='PayerRef' value={businessDetails?.PayerRef} onChange={(e) => { handleChangeValidation(e) }} />
                                    </div>
                                </div>
                            </div>

                            <div className="row d-flex justify-content-center mb-15px">
                                <div className="col-md-5">
                                    <div className="labelName">
                                        <label className="control-label"><span className="text-danger"></span>Trade Name:</label>
                                        <input type="text" className='form-control' name='TradeName' value={businessDetails?.TradeName} onChange={(e) => { handleChangeValidation(e) }} />

                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div className="labelName">
                                        <label className="control-label"><span className="text-danger">*</span>EIN or SSN:</label>
                                        <span className='m-3'><input className="form-check-input cursor-pointer" type="checkbox" name='IsEIN' value={businessDetails?.IsEIN} onClick={(e) => { handleChangeValidation(e) }} checked={businessDetails?.IsEIN} /> Is EIN?</span>
                                        <input type="text" className='form-control' name='EINOrSSN' value={businessDetails?.EINOrSSN} maxLength="9" onChange={(e) => { handleChangeValidation(e) }} />
                                    </div>
                                </div>
                            </div>

                            <div className="row d-flex justify-content-center mb-15px">
                                <div className="col-md-5">
                                    <div className="labelName">
                                        <label className="control-label"><span className="text-danger">*</span>Email Address:</label>
                                        <input type="text" className='form-control' name='EmailAddress' value={businessDetails?.EmailAddress} onChange={(e) => { handleChangeValidation(e) }} />

                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div className="labelName">
                                        <label className="control-label"><span className="text-danger"></span>Contact Name:</label>
                                        <input type="text" className='form-control' name='ContactName' value={businessDetails?.ContactName} onChange={(e) => { handleChangeValidation(e) }} />
                                    </div>
                                </div>
                            </div>

                            <div className="row d-flex justify-content-center mb-15px">
                                <div className="col-md-5">
                                    <div className="labelName">
                                        <label className="control-label"><span className="text-danger">*</span>Phone:</label>
                                        <input type="text" className='form-control' name='Phone' value={businessDetails?.Phone} v maxLength="10" onChange={(e) => { handleChangeValidation(e) }} />

                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div className="labelName">
                                        <label className="control-label"><span className="text-danger"></span>Phone Extn:</label>
                                        <input type="text" className='form-control' name='PhoneExtn' value={businessDetails?.PhoneExtn} maxLength="5" onChange={(e) => { handleChangeValidation(e) }} />
                                    </div>
                                </div>
                            </div>

                            <div className="row d-flex justify-content-center mb-15px">
                                <div className="col-md-5">
                                    <div className="labelName">
                                        <label className="control-label"><span className="text-danger"></span>Fax:</label>
                                        <input type="text" className='form-control' name='Fax' value={businessDetails?.Fax} maxLength="10" onChange={(e) => { handleChangeValidation(e) }} />

                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div className="labelName">
                                        <label className="control-label"><span className="text-danger">*</span>Business Type:</label>
                                        <select className="form-control form-select" name='BusinessType' onChange={(e) => { handleChangeValidation(e) }} >
                                            {businessTypeOptions?.map((businessTypeOption, index) => {
                                                return <option key={index} selected={businessTypeOption?.code === businessDetails?.BusinessType ? `selected` : ``} value={businessTypeOption?.code}>
                                                    {businessTypeOption?.label}
                                                </option>
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="row d-flex justify-content-center mb-15px">
                                <div className="col-md-5">
                                    <div className="labelName">
                                        <label className="control-label"><span className="text-danger"></span>Business Member Type:</label>
                                        <select className="form-control form-select" name='BusinessMemberType' value={businessDetails?.BusinessMemberType} onChange={(e) => { handleChangeValidation(e) }}>
                                            {options?.map((businessMemberTypeOption, index) => {
                                                return <option key={index} selected={businessMemberTypeOption?.key === businessDetails?.BusinessMemberType ? `selected` : ``} value={businessMemberTypeOption?.label}>
                                                    {businessMemberTypeOption?.label}
                                                </option>
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div className="labelName">
                                        <label className="control-label"><span className="text-danger"></span>Signing Authority Name:</label>
                                        <input type="text" className='form-control' name='SigningAuthorityName' value={businessDetails?.SigningAuthorityName} onChange={(e) => { handleChangeValidation(e) }} />
                                    </div>
                                </div>
                            </div>

                            <div className="row d-flex justify-content-center mb-15px">
                                <div className="col-md-5">
                                    <div className="labelName">
                                        <label className="control-label"><span className="text-danger"></span>Signing Authority Phone:</label>
                                        <input type="text" className='form-control' name='SigningAuthorityPhone' maxLength="10" value={businessDetails?.SigningAuthorityPhone} onChange={(e) => { handleChangeValidation(e) }} />
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div className="labelName">
                                        <label className="control-label">Kind Of Employer:</label>
                                        <select className="form-control form-select" name='KindOfEmployer' value={businessDetails?.KindOfEmployer} onChange={(e) => { handleChangeValidation(e) }} >
                                            {kindOfEmployerOptions?.map((kindOfEmployerOption, index) => {
                                                return <option key={kindOfEmployerOption?.key} selected={kindOfEmployerOption?.key === businessDetails?.KindOfEmployer ? `selected` : ``} value={kindOfEmployerOption?.label}>
                                                    {kindOfEmployerOption?.label}
                                                </option>
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="row d-flex justify-content-center mb-15px">
                                <div className="col-md-5">
                                    <span style={{ marginLeft: "10px" }}></span>
                                    <div className="labelName">
                                        <label className="control-label">Kind Of Payer:</label>
                                        <select className="form-control form-select" name='KindOfPayer' value={businessDetails?.KindOfPayer} onChange={(e) => { handleChangeValidation(e) }} >
                                            {kindOfPayerOptions?.map((kindOfPayerOption, index) => {
                                                return <option key={kindOfPayerOption?.key} selected={kindOfPayerOption?.key === businessDetails?.KindOfPayer ? `selected` : ``} value={kindOfPayerOption?.label}>
                                                    {kindOfPayerOption?.label}
                                                </option>
                                            })}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <span><input className="form-check-input cursor-pointer" type="checkbox" name='IsForeign' style={{ marginLeft: "10px" }} onClick={(e) => { handleChangeValidation(e) }} checked={businessDetails?.IsForeign} /> Is Foreign?</span>
                                    <div className="labelName">
                                        <label className="control-label"><span className="text-danger">*</span>Address 1:</label>
                                        <input type="text" className='form-control' name='Address1' value={businessDetails?.Address1} onChange={(e) => { handleChangeValidation(e) }} />
                                    </div>
                                </div>
                            </div>

                            <div className="row d-flex justify-content-center mb-15px">
                                <div className="col-md-5">
                                    <div className="labelName">
                                        <label className="control-label"><span className="text-danger"></span>Address 2:</label>
                                        <input type="text" className='form-control' name='Address2' value={businessDetails?.Address2} onChange={(e) => { handleChangeValidation(e) }} />
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div className="labelName">
                                        <label className="control-label"><span className="text-danger">*</span>City:</label>
                                        <input type="text" className='form-control' name='City' value={businessDetails?.City} onChange={(e) => { handleChangeValidation(e) }} />
                                    </div>
                                </div>
                            </div>

                            {businessDetails.IsForeign === true ?
                                <>
                                    <div className="row d-flex justify-content-center mb-15px">
                                        <div className="col-md-5">
                                            <div className="labelName">
                                                <label className="control-label"><span className="text-danger">*</span>Country:</label>
                                                <select className="form-control form-select" name='Country' onChange={(e) => { handleChangeValidation(e) }} >
                                                    {countriesOptions?.map((countryOption, index) => {
                                                        return <option key={index} selected={countryOption?.code === businessDetails?.Country ? `selected` : ``} value={countryOption?.code}>
                                                            {countryOption?.label}
                                                        </option>
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-5">
                                            <div className="labelName">
                                                <label className="control-label"><span className="text-danger">*</span>ProvinceOrStateNm:</label>
                                                <input type="text" className='form-control' name='ProvinceOrStateNm' value={businessDetails?.ProvinceOrStateNm} onChange={(e) => { handleChangeValidation(e) }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row d-flex justify-content-center mb-15px">
                                        <div className="col-md-5">
                                            <div className="labelName">
                                                <label className="control-label"><span className="text-danger">*</span>Postal Code:</label>
                                                <input type="text" className='form-control' name='PostalCode' value={businessDetails?.PostalCode} onChange={(e) => { handleChangeValidation(e) }} />
                                            </div>
                                        </div>
                                        <div className="col-md-5">
                                        </div>
                                    </div>
                                </> :
                                <>
                                    <div className="row d-flex justify-content-center mb-15px">
                                        <div className="col-md-5">
                                            <div className="labelName">
                                                <label className="control-label"><span className="text-danger">*</span>State:</label>
                                                <select className="form-control form-select" name='State' onChange={(e) => { handleChangeValidation(e) }} >
                                                    {statesOptions?.map((stateOption, index) => {
                                                        return <option key={index} selected={stateOption?.code === businessDetails?.State ? `selected` : ``} value={stateOption?.code}>
                                                            {stateOption?.label}
                                                        </option>
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-5">
                                            <div className="labelName">
                                                <label className="control-label"><span className="text-danger">*</span>Zip Code:</label>
                                                <input type="text" className='form-control' name='ZipCode' value={businessDetails?.ZipCode} onChange={(e) => { handleChangeValidation(e) }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row d-flex justify-content-center mb-15px">
                                        <div className="col-md-5">
                                        </div>
                                        <div className="col-md-5">
                                        </div>
                                    </div>
                                </>
                            }
                            <div className="text-center p-10">
                                <button type="submit" className="btn btn_primary btn_lg">
                                    Create Business
                                    <i className="fa fa-spinner fa-spin" aria-hidden="true" id="CreateSpinner" style={{ "display": "none" }}></i>
                                </button>
                            </div>
                        </form>
                    </div>
                    <button className='btn_back mt-3 mb-3' onClick={navigateToBusinessList} >Back</button>
                </div>
            </div>

            <BusinessErrorModal
                errorData={errorData} //Error Modal for Create Business
            />
            <BusinessSuccessModal
                successData={successData} //Success Modal for Create Business
            />
        </>
    )
}

export default CreateBusiness