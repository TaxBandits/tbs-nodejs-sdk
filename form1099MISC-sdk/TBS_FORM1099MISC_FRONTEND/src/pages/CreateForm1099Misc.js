import React, { useState, useEffect } from 'react'
import * as bootstrap from 'bootstrap/dist/js/bootstrap'
import axios from 'axios' // Importing Axios to make HTTP calls.
import logo from '../images/tbsLogo.png' // Importing Images
import { useNavigate, useParams } from 'react-router-dom'
import Spinner from '../components/Spinner' // Importing spinner for loader
import { states, countries, suffix, businessType, businessTypeShorts, statesShort, countryShorts, kindOfEmployer, kindOfPayer, EstateBusinessMembers, PartnershipBusinessMembers, CorporationBusinessMembers, ExemptOrganizationBusinessMembers, SoleProprietorshipBusinessMembers } from '../utils/constants' // Importing static values from utils
import SuccessModal from '../components/SuccessModal' // Importing Success Modal
import ErrorModal from '../components/ErrorModal'  // Importing Error Modal

const CreateForm1099misc = () => {

    // Calling get business function in Use Effect
    useEffect(() => {
        getBusiness(businessId)
    }, [])

    // Getting businessId from params
    const { businessId } = useParams()

    const [loading, setLoading] = useState(false)
    const [errorData, setErroData] = useState([]) // Initializing state for error response modal
    const [successData, setSuccessData] = useState([]) // Initializing state for success response modal
    const [options, setOptions] = useState([]) // Initializing state for business member type options
    const [status, setStatus] = useState('') // Initializing state for success modal status

    const [businessData, setBusinessData] = useState({
        BusinessId: "",
        BusinessName: "",
        IsEIN: false,
        TIN: ""
    })
    const [selectedOption, setSelectedOption] = useState({
        TINType: ""
    })
    const [createBusiness, setCreateBusiness] = useState({
        BusinessName: "",
        FirstNm :"",
        LastNm :"",
        MiddleNm :"",
        Suffix :"",
        TradeName: "",
        EINOrSSN: "",
        IsEIN: false,
        EmailAddress: "",
        ContactName: "",
        Phone: "",
        PhoneExtn: "",
        PayerRef: "",
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

    const [recipientInformation, setRecipientInformation] = useState({
        SequenceId: "",
        IsOnlineAccess:false,
        IsPostal:false,
        IsForced:false,
        TINType: "",
        TIN: "",
        FirstPayeeNm: "",
        SecondPayeeNm: "",
        FirstNm :"",
        LastNm :"",
        MiddleNm :"",
        Suffix :"",
        IsForeign: false,
        Address1: "",
        Address2: "",
        City: "",
        State: "",
        ProvinceOrStateNm: "",
        ZipCd: "",
        PostalCd: "",
        Country: "",
        Email: "",
        Phone: "",
        Fax: ""
    })

    const [submissionManifest, setSubmissionManifest] = useState({
        TaxYear: "",
        IsFederalFiling: false,
        IsStateFiling: false,
        IsPostal: false,
        IsOnlineAccess: false,
        IsScheduleFiling: false,
        EfileDate: ""
    })

    const [miscInformation, setMISCInformation] = useState({
        Rents: 0,
        IsDirectSales: false,
        AccountNum: "",
        SecondTINnot: false,
        FedTaxWH: 0,
        Royalties: 0,
        Otherincome: 0,
        Fishingboatproceeds: 0,
        MedHealthcarePymts: 0,
        SubstitutePymts: 0,
        CropInsurance: 0,
        GrossProceeds: 0,
        FishPurForResale: 0,
        Sec409ADeferrals: 0,
        EPP: 0,
        NonQualDefComp: 0,
        IsFATCA: false,
    })

    const [stateInformation, setStateinformation] = useState({
        Statetaxwithheld1: 0,
        Statetaxwithheld2: 0,
        State1: "",
        State2: "",
        Payerstateno1: "",
        Payerstateno2: "",
        Stateincome1: 0,
        Stateincome2: 0,
        addnewstate: false
    })

    const navigate = useNavigate()

    const navigateToListBusiness = () => {
        navigate('/listBusiness')
    }

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

    const getBusiness = async (businessId) => {
        try {
            setLoading(true)
            const getBusinessResponse = await axios.get(`${process.env.REACT_APP_TBS_BACKEND_URL}/Business/Get/${businessId}`)

            if (getBusinessResponse?.data?.StatusCode === 200) {
                setLoading(true)
                const businessDetails = getBusinessResponse?.data?.Business
                setBusinessData({
                    ...businessData,
                    BusinessId: businessDetails?.BusinessId,
                    BusinessName: businessDetails?.BusinessNm,
                    IsEIN: businessDetails?.IsEIN,
                    TIN: businessDetails?.EINorSSN
                })

                setCreateBusiness({
                    BusinessId: businessDetails?.BusinessId,
                    BusinessName: businessDetails?.BusinessNm,
                    FirstNm :businessDetails?.FirstNm,
                    LastNm :businessDetails?.LastNm,
                    MiddleNm :businessDetails?.MiddleNm,
                    Suffix :businessDetails?.Suffix,
                    PayerRef: businessDetails?.PayerRef,
                    TradeName: businessDetails?.TradeNm,
                    EINOrSSN: businessDetails?.EINorSSN,
                    IsEIN: businessDetails?.IsEIN,
                    EmailAddress: businessDetails?.Email,
                    ContactName: businessDetails?.ContactNm,
                    Phone: businessDetails?.Phone,
                    PhoneExtn: businessDetails?.PhoneExtn,
                    BusinessType: businessDetails?.BusinessType,
                    BusinessMemberType: businessDetails?.SigningAuthority?.BusinessMemberType,
                    IsBusinessTerminated: businessDetails?.IsBusinessTerminated,
                    SigningAuthorityName: businessDetails?.SigningAuthority?.Name,
                    SigningAuthorityPhone: businessDetails?.SigningAuthority?.Phone,
                    KindOfEmployer: businessDetails?.KindOfEmployer,
                    KindOfPayer: businessDetails?.KindOfPayer,
                    Address1: businessDetails?.IsForeign ? businessDetails?.ForeignAddress?.Address1 : businessDetails?.USAddress?.Address1,
                    Address2: businessDetails?.IsForeign ? businessDetails?.ForeignAddress?.Address2 : businessDetails?.USAddress?.Address2,
                    IsForeign: businessDetails?.IsForeign,
                    City: businessDetails?.IsForeign ? businessDetails?.ForeignAddress?.City : businessDetails?.USAddress?.City,
                    State: businessDetails?.IsForeign ? "" : businessDetails?.USAddress?.State,
                    ProvinceOrStateNm: businessDetails?.IsForeign ? businessDetails?.ForeignAddress?.ProvinceOrStateNm : "",
                    ZipCode: businessDetails?.IsForeign ? "" : businessDetails?.USAddress?.ZipCd,
                    PostalCode: businessDetails?.IsForeign ? businessDetails?.ForeignAddress?.PostalCd : "",
                    Country: businessDetails?.IsForeign ? businessDetails?.ForeignAddress?.Country : ""
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
                setLoading(false)
            }

            setLoading(false)
        } catch (e) {
            setLoading(false)
            throw e
        }
    }

    const handleCreateForm1099MISCSubmit = async (e) => {
        try {
            e.preventDefault()
            setLoading(true)
            const stateValues = [{
                StateCd: stateInformation?.State1 === "STATE" ? "" : stateInformation?.State1,
                StateWH: stateInformation?.Statetaxwithheld1 == "" ? 0 : parseInt(stateInformation?.Statetaxwithheld1),
                StateIdNum: stateInformation?.Payerstateno1 === null ? "" : stateInformation?.Payerstateno1,
                StateIncome: stateInformation?.Stateincome1 == "" ? 0 : parseInt(stateInformation?.Stateincome1)
            },
            {
                StateCd: stateInformation?.State2 === "STATE" ? "" : stateInformation?.State2,
                StateWH: stateInformation?.Statetaxwithheld2 == "" ? 0 : parseInt(stateInformation?.Statetaxwithheld2),
                StateIdNum: stateInformation?.Payerstateno2 == null ? "" : stateInformation?.Payerstateno2,
                StateIncome: stateInformation?.Stateincome2 == "" ? 0 : parseInt(stateInformation?.Stateincome2)
            }
            ]
            const data = {
                submissionManifest: {
                    TaxYear: submissionManifest?.TaxYear,
                    IsFederalFiling: submissionManifest?.IsFederalFiling,
                    IsStateFiling: submissionManifest?.IsStateFiling,
                    IsPostal: submissionManifest?.IsPostal,
                    IsOnlineAccess: submissionManifest?.IsOnlineAccess,
                    IsScheduleFiling: submissionManifest?.IsScheduleFiling,
                    ScheduleFiling: {
                        EfileDate: submissionManifest?.EfileDate
                    }
                },
                ReturnHeader: {
                    Business: {
                        BusinessId:businessId
                       }
                },
                ReturnData: [{
                    SequenceId: recipientInformation?.SequenceId,
                    IsOnlineAccess:recipientInformation?.IsOnlineAccess,
                    IsPostal:recipientInformation?.IsPostal,
                    IsForced:recipientInformation?.IsForced,
                    Recipient: {
                        TINType: selectedOption?.TINType,
                        TIN: recipientInformation?.TIN,
                        FirstPayeeNm: recipientInformation?.FirstPayeeNm,
                        SecondPayeeNm: recipientInformation?.SecondPayeeNm,
                        FirstNm:recipientInformation?.FirstNm,
                        LastNm:recipientInformation?.LastNm,
                        MiddleNm:recipientInformation?.MiddleNm,
                        Suffix:recipientInformation?.Suffix,
                        IsForeign: recipientInformation?.IsForeign,
                        USAddress: {
                            Address1: !recipientInformation?.IsForeign ? recipientInformation?.Address1 : "",
                            Address2: !recipientInformation?.IsForeign ? recipientInformation?.Address2 : "",
                            City: !recipientInformation?.IsForeign ? recipientInformation?.City : "",
                            State: !recipientInformation?.IsForeign ? recipientInformation?.State : "",
                            ZipCd: !recipientInformation?.IsForeign ? recipientInformation?.ZipCd : "",
                        },
                        ForeignAddress: {
                            Address1: recipientInformation?.IsForeign ? recipientInformation?.Address1 : "",
                            Address2: recipientInformation?.IsForeign ? recipientInformation?.Address2 : "",
                            City: recipientInformation?.IsForeign ? recipientInformation?.City : "",
                            ProvinceOrStateNm: recipientInformation?.IsForeign ? recipientInformation?.ProvinceOrStateNm : "",
                            Country: recipientInformation?.IsForeign ? recipientInformation?.Country : "",
                            PostalCd: recipientInformation?.IsForeign ? recipientInformation?.PostalCd : "",
                        },
                        Email: recipientInformation?.Email,
                        Phone: recipientInformation?.Phone,
                        Fax: recipientInformation?.Fax
                    },
                    MISCFormData: {
                        B1Rents: miscInformation?.Rents,
                        B2Royalties: miscInformation?.Royalties,
                        B3OtherIncome: miscInformation?.Otherincome,
                        B4FedTaxWH: miscInformation?.FedTaxWH,
                        B5FishingBoatProceeds: miscInformation?.Fishingboatproceeds,
                        B6MedHealthcarePymts: miscInformation?.MedHealthcarePymts,
                        B7IsDirectSale: miscInformation?.IsDirectSales,
                        B8SubstitutePymts: miscInformation?.SubstitutePymts,
                        B9CropInsurance: miscInformation?.CropInsurance,
                        B10GrossProceeds: miscInformation?.GrossProceeds,
                        B11FishPurForResale: miscInformation?.FishPurForResale,
                        B12Sec409ADeferrals: miscInformation?.Sec409ADeferrals,
                        B13IsFATCA: miscInformation?.IsFATCA,
                        B14EPP: miscInformation?.EPP,
                        B15NonQualDefComp: miscInformation?.NonQualDefComp,
                        AccountNum: miscInformation?.AccountNum,
                        Is2ndTINnot: miscInformation?.SecondTINnot,
                        States: stateValues.length > 0 && stateValues[0].StateWH != null ? stateValues : 0
                    }
                }
                ],
            }

            const createForm1099MISCResponse = await axios.post(`${process.env.REACT_APP_TBS_BACKEND_URL}/Form1099MISC/Create`, data)

            setSuccessData(createForm1099MISCResponse.data[0])
            setStatus('createForm')
            //Modal to show the Success or Failure Response from the Form1099MISC/Create Endpoint.
            let createSuccessModal = new bootstrap.Modal(document.getElementById('successModalToggle'))
            createSuccessModal.show()
        }
        catch (e) {
            setErroData(e?.response?.data)

            //Modal to show the Success or Failure Response from the Form1099MISC/Create Endpoint.
            let createErrorModal = new bootstrap.Modal(document.getElementById('errorModalToggle'))
            createErrorModal.show()
        }
        setLoading(false)
    }

    // Handle onchange for Recipient input values
    const handleRecipientInfo = (e) => {
        const { name, value, checked } = e.target

        if (name === "IsForeign" || name === "TINType" ||name==="IsOnlineAccess" || name ==="IsPostal" || name ==="IsForced" ) {
            if (checked) {
                setRecipientInformation({
                    ...recipientInformation,
                    [name]: checked
                })
                setSelectedOption({
                    ...selectedOption,
                    [name]: value
                })
            } else if (!checked) {
                setRecipientInformation({
                    ...recipientInformation,
                    [name]: checked
                })
                setSelectedOption({
                    ...selectedOption,
                    [name]: value
                })
            }
        } else {
            setRecipientInformation({
                ...recipientInformation,
                [name]: value
            })
        }


    }

    // Handle onchange for Submission manifest input values
    const handleSubmissionmanifestInfo = (e) => {
        const { name, value, checked } = e.target

        if (name === "IsFederalFiling" || name === "IsStateFiling" || name === "IsPostal" || name === "IsOnlineAccess" || name === "IsScheduleFiling") {
            if (checked) {
                setSubmissionManifest({
                    ...submissionManifest,
                    [name]: checked
                })
            } else if (!checked) {
                setSubmissionManifest({
                    ...submissionManifest,
                    [name]: checked
                })
            }
        } else {
            setSubmissionManifest({
                ...submissionManifest,
                [name]: value
            })
        }
    }

    // Handle onchange for MISC Form input values
    const handleMISCInfo = (e) => {
        const { name, value, checked } = e.target

        if (name === "IsDirectSales" || name === "SecondTINnot" || name == "IsFATCA") {
            if (checked) {
                setMISCInformation({
                    ...miscInformation,
                    [name]: checked
                })
            } else if (!checked) {
                setMISCInformation({
                    ...miscInformation,
                    [name]: checked
                })
            }
        } else {
            setMISCInformation({
                ...miscInformation,
                [name]: value
            })
        }
    }
    const handleStateinfo = (e) => {
        const { name, value } = e.target
        setStateinformation({
            ...stateInformation,
            [name]: value
        })
    }

    const validateForm = async (e) => {
        try {
            e.preventDefault()
            setLoading(true)
            const stateValues = [{
                StateCd: stateInformation?.State1 === "STATE" ? "" : stateInformation?.State1,
                StateWH: stateInformation?.Statetaxwithheld1 === "" ? 0 : parseInt(stateInformation?.Statetaxwithheld1),
                StateIdNum: stateInformation?.Payerstateno1,
                StateIncome: stateInformation?.Stateincome1 === "" ? 0 : parseInt(stateInformation?.Stateincome1)
            },
            {
                StateCd: stateInformation?.State2 === "STATE" ? "" : stateInformation?.State2,
                StateWH: stateInformation?.Statetaxwithheld2 === "" ? 0 : parseInt(stateInformation?.Statetaxwithheld2),
                StateIdNum: stateInformation?.Payerstateno2,
                StateIncome: stateInformation?.Stateincome2 === "" ? 0 : parseInt(stateInformation?.Stateincome2)
            }
            ]

            const data = {
                submissionManifest: {
                    TaxYear: submissionManifest?.TaxYear,
                    IsFederalFiling: submissionManifest?.IsFederalFiling,
                    IsStateFiling: submissionManifest?.IsStateFiling,
                    IsPostal: submissionManifest?.IsPostal,
                    IsOnlineAccess: submissionManifest?.IsOnlineAccess,
                    IsScheduleFiling: submissionManifest?.IsScheduleFiling,
                    ScheduleFiling: {
                        EfileDate: submissionManifest?.EfileDate
                    }
                },
                ReturnHeader: {
                    Business: {
                        BusinessId:businessId
                       }
                },
                ReturnData: [{
                    IsOnlineAccess:recipientInformation?.IsOnlineAccess,
                    IsPostal:recipientInformation?.IsPostal,
                    IsForced:recipientInformation?.IsForced,
                    SequenceId: recipientInformation?.SequenceId,
                    Recipient: {
                        TINType: selectedOption?.TINType,
                        TIN: recipientInformation?.TIN,
                        FirstPayeeNm: recipientInformation?.FirstPayeeNm,
                        SecondPayeeNm: recipientInformation?.SecondPayeeNm,
                        FirstNm:recipientInformation?.FirstNm,
                        LastNm:recipientInformation?.LastNm,
                        MiddleNm:recipientInformation?.MiddleNm,
                        Suffix:recipientInformation?.Suffix,
                        IsForeign: recipientInformation?.IsForeign,
                        USAddress: {
                            Address1: !recipientInformation.IsForeign ? recipientInformation?.Address1 : "",
                            Address2: !recipientInformation.IsForeign ? recipientInformation?.Address2 : "",
                            City: !recipientInformation.IsForeign ? recipientInformation?.City : "",
                            State: !recipientInformation.IsForeign ? recipientInformation?.State : "",
                            ZipCd: !recipientInformation.IsForeign ? recipientInformation?.ZipCd : "",
                        },
                        ForeignAddress: {
                            Address1: recipientInformation.IsForeign ? recipientInformation?.Address1 : "",
                            Address2: recipientInformation.IsForeign ? recipientInformation?.Address2 : "",
                            City: recipientInformation.IsForeign ? recipientInformation?.City : "",
                            ProvinceOrStateNm: recipientInformation.IsForeign ? recipientInformation?.ProvinceOrStateNm : "",
                            Country: recipientInformation.IsForeign ? recipientInformation?.Country : "",
                            PostalCd: recipientInformation.IsForeign ? recipientInformation?.PostalCd : "",
                        },
                        Email: recipientInformation?.Email,
                        Phone: recipientInformation?.Phone
                    },
                    MISCFormData: {
                        B1Rents: miscInformation?.Rents,
                        B2Royalties: miscInformation?.Royalties,
                        B3OtherIncome: miscInformation?.Otherincome,
                        B4FedTaxWH: miscInformation?.FedTaxWH,
                        B5FishingBoatProceeds: miscInformation?.Fishingboatproceeds,
                        B6MedHealthcarePymts: miscInformation?.MedHealthcarePymts,
                        B7IsDirectSale: miscInformation?.IsDirectSales,
                        B8SubstitutePymts: miscInformation?.SubstitutePymts,
                        B9CropInsurance: miscInformation?.CropInsurance,
                        B10GrossProceeds: miscInformation?.GrossProceeds,
                        B11FishPurForResale: miscInformation?.FishPurForResale,
                        B12Sec409ADeferrals: miscInformation?.Sec409ADeferrals,
                        B13IsFATCA: miscInformation?.IsFATCA,
                        B14EPP: miscInformation?.EPP,
                        B15NonQualDefComp: miscInformation?.NonQualDefComp,
                        AccountNum: miscInformation?.AccountNum,
                        Is2ndTINnot: miscInformation?.SecondTINnot,
                        States: stateValues.length > 0 && stateValues[0].StateWH != null ? stateValues : 0
                    }
                }
                ],
            }

            const validateForm1099MISCResponse = await axios.post(`${process.env.REACT_APP_TBS_BACKEND_URL}/Form1099MISC/ValidateForm`, data)

            setSuccessData(validateForm1099MISCResponse?.data)
            setStatus('validateForm')
            //Modal to show the Success or Failure Response from the Form1099misc/Create Endpoint.
            let validateForm1099MISCSuccessModal = new bootstrap.Modal(document.getElementById('successModalToggle'))
            validateForm1099MISCSuccessModal.show()
        }
        catch (e) {

            setErroData(e?.response?.data)

            //Modal to show the Success or Failure Response from the Form1099misc/Create Endpoint.
            let validateForm1099MISCErrorModal = new bootstrap.Modal(document.getElementById('errorModalToggle'))
            validateForm1099MISCErrorModal.show()
        }
        setLoading(false)
    }

    return (
        <>
            {loading &&
                <div className='mt-3'>
                    <Spinner />
                </div>
            }
            <div className="header text-center mb-3">
                <img src={logo} alt="tbsLogo" />
            </div>
            <div className="header text-center mb-3">
            </div>
            <div className="container">
                <div className="w-75 m-auto">
                    <div className="border-1 border rounded-2 pb-4">
                        <h2 className="head-h1 px-12px">Create Form1099MISC</h2>
                        <div className="px-4">
                            <form className='form d-block' onSubmit={handleCreateForm1099MISCSubmit} >
                                <div className="d-flex  align-items-center fs-20 text-dark">
                                    <h1 class="head-1 me-3">{businessData.BusinessName}</h1> <span class="text-muted fs-14"> ( {businessData.IsEIN === false ? 'SSN' : 'EIN'} : {businessData.TIN} )</span>
                                </div>
                                <div className="row d-flex justify-content-center mb-15px bg-white">
                                    <div className="col-md-6">
                                        <div className="labelName">
                                            <label className="control-label"><span className="text-danger">*</span>Tax Year:</label>
                                            <input type="text" className='form-control' name='TaxYear' onChange={(e) => { handleSubmissionmanifestInfo(e) }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                    </div>
                                    <div className='col mt-3'>
                                        <span className="text-danger">*</span><input className="me-1 form-check-input cursor-pointer" type="checkbox" name='IsFederalFiling' onClick={(e) => { handleSubmissionmanifestInfo(e) }} checked={submissionManifest.IsFederalFiling} /><span className="me-3">IsFederalFiling</span>
                                        <input className="me-1 form-check-input cursor-pointer" type="checkbox" name='IsStateFiling' onClick={(e) => { handleSubmissionmanifestInfo(e) }} checked={submissionManifest.IsStateFiling} /><span className="me-3">IsStateFiling</span>
                                        <input className="me-1 form-check-input cursor-pointer" type="checkbox" name='IsPostal' onClick={(e) => { handleSubmissionmanifestInfo(e) }} checked={submissionManifest.IsPostal} /><span className="me-3">IsPostal</span>
                                        <input className="me-1 form-check-input cursor-pointer" type="checkbox" name='IsOnlineAccess' onClick={(e) => { handleSubmissionmanifestInfo(e) }} checked={submissionManifest.IsOnlineAccess} /><span className="me-3">IsOnlineAccess</span>
                                    </div>
                                </div>

                                <div className="row">
                                    <h5 className="sub-head text-left mt-4 mb-3 " style={{ fontWeight: 'bold' }}>Recipient Details</h5>
                                    <div className="row d-flex justify-content-center mb-15px">
                                    <div className='col md-3 d-flex' style={{'justify-content': 'space-evenly'}}>
                                        <div>
                                            <input className="me-1 form-check-input cursor-pointer" type="checkbox" name='IsPostal' onClick={(e) => { handleRecipientInfo(e) }} checked={recipientInformation?.IsPostal} /><span className="me-3">IsPostal</span>
                                        </div>
                                        <div>

                                            <input className="me-1 form-check-input cursor-pointer" type="checkbox" name='IsOnlineAccess' onClick={(e) => { handleRecipientInfo(e) }} checked={recipientInformation?.IsOnlineAccess} /><span className="me-3">IsOnlineAccess</span>
                                        </div>
                                        <div>
                                            <input className="me-1 form-check-input cursor-pointer" type="checkbox" name='IsForced' onClick={(e) => { handleRecipientInfo(e) }} checked={recipientInformation?.IsForced} /><span className="me-3">IsForced</span>
                                        </div>
                                       
                                    </div>
                                                <div className="col-md-6">
                                                </div>
                                            </div>
                                    <div className="row d-flex justify-content-center mb-15px">
                                        <div className="col-md-6">
                                            <div className="labelName">
                                                <label className="control-label"><span className="text-danger">*</span>SequenceId:</label>
                                                <input type="text" className='form-control' name='SequenceId' onChange={(e) => { handleRecipientInfo(e) }} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="control-label"><span className="text-danger">*</span>TIN Type:</label>


                                            <div className="mt-2"  >
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="TINType" id="inlineRadio1" value="EIN" onClick={(e) => { handleRecipientInfo(e) }} checked={selectedOption.TINType === 'EIN'} />
                                                    <label className="form-check-label" for="inlineRadio1">EIN</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="TINType" id="inlineRadio2" value="SSN" onClick={(e) => { handleRecipientInfo(e) }} checked={selectedOption.TINType === 'SSN'} />
                                                    <label className="form-check-label" for="inlineRadio2">SSN</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="TINType" id="inlineRadio3" value="ATIN" onClick={(e) => { handleRecipientInfo(e) }} checked={selectedOption.TINType === 'ATIN'} />
                                                    <label className="form-check-label" for="inlineRadio3">ATIN</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="TINType" id="inlineRadio4" value="ITIN" onClick={(e) => { handleRecipientInfo(e) }} checked={selectedOption.TINType === 'ITIN'} />
                                                    <label className="form-check-label" for="inlineRadio4">ITIN</label>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    {selectedOption?.TINType === "EIN" ?
                                    <>
                                      <div className="row d-flex justify-content-center mb-15px">
                                        <div className="col-md-6">
                                            <div className="labelName">
                                                <label className="control-label"><span className="text-danger">*</span>TIN:</label>
                                                <input type="text" className='form-control' name='TIN' maxLength="9" onChange={(e) => { handleRecipientInfo(e) }} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="labelName">
                                                <label className="control-label"><span className="text-danger">*</span>First PayeeName:</label>
                                                <input type="text" className='form-control' name='FirstPayeeNm' onChange={(e) => { handleRecipientInfo(e) }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row d-flex justify-content-center mb-2">
                                        <div className="col-md-6">

                                        </div>
                                        <div className="col-md-6">
                                            <span><input className="form-check-input cursor-pointer" type="checkbox" name='IsForeign' onClick={(e) => { handleRecipientInfo(e) }} checked={recipientInformation.IsForeign} /> Is Foreign?</span>
                                        </div>
                                    </div>

                                    {recipientInformation.IsForeign ?
                                        <>
                                            <div className="row d-flex justify-content-center mb-15px">
                                                <div className="col-md-6">
                                                    <div className="labelName">
                                                        <label className="control-label"><span className="text-danger"></span>Second PayeeName:</label>
                                                        <input type="text" className='form-control' name='SecondPayeeNm' onChange={(e) => { handleRecipientInfo(e) }} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">

                                                    <div className="labelName">
                                                        <label className="control-label"><span className="text-danger">*</span>Address1:</label>
                                                        <input type="text" className='form-control' name='Address1' onChange={(e) => { handleRecipientInfo(e) }} />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row d-flex justify-content-center mb-15px">
                                                <div className="col-md-6">
                                                    <div className="labelName">
                                                        <label className="control-label"><span className="text-danger"></span>Address2:</label>
                                                        <input type="text" className='form-control' name='Address2' onChange={(e) => { handleRecipientInfo(e) }} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="labelName">
                                                        <label className="control-label"><span className="text-danger">*</span>City:</label>
                                                        <input type="text" className='form-control' name='City' onChange={(e) => { handleRecipientInfo(e) }} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row d-flex justify-content-center mb-15px">
                                                <div className="col-md-6">
                                                    <div className="labelName">
                                                        <label className="control-label"><span className="text-danger">*</span>ProvinceOrStateNm:</label>
                                                        <input type="text" className='form-control' name='ProvinceOrStateNm' onChange={(e) => { handleRecipientInfo(e) }} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="labelName">
                                                        <label className="control-label"><span className="text-danger">*</span>Country:</label>
                                                        <select className="form-control form-select" name='Country' onChange={(e) => { handleRecipientInfo(e) }} >
                                                            {countriesOptions?.map((countryOption, index) => {
                                                                return <option key={index} selected={countryOption?.code === recipientInformation?.Country ? `selected` : ``} value={countryOption?.code}>
                                                                    {countryOption?.label}
                                                                </option>
                                                            })}
                                                        </select>

                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row d-flex justify-content-center mb-15px">
                                                <div className="col-md-6">
                                                    <div className="labelName">
                                                        <label className="control-label"><span className="text-danger">*</span>PostalCd:</label>
                                                        <input type="text" className='form-control' name='PostalCd' onChange={(e) => { handleRecipientInfo(e) }} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="labelName">
                                                        <label className="control-label"><span className="text-danger"></span>Email:</label>
                                                        <input type="text" className='form-control' name='Email' onChange={(e) => { handleRecipientInfo(e) }} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row d-flex justify-content-center mb-15px">
                                                <div className="col-md-6">
                                                    <div className="labelName">
                                                        <label className="control-label"><span className="text-danger"></span>Phone:</label>
                                                        <input type="text" className='form-control' name='Phone' onChange={(e) => { handleRecipientInfo(e) }} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="labelName">
                                                        <label className="control-label"><span className="text-danger"></span>Fax:</label>
                                                        <input type="text" className='form-control' name='Fax' onChange={(e) => { handleRecipientInfo(e) }} />
                                                    </div>
                                                </div>
                                            </div>

                                        </> :
                                        <>
                                            <div className="row d-flex justify-content-center mb-15px">
                                                <div className="col-md-6">
                                                    <div className="labelName">
                                                        <label className="control-label"><span className="text-danger"></span>Second PayeeName:</label>
                                                        <input type="text" className='form-control' name='SecondPayeeNm' onChange={(e) => { handleRecipientInfo(e) }} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">

                                                    <div className="labelName">
                                                        <label className="control-label"><span className="text-danger">*</span>Address1:</label>
                                                        <input type="text" className='form-control' name='Address1' onChange={(e) => { handleRecipientInfo(e) }} />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row d-flex justify-content-center mb-15px">
                                                <div className="col-md-6">
                                                    <div className="labelName">
                                                        <label className="control-label"><span className="text-danger"></span>Address2:</label>
                                                        <input type="text" className='form-control' name='Address2' onChange={(e) => { handleRecipientInfo(e) }} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="labelName">
                                                        <label className="control-label"><span className="text-danger">*</span>City:</label>
                                                        <input type="text" className='form-control' name='City' onChange={(e) => { handleRecipientInfo(e) }} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row d-flex justify-content-center mb-15px">
                                                <div className="col-md-6">
                                                    <div className="labelName">
                                                        <label className="control-label"><span className="text-danger">*</span>State:</label>
                                                        <select className="form-control form-select" name='State' onChange={(e) => { handleRecipientInfo(e) }} >
                                                            {statesOptions?.map((stateOption, index) => {
                                                                return <option key={index} selected={stateOption?.code === recipientInformation?.State ? `selected` : ``} value={stateOption?.code}>
                                                                    {stateOption?.label}
                                                                </option>
                                                            })}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="labelName">
                                                        <label className="control-label"><span className="text-danger">*</span>ZipCd:</label>
                                                        <input type="text" className='form-control' name='ZipCd' onChange={(e) => { handleRecipientInfo(e) }} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row d-flex justify-content-center mb-15px">
                                                <div className="col-md-6">
                                                    <div className="labelName">
                                                        <label className="control-label"><span className="text-danger"></span>Email:</label>
                                                        <input type="text" className='form-control' name='Email' onChange={(e) => { handleRecipientInfo(e) }} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="labelName">
                                                        <label className="control-label"><span className="text-danger"></span>Phone:</label>
                                                        <input type="text" className='form-control' name='Phone' maxLength='10' onChange={(e) => { handleRecipientInfo(e) }} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row d-flex justify-content-center mb-15px">
                                                <div className="col-md-6">
                                                    <div className="labelName">
                                                        <label className="control-label"><span className="text-danger"></span>Fax:</label>
                                                        <input type="text" className='form-control' name='Fax' onChange={(e) => { handleRecipientInfo(e) }} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">

                                                </div>
                                            </div>
                                        </>
                                    }
                                    </>:
                                    <>
                                    <div className="row d-flex justify-content-center mb-15px">
                                      <div className="col-md-6">
                                          <div className="labelName">
                                              <label className="control-label"><span className="text-danger">*</span>TIN:</label>
                                              <input type="text" className='form-control' name='TIN' maxLength="9" onChange={(e) => { handleRecipientInfo(e) }} />
                                          </div>
                                      </div>
                                      <div className="col-md-6">
                                          <div className="labelName">
                                              <label className="control-label"><span className="text-danger">*</span>First Name:</label>
                                              <input type="text" className='form-control' name='FirstNm' onChange={(e) => { handleRecipientInfo(e) }} />
                                          </div>
                                      </div>
                                  </div>
                                  <div className="row d-flex justify-content-center mb-15px">
                                      <div className="col-md-6">
                                          <div className="labelName">
                                              <label className="control-label"><span className="text-danger"></span>Middle Name:</label>
                                              <input type="text" className='form-control' name='MiddleNm' maxLength="9" onChange={(e) => { handleRecipientInfo(e) }} />
                                          </div>
                                      </div>
                                      <div className="col-md-6">
                                          <div className="labelName">
                                              <label className="control-label"><span className="text-danger">*</span>Last Name:</label>
                                              <input type="text" className='form-control' name='LastNm' onChange={(e) => { handleRecipientInfo(e) }} />
                                          </div>
                                      </div>
                                  </div>
                                  <div className="row d-flex justify-content-center mb-2">
                                      <div className="col-md-6">

                                      </div>
                                      <div className="col-md-6">
                                          <span><input className="form-check-input cursor-pointer" type="checkbox" name='IsForeign' onClick={(e) => { handleRecipientInfo(e) }} checked={recipientInformation.IsForeign} /> Is Foreign?</span>
                                      </div>
                                  </div>

                                  {recipientInformation.IsForeign ?
                                      <>
                                          <div className="row d-flex justify-content-center mb-15px">
                                              <div className="col-md-6">
                                                  <div className="labelName">
                                                      <label className="control-label"><span className="text-danger"></span>Suffix:</label>
                                                      <select className='form-control form-select' name='Suffix' value={recipientInformation?.Suffix} onChange={(e) => { handleRecipientInfo(e) }}  >
                                        {suffixOptions?.map((suffixOption, index) => {
                                          return <option key={suffixOption.key} selected={suffixOption.value == recipientInformation.Suffix ? `selected` : ``} value={suffixOption.label}>
                                            {suffixOption?.label}
                                          </option>
                                        })}
                                       </select>
                                                  </div>
                                              </div>
                                              <div className="col-md-6">

                                                  <div className="labelName">
                                                      <label className="control-label"><span className="text-danger">*</span>Address1:</label>
                                                      <input type="text" className='form-control' name='Address1' onChange={(e) => { handleRecipientInfo(e) }} />
                                                  </div>
                                              </div>
                                          </div>

                                          <div className="row d-flex justify-content-center mb-15px">
                                              <div className="col-md-6">
                                                  <div className="labelName">
                                                      <label className="control-label"><span className="text-danger"></span>Address2:</label>
                                                      <input type="text" className='form-control' name='Address2' onChange={(e) => { handleRecipientInfo(e) }} />
                                                  </div>
                                              </div>
                                              <div className="col-md-6">
                                                  <div className="labelName">
                                                      <label className="control-label"><span className="text-danger">*</span>City:</label>
                                                      <input type="text" className='form-control' name='City' onChange={(e) => { handleRecipientInfo(e) }} />
                                                  </div>
                                              </div>
                                          </div>
                                          <div className="row d-flex justify-content-center mb-15px">
                                              <div className="col-md-6">
                                                  <div className="labelName">
                                                      <label className="control-label"><span className="text-danger">*</span>ProvinceOrStateNm:</label>
                                                      <input type="text" className='form-control' name='ProvinceOrStateNm' onChange={(e) => { handleRecipientInfo(e) }} />
                                                  </div>
                                              </div>
                                              <div className="col-md-6">
                                                  <div className="labelName">
                                                      <label className="control-label"><span className="text-danger">*</span>Country:</label>
                                                      <select className="form-control form-select" name='Country' onChange={(e) => { handleRecipientInfo(e) }} >
                                                          {countriesOptions?.map((countryOption, index) => {
                                                              return <option key={index} selected={countryOption?.code === recipientInformation?.Country ? `selected` : ``} value={countryOption?.code}>
                                                                  {countryOption?.label}
                                                              </option>
                                                          })}
                                                      </select>

                                                  </div>
                                              </div>
                                          </div>

                                          <div className="row d-flex justify-content-center mb-15px">
                                              <div className="col-md-6">
                                                  <div className="labelName">
                                                      <label className="control-label"><span className="text-danger">*</span>PostalCd:</label>
                                                      <input type="text" className='form-control' name='PostalCd' onChange={(e) => { handleRecipientInfo(e) }} />
                                                  </div>
                                              </div>
                                              <div className="col-md-6">
                                                  <div className="labelName">
                                                      <label className="control-label"><span className="text-danger"></span>Email:</label>
                                                      <input type="text" className='form-control' name='Email' onChange={(e) => { handleRecipientInfo(e) }} />
                                                  </div>
                                              </div>
                                          </div>
                                          <div className="row d-flex justify-content-center mb-15px">
                                              <div className="col-md-6">
                                                  <div className="labelName">
                                                      <label className="control-label"><span className="text-danger"></span>Phone:</label>
                                                      <input type="text" className='form-control' name='Phone' onChange={(e) => { handleRecipientInfo(e) }} />
                                                  </div>
                                              </div>
                                              <div className="col-md-6">
                                                  <div className="labelName">
                                                      <label className="control-label"><span className="text-danger"></span>Fax:</label>
                                                      <input type="text" className='form-control' name='Fax' onChange={(e) => { handleRecipientInfo(e) }} />
                                                  </div>
                                              </div>
                                          </div>

                                      </> :
                                      <>
                                          <div className="row d-flex justify-content-center mb-15px">
                                              <div className="col-md-6">
                                                  <div className="labelName">
                                                      <label className="control-label"><span className="text-danger"></span>Suffix:</label>
                                                      <select className='form-control form-select' name='Suffix' value={recipientInformation?.Suffix} onChange={(e) => { handleRecipientInfo(e) }}  >
                                        {suffixOptions?.map((suffixOption, index) => {
                                          return <option key={suffixOption.key} selected={suffixOption.value == recipientInformation.Suffix ? `selected` : ``} value={suffixOption.label}>
                                            {suffixOption?.label}
                                          </option>
                                        })}
                                       </select>
                                                  </div>
                                              </div>
                                              <div className="col-md-6">

                                                  <div className="labelName">
                                                      <label className="control-label"><span className="text-danger">*</span>Address1:</label>
                                                      <input type="text" className='form-control' name='Address1' onChange={(e) => { handleRecipientInfo(e) }} />
                                                  </div>
                                              </div>
                                          </div>

                                          <div className="row d-flex justify-content-center mb-15px">
                                              <div className="col-md-6">
                                                  <div className="labelName">
                                                      <label className="control-label"><span className="text-danger"></span>Address2:</label>
                                                      <input type="text" className='form-control' name='Address2' onChange={(e) => { handleRecipientInfo(e) }} />
                                                  </div>
                                              </div>
                                              <div className="col-md-6">
                                                  <div className="labelName">
                                                      <label className="control-label"><span className="text-danger">*</span>City:</label>
                                                      <input type="text" className='form-control' name='City' onChange={(e) => { handleRecipientInfo(e) }} />
                                                  </div>
                                              </div>
                                          </div>
                                          <div className="row d-flex justify-content-center mb-15px">
                                              <div className="col-md-6">
                                                  <div className="labelName">
                                                      <label className="control-label"><span className="text-danger">*</span>State:</label>
                                                      <select className="form-control form-select" name='State' onChange={(e) => { handleRecipientInfo(e) }} >
                                                          {statesOptions?.map((stateOption, index) => {
                                                              return <option key={index} selected={stateOption?.code === recipientInformation?.State ? `selected` : ``} value={stateOption?.code}>
                                                                  {stateOption?.label}
                                                              </option>
                                                          })}
                                                      </select>
                                                  </div>
                                              </div>
                                              <div className="col-md-6">
                                                  <div className="labelName">
                                                      <label className="control-label"><span className="text-danger">*</span>ZipCd:</label>
                                                      <input type="text" className='form-control' name='ZipCd' onChange={(e) => { handleRecipientInfo(e) }} />
                                                  </div>
                                              </div>
                                          </div>
                                          <div className="row d-flex justify-content-center mb-15px">
                                              <div className="col-md-6">
                                                  <div className="labelName">
                                                      <label className="control-label"><span className="text-danger"></span>Email:</label>
                                                      <input type="text" className='form-control' name='Email' onChange={(e) => { handleRecipientInfo(e) }} />
                                                  </div>
                                              </div>
                                              <div className="col-md-6">
                                                  <div className="labelName">
                                                      <label className="control-label"><span className="text-danger"></span>Phone:</label>
                                                      <input type="text" className='form-control' name='Phone' maxLength='10' onChange={(e) => { handleRecipientInfo(e) }} />
                                                  </div>
                                              </div>
                                          </div>
                                          <div className="row d-flex justify-content-center mb-15px">
                                              <div className="col-md-6">
                                                  <div className="labelName">
                                                      <label className="control-label"><span className="text-danger"></span>Fax:</label>
                                                      <input type="text" className='form-control' name='Fax' onChange={(e) => { handleRecipientInfo(e) }} />
                                                  </div>
                                              </div>
                                              <div className="col-md-6">

                                              </div>
                                          </div>
                                      </>
                                  }
                                  </>
                                     }
                                   
                                </div>

                                <h5 className="sub-head text-left mt-4 mb-3 " style={{ fontWeight: 'bold' }}>Form 1099-MISC Details</h5>

                                <div className="row d-flex justify-content-center mb-15px">
                                    <div className="col-md-6">
                                        <div className="labelName">
                                            <label className="control-label">Rents</label>
                                            <>
                                                <div className="input-group mb-3">
                                                    <span className="input-group-text">$</span>
                                                    <input type="text" className="form-control" name='Rents' onChange={(e) => { handleMISCInfo(e) }} aria-label="Amount (to the nearest dollar)" />

                                                </div>
                                            </>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="labelName">
                                            <label className="control-label">IsDirectSales:</label>

                                            <div className="d-block">
                                                <input className="form-check-input cursor-pointer me-2" type="checkbox" name='IsDirectSales' onClick={(e) => { handleMISCInfo(e) }} />Payer made direct sales totaling $5,000 or more of consumer products to recipient for resale
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row d-flex justify-content-center mb-15px">
                                    <div className="col-md-6">
                                        <div className="labelName">
                                            <label className="control-label">Federal income tax withheld</label>
                                            <>
                                                <div className="input-group mb-3">
                                                    <span className="input-group-text">$</span>
                                                    <input type="text" className="form-control" name='FedTaxWH' onChange={(e) => { handleMISCInfo(e) }} aria-label="Amount (to the nearest dollar)" />

                                                </div>
                                            </>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="labelName">
                                            <label className="control-label">AccountNum:</label>
                                            <input type="text" className='form-control' name='AccountNum' onChange={(e) => { handleMISCInfo(e) }} />
                                            <div className="mt-2"><input className="form-check-input cursor-pointer me-2" type="checkbox" name='SecondTINnot' onClick={(e) => { handleMISCInfo(e) }} />2ndTINnot</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row d-flex justify-content-center mb-15px">
                                    <div className="col-md-6">
                                        <div className="labelName">
                                            <label className="control-label">Royalties</label>
                                            <>
                                                <div className="input-group mb-3">
                                                    <span className="input-group-text">$</span>
                                                    <input type="text" className="form-control" name='Royalties' onChange={(e) => { handleMISCInfo(e) }} aria-label="Amount (to the nearest dollar)" />

                                                </div>
                                            </>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="labelName">
                                            <label className="control-label">Other income</label>
                                            <>
                                                <div className="input-group mb-3">
                                                    <span className="input-group-text">$</span>
                                                    <input type="text" className="form-control" name='Otherincome' onChange={(e) => { handleMISCInfo(e) }} aria-label="Amount (to the nearest dollar)" />

                                                </div>
                                            </>
                                        </div>
                                    </div>
                                </div>
                                <div className="row d-flex justify-content-center mb-15px">
                                    <div className="col-md-6">
                                        <div className="labelName">
                                            <label className="control-label">Fishing boat proceeds</label>
                                            <>
                                                <div className="input-group mb-3">
                                                    <span className="input-group-text">$</span>
                                                    <input type="text" className="form-control" name='Fishingboatproceeds' onChange={(e) => { handleMISCInfo(e) }} aria-label="Amount (to the nearest dollar)" />

                                                </div>
                                            </>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="labelName">
                                            <label className="control-label">Medical and health care payments</label>
                                            <>
                                                <div className="input-group mb-3">
                                                    <span className="input-group-text">$</span>
                                                    <input type="text" className="form-control" name='MedHealthcarePymts' onChange={(e) => { handleMISCInfo(e) }} aria-label="Amount (to the nearest dollar)" />

                                                </div>
                                            </>
                                        </div>
                                    </div>
                                </div>

                                <div className="row d-flex justify-content-center mb-15px">
                                    <div className="col-md-6">
                                        <div className="labelName">
                                            <label className="control-label">Substitute payments in lieu of dividends or interest</label>
                                            <>
                                                <div className="input-group mb-3">
                                                    <span className="input-group-text">$</span>
                                                    <input type="text" className="form-control" name='SubstitutePymts' onChange={(e) => { handleMISCInfo(e) }} aria-label="Amount (to the nearest dollar)" />

                                                </div>
                                            </>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="labelName">
                                            <label className="control-label">Crop insurance proceeds</label>
                                            <>
                                                <div className="input-group mb-3">
                                                    <span className="input-group-text">$</span>
                                                    <input type="text" className="form-control" name='CropInsurance' onChange={(e) => { handleMISCInfo(e) }} aria-label="Amount (to the nearest dollar)" />

                                                </div>
                                            </>
                                        </div>
                                    </div>
                                </div>

                                <div className="row d-flex justify-content-center mb-15px">
                                    <div className="col-md-6">
                                        <div className="labelName">
                                            <label className="control-label">Gross proceeds paid to an attorney</label>
                                            <>
                                                <div className="input-group mb-3">
                                                    <span className="input-group-text">$</span>
                                                    <input type="text" className="form-control" name='GrossProceeds' onChange={(e) => { handleMISCInfo(e) }} aria-label="Amount (to the nearest dollar)" />

                                                </div>
                                            </>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="labelName">
                                            <label className="control-label">Fish purchased for resale</label>
                                            <>
                                                <div className="input-group mb-3">
                                                    <span className="input-group-text">$</span>
                                                    <input type="text" className="form-control" name='FishPurForResale' onChange={(e) => { handleMISCInfo(e) }} aria-label="Amount (to the nearest dollar)" />

                                                </div>
                                            </>
                                        </div>
                                    </div>
                                </div>
                                <div className="row d-flex justify-content-center mb-15px">
                                    <div className="col-md-6">
                                        <div className="labelName">
                                            <label className="control-label">Section 409A deferrals</label>
                                            <>
                                                <div className="input-group mb-3">
                                                    <span className="input-group-text">$</span>
                                                    <input type="text" className="form-control" name='Sec409ADeferrals' onChange={(e) => { handleMISCInfo(e) }} aria-label="Amount (to the nearest dollar)" />

                                                </div>
                                            </>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="labelName">
                                            <label className="control-label">Excess golden parachute payments</label>
                                            <>
                                                <div className="input-group mb-3">
                                                    <span className="input-group-text">$</span>
                                                    <input type="text" className="form-control" name='EPP' onChange={(e) => { handleMISCInfo(e) }} aria-label="Amount (to the nearest dollar)" />

                                                </div>
                                            </>
                                        </div>
                                    </div>
                                </div>

                                <div className="row d-flex justify-content-center mb-15px">
                                    <div className="col-md-6">
                                        <div className="labelName">
                                            <label className="control-label">Nonqualified deferred compensation</label>
                                            <>
                                                <div className="input-group mb-3">
                                                    <span className="input-group-text">$</span>
                                                    <input type="text" className="form-control" name='NonQualDefComp' onChange={(e) => { handleMISCInfo(e) }} aria-label="Amount (to the nearest dollar)" />

                                                </div>
                                            </>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mt-2"><input className="form-check-input cursor-pointer me-2" type="checkbox" name='IsFATCA' onClick={(e) => { handleMISCInfo(e) }} />IsFATCA</div>
                                    </div>
                                </div>
                                <h5 className="sub-head text-left mt-4 mb-3 " style={{ fontWeight: 'bold' }}>Form 1099-MISC State Details</h5>

                                <div className="row d-flex justify-content-center mb-15px">
                                    <div className="col-md-6">
                                        <div className="labelName">
                                            <label className="control-label">State tax withheld:</label>
                                            <input type="text" className='form-control' name='Statetaxwithheld1' allowNull={true} onChange={(e) => { handleStateinfo(e) }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="labelName">
                                            <label className="control-label">State:</label>
                                            <select className="form-control form-select" name='State1' allowNull={true} onChange={(e) => { handleStateinfo(e) }}  >
                                                {statesOptions?.map((stateOption, index) => {
                                                    return <option key={index} selected={stateOption?.code === stateInformation?.State1 ? `selected` : ``} value={stateOption?.code}>
                                                        {stateOption?.label}
                                                    </option>
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="row d-flex justify-content-center mb-15px">
                                    <div className="col-md-6">
                                        <div className="labelName">
                                            <label className="control-label">Payer's state no:</label>
                                            <input type="text" className='form-control' name='Payerstateno1' allowNull={true} onChange={(e) => { handleStateinfo(e) }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="labelName">
                                            <label className="control-label">State income:</label>
                                            <input type="text" className='form-control' name='Stateincome1' allowNull={true} onChange={(e) => { handleStateinfo(e) }} />
                                        </div>

                                    </div>

                                </div>



                                <div className="row d-flex justify-content-center mb-15px">
                                    <div className="col-md-6">
                                        <div className="labelName">
                                            <label className="control-label"><span className="text-danger"></span>State tax withheld:</label>
                                            <input type="text" className='form-control' name='Statetaxwithheld2' allowNull={true} onChange={(e) => { handleStateinfo(e) }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="labelName">
                                            <label className="control-label">State:</label>
                                            <select className="form-control form-select" name='State2' allowNull={true} onChange={(e) => { handleStateinfo(e) }} >
                                                {statesOptions?.map((stateOption, index) => {
                                                    return <option key={index} selected={stateOption?.code === stateInformation?.State2 ? `selected` : ``} value={stateOption?.code}>
                                                        {stateOption?.label}
                                                    </option>
                                                })}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="row d-flex justify-content-center mb-15px">
                                    <div className="col-md-6">
                                        <div className="labelName">
                                            <label className="control-label"><span className="text-danger"></span>Payer's state no:</label>
                                            <input type="text" className='form-control' name='Payerstateno2' allowNull={true} onChange={(e) => { handleStateinfo(e) }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="labelName">
                                            <label className="control-label">State income:</label>
                                            <input type="text" className='form-control' name='Stateincome2' allowNull={true} onChange={(e) => { handleStateinfo(e) }} />
                                        </div>

                                    </div>

                                </div>
                                <div className='d-flex justify-content-end align-items-center mt-5'>
                                    <div className=" p-2">
                                        <button className="btn btn_primary btn_md" onClick={validateForm} >
                                            Validate Form
                                        </button>
                                    </div>
                                    <div className="">
                                        <button type="submit" className="btn btn_primary btn_md"  >
                                            Create Form1099MISC
                                            <i className="fa fa-spinner fa-spin" aria-hidden="true" id="CreateSpinner" style={{ display: 'none' }}></i>
                                        </button>
                                    </div>
                                </div>
                            </form>


                        </div>
                    </div>
                    <button className='btn btn_back mt-3 mb-5' onClick={navigateToListBusiness} >Back</button>
                </div>
            </div>
            
            <SuccessModal
                successData={successData} //Success Modal for  Create FORM1099MISC
                businessData={businessData}
                status={status}
            />
            <ErrorModal
                errorData={errorData} //Error Modal for Create FORM1099MISC
            />
        </>

    )

}

export default CreateForm1099misc