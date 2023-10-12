import React from 'react'
import { useState, useEffect } from 'react'
import * as bootstrap from 'bootstrap/dist/js/bootstrap'
import axios from 'axios' // Importing Axios to make HTTP calls.
import logo from '../images/tbsLogo.png' // Importing Images
import { useNavigate, useParams, Link } from 'react-router-dom'
import Spinner from '../components/Spinner' // Importing spinner for loader
import { states, countries, businessType, businessTypeShorts, statesShort, countryShorts, kindOfEmployer, kindOfPayer, EstateBusinessMembers, PartnershipBusinessMembers, CorporationBusinessMembers, ExemptOrganizationBusinessMembers, SoleProprietorshipBusinessMembers } from '../utils/constants' // Importing static values from utils
import SuccessModal from '../components/SuccessModal' // Importing Success Modal
import ErrorModal from '../components/ErrorModal'  // Importing Error Modal

//Form 1099K Update Component
const UpdateForm1099k = () => {

    // Calling get Form1099K function in Use Effect
    useEffect(() => {
        getform1099ById()
    }, [])

    // Getting businessId from params
    const Params = useParams()
    const SubmissionId = Params?.SubmissionId
    const RecordId = Params?.RecordId

    const [loading, setLoading] = useState(false)
    const [errorData, setErroData] = useState([]) // Initializing state for error response modal
    const [successData, setSuccessData] = useState([]) // Initializing state for success response modal
    const [options, setOptions] = useState([]) // Initializing state for business member type options
    const [businessData, setBusinessData] = useState({
        BusinessId: "",
        BusinessName: "",
        IsEIN: false,
        TIN: ""
    })
    const [selectedOption, setSelectedOption] = useState({
        TINType: ""
    })
    const [editBusinessDetails, setEditBusinessDetails] = useState({
        BusinessName: "",
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
        Country: "",
    })

    const [editRecipientInformation, setEditRecipientInformation] = useState({
        SequenceId: "",
        TINType: "",
        TIN: "",
        FirstPayeeNm: "",
        SecondPayeeNm: "",
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

    const [editSubmissionManifest, setEditSubmissionManifest] = useState({
        TaxYear: "",
        IsFederalFiling: false,
        IsStateFiling: false,
        IsPostal: false,
        IsOnlineAccess: false,
        IsScheduleFiling: false,
        EfileDate: "",
        SubmissionId: ""
    })

    const [selectFilerIndicator, setSelectedFilerIndicator] = useState({
        FilerIndicator: ""
    })
    const [selectIndicateTxnsReported, setSelectedIndicateTxnsReported] = useState({
        IndicateTxnsReported: ""
    })

    const [editKDetails, setEditKInformation] = useState({
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

    const [editStateInformation, setEditStateInformation] = useState({
        Statetaxwithheld1: 0,
        Statetaxwithheld2: 0,
        State1: "",
        State2: "",
        Payerstateno1: "",
        Payerstateno2: "",
        Stateincome1: 0,
        Stateincome2: 0,

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

    // To get Business by Id by requesting get API
    const getform1099ById = async () => {
        try {
            setLoading(true)
            const getForm1099kResponse = await axios.get(`${process.env.REACT_APP_TBS_BACKEND_URL}/Form1099K/Get?SubmissionId=${SubmissionId}&RecordId=${RecordId}`)
            if (getForm1099kResponse?.data?.StatusCode == 200) {
                const businessDetails = getForm1099kResponse?.data?.Form1099Records?.ReturnHeader?.Business
                const SubmissionManifest = getForm1099kResponse?.data?.Form1099Records?.SubmissionManifest
                const SequenceId = getForm1099kResponse?.data?.Form1099Records?.ReturnData[0]?.SequenceId
                const RecordId = getForm1099kResponse?.data?.Form1099Records?.ReturnData[0]?.RecordId
                const RecipientId = getForm1099kResponse?.data?.Form1099Records?.ReturnData[0]?.Recipient?.RecipientId
                const RecipientDetails = getForm1099kResponse?.data?.Form1099Records?.ReturnData[0]?.Recipient
                const KDetails = getForm1099kResponse?.data?.Form1099Records?.ReturnData[0]?.KFormData
                const stateValues = getForm1099kResponse?.data?.Form1099Records?.ReturnData[0]?.KFormData
                setBusinessData({
                    ...businessData,
                    BusinessId: businessDetails?.BusinessId,
                    BusinessName: businessDetails?.BusinessNm,
                    IsEIN: businessDetails?.IsEIN,
                    TIN: businessDetails?.EINorSSN
                })
                setEditBusinessDetails({
                    BusinessId: businessDetails?.BusinessId,
                    BusinessName: businessDetails?.BusinessNm,
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
                    BusinessMemberType: businessDetails?.SigningAuthority !== null ? businessDetails?.SigningAuthority.BusinessMemberType : "",
                    IsBusinessTerminated: businessDetails?.IsBusinessTerminated,
                    SigningAuthorityName: businessDetails?.SigningAuthority !== null ? businessDetails?.SigningAuthority?.Name : "",
                    SigningAuthorityPhone: businessDetails?.SigningAuthority !== null ? businessDetails?.SigningAuthority?.Phone : "",
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
                setEditSubmissionManifest({
                    SubmissionId: SubmissionManifest?.SubmissionId,
                    TaxYear: SubmissionManifest?.TaxYear,
                    IsFederalFiling: SubmissionManifest?.IsFederalFiling,
                    IsStateFiling: SubmissionManifest?.IsStateFiling,
                    IsPostal: SubmissionManifest?.IsPostal,
                    IsOnlineAccess: SubmissionManifest?.IsOnlineAccess,
                    IsScheduleFiling: SubmissionManifest?.IsScheduleFiling,
                    EfileDate: SubmissionManifest?.ScheduleFiling?.EfileDate
                })
                setEditRecipientInformation({
                    SequenceId: SequenceId,
                    RecordId: RecordId,
                    RecipientId: RecipientId,
                    TIN: RecipientDetails?.TIN,
                    TINType: RecipientDetails?.TINType,
                    FirstPayeeNm: RecipientDetails?.FirstPayeeNm,
                    SecondPayeeNm: RecipientDetails?.SecondPayeeNm,
                    IsForeign: RecipientDetails?.IsForeign,
                    Address1: RecipientDetails?.IsForeign ? RecipientDetails?.ForeignAddress?.Address1 : RecipientDetails?.USAddress?.Address1,
                    Address2: RecipientDetails?.IsForeign ? RecipientDetails?.ForeignAddress?.Address2 : RecipientDetails?.USAddress?.Address2,
                    City: RecipientDetails?.IsForeign ? RecipientDetails?.ForeignAddress?.City : RecipientDetails?.USAddress?.City,
                    State: RecipientDetails?.IsForeign ? "" : RecipientDetails?.USAddress?.State,
                    ProvinceOrStateNm: RecipientDetails?.IsForeign ? RecipientDetails?.ForeignAddress?.ProvinceOrStateNm : "",
                    ZipCd: RecipientDetails?.IsForeign ? "" : RecipientDetails?.USAddress?.ZipCd,
                    PostalCd: RecipientDetails?.IsForeign ? RecipientDetails?.ForeignAddress?.PostalCd : "",
                    Country: RecipientDetails?.IsForeign ? RecipientDetails?.ForeignAddress?.Country : "",
                    Email: RecipientDetails?.Email,
                    Phone: RecipientDetails?.Phone,
                    Fax: RecipientDetails?.Fax
                })
                setEditKInformation({
                    GrossAmt: KDetails?.B1aGrossAmt == "" || KDetails?.B1aGrossAmt == undefined ? 0 : parseInt(KDetails?.B1aGrossAmt),
                    CardNotPresentTxns: KDetails?.B1bCardNotPresentTxns == "" || KDetails?.B1bCardNotPresentTxns == undefined ? 0 : parseInt(KDetails?.B1bCardNotPresentTxns),
                    MerchantCd: KDetails?.B2MerchantCd,
                    NumPymtTxns: KDetails?.B3NumPymtTxns,
                    FedTaxWH: KDetails?.B4FedTaxWH == "" || KDetails?.B4FedTaxWH == undefined ? 0 : parseInt(KDetails?.B4FedTaxWH),
                    Jan: KDetails?.B5aJan == "" || KDetails?.B5aJan == undefined ? 0 : parseInt(KDetails?.B5aJan),
                    Feb: KDetails?.B5bFeb == "" || KDetails?.B5bFeb == undefined ? 0 : parseInt(KDetails?.B5bFeb),
                    Mar: KDetails?.B5cMar == "" || KDetails?.B5cMar == undefined ? 0 : parseInt(KDetails?.B5cMar),
                    Apr: KDetails?.B5dApr == "" || KDetails?.B5dApr == undefined ? 0 : parseInt(KDetails?.B5dApr),
                    May: KDetails?.B5eMay == "" || KDetails?.B5eMay == undefined ? 0 : parseInt(KDetails?.B5eMay),
                    Jun: KDetails?.B5fJun == "" || KDetails?.B5fJun == undefined ? 0 : parseInt(KDetails?.B5fJun),
                    Jul: KDetails?.B5gJul == "" || KDetails?.B5gJul == undefined ? 0 : parseInt(KDetails?.B5gJul),
                    Aug: KDetails?.B5hAug == "" || KDetails?.B5hAug == undefined ? 0 : parseInt(KDetails?.B5hAug),
                    Sep: KDetails?.B5iSep == "" || KDetails?.B5iSep == undefined ? 0 : parseInt(KDetails?.B5iSep),
                    Oct: KDetails?.B5jOct == "" || KDetails?.B5jOct == undefined ? 0 : parseInt(KDetails?.B5jOct),
                    Nov: KDetails?.B5kNov == "" || KDetails?.B5kNov == undefined ? 0 : parseInt(KDetails?.B5kNov),
                    Dec: KDetails?.B5lDec == "" || KDetails?.B5lDec == undefined ? 0 : parseInt(KDetails?.B5lDec),
                    AccountNum: KDetails?.AccountNum,
                    SecondTINnot: KDetails?.Is2ndTINnot,
                    FilerIndicator: KDetails?.FilerIndicator,
                    PSEName: KDetails?.PSEDetails?.PSEName,
                    PSEPhone: KDetails?.PSEDetails?.PSEPhone,
                    IndicateTxnsReported: KDetails?.IndicateTxnsReported,
                })
                setEditStateInformation({
                    Statetaxwithheld1: stateValues?.States === null ? 0 : stateValues?.States[0]?.StateWH,
                    Statetaxwithheld2: stateValues?.States === null ? 0 : stateValues?.States[1]?.StateWH,
                    State1: stateValues?.States === null ? "" : stateValues?.States[0]?.StateCd,
                    State2: stateValues?.States === null ? "" : stateValues?.States[1]?.StateCd,
                    Payerstateno1: stateValues?.States === null ? "" : stateValues?.States[0]?.StateIdNum,
                    Payerstateno2: stateValues?.States === null ? "" : stateValues?.States[1]?.StateIdNum,
                    Stateincome1: stateValues?.States === null ? 0 : stateValues?.States[0]?.StateIncome,
                    Stateincome2: stateValues?.States === null ? 0 : stateValues?.States[1]?.StateIncome
                })
                setSelectedOption({
                    TINType: RecipientDetails.TINType
                })
                setSelectedFilerIndicator({
                    FilerIndicator: KDetails?.FilerIndicator
                })
                setSelectedIndicateTxnsReported({
                    IndicateTxnsReported: KDetails?.IndicateTxnsReported
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

            setLoading(false)
        } catch (e) {
            setLoading(false)
            throw e
        }
    }

    const handleUpdateForm1099KSubmit = async (e) => {
        e.preventDefault()
        try {
            const statesdetails = [{
                StateCd: editStateInformation?.State1 === "STATE" ? "" : editStateInformation?.State1,
                StateWH: editStateInformation?.Statetaxwithheld1 == "" || editStateInformation?.Statetaxwithheld1 == undefined ? 0 : parseInt(editStateInformation?.Statetaxwithheld1),
                StateIdNum: editStateInformation?.Payerstateno1,
                StateIncome: editStateInformation?.Stateincome1 == "" || editStateInformation?.Stateincome1 == undefined ? 0 : parseInt(editStateInformation?.Stateincome1)
            },
            {
                StateCd: editStateInformation?.State2 === "STATE" ? "" : editStateInformation?.State2,
                StateWH: editStateInformation?.Statetaxwithheld2 == "" || editStateInformation?.Statetaxwithheld2 == undefined ? 0 : parseInt(editStateInformation?.Statetaxwithheld2),
                StateIdNum: editStateInformation?.Payerstateno2,
                StateIncome: editStateInformation?.Stateincome2 == "" || editStateInformation?.Stateincome2 == undefined ? 0 : parseInt(editStateInformation?.Stateincome2)
            }]

            const data = {
                SubmissionManifest: {
                    SubmissionId: editSubmissionManifest?.SubmissionId,
                    TaxYear: editSubmissionManifest?.TaxYear,
                    IsFederalFiling: editSubmissionManifest?.IsFederalFiling,
                    IsStateFiling: editSubmissionManifest?.IsStateFiling,
                    IsPostal: editSubmissionManifest?.IsPostal,
                    IsOnlineAccess: editSubmissionManifest?.IsOnlineAccess,
                    IsScheduleFiling: editSubmissionManifest?.IsScheduleFiling,
                    ScheduleFiling: {
                        EfileDate: editSubmissionManifest?.EfileDate
                    }
                },
                ReturnHeader: {
                    Business: {
                        BusinessNm: editBusinessDetails?.BusinessName,
                        PayerRef: editBusinessDetails?.PayerRef,
                        TradeNm: editBusinessDetails?.TradeName,
                        EINorSSN: editBusinessDetails?.EINOrSSN,
                        IsEIN: editBusinessDetails?.IsEIN,
                        Email: editBusinessDetails?.EmailAddress,
                        ContactNm: editBusinessDetails?.ContactName,
                        Phone: editBusinessDetails?.Phone,
                        PhoneExtn: editBusinessDetails?.PhoneExtn,
                        BusinessType: editBusinessDetails?.BusinessType,
                        SigningAuthority: {
                            Name: editBusinessDetails?.SigningAuthorityName,
                            Phone: editBusinessDetails?.SigningAuthorityPhone,
                            BusinessMemberType: editBusinessDetails?.BusinessMemberType,
                        },
                        KindOfEmployer: editBusinessDetails?.KindOfEmployer,
                        KindOfPayer: editBusinessDetails?.KindOfPayer,
                        IsBusinessTerminated: editBusinessDetails?.IsBusinessTerminated,
                        IsForeign: editBusinessDetails?.IsForeign,
                        USAddress: {
                            Address1: !editBusinessDetails.IsForeign ? editBusinessDetails?.Address1 : "",
                            Address2: !editBusinessDetails.IsForeign ? editBusinessDetails?.Address2 : "",
                            City: !editBusinessDetails.IsForeign ? editBusinessDetails?.City : "",
                            State: !editBusinessDetails.IsForeign ? editBusinessDetails?.State : "",
                            ZipCd: !editBusinessDetails.IsForeign ? editBusinessDetails?.ZipCode : "",
                        },
                        ForeignAddress: {
                            Address1: editBusinessDetails.IsForeign ? editBusinessDetails?.Address1 : "",
                            Address2: editBusinessDetails.IsForeign ? editBusinessDetails?.Address2 : "",
                            City: editBusinessDetails.IsForeign ? editBusinessDetails?.City : "",
                            ProvinceOrStateNm: editBusinessDetails.IsForeign ? editBusinessDetails?.ProvinceOrStateNm : "",
                            Country: editBusinessDetails.IsForeign ? editBusinessDetails?.Country : "",
                            PostalCd: editBusinessDetails.IsForeign ? editBusinessDetails?.PostalCode : "",
                        }
                    }
                },
                ReturnData: [{
                    RecordId: editRecipientInformation?.RecordId,
                    SequenceId: editRecipientInformation?.SequenceId,
                    Recipient: {
                        RecipientId: editRecipientInformation?.RecipientId,
                        TINType: selectedOption?.TINType,
                        TIN: editRecipientInformation?.TIN,
                        FirstPayeeNm: editRecipientInformation?.FirstPayeeNm,
                        SecondPayeeNm: editRecipientInformation?.SecondPayeeNm,
                        IsForeign: editRecipientInformation?.IsForeign,
                        USAddress: {
                            Address1: !editRecipientInformation.IsForeign ? editRecipientInformation?.Address1 : "",
                            Address2: !editRecipientInformation.IsForeign ? editRecipientInformation?.Address2 : "",
                            City: !editRecipientInformation.IsForeign ? editRecipientInformation?.City : "",
                            State: !editRecipientInformation.IsForeign ? editRecipientInformation?.State : "",
                            ZipCd: !editRecipientInformation.IsForeign ? editRecipientInformation?.ZipCd : "",
                        },
                        ForeignAddress: {
                            Address1: editRecipientInformation.IsForeign ? editRecipientInformation?.Address1 : "",
                            Address2: editRecipientInformation.IsForeign ? editRecipientInformation?.Address2 : "",
                            City: editRecipientInformation.IsForeign ? editRecipientInformation?.City : "",
                            ProvinceOrStateNm: editRecipientInformation.IsForeign ? editRecipientInformation?.ProvinceOrStateNm : "",
                            Country: editRecipientInformation.IsForeign ? editRecipientInformation?.Country : "",
                            PostalCd: editRecipientInformation.IsForeign ? editRecipientInformation?.PostalCd : "",
                        },
                        Email: editRecipientInformation?.Email,
                        Phone: editRecipientInformation?.Phone,
                        Fax: editRecipientInformation?.Fax
                    },
                    KFormData: {
                        B1aGrossAmt: editKDetails?.GrossAmt == "" || editKDetails?.GrossAmt == undefined ? 0 : parseInt(editKDetails?.GrossAmt),
                        B1bCardNotPresentTxns: editKDetails?.CardNotPresentTxns == "" || editKDetails?.CardNotPresentTxns == undefined ? 0 : parseInt(editKDetails?.CardNotPresentTxns),
                        B2MerchantCd: editKDetails?.MerchantCd,
                        B3NumPymtTxns: editKDetails?.NumPymtTxns,
                        B4FedTaxWH: editKDetails?.FedTaxWH == "" || editKDetails?.FedTaxWH == undefined ? 0 : parseInt(editKDetails?.FedTaxWH),
                        B5aJan: editKDetails?.Jan == "" || editKDetails?.Jan == undefined ? 0 : parseInt(editKDetails?.Jan),
                        B5bFeb: editKDetails?.Feb == "" || editKDetails?.Feb == undefined ? 0 : parseInt(editKDetails?.Feb),
                        B5cMar: editKDetails?.Mar == "" || editKDetails?.Mar == undefined ? 0 : parseInt(editKDetails?.Mar),
                        B5dApr: editKDetails?.Apr == "" || editKDetails?.Apr == undefined ? 0 : parseInt(editKDetails?.Apr),
                        B5eMay: editKDetails?.May == "" || editKDetails?.May == undefined ? 0 : parseInt(editKDetails?.May),
                        B5fJun: editKDetails?.Jun == "" || editKDetails?.Jun == undefined ? 0 : parseInt(editKDetails?.Jun),
                        B5gJul: editKDetails?.Jul == "" || editKDetails?.Jul == undefined ? 0 : parseInt(editKDetails?.Jul),
                        B5hAug: editKDetails?.Aug == "" || editKDetails?.Aug == undefined ? 0 : parseInt(editKDetails?.Aug),
                        B5iSep: editKDetails?.Sep == "" || editKDetails?.Sep == undefined ? 0 : parseInt(editKDetails?.Sep),
                        B5jOct: editKDetails?.Oct == "" || editKDetails?.Oct == undefined ? 0 : parseInt(editKDetails?.Oct),
                        B5kNov: editKDetails?.Nov == "" || editKDetails?.Nov == undefined ? 0 : parseInt(editKDetails?.Nov),
                        B5lDec: editKDetails?.Dec == "" || editKDetails?.Dec == undefined ? 0 : parseInt(editKDetails?.Dec),
                        AccountNum: editKDetails?.AccountNum,
                        Is2ndTINnot: editKDetails?.SecondTINnot,
                        FilerIndicator: selectFilerIndicator?.FilerIndicator,
                        IndicateTxnsReported: selectIndicateTxnsReported?.IndicateTxnsReported,
                        PSEDetails: {
                            PSEName: editKDetails?.PSEName,
                            PSEPhone: editKDetails?.PSEPhone,
                        },
                        States: statesdetails.length > 0 && statesdetails[0].StateWH != null ? statesdetails : 0
                    }
                }],
            }
            const UpdateForm1099KResponse = await axios.put(`${process.env.REACT_APP_TBS_BACKEND_URL}/Form1099K/Update`, data)
            setSuccessData(UpdateForm1099KResponse.data[0])

            //Modal to show the Success or Failure Response from the Form1099k/Create Endpoint.
            let UpdateForm1099KSuccessModal = new bootstrap.Modal(document.getElementById('successModalToggle'))
            UpdateForm1099KSuccessModal.show()
        } catch (e) {
            setErroData(e?.response?.data)
            //Modal to show the Success or Failure Response from the Form1099k/Create Endpoint.
            let UpdateForm1099MISCErrorModal = new bootstrap.Modal(document.getElementById('errorModalToggle'))
            UpdateForm1099MISCErrorModal.show()
        }
    }

    // Handle onchange for Submission manifest input values
    const handleSubmissionManifestInfo = (e) => {
        const { name, value, checked } = e.target

        if (name == "IsFederalFiling" || name == "IsStateFiling" || name == "IsPostal" || name == "IsOnlineAccess" || name == "IsScheduleFiling") {
            if (checked) {
                setEditSubmissionManifest({
                    ...editSubmissionManifest,
                    [name]: checked
                })
            } else if (!checked) {
                setEditSubmissionManifest({
                    ...editSubmissionManifest,
                    [name]: checked
                })
            }
        } else {
            setEditSubmissionManifest({
                ...editSubmissionManifest,
                [name]: value
            })
        }
    }

    // Handle onchange for Recipient input values
    const handleRecipientInfo = (e) => {
        const { name, value, checked } = e.target

        if (name == "IsForeign" || name == "TINType") {
            if (checked) {
                setEditRecipientInformation({
                    ...editRecipientInformation,
                    Address1: "",
                    Address2: "",
                    City: "",
                    ProvinceOrStateNm: "",
                    PostalCd: "",
                    Country: "",
                    [name]: checked
                })
                setSelectedOption({
                    ...selectedOption,
                    [name]: value
                })
            } else if (!checked) {
                setEditRecipientInformation({
                    ...editRecipientInformation,
                    Address1: "",
                    Address2: "",
                    City: "",
                    State: "",
                    ZipCode: "",
                    [name]: checked
                })
                setSelectedOption({
                    ...selectedOption,
                    [name]: value
                })
            }
        } else {
            setEditRecipientInformation({
                ...editRecipientInformation,
                [name]: value
            })
        }
    }

    // Handle onchange for 1099K Form input values
    const handleKInfo = (e) => {
        const { name, value, checked } = e.target

        if (name == "SecondTINnot" || name === "FilerIndicator" || name === "IndicateTxnsReported") {
            if (checked) {
                setEditKInformation({
                    ...editKDetails,
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
                setEditKInformation({
                    ...editKDetails,
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
            setEditKInformation({
                ...editKDetails,
                [name]: value
            })
        }
    }

    const handleStateinfo = (e) => {
        const { name, value } = e.target
        setEditStateInformation({
            ...editStateInformation,
            [name]: value
        })
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

            <div className="container">
                <div className="w-75 m-auto">
                    <div className="border-1 border rounded-2 pb-4">
                        <h2 className="head-h1 px-12px">Update Form1099K</h2>
                        <div className="px-4">
                            <form className='form d-block' onSubmit={handleUpdateForm1099KSubmit} >
                                <div className="d-flex  align-items-center fs-20 text-dark">
                                    <h1 class="head-1 me-3">{businessData.BusinessName}</h1> <span class="text-muted fs-14"> ( {!businessData.IsEIN ? 'SSN' : 'EIN'} : {businessData.TIN} )</span>
                                </div>
                                <div className="row d-flex justify-content-center mb-15px bg-white">
                                    <div className="col-md-6">
                                        <div className="labelName">
                                            <label className="control-label"><span className="text-danger">*</span>Tax Year:</label>
                                            <input type="text" className='form-control' name='TaxYear' value={editSubmissionManifest.TaxYear} onChange={(e) => { handleSubmissionManifestInfo(e) }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                    </div>
                                    <div className='col mt-3'>
                                        <span className="text-danger">*</span><input className="me-1 form-check-input cursor-pointer" type="checkbox" name='IsFederalFiling' onClick={(e) => { handleSubmissionManifestInfo(e) }} checked={editSubmissionManifest.IsFederalFiling} /><span className="me-3">IsFederalFiling</span>
                                        <input className="me-1 form-check-input cursor-pointer" type="checkbox" name='IsStateFiling' onClick={(e) => { handleSubmissionManifestInfo(e) }} checked={editSubmissionManifest.IsStateFiling} /><span className="me-3">IsStateFiling</span>
                                        <input className="me-1 form-check-input cursor-pointer" type="checkbox" name='IsPostal' onClick={(e) => { handleSubmissionManifestInfo(e) }} checked={editSubmissionManifest.IsPostal} /><span className="me-3">IsPostal</span>
                                        <input className="me-1 form-check-input cursor-pointer" type="checkbox" name='IsOnlineAccess' onClick={(e) => { handleSubmissionManifestInfo(e) }} checked={editSubmissionManifest.IsOnlineAccess} /><span className="me-3">IsOnlineAccess</span>
                                    </div>
                                </div>

                                <div className="row">
                                    <h5 className="sub-head text-left mt-4 mb-3 " style={{ fontWeight: 'bold' }}>Recipient Details</h5>

                                    <div className="row d-flex justify-content-center mb-15px">
                                        <div className="col-md-6">
                                            <div className="labelName">
                                                <label className="control-label"><span className="text-danger">*</span>SequenceId:</label>
                                                <input type="text" className='form-control' name='SequenceId' value={editRecipientInformation.SequenceId} onChange={(e) => { handleRecipientInfo(e) }} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="control-label"><span className="text-danger">*</span>TINType:</label>


                                            <div className="mt-2">
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="TINType" id="inlineRadio1" value="EIN" onClick={(e) => { handleRecipientInfo(e) }} checked={selectedOption.TINType === "EIN"} />
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
                                    <div className="row d-flex justify-content-center mb-15px">
                                        <div className="col-md-6">
                                            <div className="labelName">
                                                <label className="control-label"><span className="text-danger">*</span>TIN:</label>
                                                <input type="text" className='form-control' name='TIN' value={editRecipientInformation?.TIN} maxLength="9" onChange={(e) => { handleRecipientInfo(e) }} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="labelName">
                                                <label className="control-label"><span className="text-danger">*</span>First Name:</label>
                                                <input type="text" className='form-control' name='FirstPayeeNm' value={editRecipientInformation.FirstPayeeNm} onChange={(e) => { handleRecipientInfo(e) }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row d-flex justify-content-center mb-2">
                                        <div className="col-md-6">

                                        </div>
                                        <div className="col-md-6">
                                            <span><input className="form-check-input cursor-pointer" type="checkbox" name='IsForeign' onClick={(e) => { handleRecipientInfo(e) }} checked={editRecipientInformation.IsForeign} /> Is Foreign?</span>
                                        </div>
                                    </div>
                                    {editRecipientInformation.IsForeign ?
                                        <>
                                            {console.log("recipient city", editRecipientInformation.City)}
                                            <div className="row d-flex justify-content-center mb-15px">
                                                <div className="col-md-6">
                                                    <div className="labelName">
                                                        <label className="control-label"><span className="text-danger"></span>Last Name:</label>
                                                        <input type="text" className='form-control' name='SecondPayeeNm' value={editRecipientInformation.SecondPayeeNm} onChange={(e) => { handleRecipientInfo(e) }} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">

                                                    <div className="labelName">
                                                        <label className="control-label"><span className="text-danger">*</span>Address1:</label>
                                                        <input type="text" className='form-control' name='Address1' value={editRecipientInformation.Address1} onChange={(e) => { handleRecipientInfo(e) }} />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row d-flex justify-content-center mb-15px">
                                                <div className="col-md-6">
                                                    <div className="labelName">
                                                        <label className="control-label"><span className="text-danger"></span>Address2:</label>
                                                        <input type="text" className='form-control' name='Address2' value={editRecipientInformation.Address2} onChange={(e) => { handleRecipientInfo(e) }} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="labelName">
                                                        <label className="control-label"><span className="text-danger">*</span>City:</label>
                                                        <input type="text" className='form-control' name='City' value={editRecipientInformation.City} onChange={(e) => { handleRecipientInfo(e) }} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row d-flex justify-content-center mb-15px">
                                                <div className="col-md-6">
                                                    <div className="labelName">
                                                        <label className="control-label"><span className="text-danger">*</span>ProvinceOrStateNm:</label>
                                                        <input type="text" className='form-control' name='ProvinceOrStateNm' value={editRecipientInformation.ProvinceOrStateNm} onChange={(e) => { handleRecipientInfo(e) }} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="labelName">
                                                        <label className="control-label"><span className="text-danger">*</span>Country:</label>
                                                        <select className="form-control form-select" name='Country' value={editRecipientInformation.Country} onChange={(e) => { handleRecipientInfo(e) }} >
                                                            {countriesOptions.map((countryOption, index) => {
                                                                return <option key={index} selected={countryOption?.code == editRecipientInformation.Country ? `selected` : ``} value={countryOption?.code}>
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
                                                        <input type="text" className='form-control' name='PostalCd' value={editRecipientInformation?.PostalCd} onChange={(e) => { handleRecipientInfo(e) }} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="labelName">
                                                        <label className="control-label"><span className="text-danger"></span>Email:</label>
                                                        <input type="text" className='form-control' name='Email' value={editRecipientInformation?.Email} onChange={(e) => { handleRecipientInfo(e) }} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row d-flex justify-content-center mb-15px">
                                                <div className="col-md-6">
                                                    <div className="labelName">
                                                        <label className="control-label"><span className="text-danger"></span>Phone:</label>
                                                        <input type="text" className='form-control' name='Phone' maxLength='10' value={editRecipientInformation?.Phone} onChange={(e) => { handleRecipientInfo(e) }} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="labelName">
                                                        <label className="control-label"><span className="text-danger"></span>Fax:</label>
                                                        <input type="text" className='form-control' name='Fax' value={editRecipientInformation?.Fax} onChange={(e) => { handleRecipientInfo(e) }} />
                                                    </div>
                                                </div>
                                            </div>

                                        </> :
                                        <>
                                            <div className="row d-flex justify-content-center mb-15px">
                                                <div className="col-md-6">
                                                    <div className="labelName">
                                                        <label className="control-label"><span className="text-danger"></span>Last Name:</label>
                                                        <input type="text" className='form-control' name='SecondPayeeNm' value={editRecipientInformation.SecondPayeeNm} onChange={(e) => { handleRecipientInfo(e) }} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">

                                                    <div className="labelName">
                                                        <label className="control-label"><span className="text-danger">*</span>Address1:</label>
                                                        <input type="text" className='form-control' name='Address1' value={editRecipientInformation.Address1} onChange={(e) => { handleRecipientInfo(e) }} />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row d-flex justify-content-center mb-15px">
                                                <div className="col-md-6">
                                                    <div className="labelName">
                                                        <label className="control-label"><span className="text-danger"></span>Address2:</label>
                                                        <input type="text" className='form-control' name='Address2' value={editRecipientInformation.Address2} onChange={(e) => { handleRecipientInfo(e) }} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="labelName">
                                                        <label className="control-label"><span className="text-danger">*</span>City:</label>
                                                        <input type="text" className='form-control' name='City' value={editRecipientInformation.City} onChange={(e) => { handleRecipientInfo(e) }} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row d-flex justify-content-center mb-15px">
                                                <div className="col-md-6">
                                                    <div className="labelName">
                                                        <label className="control-label"><span className="text-danger">*</span>State:</label>
                                                        <select className="form-control form-select" name='State' value={editRecipientInformation.State} onChange={(e) => { handleRecipientInfo(e) }} >
                                                            {statesOptions?.map((stateOption, index) => {
                                                                return <option key={index} selected={stateOption?.code === editRecipientInformation?.State ? `selected` : ``} value={stateOption?.code}>
                                                                    {stateOption?.label}
                                                                </option>
                                                            })}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="labelName">
                                                        <label className="control-label"><span className="text-danger">*</span>ZipCd:</label>
                                                        <input type="text" className='form-control' name='ZipCd' value={editRecipientInformation.ZipCd} onChange={(e) => { handleRecipientInfo(e) }} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row d-flex justify-content-center mb-15px">
                                                <div className="col-md-6">
                                                    <div className="labelName">
                                                        <label className="control-label"><span className="text-danger"></span>Email:</label>
                                                        <input type="text" className='form-control' name='Email' value={editRecipientInformation.Email} onChange={(e) => { handleRecipientInfo(e) }} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="labelName">
                                                        <label className="control-label"><span className="text-danger"></span>Phone:</label>
                                                        <input type="text" className='form-control' name='Phone' maxLength='10' value={editRecipientInformation.Phone} onChange={(e) => { handleRecipientInfo(e) }} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row d-flex justify-content-center mb-15px">
                                                <div className="col-md-6">
                                                    <div className="labelName">
                                                        <label className="control-label"><span className="text-danger"></span>Fax:</label>
                                                        <input type="text" className='form-control' value={editRecipientInformation.Fax} name='Fax' onChange={(e) => { handleRecipientInfo(e) }} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">

                                                </div>
                                            </div>
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
                                                    <input type="text" className="form-control" name='GrossAmt' value={editKDetails.GrossAmt} onChange={(e) => { handleKInfo(e) }} aria-label="Amount (to the nearest dollar)" />

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
                                                    <input type="text" className="form-control" name='CardNotPresentTxns' value={editKDetails.CardNotPresentTxns} onChange={(e) => { handleKInfo(e) }} aria-label="Amount (to the nearest dollar)" />

                                                </div>
                                            </>
                                        </div>
                                    </div>
                                </div>
                                <div className="row d-flex justify-content-center mb-15px">
                                    <div className="col-md-6">
                                        <div className="labelName">
                                            <label className="control-label">Merchant category code:</label>
                                            <input type="text" className='form-control' name='MerchantCd' value={editKDetails.MerchantCd} onChange={(e) => { handleKInfo(e) }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="labelName">
                                            <label className="control-label"><span className="text-danger">*</span>Number of payment transactions</label>
                                            <input type="text" className='form-control' name='NumPymtTxns' value={editKDetails.NumPymtTxns} onChange={(e) => { handleKInfo(e) }} />

                                            <div className="mt-2"><input className="form-check-input cursor-pointer me-2" type="checkbox" name='SecondTINnot' checked={editKDetails.SecondTINnot} onClick={(e) => { handleKInfo(e) }} />2ndTINnot</div>
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
                                                    <input type="text" className="form-control" name='FedTaxWH' value={editKDetails.FedTaxWH} onChange={(e) => { handleKInfo(e) }} aria-label="Amount (to the nearest dollar)" />

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
                                                    <input type="text" className="form-control" name='Jan' value={editKDetails.Jan} onChange={(e) => { handleKInfo(e) }} aria-label="Amount (to the nearest dollar)" />

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
                                                    <input type="text" className="form-control" name='Feb' value={editKDetails.Feb} onChange={(e) => { handleKInfo(e) }} aria-label="Amount (to the nearest dollar)" />

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
                                                    <input type="text" className="form-control" name='Mar' value={editKDetails.Mar} onChange={(e) => { handleKInfo(e) }} aria-label="Amount (to the nearest dollar)" />

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
                                                    <input type="text" className="form-control" name='Apr' value={editKDetails.Apr} onChange={(e) => { handleKInfo(e) }} aria-label="Amount (to the nearest dollar)" />

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
                                                    <input type="text" className="form-control" name='May' value={editKDetails.May} onChange={(e) => { handleKInfo(e) }} aria-label="Amount (to the nearest dollar)" />

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
                                                    <input type="text" className="form-control" name='Jun' value={editKDetails.Jun} onChange={(e) => { handleKInfo(e) }} aria-label="Amount (to the nearest dollar)" />

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
                                                    <input type="text" className="form-control" name='Jul' value={editKDetails.Jul} onChange={(e) => { handleKInfo(e) }} aria-label="Amount (to the nearest dollar)" />

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
                                                    <input type="text" className="form-control" name='Aug' value={editKDetails.Aug} onChange={(e) => { handleKInfo(e) }} aria-label="Amount (to the nearest dollar)" />

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
                                                    <input type="text" className="form-control" name='Sep' value={editKDetails.Sep} onChange={(e) => { handleKInfo(e) }} aria-label="Amount (to the nearest dollar)" />

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
                                                    <input type="text" className="form-control" name='Oct' value={editKDetails.Oct} onChange={(e) => { handleKInfo(e) }} aria-label="Amount (to the nearest dollar)" />

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
                                                    <input type="text" className="form-control" name='Nov' value={editKDetails.Nov} onChange={(e) => { handleKInfo(e) }} aria-label="Amount (to the nearest dollar)" />

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
                                                    <input type="text" className="form-control" name='Dec' value={editKDetails.Dec} onChange={(e) => { handleKInfo(e) }} aria-label="Amount (to the nearest dollar)" />

                                                </div>
                                            </>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="labelName">
                                            <label className="control-label">Account number</label>
                                            <input type="text" className='form-control' name='AccountNum' value={editKDetails.AccountNum} onChange={(e) => { handleKInfo(e) }} />
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
                                                <input className="form-check-input" type="radio" name="IndicateTxnsReported" id="inlineRadio1" value="PAYMENT_CARD" onClick={(e) => { handleKInfo(e) }} checked={selectIndicateTxnsReported.IndicateTxnsReported === 'PAYMENT_CARD'} />
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
                                            <input type="text" className='form-control' name='PSEName' value={editKDetails.PSEName} onChange={(e) => { handleKInfo(e) }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="labelName">
                                            <label className="control-label">PSEPhone</label>
                                            <input type="text" className='form-control' name='PSEPhone' value={editKDetails.PSEPhone} onChange={(e) => { handleKInfo(e) }} />
                                        </div>
                                    </div>
                                </div>
                                <h5 className="sub-head text-left mt-4 mb-3 " style={{ fontWeight: 'bold' }}>Form 1099-K State Details</h5>

                                <div className="row d-flex justify-content-center mb-15px">
                                    <div className="col-md-6">
                                        <div className="labelName">
                                            <label className="control-label">State tax withheld:</label>
                                            <input type="text" className='form-control' name='Statetaxwithheld1' value={editStateInformation.Statetaxwithheld1 === null ? 0 : editStateInformation.Statetaxwithheld1} allowNull={true} onChange={(e) => { handleStateinfo(e) }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="labelName">
                                            <label className="control-label">State:</label>
                                            <select className="form-control form-select" name='State1' value={editStateInformation.State1} allowNull={true} onChange={(e) => { handleStateinfo(e) }}  >
                                                {statesOptions?.map((stateOption, index) => {
                                                    return <option key={index} selected={stateOption?.code === editStateInformation?.State1 ? `selected` : ``} value={stateOption?.code}>
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
                                            <input type="text" className='form-control' name='Payerstateno1' allowNull={true} value={editStateInformation.Payerstateno1 === null ? 0 : editStateInformation.Payerstateno1} onChange={(e) => { handleStateinfo(e) }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                    </div>

                                </div>



                                <div className="row d-flex justify-content-center mb-15px">
                                    <div className="col-md-6">
                                        <div className="labelName">
                                            <label className="control-label"><span className="text-danger"></span>State tax withheld:</label>
                                            <input type="text" className='form-control' name='Statetaxwithheld2' allowNull={true} value={editStateInformation.Statetaxwithheld2} onChange={(e) => { handleStateinfo(e) }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="labelName">
                                            <label className="control-label"><span className="text-danger"></span>State:</label>
                                            <select className="form-control form-select" name='State2' allowNull={true} value={editStateInformation.State2} onChange={(e) => { handleStateinfo(e) }} >
                                                {statesOptions?.map((stateOption, index) => {
                                                    return <option key={index} selected={stateOption?.code === editStateInformation?.State2 ? `selected` : ``} value={stateOption?.code}>
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
                                            <input type="text" className='form-control' name='Payerstateno2' allowNull={true} value={editStateInformation.Payerstateno2} onChange={(e) => { handleStateinfo(e) }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">

                                    </div>

                                </div>
                                <div className="text-center p-10">
                                    <button type="submit" className="btn btn_primary btn_lg"  >
                                        Update Form1099K
                                        <i className="fa fa-spinner fa-spin" aria-hidden="true" id="CreateSpinner" style={{ display: 'none' }}></i>
                                    </button>
                                </div>
                            </form>


                        </div>
                    </div>
                    <Link className='btn btn_back mb-3' to={`/listForm1099K/${businessData.BusinessId}`} >Back</Link>
                </div>
            </div>
            <SuccessModal
                successData={successData} //Success Modal for Update FORM1099K
                businessData={businessData}
            />
            <ErrorModal
                errorData={errorData} //Error Modal for Update FORM1099K
            />
        </>
    )
}

export default UpdateForm1099k