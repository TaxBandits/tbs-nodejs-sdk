import React, { useState, useEffect } from 'react'
import * as bootstrap from 'bootstrap/dist/js/bootstrap'
import axios from 'axios' // Importing Axios to make HTTP calls.
import logo from '../images/tbsLogo.png' // Importing Images
import { useNavigate, useParams } from 'react-router-dom'
import Spinner from '../components/Spinner' // Importing spinner for loader
import { states, countries, suffix, businessType, businessTypeShorts, statesShort, countryShorts, kindOfEmployer, kindOfPayer, EstateBusinessMembers, PartnershipBusinessMembers, CorporationBusinessMembers, ExemptOrganizationBusinessMembers, SoleProprietorshipBusinessMembers } from '../utils/constants' // Importing static values from utils
import SuccessModal from '../components/SuccessModal' // Importing Success Modal
import ErrorModal from '../components/ErrorModal'  // Importing Error Modal

//Form 1099K Create
const CreateForm1099K = () => {

    const navigate = useNavigate()

    const navigateToListBusiness = () => {
        navigate('/listBusiness')
    }

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
        IsOnlineAccess:false,
        IsPostal:false,
        IsForced:false,
        SequenceId: "",
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

    const [selectFilerIndicator, setSelectedFilerIndicator] = useState({
        FilerIndicator: ""
    })
    const [selectIndicateTxnsReported, setSelectedIndicateTxnsReported] = useState({
        IndicateTxnsReported: ""
    })

    const [kInformation, setkInformation] = useState({
        GrossAmt: 0,
        CardNotPresentTxns: 0,
        MerchantCd: "",
        NumPymtTxns: 0,
        FedTaxWH: 0,
        Jan: 0,
        Feb: 0,
        Mar: 0,
        Apr: 0,
        May: 0,
        Jun: 0,
        Jul: 0,
        Aug: 0,
        Sep: 0,
        Oct: 0,
        Nov: 0,
        Dec: 0,
        AccountNum: "",
        SecondTINnot: false,
        FilerIndicator: "",
        PSEName: "",
        PSEPhone: "",
        IndicateTxnsReported: "",
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
                    Fax: businessDetails?.Fax,
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

    const handleCreateForm1099KSubmit = async (e) => {
        try {
            e.preventDefault()
            setLoading(true)
            const stateValues = [{
                StateCd: stateInformation?.State1,
                StateWH: parseInt(stateInformation?.Statetaxwithheld1),
                StateIdNum: stateInformation?.Payerstateno1,
                StateIncome: parseInt(stateInformation?.Stateincome1)
            },
            {
                StateCd: stateInformation?.State2,
                StateWH: parseInt(stateInformation?.Statetaxwithheld2),
                StateIdNum: stateInformation?.Payerstateno2,
                StateIncome: parseInt(stateInformation?.Stateincome2)
            }]

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
                        BusinessNm: createBusiness?.BusinessName,
                        FirstNm :createBusiness?.FirstNm,
                        LastNm :createBusiness?.LastNm,
                        MiddleNm :createBusiness?.MiddleNm,
                        Suffix :createBusiness?.Suffix,
                        PayerRef: createBusiness?.PayerRef,
                        TradeNm: createBusiness?.TradeName,
                        EINorSSN: createBusiness?.EINOrSSN,
                        IsEIN: createBusiness?.IsEIN,
                        Email: createBusiness?.EmailAddress,
                        ContactNm: createBusiness?.ContactName,
                        Phone: createBusiness?.Phone,
                        PhoneExtn: createBusiness?.PhoneExtn,
                        BusinessType: createBusiness?.BusinessType,
                        SigningAuthority: {
                            Name: createBusiness?.SigningAuthorityName,
                            Phone: createBusiness?.SigningAuthorityPhone,
                            BusinessMemberType: createBusiness?.BusinessMemberType,
                        },
                        KindOfEmployer: createBusiness?.KindOfEmployer,
                        KindOfPayer: createBusiness?.KindOfPayer,
                        IsBusinessTerminated: createBusiness?.IsBusinessTerminated,
                        IsForeign: createBusiness?.IsForeign,
                        USAddress: {
                            Address1: !createBusiness?.IsForeign ? createBusiness?.Address1 : "",
                            Address2: !createBusiness?.IsForeign ? createBusiness?.Address2 : "",
                            City: !createBusiness?.IsForeign ? createBusiness?.City : "",
                            State: !createBusiness?.IsForeign ? createBusiness?.State : "",
                            ZipCd: !createBusiness?.IsForeign ? createBusiness?.ZipCode : "",
                        },
                        ForeignAddress: {
                            Address1: createBusiness?.IsForeign ? createBusiness?.Address1 : "",
                            Address2: createBusiness?.IsForeign ? createBusiness?.Address2 : "",
                            City: createBusiness?.IsForeign ? createBusiness?.City : "",
                            ProvinceOrStateNm: createBusiness?.IsForeign ? createBusiness?.ProvinceOrStateNm : "",
                            Country: createBusiness?.IsForeign ? createBusiness?.Country : "",
                            PostalCd: createBusiness?.IsForeign ? createBusiness?.PostalCode : "",
                        }
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
                        FirstNm :recipientInformation?.FirstNm,
                        LastNm :recipientInformation?.LastNm,
                        MiddleNm :recipientInformation?.MiddleNm,
                        Suffix :recipientInformation?.Suffix,
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
                    KFormData: {
                        B1aGrossAmt: kInformation?.GrossAmt == "" || kInformation?.GrossAmt == undefined ? 0 : parseInt(kInformation?.GrossAmt),
                        B1bCardNotPresentTxns: kInformation?.CardNotPresentTxns == "" || kInformation?.CardNotPresentTxns == undefined ? 0 : parseInt(kInformation?.CardNotPresentTxns),
                        B2MerchantCd: kInformation?.MerchantCd,
                        B3NumPymtTxns: kInformation?.NumPymtTxns,
                        B4FedTaxWH: kInformation?.FedTaxWH == "" || kInformation?.FedTaxWH == undefined ? 0 : parseInt(kInformation?.FedTaxWH),
                        B5aJan: kInformation?.Jan == "" || kInformation?.Jan == undefined ? 0 : parseInt(kInformation?.Jan),
                        B5bFeb: kInformation?.Feb == "" || kInformation?.Feb == undefined ? 0 : parseInt(kInformation?.Feb),
                        B5cMar: kInformation?.Mar == "" || kInformation?.Mar == undefined ? 0 : parseInt(kInformation?.Mar),
                        B5dApr: kInformation?.Apr == "" || kInformation?.Apr == undefined ? 0 : parseInt(kInformation?.Apr),
                        B5eMay: kInformation?.May == "" || kInformation?.May == undefined ? 0 : parseInt(kInformation?.May),
                        B5fJun: kInformation?.Jun == "" || kInformation?.Jun == undefined ? 0 : parseInt(kInformation?.Jun),
                        B5gJul: kInformation?.Jul == "" || kInformation?.Jul == undefined ? 0 : parseInt(kInformation?.Jul),
                        B5hAug: kInformation?.Aug == "" || kInformation?.Aug == undefined ? 0 : parseInt(kInformation?.Aug),
                        B5iSep: kInformation?.Sep == "" || kInformation?.Sep == undefined ? 0 : parseInt(kInformation?.Sep),
                        B5jOct: kInformation?.Oct == "" || kInformation?.Oct == undefined ? 0 : parseInt(kInformation?.Oct),
                        B5kNov: kInformation?.Nov == "" || kInformation?.Nov == undefined ? 0 : parseInt(kInformation?.Nov),
                        B5lDec: kInformation?.Dec == "" || kInformation?.Dec == undefined ? 0 : parseInt(kInformation?.Dec),
                        AccountNum: kInformation?.AccountNum,
                        Is2ndTINnot: kInformation?.SecondTINnot,
                        FilerIndicator: selectFilerIndicator?.FilerIndicator,
                        PSEDetails: {
                            PSEName: kInformation?.PSEName,
                            PSEPhone: kInformation?.PSEPhone,
                        },
                        IndicateTxnsReported: selectIndicateTxnsReported?.IndicateTxnsReported,
                        States: stateValues.length > 0 && stateValues[0].StateWH != null ? stateValues : 0
                    }
                }],
            }

            const createForm1099KResponse = await axios.post(`${process.env.REACT_APP_TBS_BACKEND_URL}/Form1099K/Create`, data)
           
            setSuccessData(createForm1099KResponse.data[0])
            setStatus('createForm')
            //Modal to show the Success or Failure Response from the Form1099K/Create Endpoint.
            let createSuccessModal = new bootstrap.Modal(document.getElementById('successModalToggle'))
            createSuccessModal.show()
        } catch (e) {
            setErroData(e?.response?.data)

            //Modal to show the Success or Failure Response from the Form1099K/Create Endpoint.
            let createErrorModal = new bootstrap.Modal(document.getElementById('errorModalToggle'))
            createErrorModal.show()
        }

        setLoading(false)
    }

    // Handle onchange for Recipient input values
    const handleRecipientInfo = (e) => {
        const { name, value, checked } = e.target

        if (name === "IsForeign" || name === "TINType" || name === "IsPostal"    || name === "IsOnlineAccess" || name === "IsForced") {
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

        if (name === "IsFederalFiling" || name === "IsStateFiling" || name === "IsPostal" 
        || name === "IsOnlineAccess" || name === "IsScheduleFiling") {
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

    // Handle onchange for  Form1099K input values
    const handleKInfo = (e) => {
        const { name, value, checked } = e.target

        if (name === "SecondTINnot" || name === "FilerIndicator" || name === "IndicateTxnsReported") {
            if (checked) {
                setkInformation({
                    ...kInformation,
                    [name]: checked
                })
                setSelectedFilerIndicator({
                    ...selectFilerIndicator,
                    [name]: value
                })
                setSelectedIndicateTxnsReported({
                    ...selectIndicateTxnsReported,
                    [name]: value
                })
            } else if (!checked) {
                setkInformation({
                    ...kInformation,
                    [name]: checked
                })
                setSelectedFilerIndicator({
                    ...selectFilerIndicator,
                    [name]: value
                })
                setSelectedIndicateTxnsReported({
                    ...selectIndicateTxnsReported,
                    [name]: value
                })
            }
        } else {
            setkInformation({
                ...kInformation,
                [name]: value
            })
        }
    }

    const handleStateinfo = (e) => {
        const { name, value } = e?.target

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
                StateCd: stateInformation?.State1,
                StateWH: parseInt(stateInformation?.Statetaxwithheld1),
                StateIdNum: stateInformation?.Payerstateno1,
                StateIncome: parseInt(stateInformation?.Stateincome1)
            },
            {
                StateCd: stateInformation?.State2,
                StateWH: parseInt(stateInformation?.Statetaxwithheld2),
                StateIdNum: stateInformation?.Payerstateno2,
                StateIncome: parseInt(stateInformation?.Stateincome2)
            }]

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
                        BusinessNm: createBusiness?.BusinessName,
                        FirstNm:createBusiness?.FirstNm,
                        LastNm:createBusiness?.LastNm,
                        MiddleNm:createBusiness?.MiddleNm,
                        Suffix:createBusiness?.Suffix,
                        PayerRef: createBusiness?.PayerRef,
                        TradeNm: createBusiness?.TradeName,
                        EINorSSN: createBusiness?.EINOrSSN,
                        IsEIN: createBusiness?.IsEIN,
                        Email: createBusiness?.EmailAddress,
                        ContactNm: createBusiness?.ContactName,
                        Phone: createBusiness?.Phone,
                        PhoneExtn: createBusiness?.PhoneExtn,
                        BusinessType: createBusiness?.BusinessType,
                        SigningAuthority: {
                            Name: createBusiness?.SigningAuthorityName,
                            Phone: createBusiness?.SigningAuthorityPhone,
                            BusinessMemberType: createBusiness?.BusinessMemberType,
                        },
                        KindOfEmployer: createBusiness?.KindOfEmployer,
                        KindOfPayer: createBusiness?.KindOfPayer,
                        IsBusinessTerminated: createBusiness?.IsBusinessTerminated,
                        IsForeign: createBusiness?.IsForeign,
                        USAddress: {
                            Address1: !createBusiness?.IsForeign ? createBusiness?.Address1 : "",
                            Address2: !createBusiness?.IsForeign ? createBusiness?.Address2 : "",
                            City: !createBusiness?.IsForeign ? createBusiness?.City : "",
                            State: !createBusiness?.IsForeign ? createBusiness?.State : "",
                            ZipCd: !createBusiness?.IsForeign ? createBusiness?.ZipCode : "",
                        },
                        ForeignAddress: {
                            Address1: createBusiness?.IsForeign ? createBusiness?.Address1 : "",
                            Address2: createBusiness?.IsForeign ? createBusiness?.Address2 : "",
                            City: createBusiness?.IsForeign ? createBusiness?.City : "",
                            ProvinceOrStateNm: createBusiness?.IsForeign ? createBusiness?.ProvinceOrStateNm : "",
                            Country: createBusiness?.IsForeign ? createBusiness?.Country : "",
                            PostalCd: createBusiness?.IsForeign ? createBusiness?.PostalCd : "",
                        }
                    }
                },
                ReturnData: [{
                    SequenceId: recipientInformation?.SequenceId,
                    IsPostal:recipientInformation?.IsPostal,
                    IsOnlineAccess:recipientInformation?.IsOnlineAccess,
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
                    KFormData: {
                        B1aGrossAmt: kInformation?.GrossAmt == "" || kInformation?.GrossAmt == undefined ? 0 : parseInt(kInformation?.GrossAmt),
                        B1bCardNotPresentTxns: kInformation?.CardNotPresentTxns == "" || kInformation?.CardNotPresentTxns == undefined ? 0 : parseInt(kInformation?.CardNotPresentTxns),
                        B2MerchantCd: kInformation?.MerchantCd,
                        B3NumPymtTxns: kInformation?.NumPymtTxns,
                        B4FedTaxWH: kInformation?.FedTaxWH == "" || kInformation?.FedTaxWH == undefined ? 0 : parseInt(kInformation?.FedTaxWH),
                        B5aJan: kInformation?.Jan == "" || kInformation?.Jan == undefined ? 0 : parseInt(kInformation?.Jan),
                        B5bFeb: kInformation?.Feb == "" || kInformation?.Feb == undefined ? 0 : parseInt(kInformation?.Feb),
                        B5cMar: kInformation?.Mar == "" || kInformation?.Mar == undefined ? 0 : parseInt(kInformation?.Mar),
                        B5dApr: kInformation?.Apr == "" || kInformation?.Apr == undefined ? 0 : parseInt(kInformation?.Apr),
                        B5eMay: kInformation?.May == "" || kInformation?.May == undefined ? 0 : parseInt(kInformation?.May),
                        B5fJun: kInformation?.Jun == "" || kInformation?.Jun == undefined ? 0 : parseInt(kInformation?.Jun),
                        B5gJul: kInformation?.Jul == "" || kInformation?.Jul == undefined ? 0 : parseInt(kInformation?.Jul),
                        B5hAug: kInformation?.Aug == "" || kInformation?.Aug == undefined ? 0 : parseInt(kInformation?.Aug),
                        B5iSep: kInformation?.Sep == "" || kInformation?.Sep == undefined ? 0 : parseInt(kInformation?.Sep),
                        B5jOct: kInformation?.Oct == "" || kInformation?.Oct == undefined ? 0 : parseInt(kInformation?.Oct),
                        B5kNov: kInformation?.Nov == "" || kInformation?.Nov == undefined ? 0 : parseInt(kInformation?.Nov),
                        B5lDec: kInformation?.Dec == "" || kInformation?.Dec == undefined ? 0 : parseInt(kInformation?.Dec),
                        AccountNum: kInformation?.AccountNum,
                        Is2ndTINnot: kInformation?.SecondTINnot,
                        FilerIndicator: selectFilerIndicator?.FilerIndicator,
                        PSEDetails: {
                            PSEName: kInformation?.PSEName,
                            PSEPhone: kInformation?.PSEPhone,
                        },
                        IndicateTxnsReported: selectIndicateTxnsReported?.IndicateTxnsReported,
                        States: stateValues.length > 0 && stateValues[0].StateWH != null ? stateValues : 0
                    }
                }],
            }

            const validateForm1099KResponse = await axios.post(`${process.env.REACT_APP_TBS_BACKEND_URL}/Form1099K/ValidateForm`, data)
            setSuccessData(validateForm1099KResponse.data)
            setStatus('validateForm')
            //Modal to show the Success or Failure Response from the Form1099K/Create Endpoint.
            let validateForm1099KSuccessModal = new bootstrap.Modal(document.getElementById('successModalToggle'))
            validateForm1099KSuccessModal.show()
        } catch (e) {
            setErroData(e?.response?.data)

            //Modal to show the Success or Failure Response from the Form1099K/Create Endpoint.
            let validateForm1099KErrorModal = new bootstrap.Modal(document.getElementById('errorModalToggle'))
            validateForm1099KErrorModal.show()
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
                        <h2 className="head-h1 px-12px">Create Form1099K</h2>
                        <div className="px-4">
                            <form className='form d-block' onSubmit={handleCreateForm1099KSubmit} >
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
                                    {
                                        selectedOption?.TINType === "EIN" ? 
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
                                                        <input type="text" className='form-control' name='Phone' maxLength='10' onChange={(e) => { handleRecipientInfo(e) }} />
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
                                                <input type="text" className='form-control' name='MiddleNm'  onChange={(e) => { handleRecipientInfo(e) }} />
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
                                                        <input type="text" className='form-control' name='Phone' maxLength='10' onChange={(e) => { handleRecipientInfo(e) }} />
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
                                        </>
                                    }
                                   
                                </div>

                                <h5 className="sub-head text-left mt-4 mb-3 " style={{ fontWeight: 'bold' }}>Form 1099-K Details</h5>

                                <div className="row d-flex justify-content-center mb-15px">
                                    <div className="col-md-6">
                                        <div className="labelName">
                                            <label className="control-label">Gross amount of payment card/third party network transactions</label>
                                            <>
                                                <div className="input-group mb-3">
                                                    <span className="input-group-text">$</span>
                                                    <input type="text" className="form-control" name='GrossAmt' onChange={(e) => { handleKInfo(e) }} aria-label="Amount (to the nearest dollar)" />

                                                </div>
                                            </>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="labelName">
                                            <label className="control-label">Card Not Present transactions</label>
                                            <>
                                                <div className="input-group mb-3">
                                                    <span className="input-group-text">$</span>
                                                    <input type="text" className="form-control" name='CardNotPresentTxns' onChange={(e) => { handleKInfo(e) }} aria-label="Amount (to the nearest dollar)" />

                                                </div>
                                            </>
                                        </div>
                                    </div>
                                </div>
                                <div className="row d-flex justify-content-center mb-15px">
                                    <div className="col-md-6">
                                        <div className="labelName">
                                            <label className="control-label">Merchant category code:</label>
                                            <input type="text" className='form-control' name='MerchantCd' onChange={(e) => { handleKInfo(e) }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="labelName">
                                            <label className="control-label"><span className="text-danger">*</span>Number of payment transactions</label>
                                            <input type="text" className='form-control' name='NumPymtTxns' onChange={(e) => { handleKInfo(e) }} />
                                            <div className="mt-2"><input className="form-check-input cursor-pointer me-2" type="checkbox" name='SecondTINnot' onClick={(e) => { handleKInfo(e) }} />2ndTINnot</div>
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
                                                    <input type="text" className="form-control" name='FedTaxWH' onChange={(e) => { handleKInfo(e) }} aria-label="Amount (to the nearest dollar)" />

                                                </div>
                                            </>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="labelName">
                                            <label className="control-label">January</label>
                                            <>
                                                <div className="input-group mb-3">
                                                    <span className="input-group-text">$</span>
                                                    <input type="text" className="form-control" name='Jan' onChange={(e) => { handleKInfo(e) }} aria-label="Amount (to the nearest dollar)" />

                                                </div>
                                            </>
                                        </div>
                                    </div>
                                </div>
                                <div className="row d-flex justify-content-center mb-15px">
                                    <div className="col-md-6">
                                        <div className="labelName">
                                            <label className="control-label">February</label>
                                            <>
                                                <div className="input-group mb-3">
                                                    <span className="input-group-text">$</span>
                                                    <input type="text" className="form-control" name='Feb' onChange={(e) => { handleKInfo(e) }} aria-label="Amount (to the nearest dollar)" />

                                                </div>
                                            </>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="labelName">
                                            <label className="control-label">March</label>
                                            <>
                                                <div className="input-group mb-3">
                                                    <span className="input-group-text">$</span>
                                                    <input type="text" className="form-control" name='Mar' onChange={(e) => { handleKInfo(e) }} aria-label="Amount (to the nearest dollar)" />

                                                </div>
                                            </>
                                        </div>
                                    </div>
                                </div>

                                <div className="row d-flex justify-content-center mb-15px">
                                    <div className="col-md-6">
                                        <div className="labelName">
                                            <label className="control-label">April</label>
                                            <>
                                                <div className="input-group mb-3">
                                                    <span className="input-group-text">$</span>
                                                    <input type="text" className="form-control" name='Apr' onChange={(e) => { handleKInfo(e) }} aria-label="Amount (to the nearest dollar)" />

                                                </div>
                                            </>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="labelName">
                                            <label className="control-label">May</label>
                                            <>
                                                <div className="input-group mb-3">
                                                    <span className="input-group-text">$</span>
                                                    <input type="text" className="form-control" name='May' onChange={(e) => { handleKInfo(e) }} aria-label="Amount (to the nearest dollar)" />

                                                </div>
                                            </>
                                        </div>
                                    </div>
                                </div>

                                <div className="row d-flex justify-content-center mb-15px">
                                    <div className="col-md-6">
                                        <div className="labelName">
                                            <label className="control-label">June</label>
                                            <>
                                                <div className="input-group mb-3">
                                                    <span className="input-group-text">$</span>
                                                    <input type="text" className="form-control" name='Jun' onChange={(e) => { handleKInfo(e) }} aria-label="Amount (to the nearest dollar)" />

                                                </div>
                                            </>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="labelName">
                                            <label className="control-label">July</label>
                                            <>
                                                <div className="input-group mb-3">
                                                    <span className="input-group-text">$</span>
                                                    <input type="text" className="form-control" name='Jul' onChange={(e) => { handleKInfo(e) }} aria-label="Amount (to the nearest dollar)" />

                                                </div>
                                            </>
                                        </div>
                                    </div>
                                </div>
                                <div className="row d-flex justify-content-center mb-15px">
                                    <div className="col-md-6">
                                        <div className="labelName">
                                            <label className="control-label">August</label>
                                            <>
                                                <div className="input-group mb-3">
                                                    <span className="input-group-text">$</span>
                                                    <input type="text" className="form-control" name='Aug' onChange={(e) => { handleKInfo(e) }} aria-label="Amount (to the nearest dollar)" />

                                                </div>
                                            </>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="labelName">
                                            <label className="control-label">September</label>
                                            <>
                                                <div className="input-group mb-3">
                                                    <span className="input-group-text">$</span>
                                                    <input type="text" className="form-control" name='Sep' onChange={(e) => { handleKInfo(e) }} aria-label="Amount (to the nearest dollar)" />

                                                </div>
                                            </>
                                        </div>
                                    </div>
                                </div>

                                <div className="row d-flex justify-content-center mb-15px">
                                    <div className="col-md-6">
                                        <div className="labelName">
                                            <label className="control-label">October</label>
                                            <>
                                                <div className="input-group mb-3">
                                                    <span className="input-group-text">$</span>
                                                    <input type="text" className="form-control" name='Oct' onChange={(e) => { handleKInfo(e) }} aria-label="Amount (to the nearest dollar)" />

                                                </div>
                                            </>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="labelName">
                                            <label className="control-label">November</label>
                                            <>
                                                <div className="input-group mb-3">
                                                    <span className="input-group-text">$</span>
                                                    <input type="text" className="form-control" name='Nov' onChange={(e) => { handleKInfo(e) }} aria-label="Amount (to the nearest dollar)" />

                                                </div>
                                            </>
                                        </div>
                                    </div>
                                </div>
                                <div className="row d-flex justify-content-center mb-15px">
                                    <div className="col-md-6">
                                        <div className="labelName">
                                            <label className="control-label">December</label>
                                            <>
                                                <div className="input-group mb-3">
                                                    <span className="input-group-text">$</span>
                                                    <input type="text" className="form-control" name='Dec' onChange={(e) => { handleKInfo(e) }} aria-label="Amount (to the nearest dollar)" />

                                                </div>
                                            </>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="labelName">
                                            <label className="control-label">Account number</label>
                                            <input type="text" className='form-control' name='AccountNum' onChange={(e) => { handleKInfo(e) }} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row d-flex justify-content-center mb-15px">
                                    <div className="col-md-6">
                                        <label className="control-label"><span className="text-danger">*</span>Check to indicate if FILER is a (an):</label>
                                        <div className="mt-2"  >
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="FilerIndicator" id="inlineRadio1" value="PSE" onClick={(e) => { handleKInfo(e) }} checked={selectFilerIndicator.FilerIndicator === 'PSE'} />
                                                <label className="form-check-label" for="inlineRadio1">PSE</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="FilerIndicator" id="inlineRadio2" value="EPF" onClick={(e) => { handleKInfo(e) }} checked={selectFilerIndicator.FilerIndicator === 'EPF'} />
                                                <label className="form-check-label" for="inlineRadio2">EPF</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="control-label"><span className="text-danger">*</span>Check to indicate transactions reported are:</label>
                                        <div className="mt-2"  >
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="IndicateTxnsReported" id="inlineRadio1" value="Payment_Card" onClick={(e) => { handleKInfo(e) }} checked={selectIndicateTxnsReported.IndicateTxnsReported === 'Payment_Card'} />
                                                <label className="form-check-label" for="inlineRadio1">Payment card</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="IndicateTxnsReported" id="inlineRadio2" value="THIRD_PARTY_NETWORK" onClick={(e) => { handleKInfo(e) }} checked={selectIndicateTxnsReported.IndicateTxnsReported === 'THIRD_PARTY_NETWORK'} />
                                                <label className="form-check-label" for="inlineRadio2">Third party network</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row d-flex justify-content-center mb-15px">
                                    <div className="col-md-6">
                                        <div className="labelName">
                                            <label className="control-label">PSEName</label>
                                            <input type="text" className='form-control' name='PSEName' onChange={(e) => { handleKInfo(e) }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="labelName">
                                            <label className="control-label">PSEPhone</label>
                                            <input type="text" className='form-control' name='PSEPhone' onChange={(e) => { handleKInfo(e) }} />
                                        </div>
                                    </div>
                                </div>


                                <h5 className="sub-head text-left mt-4 mb-3 " style={{ fontWeight: 'bold' }}>Form 1099-K State Details</h5>

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
                                            Create Form1099K
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
                successData={successData} //Success Modal for  Create FORM1099K
                businessData={businessData}
                status={status}
            />
            <ErrorModal
                errorData={errorData} //Error Modal for Create FORM1099K
            />
        </>
    )
}

export default CreateForm1099K