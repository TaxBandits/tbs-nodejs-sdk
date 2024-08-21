import React, { useEffect } from 'react'
import {useState} from 'react'
import * as bootstrap from 'bootstrap/dist/js/bootstrap' // Importing bootstrap for bootstrap modal
import axios from 'axios' // Importing Axios to make HTTP calls.
import logo from '../images/tbsLogo.png' // Importing Images
import {useNavigate,useParams} from 'react-router-dom'
import {countries, suffix, states, statesShort, countryShorts, businessType, businessTypeShorts, EstateBusinessMembers, PartnershipBusinessMembers, SoleProprietorshipBusinessMembers, ExemptOrganizationBusinessMembers, CorporationBusinessMembers, kindOfEmployer, kindOfPayer} from '../utils/constants' // Importing static values from utils
import ErrorModal from '../components/ErrorModal' // Importing Error Modal
import SuccessModal from '../components/SuccessModal' // Importing Success Modal
import Spinner from '../components/Spinner'

const UpdateBusiness = () => {

    // Calling get business by Id function in Use Effect
    useEffect(()=>{
        getBusinessById(businessId) 
    }, [])

    // Getting businessId from params
    const {businessId} = useParams()
     
    //To navigate between pages using useNavigate Hook
    const navigate = useNavigate()

    // Defining function for navigating to previous page
    const navigateToList = () => {
        navigate('/list')
    }

    //States
    const [loading, setLoading] = useState(false)
    const [options,setOptions] = useState([]) //Initializing state for business member type options
    const [errorData,setErroData] = useState([]) // Initializing state for error response modal
    const [successData,setSuccessData] = useState([]) // Initializing state for error response modal
    // Defining state for edit business
    const [editBusinessDetails,setEditBusinessDetails] = useState({
        BusinessId : "",
        BusinessName : "",
        FirstNm:"",
        MiddleNm:"",
        LastNm:"",
        Suffix:"",
        PayerRef : "",
        TradeName : "",
        EINOrSSN : "",
        IsEIN : false,
        EmailAddress : "",
        ContactName : "",
        Phone : "",
        PhoneExtn : "",
        Fax : "",
        BusinessType : "",
        BusinessMemberType : "",
        IsBusinessTerminated : false,
        SigningAuthorityName : "",
        SigningAuthorityPhone : "",
        KindOfEmployer : "",
        KindOfPayer : "",
        Address1 : "",
        Address2 : "",
        IsForeign : false,
        City : "",
        State : "",
        ProvinceOrStateNm : "",
        ZipCode : "",
        PostalCode : "",
        Country : ""
    })

    // Storing key values of Business Type into new array
    const businessTypeOptions = []
    for (const key in businessType) {
        businessTypeOptions.push({
        value: businessType[key],
        label: businessType[key],
        key: key,
        code: businessTypeShorts[key]
      })
    }

    // Storing key values of Kind of Employer into new array
    const kindOfEmployerOptions = []
    for (const key in kindOfEmployer) {
        kindOfEmployerOptions.push({
        value: kindOfEmployer[key],
        label: kindOfEmployer[key],
        key: key,
      })
    }

    // Storing key values of Kind of Payer into new array
    const kindOfPayerOptions = []
    for (const key in kindOfPayer) {
        kindOfPayerOptions.push({
        value: kindOfPayer[key],
        label: kindOfPayer[key],
        key: key,
      })
    }

    // Storing key values of States into new array
    const statesOptions = []
    for (const key in states) {
      statesOptions.push({
        value: states[key],
        label: states[key],
        key: key,
        code: statesShort[key]
      })
    }

    // Storing key values of Countries into new array
    const countriesOptions = []
    for (const key in countries) {
      countriesOptions.push({
        value: countries[key],
        label: countries[key],
        key: key,
        code: countryShorts[key]
      })
    }

     // Storing key values of suffix into new array for Dropdown
     const suffixOptions = []
     for (const key in suffix) {
         suffixOptions.push({
             value: suffix[key],
             label: suffix[key],
             key: key,
         })
     }

    // To get business by Id by requesting get business API
    const getBusinessById = async (businessId) =>{
        try {
            setLoading(true);
            const getBusinessResponse = await axios.get(`${process.env.REACT_APP_TBS_BUSINESS_BACKEND_URL}/Business/Get/${businessId}`)

            if (getBusinessResponse?.data?.StatusCode === 200) {
                const businessDetails = getBusinessResponse?.data?.Business;

                setEditBusinessDetails({
                    BusinessId: businessDetails?.BusinessId,
                    BusinessName: businessDetails?.BusinessNm,
                    FirstNm: businessDetails?.FirstNm,
                    MiddleNm: businessDetails?.MiddleNm,
                    LastNm: businessDetails?.LastNm,
                    Suffix: businessDetails?.Suffix,
                    PayerRef: businessDetails?.PayerRef,
                    TradeName: businessDetails?.TradeNm,
                    EINOrSSN: businessDetails?.EINorSSN,
                    IsEIN: businessDetails?.IsEIN,
                    EmailAddress: businessDetails?.Email,
                    ContactName: businessDetails?.ContactNm,
                    Phone: businessDetails?.Phone,
                    PhoneExtn: businessDetails?.PhoneExtn,
                    Fax: businessDetails?.Fax,
                    BusinessType: businessDetails?.BusinessType,
                    BusinessMemberType: businessDetails?.SigningAuthority?.BusinessMemberType,
                    IsBusinessTerminated: businessDetails?.IsBusinessTerminated,
                    SigningAuthorityName: businessDetails?.SigningAuthority?.Name,
                    SigningAuthorityPhone: businessDetails?.SigningAuthority?.Phone,
                    KindOfEmployer: businessDetails?.KindOfEmployer,
                    KindOfPayer: businessDetails?.KindOfPayer,
                    Address1: businessDetails?.IsForeign === true ? businessDetails?.ForeignAddress?.Address1 : businessDetails?.USAddress?.Address1,
                    Address2: businessDetails?.IsForeign === true ? businessDetails?.ForeignAddress?.Address2 : businessDetails?.USAddress?.Address2,
                    IsForeign: businessDetails?.IsForeign,
                    City: businessDetails?.IsForeign === true ? businessDetails?.ForeignAddress?.City : businessDetails?.USAddress?.City,
                    State: businessDetails?.IsForeign === true ? "" : businessDetails?.USAddress?.State,
                    ProvinceOrStateNm: businessDetails?.IsForeign === true ? businessDetails?.ForeignAddress?.ProvinceOrStateNm : "",
                    ZipCode: businessDetails?.IsForeign === true ? "" : businessDetails?.USAddress?.ZipCd,
                    PostalCode: businessDetails?.IsForeign === true ? businessDetails?.ForeignAddress?.PostalCd : "",
                    Country: businessDetails?.IsForeign === true ? businessDetails?.ForeignAddress?.Country : ""
                })

                let businessMemberTypeOptions = []
                if (businessDetails?.BusinessType === "ESTE") {
                    for (const key in EstateBusinessMembers) {
                        businessMemberTypeOptions.push({
                            value: EstateBusinessMembers[key],
                            label: EstateBusinessMembers[key],
                            key: key
                        })
                    }
                } else if (businessDetails?.BusinessType === "PART") {
                    for (const key in PartnershipBusinessMembers) {
                        businessMemberTypeOptions.push({
                            value: PartnershipBusinessMembers[key],
                            label: PartnershipBusinessMembers[key],
                            key: key
                        })
                    }
                } else if (businessDetails?.BusinessType === "CORP") {
                    for (const key in CorporationBusinessMembers) {
                        businessMemberTypeOptions.push({
                            value: CorporationBusinessMembers[key],
                            label: CorporationBusinessMembers[key],
                            key: key
                        })
                    }
                } else if (businessDetails?.BusinessType === "EORG") {
                    for (const key in ExemptOrganizationBusinessMembers) {
                        businessMemberTypeOptions.push({
                            value: ExemptOrganizationBusinessMembers[key],
                            label: ExemptOrganizationBusinessMembers[key],
                            key: key
                        })
                    }
                } else if (businessDetails?.BusinessType === "SPRO") {
                    for (const key in SoleProprietorshipBusinessMembers) {
                        businessMemberTypeOptions.push({
                            value: SoleProprietorshipBusinessMembers[key],
                            label: SoleProprietorshipBusinessMembers[key],
                            key: key
                        })
                    }
                }
                
                setOptions(businessMemberTypeOptions)
            }
            setLoading(false);
        } catch (e) {
            setLoading(false);
            throw e;
        }
    }

    // To edit business by passing input data from state to edit business API
    const handleEditBusinessSubmit = async (e) => {
        e.preventDefault()

        try {
            setLoading(true)
            const requestData = {
                BusinessId: editBusinessDetails?.BusinessId,
                BusinessNm: editBusinessDetails?.BusinessName,
                FirstNm: editBusinessDetails?.FirstNm,
                MiddleNm: editBusinessDetails?.MiddleNm,
                LastNm: editBusinessDetails?.LastNm,
                Suffix: editBusinessDetails?.Suffix,
                PayerRef: editBusinessDetails?.PayerRef,
                TradeNm: editBusinessDetails?.TradeName,
                EINorSSN: editBusinessDetails?.EINOrSSN,
                IsEIN: editBusinessDetails?.IsEIN,
                Email: editBusinessDetails?.EmailAddress,
                ContactNm: editBusinessDetails?.ContactName,
                Phone: editBusinessDetails?.Phone,
                PhoneExtn: editBusinessDetails?.PhoneExtn,
                Fax: editBusinessDetails?.Fax,
                BusinessType: editBusinessDetails?.BusinessType,
                SigningAuthority: {
                    Name: editBusinessDetails?.SigningAuthorityName,
                    Phone: editBusinessDetails?.SigningAuthorityPhone,
                    BusinessMemberType: editBusinessDetails?.BusinessMemberType,
                },
                IsBusinessTerminated: editBusinessDetails?.IsBusinessTerminated,
                KindOfEmployer: editBusinessDetails?.KindOfEmployer,
                KindOfPayer: editBusinessDetails?.KindOfPayer,
                IsForeign: editBusinessDetails?.IsForeign,
                USAddress: {
                    Address1: !editBusinessDetails?.IsForeign ? editBusinessDetails?.Address1 : "",
                    Address2: !editBusinessDetails?.IsForeign ? editBusinessDetails?.Address2 : "",
                    City: !editBusinessDetails?.IsForeign ? editBusinessDetails?.City : "",
                    State: !editBusinessDetails?.IsForeign ? editBusinessDetails?.State : "",
                    ZipCd: !editBusinessDetails?.IsForeign ? editBusinessDetails?.ZipCode : "",
                },
                ForeignAddress: {
                    Address1: editBusinessDetails?.IsForeign ? editBusinessDetails?.Address1 : "",
                    Address2: editBusinessDetails?.IsForeign ? editBusinessDetails?.Address2 : "",
                    City: editBusinessDetails?.IsForeign ? editBusinessDetails?.City : "",
                    ProvinceOrStateNm: editBusinessDetails?.IsForeign ? editBusinessDetails?.ProvinceOrStateNm : "",
                    Country: editBusinessDetails?.IsForeign ? editBusinessDetails?.Country : "",
                    PostalCd: editBusinessDetails?.IsForeign ? editBusinessDetails?.PostalCode : "",
                }
            }

            const updateBusinessResponse = await axios.put(`${process.env.REACT_APP_TBS_BUSINESS_BACKEND_URL}/Business/Update`, requestData)
            setSuccessData(updateBusinessResponse?.data)

            //Modal to show the Success or Failure Response from the Business/Update Endpoint.
            let awaitingModal = new bootstrap.Modal(document.getElementById('successModal'))
            awaitingModal.show()
        } catch (e) {
            if (e?.response?.data?.StatusMessage === "Validation error has occurred") {
                const errorResponse = {
                    statusCode: e?.response?.data?.StatusCode,
                    statusName: e?.response?.data?.StatusName,
                    statusMessage: e?.response?.data?.StatusMessage,
                    Errors: e?.response?.data?.Errors
                }

                setErroData(errorResponse)
            } else if (e?.response?.data?.message === "Please fill all the required fields") {
                const errorResponse = {
                    statusCode: e?.response?.data?.statusCode,
                    statusName: e?.response?.data?.status,
                    statusMessage: e?.response?.data?.message,
                    Errors: ""
                }

                setErroData(errorResponse)
            }
            //Modal to show the Success or Failure Response from the Business/Update Endpoint.
            let awaitingModal = new bootstrap.Modal(document.getElementById('errorModal'))
            awaitingModal.show()
        }
        setLoading(false)
    }

    // Handle onchange for input values
    const handleChangeValidation = (e) => {
        const { name, value, checked } = e.target

        if (name === "IsEIN" || name === "IsBusinessTerminated") {
            if (checked) {
                setEditBusinessDetails({
                    ...editBusinessDetails,
                    [name]: checked
                })
            } else if (!checked) {
                setEditBusinessDetails({
                    ...editBusinessDetails,
                    [name]: checked
                })
            }
        } else if (name === "IsForeign") {
            if (checked) {
                setEditBusinessDetails({
                    ...editBusinessDetails,
                    Address1: "",
                    Address2: "",
                    City: "",
                    ProvinceOrStateNm: "",
                    PostalCode: "",
                    Country: "",
                    [name]: checked
                })
            } else if (!checked) {
                setEditBusinessDetails({
                    ...editBusinessDetails,
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
            setEditBusinessDetails({
                ...editBusinessDetails,
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
        } else if (name === "State") {
            let stateValue = statesShort[value]
            setEditBusinessDetails({ ...editBusinessDetails, [name]: stateValue })
        } else if (name === "Country") {
            let countryValue = countryShorts[value]
            setEditBusinessDetails({ ...editBusinessDetails, [name]: countryValue })
        } else {
            setEditBusinessDetails({
                ...editBusinessDetails,
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
            {loading  &&
                <div className='mt-3'>
                    <Spinner />
                </div>
            }
            <div className="container">
                <div className="w-75 m-auto">
                    <div className="border-1 border rounded-2 pb-4">
                        <h2 className="head-h1 px-12px">Update Business Details</h2>
                        <form className='form' onSubmit={handleEditBusinessSubmit}>

                            <div className="row d-flex justify-content-center mb-15px">
                                <div className="col-md-5">
                                    <div className="labelName">
                                        <label className="control-label"><span className="text-danger"></span>Business Name:</label>
                                        <input type="text" className='form-control' name='BusinessName' value={editBusinessDetails.BusinessName} onChange={(e) => { handleChangeValidation(e) }} />
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div className="labelName">
                                        <label className="control-label"><span className="text-danger"></span>Payer Ref:</label>
                                        <input type="text" className='form-control' name='PayerRef' value={editBusinessDetails.PayerRef} onChange={(e) => { handleChangeValidation(e) }} />
                                    </div>
                                </div>
                            </div>
                            <div className="row d-flex justify-content-center mb-15px">
                                <div className="col-md-5">
                                    <div className="labelName">
                                        <label className="control-label"><span className="text-danger"></span>First Name:</label>
                                        <input type="text" className='form-control' name='FirstNm' value={editBusinessDetails?.FirstNm} onChange={(e) => { handleChangeValidation(e) }} />
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div className="labelName">
                                        <label className="control-label"><span className="text-danger"></span> Middle Name:</label>
                                        <input type="text" className='form-control' name='MiddleNm' value={editBusinessDetails?.MiddleNm} onChange={(e) => { handleChangeValidation(e) }} />
                                    </div>
                                </div>
                            </div>
                            <div className="row d-flex justify-content-center mb-15px">
                                <div className="col-md-5">
                                    <div className="labelName">
                                        <label className="control-label"><span className="text-danger"></span>Last Name:</label>
                                        <input type="text" className='form-control' name='LastNm' value={editBusinessDetails?.LastNm} onChange={(e) => { handleChangeValidation(e) }} />
                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div className="labelName">
                                        <label className="control-label"><span className="text-danger"></span>Suffix:</label>
                                        <select className='form-control form-select' name='Suffix' value={editBusinessDetails?.Suffix} onChange={(e) => { handleChangeValidation(e) }}  >
                                        {suffixOptions?.map((suffixOption, index) => {
                                          return <option key={suffixOption.key} selected={suffixOption.value == editBusinessDetails.Suffix ? `selected` : ``} value={suffixOption.label}>
                                            {suffixOption?.label}
                                          </option>
                                        })}
                                       </select>
                                    </div>
                                </div>
                            </div>

                            <div className="row d-flex justify-content-center mb-15px">
                                <div className="col-md-5">
                                    <div className="labelName">
                                        <label className="control-label"><span className="text-danger"></span>Trade Name:</label>
                                        <input type="text" className='form-control' name='TradeName' value={editBusinessDetails.TradeName} onChange={(e) => { handleChangeValidation(e) }} />

                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div className="labelName">
                                        <label className="control-label"><span className="text-danger"></span>EIN or SSN:</label>
                                        <span className='m-3'><input className="form-check-input cursor-pointer" type="checkbox" name='IsEIN' value={editBusinessDetails?.IsEIN} onClick={(e) => { handleChangeValidation(e) }} checked={editBusinessDetails?.IsEIN} /> Is EIN?</span>
                                        <input type="text" className='form-control' name='EINOrSSN' maxLength="11" value={editBusinessDetails.EINOrSSN} onChange={(e) => { handleChangeValidation(e) }} />
                                    </div>
                                </div>
                            </div>

                            <div className="row d-flex justify-content-center mb-15px">
                                <div className="col-md-5">
                                    <div className="labelName">
                                        <label className="control-label"><span className="text-danger"></span>Email Address:</label>
                                        <input type="text" className='form-control' name='EmailAddress' value={editBusinessDetails.EmailAddress} onChange={(e) => { handleChangeValidation(e) }} />

                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div className="labelName">
                                        <label className="control-label"><span className="text-danger"></span>Contact Name:</label>
                                        <input type="text" className='form-control' name='ContactName' value={editBusinessDetails.ContactName} onChange={(e) => { handleChangeValidation(e) }} />
                                    </div>
                                </div>
                            </div>

                            <div className="row d-flex justify-content-center mb-15px">
                                <div className="col-md-5">
                                    <div className="labelName">
                                        <label className="control-label"><span className="text-danger"></span>Phone:</label>
                                        <input type="text" className='form-control' name='Phone' maxLength="10" value={editBusinessDetails.Phone} onChange={(e) => { handleChangeValidation(e) }} />

                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div className="labelName">
                                        <label className="control-label"><span className="text-danger"></span>Phone Extn:</label>
                                        <input type="text" className='form-control' name='PhoneExtn' maxLength="5" value={editBusinessDetails.PhoneExtn} onChange={(e) => { handleChangeValidation(e) }} />
                                    </div>
                                </div>
                            </div>

                            <div className="row d-flex justify-content-center mb-15px">
                                <div className="col-md-5">
                                    <div className="labelName">
                                        <label className="control-label"><span className="text-danger"></span>Fax:</label>
                                        <input type="text" className='form-control' name='Fax' value={editBusinessDetails.Fax} onChange={(e) => { handleChangeValidation(e) }} />

                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div className="labelName">
                                        <label className="control-label">Business Type:</label>
                                        <select className="form-control form-select" name='BusinessType' value={editBusinessDetails.BusinessType} onChange={(e) => { handleChangeValidation(e) }}>
                                            {businessTypeOptions.map((businessTypeOption, index) => {

                                                return <option key={index} selected={businessTypeOption.code === editBusinessDetails.BusinessType ? `selected` : ``} value={businessTypeOption.code}>
                                                    {businessTypeOption.label}
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
                                        <select className="form-control form-select" name='BusinessMemberType' value={editBusinessDetails.BusinessMemberType} onChange={(e) => { handleChangeValidation(e) }}>
                                            {options.map((businessMemberTypeOption, index) => {

                                                return <option key={index} selected={businessMemberTypeOption.key === editBusinessDetails.BusinessMemberType ? `selected` : ``} value={businessMemberTypeOption.label}>
                                                    {businessMemberTypeOption.label}
                                                </option>
                                            })}
                                        </select>

                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div className="labelName">
                                        <label className="control-label"><span className="text-danger"></span>Signing Authority Name:</label>
                                        <input type="text" className='form-control' name='SigningAuthorityName' value={editBusinessDetails.SigningAuthorityName} onChange={(e) => { handleChangeValidation(e) }} />
                                    </div>
                                </div>
                            </div>

                            <div className="row d-flex justify-content-center mb-15px">
                                <div className="col-md-5">
                                    <div className="labelName">
                                        <label className="control-label"><span className="text-danger"></span>Signing Authority Phone:</label>
                                        <input type="text" className='form-control' name='SigningAuthorityPhone' maxLength="10" value={editBusinessDetails.SigningAuthorityPhone} onChange={(e) => { handleChangeValidation(e) }} />

                                    </div>
                                </div>
                                <div className="col-md-5">
                                    <div className="labelName">
                                        <label className="control-label">Kind Of Employer:</label>
                                        <select className="form-control form-select" name='KindOfEmployer' value={editBusinessDetails.KindOfEmployer} onChange={(e) => { handleChangeValidation(e) }} >
                                            {kindOfEmployerOptions.map((kindOfEmployerOption, index) => {
                                                return <option key={index} selected={kindOfEmployerOption.key === editBusinessDetails.KindOfEmployer ? `selected` : ``} value={kindOfEmployerOption.label}>
                                                    {kindOfEmployerOption.label}
                                                </option>
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            {editBusinessDetails.IsForeign ?
                                <>
                                    <div className="row d-flex justify-content-center mb-15px">
                                        <div className="col-md-5">
                                            <span style={{ marginLeft: "10px" }}></span>
                                            <div className="labelName">
                                                <label className="control-label">Kind Of Payer:</label>
                                                <select className="form-control form-select" name='KindOfPayer' value={editBusinessDetails.KindOfPayer} onChange={(e) => { handleChangeValidation(e) }} >
                                                    {kindOfPayerOptions.map((kindOfPayerOption, index) => {
                                                        return <option key={index} selected={kindOfPayerOption.key === editBusinessDetails.KindOfPayer ? `selected` : ``} value={kindOfPayerOption.label}>
                                                            {kindOfPayerOption.label}
                                                        </option>
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-5">
                                            <span><input className="form-check-input cursor-pointer" type="checkbox" name='IsForeign' style={{ marginLeft: "10px" }} onClick={(e) => { handleChangeValidation(e) }} checked={editBusinessDetails.IsForeign} /> Is Foreign?</span>
                                            <div className="labelName">
                                                <label className="control-label"><span className="text-danger"></span>Address 1:</label>
                                                <input type="text" className='form-control' name='Address1' value={editBusinessDetails.Address1} onChange={(e) => { handleChangeValidation(e) }} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row d-flex justify-content-center mb-15px">
                                        <div className="col-md-5">
                                            <div className="labelName">
                                                <label className="control-label"><span className="text-danger"></span>Address 2:</label>
                                                <input type="text" className='form-control' name='Address2' value={editBusinessDetails.Address2} onChange={(e) => { handleChangeValidation(e) }} />
                                            </div>
                                        </div>
                                        <div className="col-md-5">
                                            <div className="labelName">
                                                <label className="control-label"><span className="text-danger"></span>City:</label>
                                                <input type="text" className='form-control' name='City' value={editBusinessDetails.City} onChange={(e) => { handleChangeValidation(e) }} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row d-flex justify-content-center mb-15px">
                                        <div className="col-md-5">
                                            <div className="labelName">
                                                <label className="control-label"><span className="text-danger"></span>Country:</label>
                                                <select className="form-control form-select" name='Country' onChange={(e) => { handleChangeValidation(e) }}>
                                                    {countriesOptions.map((countryOption, index) => {
                                                        return <option key={index} selected={countryOption.code === editBusinessDetails.Country ? `selected` : ``} value={countryOption.key}>
                                                            {countryOption.label}
                                                        </option>
                                                    })}
                                                </select>

                                            </div>
                                        </div>
                                        <div className="col-md-5">
                                            <div className="labelName">
                                                <label className="control-label"><span className="text-danger"></span>ProvinceOrStateNm:</label>
                                                <input type="text" className='form-control' name='ProvinceOrStateNm' value={editBusinessDetails.ProvinceOrStateNm} onChange={(e) => { handleChangeValidation(e) }} />

                                            </div>
                                        </div>
                                    </div>

                                    <div className="row d-flex justify-content-center mb-15px">
                                        <div className="col-md-5">
                                            <div className="labelName">
                                                <label className="control-label"><span className="text-danger"></span>Postal Code:</label>
                                                <input type="text" className='form-control' name='PostalCode' value={editBusinessDetails.PostalCode} onChange={(e) => { handleChangeValidation(e) }} />
                                            </div>
                                        </div>
                                        <div className="col-md-5">
                                        </div>
                                    </div>
                                </> :
                                <>
                                    <div className="row d-flex justify-content-center mb-15px">
                                        <div className="col-md-5">
                                            <span style={{ marginLeft: "10px" }}></span>
                                            <div className="labelName">
                                                <label className="control-label">Kind Of Payer:</label>
                                                <select className="form-control form-select" name='KindOfPayer' value={editBusinessDetails.KindOfPayer} onChange={(e) => { handleChangeValidation(e) }} >
                                                    {kindOfPayerOptions.map((kindOfPayerOption, index) => {
                                                        return <option key={index} selected={kindOfPayerOption.key === editBusinessDetails.KindOfPayer ? `selected` : ``} value={kindOfPayerOption.label}>
                                                            {kindOfPayerOption.label}
                                                        </option>
                                                    })}
                                                </select>

                                            </div>
                                        </div>
                                        <div className="col-md-5">
                                            <span><input className="form-check-input cursor-pointer" type="checkbox" name='IsForeign' style={{ marginLeft: "10px" }} onClick={(e) => { handleChangeValidation(e) }} checked={editBusinessDetails.IsForeign} /> Is Foreign?</span>
                                            <div className="labelName">
                                                <label className="control-label"><span className="text-danger"></span>Address 1:</label>
                                                <input type="text" className='form-control' name='Address1' value={editBusinessDetails.Address1} onChange={(e) => { handleChangeValidation(e) }} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row d-flex justify-content-center mb-15px">
                                        <div className="col-md-5">
                                            <div className="labelName">
                                                <label className="control-label"><span className="text-danger"></span>Address 2:</label>
                                                <input type="text" className='form-control' name='Address2' value={editBusinessDetails.Address2} onChange={(e) => { handleChangeValidation(e) }} />
                                            </div>
                                        </div>
                                        <div className="col-md-5">
                                            <div className="labelName">
                                                <label className="control-label"><span className="text-danger"></span>City:</label>
                                                <input type="text" className='form-control' name='City' value={editBusinessDetails.City} onChange={(e) => { handleChangeValidation(e) }} />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row d-flex justify-content-center mb-15px">
                                        <div className="col-md-5">
                                            <div className="labelName">
                                                <label className="control-label"><span className="text-danger"></span>State:</label>
                                                <select className="form-control form-select" name='State' onChange={(e) => { handleChangeValidation(e) }}>
                                                    {statesOptions.map((stateOption, index) => {
                                                        return <option key={index} selected={stateOption.code === editBusinessDetails.State ? `selected` : ``} value={stateOption.key}>
                                                            {stateOption.label}
                                                        </option>
                                                    })}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-5">
                                            <div className="labelName">
                                                <label className="control-label"><span className="text-danger"></span>Zip Code:</label>
                                                <input type="text" className='form-control' name='ZipCode' value={editBusinessDetails.ZipCode} onChange={(e) => { handleChangeValidation(e) }} />
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
                                    Update Business
                                    <i className="fa fa-spinner fa-spin" aria-hidden="true" id="CreateSpinner" style={{ "display": "none" }}></i>
                                </button>
                            </div>
                        </form>

                    </div>
                    <button className='btn_back mt-3 mb-3' onClick={navigateToList} >Back</button>
                </div>
            </div>

            <ErrorModal
                errorData={errorData} //Error Modal for Create Business
            />
            <SuccessModal
                successData={successData} //Success Modal for Create Business
            />
        </>
    )
}

export default UpdateBusiness