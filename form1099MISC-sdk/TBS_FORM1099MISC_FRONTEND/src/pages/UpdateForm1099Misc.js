import React from 'react'
import { useState, useEffect } from 'react'
import * as bootstrap from 'bootstrap/dist/js/bootstrap'
import axios from 'axios' // Importing Axios to make HTTP calls.
import logo from '../images/tbsLogo.png' // Importing Images
import { useParams, Link } from 'react-router-dom'
import Spinner from '../components/Spinner' // Importing spinner for loader
import { states, countries, suffix, businessType, businessTypeShorts, statesShort, countryShorts, kindOfEmployer, kindOfPayer, EstateBusinessMembers, PartnershipBusinessMembers, CorporationBusinessMembers, ExemptOrganizationBusinessMembers, SoleProprietorshipBusinessMembers } from '../utils/constants' // Importing static values from utils
import SuccessModal from '../components/SuccessModal' // Importing Success Modal
import ErrorModal from '../components/ErrorModal'  // Importing Error Modal

const UpdateForm1099misc = () => {

    // Calling get Form1099MISC function in Use Effect
    useEffect(() => {
        getform1099ById()
    }, [])

    // Getting businessId from params
    const Params = useParams()
    const SubmissionId = Params.SubmissionId
    const RecordId = Params.RecordId
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
        BusinessId:"",
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
        Country: "",
    })

    const [editRecipientInformation, setEditRecipientInformation] = useState({
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

    const [editMISCDetails, setEditMISCInformation] = useState({
        Rents: 0,
        IsDirectSales: false,
        AccountNum: "",
        Is2ndTINnot: false,
        FedTaxWH: 0,
        Royalties: 0,
        OtherIncome: 0,
        FishingBoatProceeds: 0,
        MedHealthcarePymts: 0,
        SubstitutePymts: 0,
        CropInsurance: 0,
        GrossProceeds: 0,
        FishPurForResale: 0,
        Sec409ADeferrals: 0,
        EPP: 0,
        IsFATCA: false,
        NonQualDefComp: 0
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

     // Storing key values of suffix into new array for Dropdown
     const suffixOptions = []
     for (const key in suffix) {
         suffixOptions.push({
             value: suffix[key],
             label: suffix[key],
             key: key,
         })
     }

    // To get Business by Id by requesting get API
    const getform1099ById = async () => {
        try {
            setLoading(true)
            const getForm1099miscResponse = await axios.get(`${process.env.REACT_APP_TBS_BACKEND_URL}/Form1099MISC/Get?SubmissionId=${SubmissionId}&RecordId=${RecordId}`)

            if (getForm1099miscResponse?.data?.StatusCode == 200) {
                const businessDetails = getForm1099miscResponse?.data?.Form1099Records?.ReturnHeader?.Business
                const SubmissionManifest = getForm1099miscResponse?.data?.Form1099Records?.SubmissionManifest
                const SequenceId = getForm1099miscResponse?.data?.Form1099Records?.ReturnData[0]?.SequenceId
                const IsOnlineAccess = getForm1099miscResponse?.data?.Form1099Records?.ReturnData[0]?.IsOnlineAccess
                const IsPostal = getForm1099miscResponse?.data?.Form1099Records?.ReturnData[0]?.IsPostal
                const IsForced = getForm1099miscResponse?.data?.Form1099Records?.ReturnData[0]?.IsForced
                const RecordId = getForm1099miscResponse?.data?.Form1099Records?.ReturnData[0]?.RecordId
                const RecipientId = getForm1099miscResponse?.data?.Form1099Records?.ReturnData[0]?.Recipient?.RecipientId
                const RecipientDetails = getForm1099miscResponse?.data?.Form1099Records?.ReturnData[0]?.Recipient
                const MISCDetails = getForm1099miscResponse?.data?.Form1099Records?.ReturnData[0]?.MISCFormData
                const stateValues = getForm1099miscResponse?.data?.Form1099Records?.ReturnData[0]?.MISCFormData
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
                    IsOnlineAccess:IsOnlineAccess,
                    IsPostal:IsPostal,
                    IsForced:IsForced,
                    SequenceId: SequenceId,
                    RecordId: RecordId,
                    RecipientId: RecipientId,
                    TIN: RecipientDetails?.TIN,
                    TINType: RecipientDetails?.TINType,
                    FirstPayeeNm: RecipientDetails?.FirstPayeeNm,
                    SecondPayeeNm: RecipientDetails?.SecondPayeeNm,
                    FirstNm :RecipientDetails?.FirstNm,
                    LastNm :RecipientDetails?.LastNm,
                    MiddleNm :RecipientDetails?.MiddleNm,
                    Suffix :RecipientDetails?.Suffix,
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
                setEditMISCInformation({
                    Rents: MISCDetails?.B1Rents,
                    Royalties: MISCDetails?.B2Royalties,
                    OtherIncome: MISCDetails?.B3OtherIncome,
                    FedTaxWH: MISCDetails?.B4FedIncomeTaxWH,
                    FishingBoatProceeds: MISCDetails?.B5FishingBoatProceeds,
                    MedHealthcarePymts: MISCDetails?.B6MedHealthcarePymts,
                    IsDirectSales: MISCDetails?.B7IsDirectSale,
                    SubstitutePymts: MISCDetails?.B8SubstitutePymts,
                    CropInsurance: MISCDetails?.B9CropInsurance,
                    GrossProceeds: MISCDetails?.B10GrossProceeds,
                    FishPurForResale: MISCDetails?.B11FishPurForResale,
                    Sec409ADeferrals: MISCDetails?.B12Sec409ADeferrals,
                    IsFATCA: MISCDetails?.B13IsFATCA,
                    EPP: MISCDetails?.B14EPP,
                    NonQualDefComp: MISCDetails?.B15NonQualDefComp,
                    AccountNum: MISCDetails?.AccountNum,
                    Is2ndTINnot: MISCDetails?.Is2ndTINnot,
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
    const handleUpdateForm1099MISCSubmit = async (e) => {
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
            }
            ]

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
                        BusinessId:editBusinessDetails?.BusinessId
                    }
                },
                ReturnData: [{
                    RecordId: editRecipientInformation?.RecordId,
                    SequenceId: editRecipientInformation?.SequenceId,
                    IsOnlineAccess:editRecipientInformation?.IsOnlineAccess,
                    IsForced:editRecipientInformation?.IsForced,
                    IsPostal:editRecipientInformation?.IsPostal,
                    Recipient: {
                        RecipientId: editRecipientInformation?.RecipientId,
                        TINType: selectedOption?.TINType,
                        TIN: editRecipientInformation?.TIN,
                        FirstPayeeNm: editRecipientInformation?.FirstPayeeNm,
                        SecondPayeeNm: editRecipientInformation?.SecondPayeeNm,
                        FirstNm:editRecipientInformation?.FirstNm,
                        LastNm:editRecipientInformation?.LastNm,
                        MiddleNm:editRecipientInformation?.MiddleNm,
                        Suffix:editRecipientInformation?.Suffix,
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
                    MISCFormData: {
                        B1Rents: editMISCDetails?.Rents == "" || editMISCDetails?.Rents == undefined ? 0 : parseInt(editMISCDetails?.Rents),
                        B2Royalties: editMISCDetails?.Royalties == "" || editMISCDetails?.Royalties == undefined ? 0 : parseInt(editMISCDetails?.Royalties),
                        B3OtherIncome: editMISCDetails?.OtherIncome == "" || editMISCDetails?.OtherIncome == undefined ? 0 : parseInt(editMISCDetails?.OtherIncome),
                        B4FedIncomeTaxWH: editMISCDetails?.FedTaxWH == "" || editMISCDetails?.FedTaxWH == undefined ? 0 : parseInt(editMISCDetails?.FedTaxWH),
                        B5FishingBoatProceeds: editMISCDetails?.FishingBoatProceeds == "" || editMISCDetails?.FishingBoatProceeds == undefined ? 0 : parseInt(editMISCDetails?.FishingBoatProceeds),
                        B6MedHealthcarePymts: editMISCDetails?.MedHealthcarePymts == "" || editMISCDetails?.MedHealthcarePymts == undefined ? 0 : parseInt(editMISCDetails?.MedHealthcarePymts),
                        B7IsDirectSale: editMISCDetails?.IsDirectSales,
                        B8SubstitutePymts: editMISCDetails?.SubstitutePymts == "" || editMISCDetails?.SubstitutePymts == undefined ? 0 : parseInt(editMISCDetails?.SubstitutePymts),
                        B9CropInsurance: editMISCDetails?.CropInsurance == "" || editMISCDetails?.CropInsurance == undefined ? 0 : parseInt(editMISCDetails?.CropInsurance),
                        B10GrossProceeds: editMISCDetails?.GrossProceeds == "" || editMISCDetails?.GrossProceeds == undefined ? 0 : parseInt(editMISCDetails?.GrossProceeds),
                        B11FishPurForResale: editMISCDetails?.FishPurForResale == "" || editMISCDetails?.FishPurForResale == undefined ? 0 : parseInt(editMISCDetails?.FishPurForResale),
                        B12Sec409ADeferrals: editMISCDetails?.Sec409ADeferrals == "" || editMISCDetails?.Sec409ADeferrals == undefined ? 0 : parseInt(editMISCDetails?.Sec409ADeferrals),
                        B13IsFATCA: editMISCDetails?.IsFATCA,
                        B14EPP: editMISCDetails?.EPP == "" || editMISCDetails?.EPP == undefined ? 0 : parseInt(editMISCDetails?.EPP),
                        B15NonQualDefComp: editMISCDetails?.NonQualDefComp == "" || editMISCDetails?.NonQualDefComp == undefined ? 0 : parseInt(editMISCDetails?.NonQualDefComp),
                        AccountNum: editMISCDetails?.AccountNum == "" || editMISCDetails?.AccountNum == undefined ? 0 : parseInt(editMISCDetails?.AccountNum),
                        Is2ndTINnot: editMISCDetails?.Is2ndTINnot,
                        States: statesdetails.length > 0 && statesdetails[0].StateWH != null ? statesdetails : 0
                    }
                }
                ],
            }
            const UpdateForm1099MISCResponse = await axios.put(`${process.env.REACT_APP_TBS_BACKEND_URL}/Form1099MISC/Update`, data)
            setSuccessData(UpdateForm1099MISCResponse.data[0])

            //Modal to show the Success or Failure Response from the Form1099misc/update Endpoint.
            let UpdateForm1099MISCSuccessModal = new bootstrap.Modal(document.getElementById('successModalToggle'))
            UpdateForm1099MISCSuccessModal.show()
        }
        catch (e) {
            setErroData(e?.response?.data)
            //Modal to show the Success or Failure Response from the Form1099misc/update Endpoint.
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

        if (name == "IsForeign" || name == "TINType" || name =="IsOnlineAccess" || name =="IsPostal" || name =="IsForced") {
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
    // Handle onchange for MISC Form input values
    const handleMISCInfo = (e) => {
        const { name, value, checked } = e.target

        if (name == "IsDirectSales" || name == "Is2ndTINnot" || name == "IsFATCA") {
            if (checked) {
                setEditMISCInformation({
                    ...editMISCDetails,
                    [name]: checked
                })
            } else if (!checked) {
                setEditMISCInformation({
                    ...editMISCDetails,
                    [name]: checked
                })
            }
        } else {
            setEditMISCInformation({
                ...editMISCDetails,
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
                        <h2 className="head-h1 px-12px">Update Form1099MISC</h2>
                        <div className="px-4">
                            <form className='form d-block' onSubmit={handleUpdateForm1099MISCSubmit} >
                                <div className="d-flex  align-items-center fs-20 text-dark">
                                    <h1 class="head-1 me-3">{businessData.BusinessName}</h1> <span class="text-muted fs-14"> ( {businessData.IsEIN === false ? 'SSN' : 'EIN'} : {businessData.TIN} )</span>
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
                                    <div className='col md-3 d-flex' style={{'justify-content': 'space-evenly'}}>
                                        <div>
                                            <input className="me-1 form-check-input cursor-pointer" type="checkbox" name='IsPostal' onClick={(e) => { handleRecipientInfo(e) }} checked={editRecipientInformation?.IsPostal} /><span className="me-3">IsPostal</span>
                                        </div>
                                        <div>

                                            <input className="me-1 form-check-input cursor-pointer" type="checkbox" name='IsOnlineAccess' onClick={(e) => { handleRecipientInfo(e) }} checked={editRecipientInformation?.IsOnlineAccess} /><span className="me-3">IsOnlineAccess</span>
                                        </div>
                                        <div>
                                            <input className="me-1 form-check-input cursor-pointer" type="checkbox" name='IsForced' onClick={(e) => { handleRecipientInfo(e) }} checked={editRecipientInformation?.IsForced} /><span className="me-3">IsForced</span>
                                        </div>
                                       
                                    </div>
                                                <div className="col-md-6">
                                                </div>
                                            </div>
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

                                    {
                                        selectedOption?.TINType === "EIN" ? 
                                        <>
                                         <div className="row d-flex justify-content-center mb-15px">
                                        <div className="col-md-6">
                                            <div className="labelName">
                                                <label className="control-label"><span className="text-danger">*</span>TIN:</label>
                                                <input type="text" className='form-control' name='TIN' value={editRecipientInformation?.TIN} maxLength="9" onChange={(e) => { handleRecipientInfo(e) }} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="labelName">
                                                <label className="control-label"><span className="text-danger">*</span>First PayeeName:</label>
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
                                            <div className="row d-flex justify-content-center mb-15px">
                                                <div className="col-md-6">
                                                    <div className="labelName">
                                                        <label className="control-label"><span className="text-danger"></span>Second PayeeName:</label>
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
                                                        <label className="control-label"><span className="text-danger"></span>Second PayeeName:</label>
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
                                                        <input type="text" className='form-control' name='Fax' maxLength='10' value={editRecipientInformation.Fax} onChange={(e) => { handleRecipientInfo(e) }} />
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
                                                <input type="text" className='form-control' name='TIN' value={editRecipientInformation?.TIN} maxLength="9" onChange={(e) => { handleRecipientInfo(e) }} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="labelName">
                                                <label className="control-label"><span className="text-danger">*</span>First Name:</label>
                                                <input type="text" className='form-control' name='FirstNm' value={editRecipientInformation?.FirstNm} onChange={(e) => { handleRecipientInfo(e) }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row d-flex justify-content-center mb-15px">
                                        <div className="col-md-6">
                                            <div className="labelName">
                                                <label className="control-label"><span className="text-danger"></span>Middle Name:</label>
                                                <input type="text" className='form-control' name='MiddleNm' value={editRecipientInformation?.MiddleNm} maxLength="9" onChange={(e) => { handleRecipientInfo(e) }} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="labelName">
                                                <label className="control-label"><span className="text-danger">*</span>Last Name:</label>
                                                <input type="text" className='form-control' name='LastNm' value={editRecipientInformation?.LastNm} onChange={(e) => { handleRecipientInfo(e) }} />
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
                                            <div className="row d-flex justify-content-center mb-15px">
                                                <div className="col-md-6">
                                                    <div className="labelName">
                                                        <label className="control-label"><span className="text-danger"></span>Suffix:</label>
                                                        <select className='form-control form-select' name='Suffix' value={editRecipientInformation?.Suffix} onChange={(e) => { handleRecipientInfo(e) }}  >
                                                          {suffixOptions?.map((suffixOption, index) => {
                                                            return <option key={suffixOption.key} selected={suffixOption.value == editRecipientInformation.Suffix ? `selected` : ``} value={suffixOption.label}>
                                                              {suffixOption?.label}
                                                            </option>
                                                          })}
                                                        </select>
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
                                                        <label className="control-label"><span className="text-danger"></span>Suffix:</label>
                                                        <select className='form-control form-select' name='Suffix' value={editRecipientInformation?.Suffix} onChange={(e) => { handleRecipientInfo(e) }}  >
                                                          {suffixOptions?.map((suffixOption, index) => {
                                                            return <option key={suffixOption.key} selected={suffixOption.value == editRecipientInformation?.Suffix ? `selected` : ``} value={suffixOption.label}>
                                                              {suffixOption?.label}
                                                            </option>
                                                          })}
                                                        </select>
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
                                                        <input type="text" className='form-control' name='Fax' maxLength='10' value={editRecipientInformation.Fax} onChange={(e) => { handleRecipientInfo(e) }} />
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
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text">$</span>
                                                </div>
                                                <input type="text" class="form-control" name='Rents' value={editMISCDetails.Rents} onChange={(e) => { handleMISCInfo(e) }} aria-label="Amount (to the nearest dollar)" />
                                                <div class="input-group-append">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="labelName">
                                            <label className="control-label">IsDirectSales:</label>

                                            <div className="d-block">
                                                <input className="form-check-input cursor-pointer me-2" type="checkbox" name='IsDirectSales' onClick={(e) => { handleMISCInfo(e) }} checked={editMISCDetails.IsDirectSales} />Payer made direct sales totaling $5,000 or more of consumer products to recipient for resale
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row d-flex justify-content-center mb-15px">
                                    <div className="col-md-6">
                                        <div className="labelName">
                                            <label className="control-label">Federal income tax withheld:</label>
                                            <div class="input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <span class="input-group-text">$</span>
                                                </div>
                                                <input type="text" className='form-control' name='FedTaxWH' value={editMISCDetails.FedTaxWH} onChange={(e) => { handleMISCInfo(e) }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="labelName">
                                            <label className="control-label">AccountNum:</label>
                                            <input type="text" className='form-control' name='AccountNum' value={editMISCDetails.AccountNum} onChange={(e) => { handleMISCInfo(e) }} />
                                            <div className="mt-2"><input className="form-check-input cursor-pointer me-2" type="checkbox" name='Is2ndTINnot' onClick={(e) => { handleMISCInfo(e) }} checked={editMISCDetails.Is2ndTINnot} />2ndTINnot</div>
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
                                                    <input type="text" className="form-control" name='Royalties' value={editMISCDetails.Royalties} onChange={(e) => { handleMISCInfo(e) }} aria-label="Amount (to the nearest dollar)" />

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
                                                    <input type="text" className="form-control" name='OtherIncome' value={editMISCDetails.OtherIncome} onChange={(e) => { handleMISCInfo(e) }} aria-label="Amount (to the nearest dollar)" />

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
                                                    <input type="text" className="form-control" name='FishingBoatProceeds' value={editMISCDetails.FishingBoatProceeds} onChange={(e) => { handleMISCInfo(e) }} aria-label="Amount (to the nearest dollar)" />

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
                                                    <input type="text" className="form-control" name='MedHealthcarePymts' value={editMISCDetails.MedHealthcarePymts} onChange={(e) => { handleMISCInfo(e) }} aria-label="Amount (to the nearest dollar)" />

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
                                                    <input type="text" className="form-control" name='SubstitutePymts' value={editMISCDetails.SubstitutePymts} onChange={(e) => { handleMISCInfo(e) }} aria-label="Amount (to the nearest dollar)" />

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
                                                    <input type="text" className="form-control" name='CropInsurance' value={editMISCDetails.CropInsurance} onChange={(e) => { handleMISCInfo(e) }} aria-label="Amount (to the nearest dollar)" />

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
                                                    <input type="text" className="form-control" name='GrossProceeds' value={editMISCDetails.GrossProceeds} onChange={(e) => { handleMISCInfo(e) }} aria-label="Amount (to the nearest dollar)" />

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
                                                    <input type="text" className="form-control" name='FishPurForResale' value={editMISCDetails.FishPurForResale} onChange={(e) => { handleMISCInfo(e) }} aria-label="Amount (to the nearest dollar)" />

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
                                                    <input type="text" className="form-control" name='Sec409ADeferrals' value={editMISCDetails.Sec409ADeferrals} onChange={(e) => { handleMISCInfo(e) }} aria-label="Amount (to the nearest dollar)" />

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
                                                    <input type="text" className="form-control" name='EPP' value={editMISCDetails.EPP} onChange={(e) => { handleMISCInfo(e) }} aria-label="Amount (to the nearest dollar)" />

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
                                                    <input type="text" className="form-control" name='NonQualDefComp' value={editMISCDetails.NonQualDefComp} onChange={(e) => { handleMISCInfo(e) }} aria-label="Amount (to the nearest dollar)" />
                                                </div>
                                            </>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mt-2"><input className="form-check-input cursor-pointer me-2" type="checkbox" name='IsFATCA' checked={editMISCDetails.IsFATCA} onClick={(e) => { handleMISCInfo(e) }} />IsFATCA</div>
                                    </div>
                                </div>

                                <h5 className="sub-head text-left mt-4 mb-3 " style={{ fontWeight: 'bold' }}>Form 1099-MISC State Details</h5>

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
                                        <div className="labelName">
                                            <label className="control-label">State income:</label>
                                            <input type="text" className='form-control' name='Stateincome1' allowNull={true} value={editStateInformation.Stateincome1} onChange={(e) => { handleStateinfo(e) }} />
                                        </div>
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
                                        <div className="labelName">
                                            <label className="control-label"><span className="text-danger"></span>State income:</label>
                                            <input type="text" className='form-control' name='Stateincome2' allowNull={true} value={editStateInformation.Stateincome2} onChange={(e) => { handleStateinfo(e) }} />
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center p-10">
                                    <button type="submit" className="btn btn_primary btn_lg"  >
                                        Update Form1099MISC
                                        <i className="fa fa-spinner fa-spin" aria-hidden="true" id="CreateSpinner" style={{ display: 'none' }}></i>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <Link className='btn btn_back mt-3 mb-5' to={`/listForm1099MISC/${businessData.BusinessId}`} >Back</Link>
                </div>
            </div>
            
            <SuccessModal
                successData={successData} //Success Modal for Update FORM1099MISC
                businessData={businessData}
            />
            <ErrorModal
                errorData={errorData} //Error Modal for Update FORM1099MISC
            />
        </>
    )
}

export default UpdateForm1099misc