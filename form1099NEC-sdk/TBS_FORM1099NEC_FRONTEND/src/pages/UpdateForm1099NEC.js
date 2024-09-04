import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import * as bootstrap from 'bootstrap/dist/js/bootstrap'
import axios from 'axios' // Importing Axios to make HTTP calls.
import logo from '../images/tbsLogo.png' // Importing Images
import Spinner from '../components/Spinner' // Importing spinner for loader
import { month, paymentMethod, suffix, overPaymentType, bankAccountType, states, countries, businessType, businessTypeShorts, statesShort, countryShorts, kindOfEmployer, kindOfPayer } from '../utils/constants' // Importing static values from utils
import SuccessModal from '../components/SuccessModal' // Importing Success Modal
import ErrorModal from '../components/ErrorModal'  // Importing Error Modal
import ReconStateAL from '../components/ReconStateAL' //Importing Recon State AL
import ReconStateWV from '../components/ReconStateWV' //Importing Recon State WV

// Update Form1099NEC Page
const UpdateForm1099NEC = () => {
    // Calling get Form1099NEC function in Use Effect
    useEffect(() => {
        getForm1099ById()
    }, [])

    // Accessing data from params using useParams hooks
    const params = useParams()
    const submissionId = params?.SubmissionId
    const recordId = params?.RecordId

    const [loading, setLoading] = useState(false) // Initializing state for list api error response
    const [errorData, setErroData] = useState([]) // Initializing state for error response modal
    const [successData, setSuccessData] = useState([]) // Initializing state for success response modal
    const [status, setStatus] = useState('') // Initializing state for success modal status
    const [inputData, setInputData] = useState([]) // Initializing state for IncomeTaxWHAndRemitt input data


    // Initializing state for count length for IncomeTaxWHAndRemittValues data
    const [countLength, setCountLength] = useState(0)
    // Initializing state for TIN Type selection
    const [selectedOption, setSelectedOption] = useState({
        TINType: ""
    })

    // Initializing state for Business Details
    const [editBusinessDetails, setEditBusinessDetails] = useState({
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
        Fax: "",
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

    //Initializing state for recipient details
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

    //Initializing state for submission manifest details
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

    //Initializing state for Form1099-NEC details
    const [editNECInformation, setEditNECInformation] = useState({
        NonEmployeeCompensation: 0,
        IsDirectSales: false,
        AccountNum: "",
        SecondTINnot: false,
        FedTaxWH: 0
    })

    //Initializing state for Form1099-NEC State details
    const [editStateInformation, setEditStateInformation] = useState({
        StateTaxWithHeld1: 0,
        StateTaxWithHeld2: 0,
        State1: "",
        State2: "",
        PayerStateNo1: "",
        PayerStateNo2: "",
        StateIncome1: 0,
        StateIncome2: 0,
    })

    //Initializing state for Form1099-NEC Recon State WV Details
    const [editReconStateWV, setEditReconStateWV] = useState({
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
    const [editReconStateAL, setEditReconStateAL] = useState({
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
    for (const key in bankAccountType){
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
  const [editInputFields, setEditInputFields] = useState([{
    Month: "",
    TaxWH: 0,
    TaxRemitt: 0
  }])

//   setInputData(inputFields)

  // Function to handle add IncomeTaxWHAndRemitt input fields
  const addInputField = () => {
    setCountLength(countLength + 1)
    setEditInputFields([...editInputFields, {
      Month: "",
      TaxWH: 0,
      TaxRemitt: 0
    }])
  }
 
  //Function to handle remove IncomeTaxWHAndRemitt input fields
  const removeInputFields = (index) => {
    setCountLength(countLength - 1)
    const rows = [...editInputFields]
    rows.splice(index, 1)
    setEditInputFields(rows)
  }

  //Handle onchange function for input values
  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const list = [...editInputFields]
    list[index][name] = value
    setEditInputFields(list)
  }
//   console.log(editInputFields,"editInputFields");
    //Defining function for IncomeTaxWHAndRemitt input data
    const handleInputData = () => {
        const incomeTaxData = editInputFields?.map((data) => {
            return {
                Month: data?.Month === "MONTH" ? "" : data?.Month,
                TaxWH: data?.TaxWH === "" ? 0 : parseInt(data?.TaxWH),
                TaxRemitt: data?.TaxRemitt === "" ? 0 : parseInt(data?.TaxRemitt),
            }
        })
        return incomeTaxData
    }
    console.log("editInputFields",editInputFields);
    // To get Form1099NEC by Id by requesting Get Form1099NEC API
    const getForm1099ById = async () => {
        try {
            setLoading(true)
            const getForm1099NECResponse = await axios.get(`${process.env.REACT_APP_TBS_BACKEND_URL}/Form1099NEC/Get?SubmissionId=${submissionId}&RecordId=${recordId}`)
            if (getForm1099NECResponse?.data?.StatusCode == 200) {
                const businessDetails = getForm1099NECResponse?.data?.Form1099Records?.ReturnHeader?.Business
                const submissionManifest = getForm1099NECResponse?.data?.Form1099Records?.SubmissionManifest
                const sequenceId = getForm1099NECResponse?.data?.Form1099Records?.ReturnData[0]?.SequenceId
                const IsOnlineAccess = getForm1099NECResponse?.data?.Form1099Records?.ReturnData[0]?.IsOnlineAccess
                const IsPostal=getForm1099NECResponse?.data?.Form1099Records?.ReturnData[0]?.IsPostal
                const IsForced=getForm1099NECResponse?.data?.Form1099Records?.ReturnData[0]?.IsForced
                const recordId = getForm1099NECResponse?.data?.Form1099Records?.ReturnData[0]?.RecordId
                const recipientId = getForm1099NECResponse?.data?.Form1099Records?.ReturnData[0]?.Recipient?.RecipientId
                const recipientDetails = getForm1099NECResponse?.data?.Form1099Records?.ReturnData[0]?.Recipient
                const necDetails = getForm1099NECResponse?.data?.Form1099Records?.ReturnData[0]?.NECFormData
                const stateDetails = getForm1099NECResponse?.data?.Form1099Records?.ReturnData[0]?.NECFormData
                const stateReconData = getForm1099NECResponse?.data?.Form1099Records?.StateReconData
                const incomeTaxWHAndRemitt = getForm1099NECResponse?.data?.Form1099Records?.StateReconData?.AL?.FormA3?.IncomeTaxWHAndRemitt

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
                    SubmissionId: submissionManifest?.SubmissionId,
                    TaxYear: submissionManifest?.TaxYear,
                    IsFederalFiling: submissionManifest?.IsFederalFiling,
                    IsPostal: submissionManifest?.IsPostal,
                    IsOnlineAccess: submissionManifest?.IsOnlineAccess,
                    IsScheduleFiling: submissionManifest?.IsScheduleFiling,
                    IsStateFiling: submissionManifest?.IsStateFiling,
                    EfileDate: submissionManifest?.ScheduleFiling?.EfileDate
                })

                setEditRecipientInformation({
                    IsOnlineAccess:IsOnlineAccess,
                    IsPostal:IsPostal,
                    IsForced:IsForced,
                    SequenceId: sequenceId,
                    RecordId: recordId,
                    RecipientId: recipientId,
                    TIN: recipientDetails?.TIN,
                    TINType: recipientDetails?.TINType,
                    FirstPayeeNm: recipientDetails?.FirstPayeeNm,
                    SecondPayeeNm: recipientDetails?.SecondPayeeNm,
                    FirstNm :recipientDetails?.FirstNm,
                    LastNm :recipientDetails?.LastNm,
                    MiddleNm :recipientDetails?.MiddleNm,
                    Suffix :recipientDetails?.Suffix,
                    IsForeign: recipientDetails?.IsForeign,
                    Address1: recipientDetails?.IsForeign ? recipientDetails?.ForeignAddress?.Address1 : recipientDetails?.USAddress?.Address1,
                    Address2: recipientDetails?.IsForeign ? recipientDetails?.ForeignAddress?.Address2 : recipientDetails?.USAddress?.Address2,
                    City: recipientDetails?.IsForeign ? recipientDetails?.ForeignAddress?.City : recipientDetails?.USAddress?.City,
                    State: recipientDetails?.IsForeign ? "" : recipientDetails?.USAddress?.State,
                    ProvinceOrStateNm: recipientDetails?.IsForeign ? recipientDetails?.ForeignAddress?.ProvinceOrStateNm : "",
                    ZipCd: recipientDetails?.IsForeign ? "" : recipientDetails?.USAddress?.ZipCd,
                    PostalCd: recipientDetails?.IsForeign ? recipientDetails?.ForeignAddress?.PostalCd : "",
                    Country: recipientDetails?.IsForeign ? recipientDetails?.ForeignAddress?.Country : "",
                    Email: recipientDetails?.Email,
                    Phone: recipientDetails?.Phone,
                    Fax: recipientDetails?.Fax
                })

                setEditNECInformation({
                    NonEmployeeCompensation: necDetails?.B1NEC,
                    IsDirectSales: necDetails?.B2IsDirectSales,
                    AccountNum: necDetails?.AccountNum,
                    SecondTINnot: necDetails?.Is2ndTINnot,
                    FedTaxWH: necDetails?.B4FedTaxWH
                })

                setEditStateInformation({
                    StateTaxWithHeld1: stateDetails?.States === null ? 0 : stateDetails?.States[0]?.StateWH,
                    StateTaxWithHeld2: stateDetails?.States === null ? 0 : stateDetails?.States[1]?.StateWH,
                    State1: stateDetails?.States === null ? "" : stateDetails?.States[0]?.StateCd,
                    State2: stateDetails?.States === null ? "" : stateDetails?.States[1]?.StateCd,
                    PayerStateNo1: stateDetails?.States === null ? "" : stateDetails?.States[0]?.StateIdNum,
                    PayerStateNo2: stateDetails?.States === null ? "" : stateDetails?.States[1]?.StateIdNum,
                    StateIncome1: stateDetails?.States === null ? 0 : stateDetails?.States[0]?.StateIncome,
                    StateIncome2: stateDetails?.States === null ? 0 : stateDetails?.States[1]?.StateIncome
                })

                setEditReconStateAL({
                    ALWithHoldingID: stateReconData !== null && stateReconData?.AL !== null ? stateReconData?.AL?.FormA3?.ALWithHoldingID : "",
                    NumOf1099W2: stateReconData !== null && stateReconData?.AL !== null ? parseInt(stateReconData?.AL?.FormA3?.NumOf1099W2) : 0,
                    IncomeTaxWHAndRemitt: incomeTaxWHAndRemitt,
                    TotTaxRemitt: stateReconData !== null && stateReconData?.AL !== null ? parseInt(stateReconData?.AL?.FormA3?.PaymentDetails?.TotTaxRemitt) : 0,
                    TotTaxWH1099W2: stateReconData !== null && stateReconData?.AL !== null ? parseInt(stateReconData?.AL?.FormA3?.PaymentDetails?.TotTaxWH1099W2) : 0,
                    TotTaxDue: stateReconData !== null && stateReconData?.AL !== null ? parseInt(stateReconData?.AL?.FormA3?.PaymentDetails?.TotTaxDue) : 0,
                    TotOverpayment: stateReconData !== null && stateReconData?.AL !== null ? parseInt(stateReconData?.AL?.FormA3?.PaymentDetails?.TotOverpayment) : 0,
                    OverPaymentType: stateReconData !== null && stateReconData?.AL !== null ? stateReconData?.AL?.FormA3?.PaymentDetails?.OverPaymentType : 0,
                    PaymentMethod: stateReconData !== null && stateReconData?.AL !== null ? stateReconData?.AL?.FormA3?.PaymentDetails?.PaymentMethod : "",
                    IsInternationalACHTxn: stateReconData !== null && stateReconData?.AL !== null ? stateReconData?.AL?.FormA3?.PaymentDetails?.IsInternationalACHTxn : false,
                    PaymentDate: stateReconData !== null && stateReconData?.AL?.FormA3?.EFTDebitInfo !== null ? stateReconData?.AL?.FormA3?.EFTDebitInfo?.PaymentDate : "",
                    BankAccType: stateReconData !== null && stateReconData?.AL?.FormA3?.EFTDebitInfo !== null ? stateReconData?.AL?.FormA3?.EFTDebitInfo?.BankAccType : "",
                    BankAccNum: stateReconData !== null && stateReconData?.AL?.FormA3?.EFTDebitInfo !== null ? stateReconData?.AL?.FormA3?.EFTDebitInfo?.BankAccNum : "",
                    BankRoutingNum: stateReconData !== null && stateReconData?.AL?.FormA3?.EFTDebitInfo !== null ? stateReconData?.AL?.FormA3?.EFTDebitInfo?.BankRoutingNum : "",
                    Address: stateReconData !== null && stateReconData?.AL !== null ? stateReconData?.AL?.FormA3?.FundingSource?.Address : "",
                    City: stateReconData !== null && stateReconData?.AL?.FormA3?.FundingSource !== null ? stateReconData?.AL?.FormA3?.FundingSource?.City : "",
                    State: stateReconData !== null && stateReconData?.AL?.FormA3?.FundingSource !== null ? stateReconData?.AL?.FormA3?.FundingSource?.State : "",
                    Zip: stateReconData !== null && stateReconData?.AL?.FormA3?.FundingSource !== null ? parseInt(stateReconData?.AL?.FormA3?.FundingSource?.Zip) : 0,
                    ZipExtn: stateReconData !== null && stateReconData?.AL?.FormA3?.FundingSource !== null ? parseInt(stateReconData?.AL?.FormA3?.FundingSource?.ZipExtn) : 0,

                })

                setEditReconStateWV({
                    WVWithHoldingID: stateReconData !== null && stateReconData?.WV !== null ? stateReconData?.WV?.FormIT103?.WVWithHoldingID : "",
                    NumOf1099W2: stateReconData !== null && stateReconData?.WV !== null ? parseInt(stateReconData?.WV?.FormIT103?.NumOf1099W2) : 0,
                    TotalTaxWH1099W2: stateReconData !== null && stateReconData?.WV !== null ? parseInt(stateReconData?.WV?.FormIT103?.TotalTaxWH1099W2) : 0,
                    WVTaxQ1: stateReconData !== null && stateReconData?.WV !== null ? parseInt(stateReconData?.WV?.FormIT103?.WHTaxDue?.WVTaxQ1) : 0,
                    WVTaxQ2: stateReconData !== null && stateReconData?.WV !== null ? parseInt(stateReconData?.WV?.FormIT103?.WHTaxDue?.WVTaxQ2) : 0,
                    WVTaxQ3: stateReconData !== null && stateReconData?.WV !== null ? parseInt(stateReconData?.WV?.FormIT103?.WHTaxDue?.WVTaxQ3) : 0,
                    WVTaxQ4: stateReconData !== null && stateReconData?.WV !== null ? parseInt(stateReconData?.WV?.FormIT103?.WHTaxDue?.WVTaxQ4) : 0,
                    TotalForYear: stateReconData !== null && stateReconData?.WV !== null ? parseInt(stateReconData?.WV?.FormIT103?.WHTaxDue?.TotalForYear) : 0

                })
                setEditInputFields(incomeTaxWHAndRemitt)
                setSelectedOption({
                    TINType: recipientDetails?.TINType
                })

            }
            setLoading(false)
        } catch (e) {
            setLoading(false)
            throw e
        }
    }

    // To update Form1099NEC by requesting Form1099NEC API Update method
    const handleUpdateForm1099NECSubmit = async (e) => {
        e.preventDefault()
        try {
            const incomeTaxWHAndRemittData = handleInputData()
            setLoading(true)
            const stateValues = [{
                StateCd: editStateInformation?.State1 === "STATE" ? "" : editStateInformation?.State1,
                StateWH: editStateInformation?.StateTaxWithHeld1 == "" ? 0 : parseInt(editStateInformation?.StateTaxWithHeld1),
                StateIdNum: editStateInformation?.PayerStateNo1 === null ? "" : editStateInformation?.PayerStateNo1,
                StateIncome: editStateInformation?.StateIncome1 == "" ? 0 : parseInt(editStateInformation?.StateIncome1)
            },
            {
                StateCd: editStateInformation?.State2 === "STATE" ? "" : editStateInformation?.State2,
                StateWH: editStateInformation?.StateTaxWithHeld2 == "" || editStateInformation?.StateTaxWithHeld2 == undefined ? 0 : parseInt(editStateInformation?.StateTaxWithHeld2),
                StateIdNum: editStateInformation?.PayerStateNo2 === null ? "" : editStateInformation?.PayerStateNo2,
                StateIncome: editStateInformation?.StateIncome2 == "" || editStateInformation?.StateIncome2 == undefined ? 0 : parseInt(editStateInformation?.StateIncome2)
            }]

            const EFTDebitInfo = {
                BankAccType: editReconStateAL?.BankAccType,
                BankAccNum: editReconStateAL?.BankAccNum,
                BankRoutingNum: editReconStateAL?.BankRoutingNum,
                PaymentDate: editReconStateAL?.PaymentDate
            }

            const FundingSource = {
                Address: editReconStateAL?.Address,
                City: editReconStateAL?.City,
                State: editReconStateAL?.State,
                Zip: editReconStateAL?.Zip == "" ? 0 : parseInt(editReconStateAL?.Zip),
                ZipExtn: editReconStateAL?.ZipExtn == "" ? 0 : parseInt(editReconStateAL?.ZipExtn)
            }

            const WVReconStateValues = {
                FormIT103: {
                    WVWithHoldingID: editReconStateWV?.WVWithHoldingID,
                    NumOf1099W2: editReconStateWV?.NumOf1099W2 === "" ? 0 : parseInt(editReconStateWV?.NumOf1099W2),
                    TotalTaxWH1099W2: editReconStateWV?.TotalTaxWH1099W2 === "" ? 0 : parseInt(editReconStateWV?.TotalTaxWH1099W2),
                    WHTaxDue: {
                        WVTaxQ1: editReconStateWV?.WVTaxQ1 === "" ? 0 : parseInt(editReconStateWV?.WVTaxQ1),
                        WVTaxQ2: editReconStateWV?.WVTaxQ2 === "" ? 0 : parseInt(editReconStateWV?.WVTaxQ2),
                        WVTaxQ3: editReconStateWV?.WVTaxQ3 === "" ? 0 : parseInt(editReconStateWV?.WVTaxQ3),
                        WVTaxQ4: editReconStateWV?.WVTaxQ4 === "" ? 0 : parseInt(editReconStateWV?.WVTaxQ4),
                        TotalForYear: editReconStateWV?.TotalForYear === "" ? 0 : parseInt(editReconStateWV?.TotalForYear)
                    }
                }
            }

            const ALReconStateValues = {
                FormA3: {
                    ALWithHoldingID: editReconStateAL?.ALWithHoldingID,
                    NumOf1099W2: editReconStateAL?.NumOf1099W2 == "" ? 0 : parseInt(editReconStateAL?.NumOf1099W2),
                    IncomeTaxWHAndRemitt: incomeTaxWHAndRemittData,
                    PaymentDetails: {
                        TotTaxRemitt: editReconStateAL?.TotTaxRemitt == "" ? 0 : parseInt(editReconStateAL?.TotTaxRemitt),
                        TotTaxWH1099W2: editReconStateAL?.TotTaxWH1099W2 == "" ? 0 : parseInt(editReconStateAL?.TotTaxWH1099W2),
                        TotTaxDue: editReconStateAL?.TotTaxDue == "" ? 0 : parseInt(editReconStateAL?.TotTaxDue),
                        TotOverpayment: editReconStateAL?.TotOverpayment == "" ? 0 : parseInt(editReconStateAL?.TotOverpayment),
                        OverPaymentType: editReconStateAL?.OverPaymentType === "Over Payment Type" ? "" : editReconStateAL?.OverPaymentType,
                        PaymentMethod: editReconStateAL?.PaymentMethod === "Payment Method" ? "" : editReconStateAL?.PaymentMethod,
                        IsInternationalACHTxn: editReconStateAL?.IsInternationalACHTxn,
                    },
                    EFTDebitInfo: editReconStateAL?.PaymentMethod === "EFT Debit" ? EFTDebitInfo : null,
                    FundingSource: !editReconStateAL?.IsInternationalACHTxn ? null : FundingSource
                }
            }

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
                        FirstNm :editBusinessDetails?.FirstNm,
                        LastNm :editBusinessDetails?.LastNm,
                        MiddleNm :editBusinessDetails?.MiddleNm,
                        Suffix :editBusinessDetails?.Suffix,
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
                    IsOnlineAccess:editRecipientInformation?.IsOnlineAccess,
                    IsPostal:editRecipientInformation?.IsPostal,
                    IsForced:editRecipientInformation?.IsForced,
                    RecordId: editRecipientInformation?.RecordId,
                    SequenceId: editRecipientInformation?.SequenceId,
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
                        Fax: editRecipientInformation?.Fax,
                    },
                    NECFormData: {
                        B1NEC: editNECInformation?.NonEmployeeCompensation == "" ? 0 : editNECInformation?.NonEmployeeCompensation,
                        B2IsDirectSales: editNECInformation?.IsDirectSales,
                        B4FedTaxWH: editNECInformation?.FedTaxWH == "" ? 0 : editNECInformation?.FedTaxWH,
                        Is2ndTINnot: editNECInformation?.SecondTINnot,
                        AccountNum: editNECInformation?.AccountNum == "" ? 0 : editNECInformation?.AccountNum,
                        States: stateValues?.length > 0 && stateValues[0]?.StateWH != null ? stateValues : 0
                    }
                }],
                StateReconData: {
                    WV: WVReconStateValues !== null && (editStateInformation?.State1 === "WV" || editStateInformation?.State2 === "WV") ? WVReconStateValues : null,
                    AL: ALReconStateValues !== null && (editStateInformation?.State1 === "AL" || editStateInformation?.State2 === "AL") ? ALReconStateValues : null
                }
            }

            const updateForm1099NECResponse = await axios.put(`${process.env.REACT_APP_TBS_BACKEND_URL}/Form1099NEC/Update`, data)
            setSuccessData(updateForm1099NECResponse.data)
            setStatus('updateForm')

            //Modal to show the Success Response from the Form1099nec/Update Endpoint.
            let updateForm1099NECSuccessModal = new bootstrap.Modal(document.getElementById('successModalToggle'))
            updateForm1099NECSuccessModal.show()
        }
        catch (e) {
            setLoading(false)
            setErroData(e?.response?.data)
            //Modal to show the Failure Response from the Form1099nec/Update Endpoint.
            let updateForm1099NECErrorModal = new bootstrap.Modal(document.getElementById('errorModalToggle'))
            updateForm1099NECErrorModal.show()
        }
    }

    // Handle onchange for Submission manifest input values
    const handleSubmissionmanifestInfo = (e) => {
        const { name, value, checked } = e.target

        if (name === "IsFederalFiling" || name === "IsStateFiling" || name === "IsPostal" || name === "IsOnlineAccess" || name === "IsScheduleFiling") {
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

        if (name === "IsForeign" || name === "TINType" ||name === "IsOnlineAccess" || name=== "IsPostal" || name=== "IsForced") {
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

    // Handle onchange for Recon State AL
    const handleEditReconStateAL = (e) => {
        const { name, checked, value } = e.target
        console.log(editInputFields, "editInputFields");
        if (name === "IsInternationalACHTxn") {
            setEditReconStateAL({
                ...editReconStateAL,
                [name]: checked
            })
        } else {
            setEditReconStateAL({
                ...editReconStateAL,
                [name]: value
            })
        }
    }

    // Handle onchange for Recon State WV 
    const handleEditReconStateWV = (e) => {
        const { name, value } = e.target
        setEditReconStateWV({
            ...editReconStateWV,
            [name]: value
        })
    }

    // Handle onchange for NEC Form input values
    const handleNECInfo = (e) => {
        const { name, value, checked } = e.target

        if (name === "IsDirectSales" || name === "SecondTINnot") {
            if (checked) {
                setEditNECInformation({
                    ...editNECInformation,
                    [name]: checked
                })
            } else if (!checked) {
                setEditNECInformation({
                    ...editNECInformation,
                    [name]: checked
                })
            }
        } else {
            setEditNECInformation({
                ...editNECInformation,
                [name]: value
            })
        }
    }

    // Handle onchange for NEC Form state values
    const handleStateInfo = (e) => {
        const { name, value } = e.target
        setEditStateInformation({
            ...editStateInformation,
            [name]: value
        })
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
                        <h2 className="head-h1 px-12px">Update Form1099NEC</h2>
                        <div className="px-4">
                            <form className='form d-block' onSubmit={handleUpdateForm1099NECSubmit} >
                                <div className="d-flex align-items-center fs-20 text-dark">
                                    <h1 className="head-1 me-3">{editBusinessDetails?.BusinessName}</h1> <span className="text-muted fs-14 mb-2"> ( {!editBusinessDetails?.IsEIN ? 'SSN' : 'EIN'} : {editBusinessDetails?.EINOrSSN} )</span>
                                </div>
                                <div className="row d-flex justify-content-center mb-15px bg-white">
                                    <div className="col-md-6">
                                        <div className="labelName">
                                            <label className="control-label"><span className="text-danger">*</span>Tax Year:</label>
                                            <input type="text" className='form-control' name='TaxYear' value={editSubmissionManifest?.TaxYear} onChange={(e) => { handleSubmissionmanifestInfo(e) }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                    </div>
                                    <div className='col mt-3'>
                                        <span className="text-danger">*</span><input className="me-1 form-check-input cursor-pointer" type="checkbox" name='IsFederalFiling' onClick={(e) => { handleSubmissionmanifestInfo(e) }} checked={editSubmissionManifest?.IsFederalFiling} /><span className="me-3">IsFederalFiling</span>
                                        <input className="me-1 form-check-input cursor-pointer" type="checkbox" name='IsStateFiling' onClick={(e) => { handleSubmissionmanifestInfo(e) }} checked={editSubmissionManifest?.IsStateFiling} /><span className="me-3">IsStateFiling</span>
                                        <input className="me-1 form-check-input cursor-pointer" type="checkbox" name='IsPostal' onClick={(e) => { handleSubmissionmanifestInfo(e) }} checked={editSubmissionManifest?.IsPostal} /><span className="me-3">IsPostal</span>
                                        <input className="me-1 form-check-input cursor-pointer" type="checkbox" name='IsOnlineAccess' onClick={(e) => { handleSubmissionmanifestInfo(e) }} checked={editSubmissionManifest?.IsOnlineAccess} /><span className="me-3">IsOnlineAccess</span>
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
                                                <input type="text" className='form-control' name='SequenceId' value={editRecipientInformation?.SequenceId} onChange={(e) => { handleRecipientInfo(e) }} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="control-label"><span className="text-danger">*</span>TINType:</label>
                                            <div className="mt-2">
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="TINType" id="inlineRadio1" value="EIN" onClick={(e) => { handleRecipientInfo(e) }} checked={selectedOption?.TINType === "EIN"} />
                                                    <label className="form-check-label" for="inlineRadio1">EIN</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="TINType" id="inlineRadio2" value="SSN" onClick={(e) => { handleRecipientInfo(e) }} checked={selectedOption?.TINType === 'SSN'} />
                                                    <label className="form-check-label" for="inlineRadio2">SSN</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="TINType" id="inlineRadio3" value="ATIN" onClick={(e) => { handleRecipientInfo(e) }} checked={selectedOption?.TINType === 'ATIN'} />
                                                    <label className="form-check-label" for="inlineRadio3">ATIN</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input className="form-check-input" type="radio" name="TINType" id="inlineRadio4" value="ITIN" onClick={(e) => { handleRecipientInfo(e) }} checked={selectedOption?.TINType === 'ITIN'} />
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
                                                <input type="text" className='form-control' name='TIN' value={editRecipientInformation?.TIN} maxLength="9" onChange={(e) => { handleRecipientInfo(e) }} />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="labelName">
                                                <label className="control-label"><span className="text-danger">*</span>First PayeeName:</label>
                                                <input type="text" className='form-control' name='FirstPayeeNm' value={editRecipientInformation?.FirstPayeeNm} onChange={(e) => { handleRecipientInfo(e) }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row d-flex justify-content-center mb-2">
                                        <div className="col-md-6">

                                        </div>
                                        <div className="col-md-6">
                                            <span><input className="form-check-input cursor-pointer" type="checkbox" name='IsForeign' onClick={(e) => { handleRecipientInfo(e) }} checked={editRecipientInformation?.IsForeign} /> Is Foreign?</span>
                                        </div>
                                    </div>
                                    {editRecipientInformation?.IsForeign ?
                                        <>
                                            <div className="row d-flex justify-content-center mb-15px">
                                                <div className="col-md-6">
                                                    <div className="labelName">
                                                        <label className="control-label"><span className="text-danger"></span>Second PayeeName:</label>
                                                        <input type="text" className='form-control' name='SecondPayeeNm' value={editRecipientInformation?.SecondPayeeNm} onChange={(e) => { handleRecipientInfo(e) }} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">

                                                    <div className="labelName">
                                                        <label className="control-label"><span className="text-danger">*</span>Address1:</label>
                                                        <input type="text" className='form-control' name='Address1' value={editRecipientInformation?.Address1} onChange={(e) => { handleRecipientInfo(e) }} />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row d-flex justify-content-center mb-15px">
                                                <div className="col-md-6">
                                                    <div className="labelName">
                                                        <label className="control-label"><span className="text-danger"></span>Address2:</label>
                                                        <input type="text" className='form-control' name='Address2' value={editRecipientInformation?.Address2} onChange={(e) => { handleRecipientInfo(e) }} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="labelName">
                                                        <label className="control-label"><span className="text-danger">*</span>City:</label>
                                                        <input type="text" className='form-control' name='City' value={editRecipientInformation?.City} onChange={(e) => { handleRecipientInfo(e) }} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row d-flex justify-content-center mb-15px">
                                                <div className="col-md-6">
                                                    <div className="labelName">
                                                        <label className="control-label"><span className="text-danger">*</span>ProvinceOrStateNm:</label>
                                                        <input type="text" className='form-control' name='ProvinceOrStateNm' value={editRecipientInformation?.ProvinceOrStateNm} onChange={(e) => { handleRecipientInfo(e) }} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="labelName">
                                                        <label className="control-label"><span className="text-danger">*</span>Country:</label>
                                                        <select className="form-control form-select" name='Country' value={editRecipientInformation?.Country} onChange={(e) => { handleRecipientInfo(e) }} >
                                                            {countriesOptions.map((countryOption, index) => {
                                                                return <option key={index} selected={countryOption?.code == editRecipientInformation?.Country ? `selected` : ``} value={countryOption?.code}>
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
                                                        <input type="text" className='form-control' name='Fax' maxLength='10' value={editRecipientInformation?.Fax} onChange={(e) => { handleRecipientInfo(e) }} />
                                                    </div>
                                                </div>
                                            </div>

                                        </> :
                                        <>
                                            <div className="row d-flex justify-content-center mb-15px">
                                                <div className="col-md-6">
                                                    <div className="labelName">
                                                        <label className="control-label"><span className="text-danger"></span>Second PayeeName:</label>
                                                        <input type="text" className='form-control' name='SecondPayeeNm' value={editRecipientInformation?.SecondPayeeNm} onChange={(e) => { handleRecipientInfo(e) }} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">

                                                    <div className="labelName">
                                                        <label className="control-label"><span className="text-danger">*</span>Address1:</label>
                                                        <input type="text" className='form-control' name='Address1' value={editRecipientInformation?.Address1} onChange={(e) => { handleRecipientInfo(e) }} />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row d-flex justify-content-center mb-15px">
                                                <div className="col-md-6">
                                                    <div className="labelName">
                                                        <label className="control-label"><span className="text-danger"></span>Address2:</label>
                                                        <input type="text" className='form-control' name='Address2' value={editRecipientInformation?.Address2} onChange={(e) => { handleRecipientInfo(e) }} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="labelName">
                                                        <label className="control-label"><span className="text-danger">*</span>City:</label>
                                                        <input type="text" className='form-control' name='City' value={editRecipientInformation?.City} onChange={(e) => { handleRecipientInfo(e) }} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row d-flex justify-content-center mb-15px">
                                                <div className="col-md-6">
                                                    <div className="labelName">
                                                        <label className="control-label"><span className="text-danger">*</span>State:</label>
                                                        <select className="form-control form-select" name='State' value={editRecipientInformation?.State} onChange={(e) => { handleRecipientInfo(e) }} >
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
                                                        <input type="text" className='form-control' name='ZipCd' value={editRecipientInformation?.ZipCd} onChange={(e) => { handleRecipientInfo(e) }} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row d-flex justify-content-center mb-15px">
                                                <div className="col-md-6">
                                                    <div className="labelName">
                                                        <label className="control-label"><span className="text-danger"></span>Email:</label>
                                                        <input type="text" className='form-control' name='Email' value={editRecipientInformation?.Email} onChange={(e) => { handleRecipientInfo(e) }} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="labelName">
                                                        <label className="control-label"><span className="text-danger"></span>Phone:</label>
                                                        <input type="text" className='form-control' name='Phone' maxLength='10' value={editRecipientInformation?.Phone} onChange={(e) => { handleRecipientInfo(e) }} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row d-flex justify-content-center mb-15px">
                                                <div className="col-md-6">
                                                    <div className="labelName">
                                                        <label className="control-label"><span className="text-danger"></span>Fax:</label>
                                                        <input type="text" className='form-control' name='Fax' maxLength='10' value={editRecipientInformation?.Fax} onChange={(e) => { handleRecipientInfo(e) }} />
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
                                            <span><input className="form-check-input cursor-pointer" type="checkbox" name='IsForeign' onClick={(e) => { handleRecipientInfo(e) }} checked={editRecipientInformation?.IsForeign} /> Is Foreign?</span>
                                        </div>
                                    </div>
                                    {editRecipientInformation?.IsForeign ?
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
                                                        <input type="text" className='form-control' name='Address1' value={editRecipientInformation?.Address1} onChange={(e) => { handleRecipientInfo(e) }} />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row d-flex justify-content-center mb-15px">
                                                <div className="col-md-6">
                                                    <div className="labelName">
                                                        <label className="control-label"><span className="text-danger"></span>Address2:</label>
                                                        <input type="text" className='form-control' name='Address2' value={editRecipientInformation?.Address2} onChange={(e) => { handleRecipientInfo(e) }} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="labelName">
                                                        <label className="control-label"><span className="text-danger">*</span>City:</label>
                                                        <input type="text" className='form-control' name='City' value={editRecipientInformation?.City} onChange={(e) => { handleRecipientInfo(e) }} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row d-flex justify-content-center mb-15px">
                                                <div className="col-md-6">
                                                    <div className="labelName">
                                                        <label className="control-label"><span className="text-danger">*</span>ProvinceOrStateNm:</label>
                                                        <input type="text" className='form-control' name='ProvinceOrStateNm' value={editRecipientInformation?.ProvinceOrStateNm} onChange={(e) => { handleRecipientInfo(e) }} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="labelName">
                                                        <label className="control-label"><span className="text-danger">*</span>Country:</label>
                                                        <select className="form-control form-select" name='Country' value={editRecipientInformation?.Country} onChange={(e) => { handleRecipientInfo(e) }} >
                                                            {countriesOptions.map((countryOption, index) => {
                                                                return <option key={index} selected={countryOption?.code == editRecipientInformation?.Country ? `selected` : ``} value={countryOption?.code}>
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
                                                        <input type="text" className='form-control' name='Fax' maxLength='10' value={editRecipientInformation?.Fax} onChange={(e) => { handleRecipientInfo(e) }} />
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
                                                        <input type="text" className='form-control' name='Address1' value={editRecipientInformation?.Address1} onChange={(e) => { handleRecipientInfo(e) }} />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row d-flex justify-content-center mb-15px">
                                                <div className="col-md-6">
                                                    <div className="labelName">
                                                        <label className="control-label"><span className="text-danger"></span>Address2:</label>
                                                        <input type="text" className='form-control' name='Address2' value={editRecipientInformation?.Address2} onChange={(e) => { handleRecipientInfo(e) }} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="labelName">
                                                        <label className="control-label"><span className="text-danger">*</span>City:</label>
                                                        <input type="text" className='form-control' name='City' value={editRecipientInformation?.City} onChange={(e) => { handleRecipientInfo(e) }} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row d-flex justify-content-center mb-15px">
                                                <div className="col-md-6">
                                                    <div className="labelName">
                                                        <label className="control-label"><span className="text-danger">*</span>State:</label>
                                                        <select className="form-control form-select" name='State' value={editRecipientInformation?.State} onChange={(e) => { handleRecipientInfo(e) }} >
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
                                                        <input type="text" className='form-control' name='ZipCd' value={editRecipientInformation?.ZipCd} onChange={(e) => { handleRecipientInfo(e) }} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row d-flex justify-content-center mb-15px">
                                                <div className="col-md-6">
                                                    <div className="labelName">
                                                        <label className="control-label"><span className="text-danger"></span>Email:</label>
                                                        <input type="text" className='form-control' name='Email' value={editRecipientInformation?.Email} onChange={(e) => { handleRecipientInfo(e) }} />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="labelName">
                                                        <label className="control-label"><span className="text-danger"></span>Phone:</label>
                                                        <input type="text" className='form-control' name='Phone' maxLength='10' value={editRecipientInformation?.Phone} onChange={(e) => { handleRecipientInfo(e) }} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row d-flex justify-content-center mb-15px">
                                                <div className="col-md-6">
                                                    <div className="labelName">
                                                        <label className="control-label"><span className="text-danger"></span>Fax:</label>
                                                        <input type="text" className='form-control' name='Fax' maxLength='10' value={editRecipientInformation?.Fax} onChange={(e) => { handleRecipientInfo(e) }} />
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
                                            {/* <input type="text" className='form-control' name='NonEmployeeCompensation'  onChange={(e)=>{handleNECInfo(e)}} required/> */}
                                            <div className="input-group mb-3">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">$</span>
                                                </div>
                                                <input type="text" className="form-control" name='NonEmployeeCompensation' value={editNECInformation?.NonEmployeeCompensation} onChange={(e) => { handleNECInfo(e) }} aria-label="Amount (to the nearest dollar)" />
                                                <div className="input-group-append">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="labelName">
                                            <label className="control-label">IsDirectSales:</label>

                                            <div className="d-block">
                                                <input className="form-check-input cursor-pointer me-2" type="checkbox" name='IsDirectSales' onClick={(e) => { handleNECInfo(e) }} checked={editNECInformation?.IsDirectSales} />Payer made direct sales totaling $5,000 or more of consumer products to recipient for resale
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row d-flex justify-content-center mb-15px">
                                    <div className="col-md-6">
                                        <div className="labelName">
                                            <label className="control-label">Federal income tax withheld:</label>
                                            <input type="text" className='form-control' name='FedTaxWH' value={editNECInformation?.FedTaxWH} onChange={(e) => { handleNECInfo(e) }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="labelName">
                                            <label className="control-label">AccountNum:</label>
                                            <input type="text" className='form-control' name='AccountNum' value={editNECInformation?.AccountNum} onChange={(e) => { handleNECInfo(e) }} />
                                            <div className="mt-2"><input className="form-check-input cursor-pointer me-2" type="checkbox" name='SecondTINnot' onClick={(e) => { handleNECInfo(e) }} checked={editNECInformation?.SecondTINnot} />2ndTINnot</div>
                                        </div>
                                    </div>
                                </div>

                                <h5 className="sub-head text-left mt-4 mb-3 " style={{ fontWeight: 'bold' }}>Form 1099-NEC State Details</h5>

                                <div className="row d-flex justify-content-center mb-15px">
                                    <div className="col-md-6">
                                        <div className="labelName">
                                            <label className="control-label">State tax withheld:</label>
                                            <input type="text" className='form-control' name='StateTaxWithHeld1' value={editStateInformation?.StateTaxWithHeld1 === null ? 0 : editStateInformation?.StateTaxWithHeld1} allowNull={true} onChange={(e) => { handleStateInfo(e) }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="labelName">
                                            <label className="control-label">State:</label>
                                            <select className="form-control form-select" name='State1' value={editStateInformation?.State1} allowNull={true} onChange={(e) => { handleStateInfo(e) }}  >
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
                                            <input type="text" className='form-control' name='PayerStateNo1' allowNull={true} value={editStateInformation?.PayerStateNo1 === null ? 0 : editStateInformation.PayerStateNo1} onChange={(e) => { handleStateInfo(e) }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="labelName">
                                            <label className="control-label">State income:</label>
                                            <input type="text" className='form-control' name='StateIncome1' allowNull={true} value={editStateInformation?.StateIncome1} onChange={(e) => { handleStateInfo(e) }} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row d-flex justify-content-center mb-15px">
                                    <div className="col-md-6">
                                        <div className="labelName">
                                            <label className="control-label"><span className="text-danger"></span>State tax withheld:</label>
                                            <input type="text" className='form-control' name='StateTaxWithHeld2' allowNull={true} value={editStateInformation?.StateTaxWithHeld2} onChange={(e) => { handleStateInfo(e) }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="labelName">
                                            <label className="control-label"><span className="text-danger"></span>State:</label>
                                            <select className="form-control form-select" name='State2' allowNull={true} value={editStateInformation?.State2} onChange={(e) => { handleStateInfo(e) }} >
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
                                            <input type="text" className='form-control' name='PayerStateNo2' allowNull={true} value={editStateInformation?.PayerStateNo2} onChange={(e) => { handleStateInfo(e) }} />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="labelName">
                                            <label className="control-label"><span className="text-danger"></span>State income:</label>
                                            <input type="text" className='form-control' name='StateIncome2' allowNull={true} value={editStateInformation?.StateIncome2} onChange={(e) => { handleStateInfo(e) }} />
                                        </div>
                                    </div>
                                </div>
                                {editStateInformation?.State1 === 'AL' ?
                                    <>
                                        <ReconStateAL //ReconStateAL Component
                                            reconStateAL={editReconStateAL}
                                            handleReconStateAL={handleEditReconStateAL}
                                            setInputData={setInputData}
                                            statesOptions={statesOptions}
                                            bankAccountTypeOptions={bankAccountTypeOptions}
                                            paymentMethodOptions={paymentMethodOptions}
                                            overPaymentTypeOptions={overPaymentTypeOptions}
                                            monthOptions={monthOptions}
                                            removeInputFields={removeInputFields}
                                            addInputField={addInputField}
                                            inputFields={editInputFields}
                                            setInputFields={setEditInputFields}
                                            setCountLength={setCountLength}
                                            handleChange={handleChange}
                                            countLength={countLength}
                                        />
                                    </> : editStateInformation?.State1 === 'WV' ?
                                        <>
                                            <ReconStateWV //ReconStateWV Component
                                                reconstateWV={editReconStateWV}
                                                handleReconStateWV={handleEditReconStateWV}
                                            />
                                        </> :
                                        <></>
                                }

                                {editStateInformation?.State2 === 'AL' ?
                                    editStateInformation?.State1 === 'AL' ?
                                        <></> :
                                        <>
                                            <ReconStateAL //ReconStateAL Component
                                                reconStateAL={editReconStateAL}
                                                handleReconStateAL={handleEditReconStateAL}
                                                setInputData={setInputData}
                                                statesOptions={statesOptions}
                                                bankAccountTypeOptions={bankAccountTypeOptions}
                                                paymentMethodOptions={paymentMethodOptions}
                                                overPaymentTypeOptions={overPaymentTypeOptions}
                                                monthOptions={monthOptions}
                                                removeInputFields={removeInputFields}
                                                addInputField={addInputField}
                                                inputFields={editInputFields}
                                                setInputFields={setEditInputFields}
                                                setCountLength={setCountLength}
                                                handleChange={handleChange}
                                                countLength={countLength}
                                            />
                                        </> :
                                    <></>
                                }

                                {editStateInformation?.State2 === 'WV' ?
                                    editStateInformation?.State1 === 'WV' ?
                                        <></> :
                                        <>
                                            <ReconStateWV //ReconStateWV Component
                                                reconstateWV={editReconStateWV}
                                                handleReconStateWV={handleEditReconStateWV}
                                            /> </> :
                                    <></>
                                }
                                <div className="text-center p-10">
                                    <button type="submit" className="btn btn_primary btn_lg"  >
                                        Update Form1099NEC
                                        <i className="fa fa-spinner fa-spin" aria-hidden="true" id="CreateSpinner" style={{ display: 'none' }}></i>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <Link className='btn btn_back mt-3 mb-5' to={`/listForm1099NEC/${editBusinessDetails?.BusinessId}/${editBusinessDetails?.BusinessName}`}>Back</Link>
                </div>
            </div>

            <SuccessModal
                successData={successData} //Success Response Modal for Update Form1099NEC
                businessData={editBusinessDetails}
                status={status}
            />

            <ErrorModal
                errorData={errorData} //Error Response Modal for Update Form1099NEC
            />
        </>
    )
}

export default UpdateForm1099NEC