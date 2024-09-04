import React, { useState, useEffect } from 'react'
import * as bootstrap from 'bootstrap/dist/js/bootstrap'
import axios from 'axios' // Importing Axios to make HTTP calls.
import logo from '../images/tbsLogo.png' // Importing Images
import { useNavigate, useParams } from 'react-router-dom'
import Spinner from '../components/Spinner' // Importing spinner for loader
import { month, paymentMethod, overPaymentType,suffix, bankAccountType, states, countries, businessType, businessTypeShorts, statesShort, countryShorts, kindOfEmployer, kindOfPayer, EstateBusinessMembers, PartnershipBusinessMembers, CorporationBusinessMembers, ExemptOrganizationBusinessMembers, SoleProprietorshipBusinessMembers } from '../utils/constants' // Importing static values from utils
import ReconStateAL from '../components/ReconStateAL' //Importing Recon State AL
import ReconStateWV from '../components/ReconStateWV' //Importing Recon State WV
import SuccessModal from '../components/SuccessModal' // Importing Success Modal
import ErrorModal from '../components/ErrorModal'  // Importing Error Modal

//Create Form1099-NEC page
const CreateForm1099NEC = () => {
    // Calling get business function in Use Effect
    useEffect(() => {
        getBusiness(businessId)
    }, [])

    // Getting businessId from params
    const { businessId } = useParams()

    //Defining States
    const [loading, setLoading] = useState(false) // Initializing state for loading
    const [errorData, setErroData] = useState([]) // Initializing state for error response modal
    const [successData, setSuccessData] = useState([]) // Initializing state for success response modal
    const [status, setStatus] = useState('') // Initializing state for success modal status
    const [inputData, setInputData] = useState([]) // Initializing state for IncomeTaxWHAndRemitt input data

    //Initializing state for TIN Type selection
    const [selectedOption, setSelectedOption] = useState({
        TINType: ""
    })
     // Initializing state for count length for IncomeTaxWHAndRemittValues data
     const [countLength, setCountLength] = useState(0)
    //Initializing state for Business Details 
    const [createBusiness, setCreateBusiness] = useState({
        BusinessId: "",
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

    //Initializing state for Recipient Details
    const [recipientInformation, setRecipientInformation] = useState({
        IsPostal: false,
        IsOnlineAccess: false,
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

    //Initializing state for Submission Manifest Details
    const [submissionManifest, setSubmissionManifest] = useState({
        TaxYear: "",
        IsFederalFiling: false,
        IsStateFiling: false,
        IsPostal: false,
        IsOnlineAccess: false,
        IsScheduleFiling: false,
        EfileDate: ""
    })

    //Initializing state for Form1099-NEC Details
    const [necInformation, setNECInformation] = useState({
        Nonemployeecompensation: 0,
        IsDirectSales: false,
        AccountNum: "",
        SecondTINnot: false,
        FedTaxWH: 0
    })

    //Initializing state for Form1099-NEC State Details
    const [stateInformation, setStateInformation] = useState({
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

    //Initializing state for Form1099-NEC Recon State WV Details
    const [reconStateWV, setReconStateWV] = useState({
        WVWithHoldingID: "",
        NumOf1099W2: 0,
        TotalTaxWH1099W2: 0,
        WVTaxQ1: 0,
        WVTaxQ2: 0,
        WVTaxQ3: 0,
        WVTaxQ4: 0,
        TotalForYear: 0
    })

    //Initializing state for Form1099-NEC Recon State AL Details
    const [reconStateAL, setReconStateAL] = useState({
        ALWithHoldingID: "",
        NumOf1099W2: 0,
        IncomeTaxWHAndRemitt: [],
        TotTaxRemitt: 0,
        TotTaxWH1099W2: 0,
        TotTaxDue: 0,
        TotOverpayment: 0,
        OverPaymentType: "",
        PaymentMethod: "",
        IsInternationalACHTxn: false,
        BankAccType: "",
        BankAccNum: "",
        BankRoutingNum: "",
        PaymentDate: "",
        Address: "",
        City: "",
        State: "",
        Zip: 0,
        ZipExtn: 0
    })

    //To navigate between pages using useNavigate Hook
    const navigate = useNavigate()

    // To navigate to List Business page
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

    // Storing key values of Month into new array
    const monthOptions = []
    for (const key in month) {
        monthOptions.push({
            value: month[key],
            label: month[key],
            key: key,
        })
    }

    // Storing key values of payment method into new array
    const paymentMethodOptions = []
    for (const key in paymentMethod) {
        paymentMethodOptions.push({
            value: paymentMethod[key],
            label: paymentMethod[key],
            key: key,
        })
    }

    // Storing key values of bank account type  into new array
    const bankAccountTypeOptions = []
    for (const key in bankAccountType) {
        bankAccountTypeOptions.push({
            value: bankAccountType[key],
            label: bankAccountType[key],
            key: key,
        })
    }

    // Storing key values of over payment type  into new array
    const overPaymentTypeOptions = []
    for (const key in overPaymentType) {
        overPaymentTypeOptions.push({
            value: overPaymentType[key],
            label: overPaymentType[key],
            key: key,
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
    // Initializing state for IncomeTaxWHAndRemitt input fields
  const [inputFields, setInputFields] = useState([{
    Month: "",
    TaxWH: 0,
    TaxRemitt: 0
  }])
//   setInputData(inputFields)

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
    // Defining function for IncomeTaxWHAndRemitt input data
    const handleInputData = () => {
        const incomeTaxData = inputFields?.map((data) => {
            return {
                Month: data?.Month === "MONTH" ? "" : data?.Month,
                TaxWH: data?.TaxWH === "" ? 0 : parseInt(data?.TaxWH),
                TaxRemitt: data?.TaxRemitt === "" ? 0 : parseInt(data?.TaxRemitt),
            }
        })

        return incomeTaxData;
    }
       
    // To get Business by requesting Get Business Endpoint
    const getBusiness = async (businessId) => {
        try {
            setLoading(true)
            const getBusinessResponse = await axios.get(`${process.env.REACT_APP_TBS_BACKEND_URL}/Business/Get/${businessId}`)

            if (getBusinessResponse?.data?.StatusCode === 200) {
                setLoading(true)
                const businessDetails = getBusinessResponse?.data?.Business

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

                setLoading(false)
            }
            setLoading(false)
        } catch (e) {
            setLoading(false)
            throw e
        }

    }

    // To create Form1099-NEC by passing input data from state to Create Form1099NEC API
    const handleCreateForm1099NECSubmit = async (e) => {
        e.preventDefault()
        const incomeTaxWHAndRemittData = handleInputData()
        try {
           
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
                StateIdNum: stateInformation?.Payerstateno2 === null ? "" : stateInformation?.Payerstateno2,
                StateIncome: stateInformation?.Stateincome2 == "" ? 0 : parseInt(stateInformation?.Stateincome2)
            }]
            const EFTDebitInfo = {
                BankAccType: reconStateAL?.BankAccType,
                BankAccNum: reconStateAL?.BankAccNum,
                BankRoutingNum: reconStateAL?.BankRoutingNum,
                PaymentDate: reconStateAL?.PaymentDate
            }
            const FundingSource = {
                Address: reconStateAL?.Address,
                City: reconStateAL?.City,
                State: reconStateAL?.State,
                Zip: reconStateAL?.Zip == "" ? 0 : parseInt(reconStateAL?.Zip),
                ZipExtn: reconStateAL?.ZipExtn == "" ? 0 : parseInt(reconStateAL?.ZipExtn)
            }
            const WVReconStateValues = {
                FormIT103: {
                    WVWithHoldingID: reconStateWV?.WVWithHoldingID,
                    NumOf1099W2: reconStateWV?.NumOf1099W2 === "" ? 0 : parseInt(reconStateWV?.NumOf1099W2),
                    TotalTaxWH1099W2: reconStateWV?.TotalTaxWH1099W2 === "" ? 0 : parseInt(reconStateWV?.TotalTaxWH1099W2),
                    WHTaxDue: {
                        WVTaxQ1: reconStateWV?.WVTaxQ1 === "" ? 0 : parseInt(reconStateWV?.WVTaxQ1),
                        WVTaxQ2: reconStateWV?.WVTaxQ2 === "" ? 0 : parseInt(reconStateWV?.WVTaxQ2),
                        WVTaxQ3: reconStateWV?.WVTaxQ3 === "" ? 0 : parseInt(reconStateWV?.WVTaxQ3),
                        WVTaxQ4: reconStateWV?.WVTaxQ4 === "" ? 0 : parseInt(reconStateWV?.WVTaxQ4),
                        TotalForYear: reconStateWV?.TotalForYear === "" ? 0 : parseInt(reconStateWV?.TotalForYear)
                    }
                }
            }
            const ALReconStateValues = {
                FormA3: {
                    ALWithHoldingID: reconStateAL?.ALWithHoldingID,
                    NumOf1099W2: reconStateAL?.NumOf1099W2 == "" ? 0 : parseInt(reconStateAL?.NumOf1099W2),
                    IncomeTaxWHAndRemitt: incomeTaxWHAndRemittData,
                    PaymentDetails: {
                        TotTaxRemitt: reconStateAL?.TotTaxRemitt == "" ? 0 : parseInt(reconStateAL?.TotTaxRemitt),
                        TotTaxWH1099W2: reconStateAL?.TotTaxWH1099W2 == "" ? 0 : parseInt(reconStateAL?.TotTaxWH1099W2),
                        TotTaxDue: reconStateAL?.TotTaxDue == "" ? 0 : parseInt(reconStateAL?.TotTaxDue),
                        TotOverpayment: reconStateAL?.TotOverpayment == "" ? 0 : parseInt(reconStateAL?.TotOverpayment),
                        OverPaymentType: reconStateAL?.OverPaymentType === "Over Payment Type" ? "" : reconStateAL?.OverPaymentType,
                        PaymentMethod: reconStateAL?.PaymentMethod === "Payment Method" ? "" : reconStateAL?.PaymentMethod,
                        IsInternationalACHTxn: reconStateAL?.IsInternationalACHTxn,
                    },
                    EFTDebitInfo: reconStateAL?.PaymentMethod === "EFT Debit" ? EFTDebitInfo : null,
                    FundingSource: !reconStateAL?.IsInternationalACHTxn ? null : FundingSource

                }
            }
            const data = {
                SubmissionManifest: {
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
                            Address1: !createBusiness.IsForeign ? createBusiness?.Address1 : "",
                            Address2: !createBusiness.IsForeign ? createBusiness?.Address2 : "",
                            City: !createBusiness.IsForeign ? createBusiness?.City : "",
                            State: !createBusiness.IsForeign ? createBusiness?.State : "",
                            ZipCd: !createBusiness.IsForeign ? createBusiness?.ZipCode : "",
                        },
                        ForeignAddress: {
                            Address1: createBusiness.IsForeign ? createBusiness?.Address1 : "",
                            Address2: createBusiness.IsForeign ? createBusiness?.Address2 : "",
                            City: createBusiness.IsForeign ? createBusiness?.City : "",
                            ProvinceOrStateNm: createBusiness.IsForeign ? createBusiness?.ProvinceOrStateNm : "",
                            Country: createBusiness.IsForeign ? createBusiness?.Country : "",
                            PostalCd: createBusiness.IsForeign ? createBusiness?.PostalCode : "",
                        }
                    }
                },
                ReturnData: [{
                    SequenceId: recipientInformation?.SequenceId,
                    IsPostal: recipientInformation?.IsPostal,
                    IsOnlineAccess: recipientInformation?.IsOnlineAccess,
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
                    NECFormData: {
                        B1NEC: necInformation?.Nonemployeecompensation === "" ? 0 : necInformation?.Nonemployeecompensation,
                        B2IsDirectSales: necInformation?.IsDirectSales,
                        B4FedTaxWH: necInformation?.FedTaxWH === "" ? 0 : necInformation?.FedTaxWH,
                        Is2ndTINnot: necInformation?.SecondTINnot,
                        AccountNum: necInformation?.AccountNum,
                        States: stateValues.length > 0 && stateValues[0].StateWH != null ? stateValues : 0,
                    }
                }
                ],
                StateReconData: {
                    WV: WVReconStateValues !== null && (stateInformation?.State1 === "WV" || stateInformation?.State2 === "WV") ? WVReconStateValues : null,
                    AL: ALReconStateValues !== null && (stateInformation?.State1 === "AL" || stateInformation?.State2 === "AL") ? ALReconStateValues : null
                }
            }
            console.log("createdata",data);
            const createForm1099NECResponse = await axios.post(`${process.env.REACT_APP_TBS_BACKEND_URL}/Form1099NEC/Create`, data)
            setSuccessData(createForm1099NECResponse?.data)
            setStatus('createForm')

            //Modal to show the Success Response from the Form1099nec/Create Endpoint.
            let form1099NECSuccessModal = new bootstrap.Modal(document.getElementById('successModalToggle'))
            form1099NECSuccessModal.show()

        }
        catch (e) {
            setErroData(e?.response?.data)

            //Modal to show the Error Response from the Form1099nec/Create Endpoint.
            let form1099NECErrorModal = new bootstrap.Modal(document.getElementById('errorModalToggle'))
            form1099NECErrorModal.show()
        }
        setLoading(false)
    }

    // Handle onchange for Recipient input values
    const handleRecipientInfo = (e) => {
        const { name, value, checked } = e.target

        if (name === "IsForeign" || name === "TINType" || name==="IsPostal" || name==="IsOnlineAccess" || name==="IsForced") {
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
    const handleSubmissionManifestInfo = (e) => {
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

    // Handle onchange for NEC Form input values
    const handleNECInfo = (e) => {
        const { name, value, checked } = e.target

        if (name === "IsDirectSales" || name === "SecondTINnot") {
            if (checked) {
                setNECInformation({
                    ...necInformation,
                    [name]: checked
                })
            } else if (!checked) {
                setNECInformation({
                    ...necInformation,
                    [name]: checked
                })
            }
        } else {
            setNECInformation({
                ...necInformation,
                [name]: value
            })
        }
    }

    // Handle onchange for NEC Form State values
    const handleStateInfo = (e) => {
        const { name, value } = e.target
        setStateInformation({
            ...stateInformation,
            [name]: value
        })
    }

    // Handle onchange for Recon State AL
    const handleReconStateAL = (e) => {
        const { name, checked, value } = e.target
        if (name === "IsInternationalACHTxn") {
            setReconStateAL({
                ...reconStateAL,
                [name]: checked
            })
        } else {
            setReconStateAL({
                ...reconStateAL,
                [name]: value
            })
        }

    }

    // Handle onchange for Recon State WV 
    const handleReconStateWV = (e) => {
        const { name, value } = e.target
        setReconStateWV({
            ...reconStateWV,
            [name]: value
        })
    }

    // To validate Form1099NEC by passing input data from state to Validate Form1099NEC API
    const validateForm = async (e) => {
        const incomeTaxWHAndRemittData = handleInputData()
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
            const EFTDebitInfo = {
                BankAccType: reconStateAL?.BankAccType,
                BankAccNum: reconStateAL?.BankAccNum,
                BankRoutingNum: reconStateAL?.BankRoutingNum,
                PaymentDate: reconStateAL?.PaymentDate
            }
            const FundingSource = {
                Address: reconStateAL?.Address,
                City: reconStateAL?.City,
                State: reconStateAL?.State,
                Zip: reconStateAL?.Zip == "" ? 0 : parseInt(reconStateAL?.Zip),
                ZipExtn: reconStateAL?.ZipExtn == "" ? 0 : parseInt(reconStateAL?.ZipExtn)
            }
            const WVReconStateValues = {
                FormIT103: {
                    WVWithHoldingID: reconStateWV?.WVWithHoldingID,
                    NumOf1099W2: reconStateWV?.NumOf1099W2 == "" ? 0 : parseInt(reconStateWV?.NumOf1099W2),
                    TotalTaxWH1099W2: reconStateWV?.TotalTaxWH1099W2 === "" ? 0 : parseInt(reconStateWV?.TotalTaxWH1099W2),
                    WHTaxDue: {
                        WVTaxQ1: reconStateWV?.WVTaxQ1 == "" ? 0 : parseInt(reconStateWV?.WVTaxQ1),
                        WVTaxQ2: reconStateWV?.WVTaxQ2 == "" ? 0 : parseInt(reconStateWV?.WVTaxQ2),
                        WVTaxQ3: reconStateWV?.WVTaxQ3 == "" ? 0 : parseInt(reconStateWV?.WVTaxQ3),
                        WVTaxQ4: reconStateWV?.WVTaxQ4 == "" ? 0 : parseInt(reconStateWV?.WVTaxQ4),
                        TotalForYear: reconStateWV?.TotalForYear == "" ? 0 : parseInt(reconStateWV?.TotalForYear)
                    }
                }
            }
            const ALReconStateValues = {
                FormA3: {
                    ALWithHoldingID: reconStateAL?.ALWithHoldingID,
                    NumOf1099W2: reconStateAL?.NumOf1099W2 == "" ? 0 : parseInt(reconStateAL?.NumOf1099W2),
                    IncomeTaxWHAndRemitt: incomeTaxWHAndRemittData,
                    PaymentDetails: {
                        TotTaxRemitt: reconStateAL?.TotTaxRemitt == "" ? 0 : parseInt(reconStateAL?.TotTaxRemitt),
                        TotTaxWH1099W2: reconStateAL?.TotTaxWH1099W2 == "" ? 0 : parseInt(reconStateAL?.TotTaxWH1099W2),
                        TotTaxDue: reconStateAL?.TotTaxDue == "" ? 0 : parseInt(reconStateAL?.TotTaxDue),
                        TotOverpayment: reconStateAL?.TotOverpayment == "" ? 0 : parseInt(reconStateAL?.TotOverpayment),
                        OverPaymentType: reconStateAL?.OverPaymentType === "Over Payment Type" ? "" : reconStateAL?.OverPaymentType,
                        PaymentMethod: reconStateAL?.PaymentMethod === "Payment Method" ? "" : reconStateAL?.PaymentMethod,
                        IsInternationalACHTxn: reconStateAL?.IsInternationalACHTxn,
                    },
                    EFTDebitInfo: reconStateAL?.PaymentMethod === "EFT Debit" ? EFTDebitInfo : null,
                    FundingSource: !reconStateAL?.IsInternationalACHTxn ? null : FundingSource

                }
            }
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
                            Address1: !createBusiness.IsForeign ? createBusiness?.Address1 : "",
                            Address2: !createBusiness.IsForeign ? createBusiness?.Address2 : "",
                            City: !createBusiness.IsForeign ? createBusiness?.City : "",
                            State: !createBusiness.IsForeign ? createBusiness?.State : "",
                            ZipCd: !createBusiness.IsForeign ? createBusiness?.ZipCode : "",
                        },
                        ForeignAddress: {
                            Address1: createBusiness.IsForeign ? createBusiness?.Address1 : "",
                            Address2: createBusiness.IsForeign ? createBusiness?.Address2 : "",
                            City: createBusiness.IsForeign ? createBusiness?.City : "",
                            ProvinceOrStateNm: createBusiness.IsForeign ? createBusiness?.ProvinceOrStateNm : "",
                            Country: createBusiness.IsForeign ? createBusiness?.Country : "",
                            PostalCd: createBusiness.IsForeign ? createBusiness?.PostalCd : "",
                        }
                    }
                },
                ReturnData: [{
                    SequenceId: recipientInformation?.SequenceId,
                    IsPostal: recipientInformation?.IsPostal,
                    IsOnlineAccess: recipientInformation?.IsOnlineAccess,
                    IsForced: recipientInformation?.IsForced,
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
                        Phone: recipientInformation?.Phone,
                        Fax: recipientInformation?.Fax
                    },
                    NECFormData: {
                        B1NEC: necInformation?.Nonemployeecompensation === "" ? 0 : necInformation?.Nonemployeecompensation,
                        B2IsDirectSales: necInformation?.IsDirectSales,
                        B4FedTaxWH: necInformation?.FedTaxWH === "" ? 0 : necInformation?.FedTaxWH,
                        Is2ndTINnot: necInformation?.SecondTINnot,
                        AccountNum: necInformation?.AccountNum,
                        States: stateValues.length > 0 && stateValues[0].StateWH != null ? stateValues : 0
                    }
                }
                ],
                StateReconData: {
                    WV: WVReconStateValues !== null && (stateInformation?.State1 === "WV" || stateInformation?.State2 === "WV") ? WVReconStateValues : null,
                    AL: ALReconStateValues !== null && (stateInformation?.State1 === "AL" || stateInformation?.State2 === "AL") ? ALReconStateValues : null
                }
            }
            const validateForm1099NECResponse = await axios.post(`${process.env.REACT_APP_TBS_BACKEND_URL}/Form1099NEC/ValidateForm`, data)
            setSuccessData(validateForm1099NECResponse.data)
            setStatus('validateForm')

            //Modal to show the Success Response from the Form1099NEC/Validate Endpoint.
            let validateForm1099NECSuccessModal = new bootstrap.Modal(document.getElementById('successModalToggle'))
            validateForm1099NECSuccessModal.show()

        }
        catch (e) {
            setErroData(e?.response?.data)

            //Modal to show the Error Response from the Form1099NEC/Validate Endpoint.
            let validateForm1099NECErrorModal = new bootstrap.Modal(document.getElementById('errorModalToggle'))
            validateForm1099NECErrorModal.show()
        }
        setLoading(false)
    }

    return (
        <>
            {/*Checks loader state and displays spinner component*/}
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
                        <h2 className="head-h1 px-12px">Create Form1099NEC</h2>
                        <div className="px-4">
                            <form className='form d-block' onSubmit={handleCreateForm1099NECSubmit} >
                                <div className="d-flex  align-items-center fs-20 text-dark">
                                    <h1 className="head-1 me-3">{createBusiness.BusinessName}</h1> <span className="text-muted fs-14 mb-2"> ( {!createBusiness.IsEIN ? 'SSN' : 'EIN'} : {createBusiness.EINOrSSN} )</span>
                                </div>
                                <div className="row d-flex justify-content-center mb-15px bg-white">
                                    <div className="col-md-6">
                                        <div className="labelName">
                                            <label className="control-label"><span className="text-danger">*</span>Tax Year:</label>
                                            <input type="text" className='form-control' name='TaxYear' onChange={(e) => { handleSubmissionManifestInfo(e) }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                    </div>
                                    <div className='col mt-3'>
                                        <span className="text-danger">*</span><input className="me-1 form-check-input cursor-pointer" type="checkbox" name='IsFederalFiling' onClick={(e) => { handleSubmissionManifestInfo(e) }} checked={submissionManifest.IsFederalFiling} /><span className="me-3">IsFederalFiling</span>
                                        <input className="me-1 form-check-input cursor-pointer" type="checkbox" name='IsStateFiling' onClick={(e) => { handleSubmissionManifestInfo(e) }} checked={submissionManifest.IsStateFiling} /><span className="me-3">IsStateFiling</span>
                                        <input className="me-1 form-check-input cursor-pointer" type="checkbox" name='IsPostal' onClick={(e) => { handleSubmissionManifestInfo(e) }} checked={submissionManifest.IsPostal} /><span className="me-3">IsPostal</span>
                                        <input className="me-1 form-check-input cursor-pointer" type="checkbox" name='IsOnlineAccess' onClick={(e) => { handleSubmissionManifestInfo(e) }} checked={submissionManifest.IsOnlineAccess} /><span className="me-3">IsOnlineAccess</span>
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
                                 {selectedOption?.TINType == "EIN" ?
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
                                                        <label className="control-label">Second PayeeName:</label>
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
                                                        <label className="control-label">Address2:</label>
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
                                                        <label className="control-label">Email:</label>
                                                        <input type="text" className='form-control' name='Email' onChange={(e) => { handleRecipientInfo(e) }} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row d-flex justify-content-center mb-15px">
                                                <div className="col-md-6">
                                                    <div className="labelName">
                                                        <label className="control-label">Phone:</label>
                                                        <input type="text" className='form-control' name='Phone' maxLength='10' onChange={(e) => { handleRecipientInfo(e) }} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="labelName">
                                                        <label className="control-label">Fax:</label>
                                                        <input type="text" className='form-control' name='Fax' maxLength='10' onChange={(e) => { handleRecipientInfo(e) }} />
                                                    </div>
                                                </div>
                                            </div>

                                        </> :
                                        <>
                                            <div className="row d-flex justify-content-center mb-15px">
                                                <div className="col-md-6">
                                                    <div className="labelName">
                                                        <label className="control-label">Second PayeeName:</label>
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
                                                        <label className="control-label">Address2:</label>
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
                                                        <label className="control-label">Email:</label>
                                                        <input type="text" className='form-control' name='Email' onChange={(e) => { handleRecipientInfo(e) }} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="labelName">
                                                        <label className="control-label">Phone:</label>
                                                        <input type="text" className='form-control' name='Phone' maxLength='10' onChange={(e) => { handleRecipientInfo(e) }} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row d-flex justify-content-center mb-15px">
                                                <div className="col-md-6">
                                                    <div className="labelName">
                                                        <label className="control-label">Fax:</label>
                                                        <input type="text" className='form-control' name='Fax' maxLength='10' onChange={(e) => { handleRecipientInfo(e) }} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">

                                                </div>
                                            </div>
                                        </>
                                    }
                                  </>
                                    
                                
                                  :

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
                                                        <label className="control-label">Address2:</label>
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
                                                        <label className="control-label">Email:</label>
                                                        <input type="text" className='form-control' name='Email' onChange={(e) => { handleRecipientInfo(e) }} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row d-flex justify-content-center mb-15px">
                                                <div className="col-md-6">
                                                    <div className="labelName">
                                                        <label className="control-label">Phone:</label>
                                                        <input type="text" className='form-control' name='Phone' maxLength='10' onChange={(e) => { handleRecipientInfo(e) }} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="labelName">
                                                        <label className="control-label">Fax:</label>
                                                        <input type="text" className='form-control' name='Fax' maxLength='10' onChange={(e) => { handleRecipientInfo(e) }} />
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
                                                        <label className="control-label">Address2:</label>
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
                                                        <label className="control-label">Email:</label>
                                                        <input type="text" className='form-control' name='Email' onChange={(e) => { handleRecipientInfo(e) }} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="labelName">
                                                        <label className="control-label">Phone:</label>
                                                        <input type="text" className='form-control' name='Phone' maxLength='10' onChange={(e) => { handleRecipientInfo(e) }} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row d-flex justify-content-center mb-15px">
                                                <div className="col-md-6">
                                                    <div className="labelName">
                                                        <label className="control-label">Fax:</label>
                                                        <input type="text" className='form-control' name='Fax' maxLength='10' onChange={(e) => { handleRecipientInfo(e) }} />
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

                                <h5 className="sub-head text-left mt-4 mb-3 " style={{ fontWeight: 'bold' }}>Form 1099-NEC Details</h5>

                                <div className="row d-flex justify-content-center mb-15px">
                                    <div className="col-md-6">
                                        <div className="labelName">
                                            <label className="control-label"><span className="text-danger">*</span>Nonemployee compensation:</label>
                                            <>
                                                <div className="input-group mb-3">
                                                    <span className="input-group-text">$</span>
                                                    <input type="text" className="form-control" name='Nonemployeecompensation' onChange={(e) => { handleNECInfo(e) }} aria-label="Amount (to the nearest dollar)" />
                                                </div>
                                            </>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="labelName">
                                            <label className="control-label">IsDirectSales:</label>
                                            <div className="d-block">
                                                <input className="form-check-input cursor-pointer me-2" type="checkbox" name='IsDirectSales' onClick={(e) => { handleNECInfo(e) }} />Payer made direct sales totaling $5,000 or more of consumer products to recipient for resale
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row d-flex justify-content-center mb-15px">
                                    <div className="col-md-6">
                                        <div className="labelName">
                                            <label className="control-label">Federal income tax withheld:</label>
                                            <input type="text" className='form-control' name='FedTaxWH' onChange={(e) => { handleNECInfo(e) }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="labelName">
                                            <label className="control-label">AccountNum:</label>
                                            <input type="text" className='form-control' name='AccountNum' onChange={(e) => { handleNECInfo(e) }} />
                                            <div className="mt-2"><input className="form-check-input cursor-pointer me-2" type="checkbox" name='SecondTINnot' onClick={(e) => { handleNECInfo(e) }} />2ndTINnot</div>
                                        </div>
                                    </div>
                                </div>

                                <h5 className="sub-head text-left mt-4 mb-3 " style={{ fontWeight: 'bold' }}>Form 1099-NEC State Details</h5>
                                <div className="row d-flex justify-content-center mb-15px">
                                    <div className="col-md-6">
                                        <div className="labelName">
                                            <label className="control-label">State tax withheld:</label>
                                            <input type="text" className='form-control' name='Statetaxwithheld1' allowNull={true} onChange={(e) => { handleStateInfo(e) }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="labelName">
                                            <label className="control-label">State:</label>
                                            <select className="form-control form-select" name='State1' allowNull={true} onChange={(e) => { handleStateInfo(e) }}  >
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
                                            <input type="text" className='form-control' name='Payerstateno1' allowNull={true} onChange={(e) => { handleStateInfo(e) }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="labelName">
                                            <label className="control-label">State income:</label>
                                            <input type="text" className='form-control' name='Stateincome1' allowNull={true} onChange={(e) => { handleStateInfo(e) }} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row d-flex justify-content-center mb-15px">
                                    <div className="col-md-6">
                                        <div className="labelName">
                                            <label className="control-label">State tax withheld:</label>
                                            <input type="text" className='form-control' name='Statetaxwithheld2' allowNull={true} onChange={(e) => { handleStateInfo(e) }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="labelName">
                                            <label className="control-label">State:</label>
                                            <select className="form-control form-select" name='State2' allowNull={true} onChange={(e) => { handleStateInfo(e) }} >
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
                                            <label className="control-label">Payer's state no:</label>
                                            <input type="text" className='form-control' name='Payerstateno2' allowNull={true} onChange={(e) => { handleStateInfo(e) }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="labelName">
                                            <label className="control-label">State income:</label>
                                            <input type="text" className='form-control' name='Stateincome2' allowNull={true} onChange={(e) => { handleStateInfo(e) }} />
                                        </div>
                                    </div>

                                </div>

                                {stateInformation.State1 === 'AL' ?
                                    <>
                                        <ReconStateAL //ReconStateAL Component
                                            reconStateAL={reconStateAL}
                                            handleReconStateAL={handleReconStateAL}
                                            statesOptions={statesOptions}
                                            bankAccountTypeOptions={bankAccountTypeOptions}
                                            paymentMethodOptions={paymentMethodOptions}
                                            monthOptions={monthOptions}
                                            overPaymentTypeOptions={overPaymentTypeOptions}
                                            handleChange={handleChange}
                                            removeInputFields={removeInputFields}
                                            addInputField={addInputField}
                                            inputFields={inputFields}
                                            countLength={countLength}
                                            setCountLength={setCountLength}
                                        />
                                    </> : stateInformation.State1 === 'WV' ?
                                        <>
                                            <ReconStateWV //ReconStateWV Component
                                                reconStateWV={reconStateWV}
                                                handleReconStateWV={handleReconStateWV}
                                                setReconStateWV={setReconStateWV}

                                            />
                                        </> :
                                        <></>
                                }

                                {stateInformation.State2 === 'AL' ?
                                    stateInformation.State1 === 'AL' ?
                                        <></> :
                                        <>
                                            <ReconStateAL //ReconStateAL Component
                                                reconStateAL={reconStateAL}
                                                handleReconStateAL={handleReconStateAL}
                                                statesOptions={statesOptions}
                                                bankAccountTypeOptions={bankAccountTypeOptions}
                                                paymentMethodOptions={paymentMethodOptions}
                                                monthOptions={monthOptions}
                                                overPaymentTypeOptions={overPaymentTypeOptions}
                                                handleChange={handleChange}
                                                removeInputFields={removeInputFields}
                                                addInputField={addInputField}
                                                countLength={countLength}
                                                setCountLength={setCountLength}
                                                inputFields={inputFields}
                                                setInputFields={setInputFields}
                                            />
                                        </> :
                                    <></>
                                }

                                {stateInformation.State2 === 'WV' ?
                                    stateInformation.State1 === 'WV' ?
                                        <></> :
                                        <>
                                            <ReconStateWV //ReconStateWV Component
                                                reconStateWV={reconStateWV}
                                                handleReconStateWV={handleReconStateWV}
                                                setReconStateWV={setReconStateWV}

                                            /> </> :
                                    <></>
                                }
                                <div className='d-flex justify-content-end align-items-center mt-5'>
                                    <div className=" p-2">
                                        <button className="btn btn_primary btn_md" onClick={validateForm} >
                                            Validate Form
                                        </button>
                                    </div>
                                    <div className="">
                                        <button type="submit" className="btn btn_primary btn_md"  >
                                            Create Form1099NEC
                                            <i className="fa fa-spinner fa-spin" aria-hidden="true" id="CreateSpinner" style={{ display: 'none' }}></i>
                                        </button>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                    <button className='btn_back mt-3 mb-5' onClick={navigateToListBusiness} >Back</button>
                </div>
            </div>
            <SuccessModal
                successData={successData} //Success Modal for Create and Validate FORM1099NEC
                businessData={createBusiness}
                status={status}
            />
            <ErrorModal
                errorData={errorData} //Error Modal for Create and Validate FORM1099NEC
            />
        </>
    )
}

export default CreateForm1099NEC
