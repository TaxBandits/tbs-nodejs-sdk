import React, { useState } from 'react';
import moment from 'moment';
import logo from '../images/tbslogo.png'
import CountrySelector from "../components/ReusableComponents/CountrySelector";
import TerritoryDropdown from "../components/ReusableComponents/TerritoryDropdown"; // Import the component
import StatesSelector from '../components/ReusableComponents/StatesSelector';
import TribalSelector from '../components/ReusableComponents/TribalSelector';
import CustomDatePicker from "../utils/CustomDatePicker"; 
import BOIRResponseModal from "../components/BOIRResponseModel"; // Assuming the modal component is in the same folder
import DocumentTerritorySelector from '../components/ReusableComponents/DocumentTerritorySelector';
import { useNavigate,Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";



const CreateBoir = () => {
  const navigate = useNavigate();
  const API_Url=process.env.REACT_APP_API_URL;
  const [reportType, setReportType] = useState('INITIAL');
  const [tinType, setTinType] = useState('EIN');
  const [tin, setTin] = useState('');
  const [legalName, setLegalName] = useState('');
  const [dba, setDba] = useState('');
  const [jurisdiction, setJurisdiction] = useState('');
  const [foreignJurisdiction, setForeignJurisdiction] = useState('');
  const [usStates, setUsStates] = useState('');
  const [cpaState, setCpaState] = useState('');
  const [documentCPAState, setDocumentCPAState] = useState('');
  const [documentBOState, setDocumentBOState] = useState('');
  const [cpaForeignState, setCpaForeignState] = useState('');
  const [documentCPAForeignState, setDocumentCPAForeignState] = useState('');
  const [documentBOForeignState, setDocumentBOForeignState] = useState('');
  const [isUSACountryDocument, setIsUSACountryDocument] = useState(false);
  const [isUSABOCountryDocument, setIsUSABOCountryDocument] = useState(false);

  const [isUSACountry, setIsUSACountry] = useState(false);
  const [tribal, setTribal] = useState('');
  const [documentTribalCPA, setDocumentTribalCPA] = useState('');
  const [documentTribalBO, setDocumentTribalBO] = useState('');
  const [hasFinCENId, setHasFinCENId] = useState(false); // State to track radio button selection
  const [finCENData, setFinCENData] = useState({
    finCENId: "",
    firstName: "",
    middleName: "",
    lastName: "",
  }); // State to manage input values
  // State to track the selected value
  const [selectedAddressType, setSelectedAddressType] = useState("Residential");


  const [companyRegistered, setCompanyRegistered] = useState('On or After January 1, 2024');
  const [foreignCountry, setForeignCountry] = useState('');
  const [stateOfRegistration, setStateOfRegistration] = useState('');
   // State for current address
   const [currentStreetAddress, setCurrentStreetAddress] = useState('');
   const [currentCity, setCurrentCity] = useState('');
   const [currentState, setCurrentState] = useState('');
   const [currentZipCode, setCurrentZipCode] = useState('');
   const [domesticType, setDomesticType] = useState("State");
   const [registrationType, setRegistrationType] = useState("On or After January 1, 2024");
   const [effectiveDate, setEffectiveDate] = useState("");
   const [documentExpiryDate, setDocumentExpiryDate] = useState("");
   const [documentExpiryDateBo, setDocumentExpiryDateBo] = useState("");
   const [isLoading, setIsLoading] = useState(false);
   const [isModelOpen, setIsModelOpen] = useState(false);


   const [dateOfBirth, setDateOfBirth] = useState("");
   const [dateOfBirthBo, setDateOfBirthBo] = useState("");

   
   // State for foreign pooled investment vehicle
   const [isPooledInvestmentVehicle, setIsPooledInvestmentVehicle] = useState('No');
 
   // State for FinCEN identifier request
   const [isFinCENIdentifier, setIsFinCENIdentifier] = useState('No');

   const [otherTribeName, setOtherTribeName] = useState("");
   const [showOtherTribe, setShowOtherTribe] = useState(false);
   const [formedLocation, setFormedLocation] = useState("United States");
   const [domesticCompany, setDomesticCompany] = useState("State");
   const [companyRegisteredDate, setCompanyRegisteredDate] = useState("On or After January 1, 2024");
   const [isDriverLicenseVisible, setIsDriverLicenseVisible] = useState(false);
   const [isDriverLicenseVisibleBO, setIsDriverLicenseVisibleBO] = useState(false);
   const [isBusinessAddress, setIsBusinessAddress] = useState(false);
   const [previouslyUsedAddress, setPreviouslyUsedAddress] = useState(false);
   const [isPreviouslyUsedAddress, setIsPreviouslyUsedAddress] = useState(false);
   const [isPreviouslyUsedAddressBo, setIsPreviouslyUsedAddressBo] = useState(false);

   const [isForeignAddress, setIsForeignAddress] = useState(false);
   const [isForeignAddressBo, setIsForeignAddressBo] = useState(false);
   const [selectedSuffix, setSelectedSuffix] = useState("");
   const [selectedBoSuffix, setSelectedBoSuffix] = useState("");
   const [selectedDocument, setSelectedDocument] = useState("");
   const [selectedDocumentBO, setSelectedDocumentBO] = useState("");
   const [apiResponse, setApiResponse] = useState(null);
   const [loading, setLoading] = useState(false);
   const [selectedBoDocument, setSelectedBoDocument] = useState("");
   const [firstNameBO, setFirstNameBO] = useState("");
   const [firstNameCPA, setFirstNameCPA] = useState("");
   const [lastNameBO, setLastNameBO] = useState("");
   const [lastNameCPA, setLastNameCPA] = useState("");
   const [middleNameBO, setMiddleNameBO] = useState("");
   const [middleNameCPA, setMiddleNameCPA] = useState("");
   const [submitterFirstName, setSubmitterFirstName] = useState("");
  const [submitterLastName, setSubmitterLastName] = useState("");
  const [submitterEmail, setSubmitterEmail] = useState("");
   const [selectedTerritory, setSelectedTerritory] = useState(""); // State for selected territory
   const [selectedCPATerritory, setSelectedCPATerritory] = useState(""); // State for selected territory
   const [selectedBOTerritory, setSelectedBOTerritory] = useState(""); // State for selected territory

   const [isExemptEntity, setIsExemptEntity] = useState("No");
   const [exemptEntityLegalName, setExemptEntityLegalName] = useState("");
   const [isMinorChild, setIsMinorChild] = useState("No");
   const [minorChildDateOfBirth, setMinorChildDateOfBirth] = useState("");
   const [hasBoFinCENId, setHasBoFinCENId] = useState("No");
   const [isHideCompanyApplicant, setIsHideCompanyApplicant] = useState(false);
   const [isOtherTribe, setIsOtherTribe] = useState(false);
   const [isDocumentCPAOtherTribe, setIsDocumentCPAOtherTribe] = useState(false);
   const [isDocumentBOOtherTribe, setIsDocumentBOOtherTribe] = useState(false);
   const [documentCPAOtherTribe, setDocumentCPAOtherTribe] = useState(false);
   const [documentBOOtherTribe, setDocumentBOOtherTribe] = useState(false);
   const [isForeignCountryCPA, setIsForeignCountryCPA] = useState(false);
   const [isForeignCountryBO, setIsForeignCountryBO] = useState(false);


 



   const [finCENBoData, setFinCENBoData] = useState({
    finCENIdBO: "",
    firstNameBO: "",
    middleNameBO: "",
    lastNameBO: "",
  }); 
  const [streetAddressBO, setStreetAddressBO] = useState("");
  const [streetAddressCPA, setStreetAddressCPA] = useState("");
  const [cityBO, setCityBO] = useState("");
  const [cityCPA, setCityCPA] = useState("");
  const [stateBO, setStateBO] = useState("");
  const [stateCPA, setStateCPA] = useState("");
  const [zipCdBO, setZipCdBO] = useState("");
  const [zipCdCPA, setZipCdCPA] = useState("");
  const [countryBO, setCountryBO] = useState("");
  const [countryCPA, setCountryCPA] = useState("");
  const [streetAddressForeignBO, setStreetAddressForeignBO] = useState("");
  const [streetAddressForeignCPA, setStreetAddressForeignCPA] = useState("");
  const [cityForeignBO, setCityForeignBO] = useState("");
  const [cityForeignCPA, setCityForeignCPA] = useState("");
  const [stateForeignBO, setStateForeignBO] = useState("");
  const [stateForeignCPA, setStateForeignCPA] = useState("");
  const [zipCdForeignBO, setZipCdForeignBO] = useState("");
  const [zipCdForeignCPA, setZipCdForeignCPA] = useState("");
  const [countryForeignBO, setCountryForeignBO] = useState("");
  const [countryForeignCPA, setCountryForeignCPA] = useState("");
  const [documentNoBO, setDocumentNoBO] = useState("");
  const [documentNoCPA, setDocumentNoCPA] = useState("");




// Enum data
const suffixes = [
  { label: "Jr", value: "Jr" },
  { label: "Sr", value: "Sr" },
  { label: "I", value: "I" },
  { label: "II", value: "II" },
  { label: "III", value: "III" },
  { label: "IV", value: "IV" },
  { label: "V", value: "V" },
  { label: "VI", value: "VI" },
  { label: "VII", value: "VII" },
];
const documents = [
  { label: "State issued driver's license", value: "Driving_License" },
  { label: "State/local/tribe-issued ID", value: "State/local/tribe_Issued_ID" },
  { label: "U.S Passport", value: "U.S.Passport" },
  { label: "Foreign Passport", value: "Foreign_Passport" },
];


  const handleExemptEntityChange = (e) => {
    setIsExemptEntity(e.target.value);
  };
   
const onCLose =() =>{
  debugger;
  setIsModelOpen(false);
}


  // Handle change for input fields
  const handleInputChange = (e) => {
    debugger
    const { id, value } = e.target;
    setFinCENData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  const handleClick = async(e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = {
      reportType,
      tinType,
      tin,
      legalName,
      dba,
      jurisdiction,
      companyRegistered,
      effectiveDate,
      foreignCountry,
      stateOfRegistration,
      currentStreetAddress,
      currentCity,
      usStates,
      tribal,
      currentState,
      currentZipCode,
      isPooledInvestmentVehicle,
      isFinCENIdentifier,
      submitterFirstName,
      submitterLastName,
      submitterEmail,
      formedLocation,
      isExemptEntity,

    };


    const transformFormDataToRequestModel = () => {
      const requestModel = {
        ReturnHeader: {
          IsAnnualFiling :false,
          ReportType: formData.reportType,
          IsRequestFinCENId: formData.isFinCENIdentifier  === "Yes"? true : false,
          PrevReportDetails: {
            SubmissionId: null,
            LegalNm: null,
            TINType: null,
            TIN: null,
            TaxIDCountry: null,
          },
          ReportingCompany: {
            ReportingCompanyId: null,
            TINType: formData.tinType,
            TIN: formData.tin,
            LegalNm: formData.legalName,
            DBAs: formData.dba ? [formData.dba] : null,
            TaxIDCountry: null,
            FormationInformation: {
              IsCompanyFormedBefore2024: formData.companyRegistered === "Before January 1, 2024" ? true : false,
              CountryOfFormation: (formData.formedLocation === "United States" ||  formData.formedLocation === "U.S. Territory")?"US" : foreignJurisdiction,
              DomesticReportingCompany:   {
                    FormedState: domesticCompany === "State" ? formData.usStates : null,
                    FormedTribalJurisdiction: domesticCompany === "U.S. Tribal Jurisdiction" ? formData.tribal :  null,
                    OtherTribeNm: null,
                  },
            
              ForeignReportingCompany: 
              {
                FirstRegisteredState: domesticCompany === "State" ? formData.usStates : null,
                FirstRegisteredTribalJurisdiction: domesticCompany === "U.S. Tribal Jurisdiction" ? formData.tribal :  null,
                    OtherTribeNm: null,
                  }
            },
            USAddress: {
              StreetAddress: formData.currentStreetAddress,
              City: formData.currentCity,
              State: formData.currentState,
              ZipCd: formData.currentZipCode,
            },
            IsForeignPooled: isPooledInvestmentVehicle === "Yes" ? true : false,
          },
        },
        ReturnData: {
          CompanyApplicants: !isHideCompanyApplicant ? [{
            SequenceId: "1",
            CompanyApplicantId: null,
            FinCENID: finCENData.finCENId,
            FirstNm:hasFinCENId === "Yes" ? finCENData.firstName :  firstNameBO ,
            MiddleNm: hasFinCENId === "Yes" ? finCENData.middleName : middleNameBO,
            LastNm: hasFinCENId === "Yes" ? finCENData.firstName : lastNameBO,
            Suffix: selectedSuffix || null,
            DOB:moment(dateOfBirth).format('MM/DD/YYYY') ,
            AddressType: selectedAddressType,
            Address: {
              StreetAddress: isForeignAddress ? streetAddressForeignCPA : streetAddressCPA,
              City: isForeignAddress ? cityForeignCPA: cityCPA,
              State:  isForeignAddress ? stateForeignCPA: cpaState,
              ZipCd:isForeignAddress ? zipCdForeignCPA : zipCdCPA,
              Country: isForeignAddress ? countryForeignCPA  : "US",
            },
            FormOfIdentification: {
              DocumentType: selectedDocument,
              DocumentNumber: documentNoCPA,
              ForeignDocumentCountry: selectedDocument === "Driving_License"  ? (selectedCPATerritory !== '' ? selectedCPATerritory : null) : selectedDocument === "State/local/tribe_Issued_ID" ? (selectedCPATerritory !== '' ? selectedCPATerritory : null) : selectedDocument === "U.S.Passport" ? "US" : selectedDocument === "Foreign_Passport" ? (documentCPAForeignState !== '' ? documentCPAForeignState : null) :null,
              DocumentIssuedState:documentBOState !== '' ? documentBOState : null ,
              DocumentIssuedLocalOrTribal: documentTribalBO !== '' ? documentTribalBO : null,
              OtherLocalOrTribal: documentCPAOtherTribe !== '' ? documentCPAOtherTribe  : null,

            },
          }] : null,
      BeneficialOwners: [{
        SequenceId: "1",
        BeneficialOwnerId: null,
        IsParentOrGuardian: false,
        FinCENID: finCENBoData.finCENIdBO,
        IsExemptEntity: isExemptEntity === "No" ? false : true,
        ExemptEntityInformation: {
          EntityLegalNm: exemptEntityLegalName,
          IndividualLastNm: null,
        },
        FirstNm:hasBoFinCENId === "Yes" ? finCENBoData.firstNameBO : isExemptEntity === "No" ? firstNameBO : null ,
        MiddleNm: hasBoFinCENId === "Yes" ? finCENBoData.middleNameBO :isExemptEntity === "No" ? middleNameBO : null,
        LastNm: hasBoFinCENId === "Yes" ? finCENBoData.firstNameBO :isExemptEntity === "No" ? lastNameBO : null,
        LegalNm: exemptEntityLegalName|| null,
        Suffix: selectedBoSuffix,
        DOB: moment(dateOfBirthBo).format('MM/DD/YYYY'),
        ResidentialAddress: {
          StreetAddress: isForeignAddressBo ? streetAddressForeignBO : streetAddressBO,
          City: isForeignAddressBo ? cityForeignBO: cityBO,
          State:  isForeignAddressBo ? stateForeignBO: stateBO,
          ZipCd:isForeignAddressBo ? zipCdForeignBO : zipCdBO,
          Country: isForeignAddressBo ? countryForeignBO  : "US",
        },
        FormOfIdentification: {
          DocumentType: selectedDocumentBO,
          DocumentNumber: documentNoBO,
          ForeignDocumentCountry: selectedDocumentBO === "Driving_License"  ? (selectedBOTerritory !== '' ? selectedBOTerritory : null) : selectedDocumentBO === "State/local/tribe_Issued_ID" ? (selectedBOTerritory !== '' ? selectedBOTerritory : null) : selectedDocumentBO === "U.S.Passport" ? "US" : selectedDocumentBO === "Foreign_Passport" ? (documentBOForeignState !== '' ? documentBOForeignState : null) :null,
          DocumentIssuedState:documentBOState !== '' ? documentBOState : null ,
          DocumentIssuedLocalOrTribal: documentTribalBO !== '' ? documentTribalBO : null,
          OtherLocalOrTribal: documentBOOtherTribe !== '' ? documentBOOtherTribe  : null ,
        },
      }],
          SubmitterInformation: {
            FirstNm: formData.submitterFirstName,
            LastNm: formData.submitterLastName,
            Email: formData.submitterEmail,
          },
        },
      };
      return requestModel;
    };
    const apiUrl = `${API_Url}/Create`; // Replace with your API URL
    const requestModel = transformFormDataToRequestModel();
  
    setLoading(true);
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestModel),
      });

    

      const responseData = await response.json();
      if(responseData.StatusCode===200){
        console.log("API Response:", responseData);
        toast.success('BOIR created successfully');
        setIsLoading(false);
        navigate('/dashboard');
        setIsModelOpen(false);
      }
      setApiResponse(responseData);
      setIsModelOpen(true);
    setIsLoading(false);
  };

  const handleDocumentChange=(e)=>{
    debugger;
   setSelectedDocument(e.target.value)
   if(e.target.value === "Driving_License"){
setIsDriverLicenseVisible(true);
setIsForeignCountryCPA(false);

   }
   else if(e.target.value === "State/local/tribe_Issued_ID"){
    setIsDriverLicenseVisible(true);
    setIsForeignCountryCPA(false);

   }
   else if(e.target.value === "U.S.Passport"){
    setIsDriverLicenseVisible(false);
    setIsForeignCountryCPA(false);

   }
   else if(e.target.value === "Foreign_Passport"){
    setIsDriverLicenseVisible(false);
    setIsForeignCountryCPA(true);
   }
  };

  const handleDocumentChangeBO=(e)=>{
    debugger;
   setSelectedDocumentBO(e.target.value)
   if(e.target.value === "Driving_License"){
setIsDriverLicenseVisibleBO(true);
setIsForeignCountryBO(false);

   }
   else if(e.target.value === "State/local/tribe_Issued_ID"){
    setIsDriverLicenseVisibleBO(true);
    setIsForeignCountryBO(false);

   }
   else if(e.target.value === "U.S.Passport"){
    setIsDriverLicenseVisibleBO(false);
    setIsForeignCountryBO(false);

   }
   else if(e.target.value === "Foreign_Passport"){
    setIsDriverLicenseVisibleBO(false);
    setIsForeignCountryBO(true);
   }
  };
  const handleBoInputChange = (e) => {
    debugger
    const { id, value } = e.target;
    setFinCENBoData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
   const handleTerritoryChange = (event) => {
     setSelectedTerritory(event.target.value);
   };
   const handleCPATerritoryChange = (e) => {
    debugger;
    setSelectedCPATerritory(e.target.value);
    if(e.target.value === "US"){
      setIsUSACountryDocument(true)
    }
    else{
      setIsUSACountryDocument(false)

    }
  };

  const handleBOTerritoryChange = (e) => {
    debugger;
    setSelectedBOTerritory(e.target.value);
    if(e.target.value === "US"){
      setIsUSABOCountryDocument(true)
    }
    else{
      setIsUSABOCountryDocument(false)

    }
  };
   const handleJurisdictionChange = (e) => {
    setJurisdiction(e.target.value);
  };

  const handleStateChange = (e) => {
    setUsStates(e.target.value);
  };

  const handleCurrentStateChange = (e) => {
    setCurrentState(e.target.value);
  };

  const handleTribalChange = (e) => {
    debugger;
    setTribal(e.target.value);
    //588 refers to Others
   e.target.value === "588" ? setIsOtherTribe(true) : setIsOtherTribe(false);
 
  };

  const handleDocumentCPATribalChange = (e) => {
    debugger;
    setDocumentTribalCPA(e.target.value);
    //588 refers to Others
   e.target.value === "588" ? setIsDocumentCPAOtherTribe(true) : setIsDocumentCPAOtherTribe(false);
 
  };

  const handleDocumentBOTribalChange = (e) => {
    debugger;
    setDocumentTribalBO(e.target.value);

    //588 refers to Others
   e.target.value === "588" ? setIsDocumentBOOtherTribe(true) : setIsDocumentBOOtherTribe(false);
 
  };

  const handleDomesticTypeChange = (e) => {
    setDomesticType(e.target.value);
    setShowOtherTribe(e.target.value === "U.S. Tribal Jurisdiction");
};

const handleRegistrationTypeChange = (e) => {
    setRegistrationType(e.target.value);
};
const handleFormedLocationChange = (e) => {
    setFormedLocation(e.target.value);
  };

  const handleDomesticCompanyChange = (e) => {
    setDomesticCompany(e.target.value);
  };

  const handleCompanyRegisteredDateChange = (e) => {
    debugger;
    setCompanyRegisteredDate(e.target.value);
    if(e.target.value === "Before January 1, 2024"){
      setIsHideCompanyApplicant(true);
    }
    else{
      if(isPooledInvestmentVehicle === "Yes"){
        //Do nothing
      }
      else{
      setIsHideCompanyApplicant(false);
      }
    }
  };

  const handlePooledInvestmentVehicle = (e) => {
    debugger;
    setIsPooledInvestmentVehicle(e.target.value);
    if(e.target.value === "Yes"){
      
      setIsHideCompanyApplicant(true);
    }
    else{
      if(companyRegisteredDate === "Before January 1, 2024"){
     // Do nothing
      }
      else{
        setIsHideCompanyApplicant(false);

      }
      
    }
  };
  const handleMinorChildChange = (e) => {
    setIsMinorChild(e.target.value);
  };
  const handleFinCENIdChange = (e) => {
    setHasFinCENId(e.target.value);
  };
  const handleFinCENBoIdChange = (e) => {
    setHasBoFinCENId(e.target.value);
  };
const handleSubmit=(event)=>{

}
const shouldShowDiv = (
  companyRegisteredDate.includes("After") || 
  isPooledInvestmentVehicle === 'No'
);


  return (
    <>
    <div className="col-md-12 text-center mt-3">
    <img src={logo} alt="TaxBandits Logo" className="mb-5 logo" />
</div>
    <div className='container'>
    <div className="w-100 w-lg-80 m-auto">

    <div className='card border-0 shadow-medium rounded'>
       <div className='card-header bg-white px-3 px-2'>
       <h1 className="head-1 mb-0">BOIR - Create</h1>
       </div>
       <div className="">
        <div className='card-body'>
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col-md-5">
              <label htmlFor="selectReportType" className="control-label text-grey fs-14px">
                Report type
              </label>
              <select
                className="form-select"
                id="selectReportType"
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
              >
                <option disabled value="INITIAL">
                  Initial
                </option>
                {/* Uncomment and add other options if needed */}
                {/* <option value="UPDATE">Update</option>
                <option value="CORRECT">Correct</option>
                <option value="EXEMPT">Exempt</option> */}
              </select>
            </div>
          </div>

          {/* Reporting Company Section */}
          <div>
            <div className="row ">
              <div className="col-md-11">
                <h2 className="head-2">
                  Reporting Company
                </h2>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-8">
                <label className="control-label">
                  TIN Type
                </label>
                <div className="mt-2 d-md-flex align-items-center">
                  {['EIN', 'SSN', 'ITIN', 'FTIN'].map((type) => (
                    <div className="d-flex align-items-center border rounded-pill me-12px px-3 py-1 cursor-pointer h-40px me-12px mb-2 mb-md-0" key={type}>
                      <input
                        className="form-check-input cursor-pointer mt-0"
                        type="radio"
                        id={`radioTINType${type}`}
                        value={type}
                        name="radioTINType"
                        checked={tinType === type}
                        onChange={() => setTinType(type)}
                      />
                      <label className="form-check-label fs-14px ms-2 cursor-pointer" htmlFor={`radioTINType${type}`}>
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-xl-5 col-lg-6 col-md-4">
                 <div>
                 <label htmlFor="textTIN" className="control-label">
                 TIN
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="textTIN"
                  value={tin}
                  onChange={(e) => setTin(e.target.value)}
                  maxLength="25"
                />
              </div>
                 </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-5">
                <label htmlFor="textLegalNm" className="control-label">
                Company's legal name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="textLegalNm"
                  value={legalName}
                  onChange={(e) => setLegalName(e.target.value)}
                />
              </div>
              <div className="col-md-5 mt-2 mt-md-0">
                <label htmlFor="textDBA" className="control-label">
                  Alternate Name (DBA/Trade Name)
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="textDBA"
                  value={dba}
                  onChange={(e) => setDba(e.target.value)}
                />
              </div>
            </div>

            {/* Country/Jurisdiction and Form Registration */}
            {tinType === "FTIN" ? (
                <div className="row mb-3">
  <div className="col-md-5">
    <label htmlFor="selectCountryJurisdiction" className="control-label">
      Country/Jurisdiction
    </label>
    <CountrySelector
            value={jurisdiction}
            onChange={handleJurisdictionChange}
          />
  </div>
</div>

) : null}


<div>
      <div className="row">
        <div className="col-md-10">
          <h3 className="head-3">
            Jurisdiction of Formation or First Registration
          </h3>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12 mb-12px">
          <label className="control-label mb-0">
           Choose where your company was formed
          </label>
          <div className="d-md-flex align-items-center">
            {["United States", "U.S. Territory", "Foreign Country"].map((location) => (
              <div className="d-flex align-items-center border rounded-pill me-12px px-3 py-1 cursor-pointer h-40px me-12px mb-2 mb-md-0" key={location}>
                <input
                  className="form-check-input cursor-pointer mt-0"
                  type="radio"
                  id={`radio${location.replace(" ", "")}`}
                  value={location}
                  name="radioFormed"
                  checked={formedLocation === location}
                  onChange={handleFormedLocationChange}
                />
                <label
                  className="form-check-label fs-14px ms-2 cursor-pointer"
                  htmlFor={`radio${location.replace(" ", "")}`}
                >
                  {location}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="col-md-5 mt-2">
          {formedLocation === "Foreign Country" && (
            <div>
              <label htmlFor="selectForeignCountry" className="control-label">
                Foreign country of formation
              </label>
              <CountrySelector
          value={foreignJurisdiction}
          onChange={(e)=>{setForeignJurisdiction(e.target.value)}}
          />
            </div>
          )}
          {formedLocation === "U.S. Territory" && (
      <TerritoryDropdown
      selectedTerritory={selectedTerritory}
      onTerritoryChange={handleTerritoryChange}
    />
          )}
        </div>
      </div>
<div>
{formedLocation != "U.S. Territory" && (
      <div className="row mb-12px">
        <div className="col-lg-5 col-md-6">
          <div id="divDomesticReportingCompany" className="div">
            <label className="control-label">
             Domestic Reporting Company
            </label>
            <div className="d-md-flex align-items-center">
              {["State", "U.S. Tribal Jurisdiction"].map((type) => (
                <div className="d-flex align-items-center border rounded-pill me-12px px-3 py-1 cursor-pointer h-40px me-12px mb-2 mb-md-0" key={type}>
                  <input
                    className="form-check-input cursor-pointer mt-0"
                    type="radio"
                    id={`radio${type.replace(" ", "")}`}
                    value={type}
                    name="radioDomesticReportingCompany"
                    checked={domesticCompany === type}
                    onChange={handleDomesticCompanyChange}
                  />
                  <label
                    className="form-check-label fs-14px ms-2 cursor-pointer"
                    htmlFor={`radio${type.replace(" ", "")}`}
                  >
                    {type}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-md-5 col-md-5" >
          {domesticCompany === "State" && (
            <div>
              <label htmlFor="selectFormedState" className="control-label">
              U.S. state of registration
              </label>
              <StatesSelector 
               value={usStates}
               onChange={handleStateChange}
                />
            </div>
          )}
          {domesticCompany === "U.S. Tribal Jurisdiction" && (
            <div>
              <label htmlFor="selectUSTribalJurisdiction" className="control-label">
              U.S. tribal jurisdiction of registration
              </label>
              <TribalSelector 
               value={tribal}
               onChange={handleTribalChange}
                />
            </div>
          )}
        </div>
        {isOtherTribe && domesticCompany === "U.S. Tribal Jurisdiction" && (  <div className="col-md-5">
                <label htmlFor="textDBA" className="control-label">
                <span className="text-danger">*</span>Name of Other Tribe:
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="textDBA"
                  value={dba}
                  onChange={(e) => setDba(e.target.value)}
                />
              </div>)}
      
      </div>
)}
      </div>

      <div className="row mb-12px">
        <div className="col-xxl-6 col-lg-8 col-xl-6 col-md-12">
          <label className="control-label">
            <span className="text-danger"></span>When was your company first registered in the United States?
          </label>
          <div className="d-md-flex align-items-center  mb-3 mb-lg-0">
            {[
              "On or After January 1, 2024",
              "Before January 1, 2024",
            ].map((date) => (
              <div className="d-flex align-items-center border rounded-pill me-12px px-3 py-1 cursor-pointer h-40px me-12px mb-2 mb-md-0" key={date}>
                <input
                  className="form-check-input cursor-pointer mt-0"
                  type="radio"
                  id={`radio${date.replace(/ /g, "")}`}
                  value={date}
                  name="radioCompanyRegistered"
                  checked={companyRegisteredDate === date}
                  onChange={handleCompanyRegisteredDateChange}
                />
                <label
                  className="form-check-label fs-14px ms-2 cursor-pointer"
                  htmlFor={`radio${date.replace(/ /g, "")}`}
                >
                  {date}
                </label>
              </div>
            ))}
          </div>
        </div>
   
      </div>

      <div className='row'>
      <div className="col-xxl-5 col-lg-4 col-md-12">
          <label htmlFor="textEffectiveDate" className="control-label">
          Company U.S. registration effective date
          </label>
          <CustomDatePicker
        selectedDate={effectiveDate}
        onDateChange={setEffectiveDate} // Update state on date change
        id="textEffectiveDate"
        className='form-control w-100'
      />
        </div>
      </div>
    </div>

            </div>
        
      

        {/* Current Address: U.S / U.S Territory */}
        <div className="row mt-3">
          <div className="col-md-10">
            <h3 className="head-3">
              Current Address: U.S / U.S Territory
            </h3>
          </div>
        </div>

        <div className="row mb-12px">
          <div className="col-md-5">
            <label htmlFor="textCurrentStreetAddress" className="control-label">
              Street address
            </label>
            
            <input
              type="text"
              className="form-control"
              id="textCurrentStreetAddress"
              value={currentStreetAddress}
              onChange={(e) => setCurrentStreetAddress(e.target.value)}
            />
          </div>
          <div className="col-md-5">
            <label htmlFor="textCurrentCity" className="control-label">
             City/Town
            </label>
            <input
              type="text"
              className="form-control"
              id="textCurrentCity"
              value={currentCity}
              onChange={(e) => setCurrentCity(e.target.value)}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-5">
            <label htmlFor="selectCurrentState" className="control-label">
             State
            </label>
            <StatesSelector 
               value={currentState}
               onChange={handleCurrentStateChange}
                />
        
          </div>
          <div className="col-md-5 mt-2 mt-md-0">
            <label htmlFor="textCurrentZipCode" className="control-label">
             Zip code
            </label>
            <input
              type="text"
              className="form-control"
              id="textCurrentZipCode"
              maxLength="10"
              value={currentZipCode}
              onChange={(e) => setCurrentZipCode(e.target.value)}
            />
          </div>
        </div>

        {/* Foreign Pooled Investment Vehicle */}
        <div className="row mt-3">
          <div className="col-md-10">
            <h3 className="head-3 mb-2">
              Foreign Pooled Investment Vehicle
            </h3>
          </div>
        </div>

        <div className="row">
          <div className="col-md-10">
            <div className="">
              <label className="control-label mb-1">
                Is your reporting company a foreign pooled investment vehicle?
              </label>
             
            <div className='d-flex'>
            <div className="d-flex align-items-center border rounded-pill me-12px px-3 py-1 cursor-pointer h-40px me-12px">
                <input
                  className="form-check-input cursor-pointer mt-0"
                  type="radio"
                  id="radioIsPooledInvestmentVehicleYes"
                  value="Yes"
                  name="radioIsPooledInvestmentVehicle"
                  checked={isPooledInvestmentVehicle === 'Yes'}
                  onChange={handlePooledInvestmentVehicle}
                />
                <label className="form-check-label fs-14px ms-2 cursor-pointer" htmlFor="radioIsPooledInvestmentVehicleYes">
                  Yes
                </label>
              </div>
              <div className="d-flex align-items-center border rounded-pill me-12px px-3 py-1 cursor-pointer h-40px me-12px">
                <input
                  className="form-check-input cursor-pointer mt-0"
                  type="radio"
                  id="radioIsPooledInvestmentVehicleNo"
                  value="No"
                  name="radioIsPooledInvestmentVehicle"
                  checked={isPooledInvestmentVehicle === 'No'}
                  onChange={handlePooledInvestmentVehicle}
                />
                <label className="form-check-label fs-14px ms-2 cursor-pointer" htmlFor="radioIsPooledInvestmentVehicleNo">
                  No
                </label>
              </div>
            </div>
            </div>
          </div>
        </div>

        {/* Request a FinCEN Identifier */}
        <div className="row mt-3">
          <div className="col-md-10">
            <h3 className="head-3 mb-2">
              Request a FinCEN Identifier
            </h3>
          </div>
        </div>

        <div className="row">
          <div className="col-md-10">
            <div className="">
              <label className="control-label mb-1">
                Do you want to request a FinCEN identifier for this reporting company?
              </label>
          
           <div className='d-flex'>
           <div className="d-flex align-items-center border rounded-pill me-12px px-3 py-1 cursor-pointer h-40px me-12px">
                <input
                  className="form-check-input cursor-pointer mt-0"
                  type="radio"
                  id="radioIsFinCENIdentifierYes"
                  value="Yes"
                  name="radioIsFinCENIdentifier"
                  checked={isFinCENIdentifier === 'Yes'}
                  onChange={(e) => setIsFinCENIdentifier(e.target.value)}
                />
                <label className="form-check-label fs-14px ms-2 cursor-pointer" htmlFor="radioIsFinCENIdentifierYes">
                  Yes
                </label>
              </div>
              <div className="d-flex align-items-center border rounded-pill me-12px px-3 py-1 cursor-pointer h-40px me-12px">
                <input
                  className="form-check-input cursor-pointer mt-0"
                  type="radio"
                  id="radioIsFinCENIdentifierNo"
                  value="No"
                  name="radioIsFinCENIdentifier"
                  checked={isFinCENIdentifier === 'No'}
                  onChange={(e) => setIsFinCENIdentifier(e.target.value)}
                />
                <label className="form-check-label fs-14px ms-2 cursor-pointer" htmlFor="radioIsFinCENIdentifierNo">
                  No
                </label>
              </div>
           </div>
            </div>
          </div>
        </div>
        <hr></hr>
      {!isHideCompanyApplicant  && (    <div>
      {/* Section Title */}
      <div className="row mb-3">
        <div className="col-md-11">
          <h2 className="head-2 mb-0">
            Company Applicant Information
          </h2>
        </div>
      </div>

      {/* FinCEN Identifier Title */}
      <div className="row">
        <div className="col-md-10">
          <h3 className="head-3 mb-2">
            FinCEN Identifier
          </h3>
        </div>
      </div>

      {/* Radio Buttons */}
      <div className="row mb-12px">
        <div className="col-md-10">
          <div className>
            <label className="control-label mb-1">
              Does this company applicant have a FinCEN ID?
            </label>
            <div className='d-flex'>
            <div className="d-flex align-items-center border rounded-pill me-12px px-3 py-1 cursor-pointer h-40px me-12px">
              <input
                className="form-check-input cursor-pointer mt-0"
                type="radio"
                id="radioIsHaveFinCENIDYesCA"
                value="Yes"
                name="radioIsHaveFinCENID"
                onChange={() => setHasFinCENId(true)}
              />
              <label className="form-check-label fs-14px ms-2 cursor-pointer" htmlFor="radioIsHaveFinCENIDYesCA">
                Yes
              </label>
            </div>
            <div className="d-flex align-items-center border rounded-pill me-12px px-3 py-1 cursor-pointer h-40px me-12px">
              <input
                className="form-check-input cursor-pointer mt-0"
                type="radio"
                id="radioIsHaveFinCENIDNoCA"
                value="No"
                name="radioIsHaveFinCENID"
                onChange={() => setHasFinCENId(false)}
                defaultChecked
              />
              <label className="form-check-label fs-14px ms-2 cursor-pointer" htmlFor="radioIsHaveFinCENIDNoCA">
                No
              </label>
            </div>
            </div>
        
          </div>
        </div>
      </div>

      {/* Conditional Rendering for FinCEN ID Details */}
      {hasFinCENId ? (
        <div id="divFinCENidYes">
          {/* Row 1 */}
          <div className="row mb-12px">
            <div className="col-md-5">
              <label htmlFor="finCENId" className="control-label">
               FinCEN ID
              </label>
              <input
                type="text"
                className="form-control"
                id="finCENId"
                value={finCENData.finCENId}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-5">
              <label htmlFor="firstName" className="control-label">
                First name
              </label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                value={finCENData.firstName}
                onChange={handleInputChange}
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="row">
            <div className="col-md-5">
              <label htmlFor="middleName" className="control-label">
                Middle initial (optional)
              </label>
              <input
                type="text"
                className="form-control"
                id="middleName"
                value={finCENData.middleName}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-5">
              <label htmlFor="lastName" className="control-label">
                Last name
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                value={finCENData.lastName}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
      ):(<>  
      <div id="divFinCENidNo">
        {/* Section Header */}
        <div className="row mt-3">
          <div className="col-md-10">
            <h3 className="head-3 mb-1">
              Upload Identification Document
            </h3>
          </div>
        </div>
  
        {/* Document Type and Number */}
        <div className="row mb-12px">
          <div className="col-md-5">
            <label htmlFor="selectFinCENDocumentTypeCA" className="control-label">
              Identifying document type
            </label>
      
            <select className="form-control form-select" id="selectFinCENDocumentTypeCA"
  
        value={selectedDocument}
        onChange={handleDocumentChange}
      >
        <option value="">-- Select Document --</option>
        {documents.map((document) => (
          <option key={document.value} value={document.value}>
            {document.label}
          </option>
        ))}
      </select>
          </div>
          <div className="col-md-5"></div>
        </div>
  
        <div className="row mb-12px d-flex align-items-center">
          <div className="col-md-5">
            <label htmlFor="textFinCENDocumentNumberCA" className="control-label">
              Identifying document number
            </label>
            <input
                type="text"
                className="form-control"
                id="textFinCENDocumentNumberCPA"
                value={documentNoCPA}
                onChange={(e)=>{setDocumentNoCPA(e.target.value)}}
              />
          </div>
          <div className="col-md-5">
            <label htmlFor="textFinCENDocDateCA" className="control-label me-2">
              Document expiration date
            </label>
           
             <div>
             <CustomDatePicker
        selectedDate={documentExpiryDate}
        onDateChange={setDocumentExpiryDate} // Update state on date change
        id="textFinCENDocDateCA"
      />
             </div>
          
          </div>
        </div>
  
      {isDriverLicenseVisible && (
          <div id="divDriverLicense">
            
            <div className="row d-flex mb-15px">
            <div className="col-md-5">
            <DocumentTerritorySelector
      selectedTerritory={selectedCPATerritory}
      onTerritoryChange={handleCPATerritoryChange}
    />
    </div>
    {isUSACountryDocument && (<div> 
      
       <div className="row d-flex mb-15px"> <div className="col-md-5">
               {documentTribalCPA === "" &&( <div id="divDocumentIssuedStateCA">
                  <label htmlFor="selectDocumentIssuedStateCA" className="control-label">
                    <span className="text-danger">*</span>Document issued state:
                  </label>
                  <StatesSelector 
               value={documentCPAState}
               onChange={(e)=>{setDocumentCPAState(e.target.value)}}
                />
                </div>
               )}
              </div>
              </div>
              {selectedDocument !== "Driving_License"  && documentCPAState === "" &&(   <div id="divDocumentIssuedTribalJurisdictionCA">
              <div className="row mt-3">
                <div className="col-md-5">
                  <label htmlFor="selectDocumentIssuedTribalJurisdictionCA" className="control-label">
                    Document issued tribal jurisdiction
                  </label>
                  <TribalSelector 
               value={documentTribalCPA}
               onChange={handleDocumentCPATribalChange}
                />
                </div>
              {isDocumentCPAOtherTribe && (  <div className="col-md-5">
                  <div id="divOtherTribalCA">
                    <label htmlFor="selectOtherTribalCA" className="control-label">
                    Other tribe
                    </label>
                    <input
                  type="text"
                  className="form-control"
                  id="DocumentCPATribe"
                  value={documentCPAOtherTribe}
                  onChange={(e) => setDocumentCPAOtherTribe(e.target.value)}
                />
                  </div>
                </div>)}
              </div>
            </div>)}
            </div>
            )}
             
            </div>
  
            {/* Tribal Jurisdiction Section */}
          
          </div>
        )}    {/* Driver License Section */}
          {isForeignCountryCPA && (   <div className="row d-flex mb-15px">
            <div className="col-md-5">
                <label htmlFor="selectCountryForeignCARA" className="control-label">
                  <span className="text-danger">*</span>Document issued country/jurisdiction
                </label>
                <CountrySelector 
               value={documentCPAForeignState}
               onChange={(e)=>{setDocumentCPAForeignState(e.target.value)}}
                />
              </div>
              </div>
          )}
  
        {/* Personal Details Section */}
        <div className="row mt-3">
          <div className="col-md-10">
            <h3 className="head-3 mb-1">
              Personal Details
            </h3>
          </div>
        </div>
  
        <div className="row mb-12px">
          <div className="col-md-5">
            <label htmlFor="textFirstNameCAPS" className="control-label">
             First name
            </label>
            <input type="text" className="form-control" id="textFirstNameCAPS" />
          </div>
  
          <div className="col-md-5">
            <label htmlFor="textMiddleNameCAPS" className="control-label">
              Middle initial (optional)
            </label>
            <input type="text" className="form-control" id="textMiddleNameCAPS" />
          </div>
        </div>
  
        <div className="row mb-12px">
          <div className="col-md-5">
            <label htmlFor="textLastNameCAPS" className="control-label">
              Last name
            </label>
            <input type="text" className="form-control" id="textLastNameCAPS" />
          </div>
  
          <div className="col-md-5">
            <label htmlFor="selectSuffixCAPS" className="control-label">
              Suffix (optional)
            </label>
            <select className="form-control form-select" 
        id="suffix"
        value={selectedSuffix}
        onChange={(e)=>{setSelectedSuffix(e.target.value)}}
      >
        <option value="">-- Select Suffix --</option>
        {suffixes.map((suffix) => (
          <option key={suffix.value} value={suffix.value}>
            {suffix.label}
          </option>
        ))}
      </select>
          </div>
        </div>
  
        <div className="row mb-12px">
          <div className="col-md-6">
            <label htmlFor="textDateOfBirthCAPS" className="control-label me-2">
              Date of birth
            </label>
            <br></br>

            
          <span>
          <CustomDatePicker
        selectedDate={dateOfBirth}
        onDateChange={setDateOfBirth} // Update state on date change
        id="textDateOfBirthCAPS"
      />
          </span>
            
          </div>
          <div className="col-md-5"></div>
        </div>
        <div className="row">
          <div className="col-md-10">
            <div className="mt-2">
              <label>
                If the company applicant formed the entity as part of their business activities
                (for example, as a paralegal), enter their business address. Otherwise, enter
                their residential address.
              </label>

               <div className='d-md-flex mt-2 mb-2 mb-md-0'>
               <div className="d-flex align-items-center border rounded-pill me-12px px-3 py-1 cursor-pointer h-40px me-12px">
        <input
          className="form-check-input cursor-pointer mt-0"
          type="radio"
          id="radioIsBusinessCA"
          value="Business"
          name="radioResidentialCA"
          onChange={(e)=>{setSelectedAddressType(e.target.value)}}
          checked={selectedAddressType === "Business"}
        />
        <label className="form-check-label fs-14px ms-2 cursor-pointer" htmlFor="radioIsBusinessCA">
          Business Address
        </label>
      </div>
      <div className="d-flex align-items-center border rounded-pill me-12px px-3 py-1 cursor-pointer h-40px me-12px">
        <input
          className="form-check-input cursor-pointer mt-0"
          type="radio"
          id="radioIsResidentialCA"
          value="Residential"
          name="radioResidentialCA"
          onChange={(e)=>{setSelectedAddressType(e.target.value)}}
          checked={selectedAddressType === "Residential"}
        />
        <label className="form-check-label fs-14px ms-2 cursor-pointer" htmlFor="radioIsResidentialCA">
          Residential Address
        </label>
      </div>
               </div>
            
    
            </div>
          </div>
        </div>
  
        {/* Checkbox for Previously Used Address */}
        <div className='row mt-3 mb-12px'>
        <div className="col-lg-3 col-md-4">
            <input
              className="me-1 form-check-input cursor-pointer"
              type="checkbox"
              id="checkIsPreviouslyUsedAddressCA"
              checked={isPreviouslyUsedAddress}
              onChange={() => {setIsPreviouslyUsedAddress(!isPreviouslyUsedAddress);setIsForeignAddress(false)}}
            />
            <label className="control-label mb-0" htmlFor="checkIsPreviouslyUsedAddressCA">
              Is previously used address
            </label>
          </div>

        {/* Checkbox for Foreign Address */}
          <div className="col-lg-4 col-md-5">
            <input
              className="me-1 form-check-input cursor-pointer mt-0"
              type="checkbox"
              id="checkIsForeignAddress"
              checked={isForeignAddress}
              onChange={() => {setIsForeignAddress(!isForeignAddress);setIsPreviouslyUsedAddress(false)}}
            />
            <label className="control-label mb-0" htmlFor="checkIsForeignAddress">
              Foreign address (Outside U.S.)
            </label>
          </div>
        </div>
    
  
    
  
        {/* US Address Section */}
        {!isForeignAddress && (
          <div id="divUSAddressCARA">
            <div className="row mb-12px">
              <div className="col-md-5">
                <label htmlFor="textStreetAddressCARA" className="control-label">
                  Street address
                </label>
        
             <input
              type="text"
              className="form-control"
              id="textStreetAddressCARA"
              value={streetAddressCPA}
              onChange={(e) => setStreetAddressCPA(e.target.value)}
            />
                
              </div>
              <div className="col-md-5">
                <label htmlFor="textCityCARA" className="control-label">
                  City/Town
                </label>
                <input
              type="text"
              className="form-control"
              id="textCityCARA"
              value={cityCPA}
              onChange={(e) => setCityCPA(e.target.value)}
            />
              </div>
            </div>
  
            <div className="row">
              <div className="col-md-5">
                <label htmlFor="selectStateCARA" className="control-label">
                State
                </label>
                <StatesSelector 
               value={cpaState}
               onChange={(e)=>{setCpaState(e.target.value)}}
                />
              </div>
              <div className="col-md-5 mt-2 mt-md-0">
                <label htmlFor="textZipCodeCARA" className="control-label">
                 Zip code
                </label>
                <input
              type="text"
              className="form-control"
              id="textZipCodeCARA"
              value={zipCdCPA}
              onChange={(e) => setZipCdCPA(e.target.value)}
            />
              </div>
            </div>
          </div>
        )}
  
        {/* Foreign Address Section */}
        {isForeignAddress && (
          <div id="divForeignAddressCARA">
            <div className="row mb-12px">
              <div className="col-md-5">
                <label htmlFor="selectCountryForeignCARA" className="control-label">
                 Country
                </label>
                <CountrySelector 
               value={cpaForeignState}
               onChange={(e)=>{setCpaForeignState(e.target.value)}}
                />
              </div>
              <div className="col-md-5">
                <label htmlFor="textStreetAddressForeignCARA" className="control-label">
                  Street address
                </label>
                <input
              type="text"
              className="form-control"
              id="textStreetAddressForeignCARA"
              value={streetAddressForeignCPA}
              onChange={(e) => setStreetAddressForeignCPA(e.target.value)}
            />
               
              </div>
            </div>
  
            <div className="row mb-12px">
              <div className="col-md-5">
                <label htmlFor="textCityForeignCARA" className="control-label">
                 City/Town
                </label>
                <input
              type="text"
              className="form-control"
              id="textCityForeignCARA"
              value={cityForeignCPA}
              onChange={(e) => setCityForeignCPA(e.target.value)}
            />
              </div>
              <div className="col-md-5">
                <label htmlFor="textStateOrProvinceForeignCARA" className="control-label">
               State or province (optional)
                </label>
                <input
              type="text"
              className="form-control"
              id="textStateOrProvinceForeignCARA"
              value={stateForeignCPA}
              onChange={(e) => setStateForeignCPA(e.target.value)}
            />
              </div>
            </div>
  
            <div className="row">
              <div className="col-md-5">
                <label htmlFor="textZipPostalCodeForeignCARA" className="control-label">
                 ZIP or postal code
                </label>
                <input
              type="text"
              className="form-control"
              id="textZipPostalCodeForeignCARA"
              value={zipCdForeignCPA}
              onChange={(e) => setZipCdForeignCPA(e.target.value)}
            />
              </div>
            </div>
          </div>
        )}
      </div></>)}
     
    </div>)}

    <hr></hr>

    <div>
      {/* Beneficial Owner Header */}
      <div className="row mb-3">
        <div className="col-md-11">
          <h2 className="head-2 mb-0">
            Beneficial Owner
          </h2>
        </div>
      </div>

      {/* Exempt Entity Section */}
      <div className="row">
        <div className="col-md-10">
          <h3 className="head-3 mb-1">
            Exempt Entity
          </h3>
        </div>
      </div>

      <div className="row mb-12px">
        <div className="col-md-10">
          <label className="control-label">
            Is the ownership interest of the reporting company held exclusively through one or more exempt entities?
          </label>
        </div>

        <div className="col-md-5">
         <div className='d-flex'>
         <div className="d-flex align-items-center border rounded-pill me-12px px-3 py-1 cursor-pointer h-40px me-12px">
            <input
              className="form-check-input cursor-pointer mt-0"
              type="radio"
              id="radioIsExemptEntityYes"
              value="Yes"
              name="radioIsExemptEntity"
              checked={isExemptEntity === "Yes"}
              onChange={handleExemptEntityChange}
            />
            <label className="form-check-label fs-14px ms-2 cursor-pointer" htmlFor="radioIsExemptEntityYes">Yes</label>
          </div>
          <div className="d-flex align-items-center border rounded-pill me-12px px-3 py-1 cursor-pointer h-40px me-12px">
            <input
              className="form-check-input cursor-pointer mt-0"
              type="radio"
              id="radioIsExemptEntityNo"
              value="No"
              name="radioIsExemptEntity"
              checked={isExemptEntity === "No"}
              onChange={handleExemptEntityChange}
            />
            <label className="form-check-label fs-14px ms-2 cursor-pointer" htmlFor="radioIsExemptEntityNo">No</label>
          </div>
         </div>
        </div>
        <div className="col-md-5"></div>
      </div>

      {/* Exempt Entity Information Section (Conditional Rendering) */}
      {isExemptEntity === "Yes" && (
        <div id="divExemptEntityInformationYes">
          <div className="row">
            <div className="col-md-10">
              <h3 className="head-3 mb-2">
                Exempt Entity Information
              </h3>
            </div>
          </div>

          <div className="row">
            <div className="col-md-5">
              <label className="control-label" htmlFor="textExemptEntityLegalName">
                Exempt Entity’s Legal Name
              </label>
              <input
                type="text"
                className="form-control"
                id="textExemptEntityLegalName"
                value={exemptEntityLegalName}
                onChange={(e) => setExemptEntityLegalName(e.target.value)}
                maxLength="25"
              />
            </div>

            <div className="col-md-5"></div>
          </div>
        </div>
      )}
        {isExemptEntity === "No" && (
      <div>
      {/* Minor Child Section */}
      <div className="row">
        <div className="col-md-10">
          <h3 className="head-3 mb-1" >
          </h3>
        </div>
      </div>

      <div className="row mb-12px">
        <div className="col-md-10">
          <label className="control-label">
            Is the beneficial owner of the reporting company a minor?
          </label>
        </div>

        <div className="col-md-5">
           <div className='d-flex'>
           <div className="d-flex align-items-center border rounded-pill me-12px px-3 py-1 cursor-pointer h-40px me-12px">
            <input
              className="form-check-input cursor-pointer mt-0"
              type="radio"
              id="radioIsMinorChildYes"
              value="Yes"
              name="radioIsMinorChild"
              checked={isMinorChild === "Yes"}
              onChange={handleMinorChildChange}
            />
            <label className="form-check-label fs-14px ms-2 cursor-pointer" htmlFor="radioIsMinorChildYes">Yes</label>
          </div>
          <div className="d-flex align-items-center border rounded-pill me-12px px-3 py-1 cursor-pointer h-40px me-12px">
            <input
              className="form-check-input cursor-pointer mt-0"
              type="radio"
              id="radioIsMinorChildNo"
              value="No"
              name="radioIsMinorChild"
              checked={isMinorChild === "No"}
              onChange={handleMinorChildChange}
            />
            <label className="form-check-label fs-14px ms-2 cursor-pointer" htmlFor="radioIsMinorChildNo">No</label>
          </div>
           </div>
        </div>
        <div className="col-md-5"></div>
      </div>

      {/* Minor Child Date of Birth (Conditional Rendering) */}
      {isMinorChild === "Yes" && (
        <div id="divMinorChildDateOfBirthYes">
          <div className="row">
            <div className="col-md-5">
              <label className="control-label me-2" htmlFor="textChildDateBO">
                Enter minor child date of birth
              </label>
              <CustomDatePicker
        selectedDate={minorChildDateOfBirth}
        onDateChange={setMinorChildDateOfBirth} // Update state on date change
        id="textChildDateBO"
      />
             
            </div>

            <div className="col-md-5"></div>
          </div>
        </div>
      )}

      {/* FinCEN Identifier Section */}
      <div className="row mt-3">
        <div className="col-md-10">
          <h3 className="head-3 mb-2">
            FinCEN Identifier
          </h3>
        </div>
      </div>

      <div className="row mb-12px">
        <div className="col-md-10">
          <label className="control-label mb-1">Does this beneficial owner have a FinCEN ID?</label>
        </div>

        <div className="col-md-5">
          <div className='d-flex'>
          <div className="d-flex align-items-center border rounded-pill me-12px px-3 py-1 cursor-pointer h-40px me-12px">
            <input
              className="form-check-input cursor-pointer mt-0"
              type="radio"
              id="radioBSIsFinCENIdentifierYesBO"
              value="Yes"
              name="radioBSIsFinCENIdentifier"
              checked={hasBoFinCENId === "Yes"}
              onChange={handleFinCENBoIdChange}
            />
            <label className="form-check-label fs-14px ms-2 cursor-pointer" htmlFor="radioBSIsFinCENIdentifierYesBO">Yes</label>
          </div>
          <div className="d-flex align-items-center border rounded-pill me-12px px-3 py-1 cursor-pointer h-40px me-12px">
            <input
              className="form-check-input cursor-pointer mt-0"
              type="radio"
              id="radioBSIsFinCENIdentifierNoBO"
              value="No"
              name="radioBSIsFinCENIdentifier"
              checked={hasBoFinCENId === "No"}
              onChange={handleFinCENBoIdChange}
            />
            <label className="form-check-label fs-14px ms-2 cursor-pointer" htmlFor="radioBSIsFinCENIdentifierNoBO">No</label>
          </div>
          </div>
        </div>
        <div className="col-md-5"></div>
      </div>

      {/* FinCEN Identifier Details (Conditional Rendering) */}
      {hasBoFinCENId === "Yes" ?  (
        <div id="divFinCENidYesBO">
          <div className="row mt-12px mb-12px">
            <div className="col-md-5">
              <label htmlFor="finCENIdBO" className="control-label">
               FinCEN ID
              </label>
              <input
                type="text"
                className="form-control"
                id="finCENIdBO"
                value={finCENBoData.finCENIdBO}
                onChange={handleBoInputChange}
              />
            </div>

            <div className="col-md-5">
              <label htmlFor="firstNameBO" className="control-label">
               First name
              </label>
              <input
                type="text"
                className="form-control"
                id="firstNameBO"
                value={finCENBoData.firstNameBO}
                onChange={handleBoInputChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-5">
              <label htmlFor="middleNameBO" className="control-label">Middle initial (optional)</label>
              <input
                type="text"
                className="form-control"
                id="middleNameBO"
                value={finCENBoData.middleNameBO}
                onChange={handleBoInputChange}
              />
            </div>

            <div className="col-md-5">
              <label htmlFor="lastNameBO" className="control-label">
              Last name
              </label>
              <input
                type="text"
                className="form-control"
                id="lastNameBO"
                value={finCENBoData.lastNameBO}
                onChange={handleBoInputChange}
              />
            </div>
          </div>
        </div>
      ):(<> <div id="divFinCENidNo">
        {/* Section Header */}
        <div className="row mt-3">
          <div className="col-md-10">
            <h3 className="head-3 mb-2">
              Upload Identification Document
            </h3>
          </div>
        </div>
  
        {/* Document Type and Number */}
        <div className="row mb-12px">
          <div className="col-md-5">
            <label htmlFor="selectFinCENDocumentTypeBO" className="control-label">
              Identifying document type
            </label>
            <select className="form-control form-select" id="selectFinCENDocumentTypeBO"
  
  value={selectedDocumentBO}
  onChange={handleDocumentChangeBO}
>
  <option value="">-- Select Document --</option>
  {documents.map((document) => (
    <option key={document.value} value={document.value}>
      {document.label}
    </option>
  ))}
</select>
          </div>
          <div className="col-md-5"></div>
        </div>
  
        <div className="row">
          <div className="col-md-5">
            <label htmlFor="textFinCENDocumentNumberCA" className="control-label">
               Identifying document number
            </label>
            <input
                type="text"
                className="form-control"
                id="textFinCENDocumentNumberBO"
                value={documentNoBO}
                onChange={(e)=>{setDocumentNoBO(e.target.value)}}
              />
              </div>
          <div className="col-md-5">
            <label htmlFor="textFinCENDocDateCA" className="control-label">
             Document expiration date
            </label>
            <br></br>
            <CustomDatePicker
        selectedDate={documentExpiryDateBo}
        onDateChange={setDocumentExpiryDateBo} // Update state on date change
        id="textFinCENDocDateBo"
      />
          
          </div>
        </div>
  
        {isDriverLicenseVisibleBO && (
          <div id="divDriverLicense">
            
            <div className="row">
            <div className="col-md-5">
            <DocumentTerritorySelector
      selectedTerritory={selectedBOTerritory}
      onTerritoryChange={handleBOTerritoryChange}
    />
    </div>
    {isUSABOCountryDocument && (<div> 
      
       <div className="row"> <div className="col-md-5">
               {documentTribalBO === "" &&( <div id="divDocumentIssuedStateCA">
                  <label htmlFor="selectDocumentIssuedStateCA" className="control-label">
                    Document issued state
                  </label>
                  <StatesSelector 
               value={documentBOState}
               onChange={(e)=>{setDocumentBOState(e.target.value)}}
                />
                </div>
               )}
              </div>
              </div>
              {selectedDocumentBO !== "Driving_License"  && documentBOState === "" &&(   <div id="divDocumentIssuedTribalJurisdictionCA">
              <div className="row d-flex justify-content-center mb-15px">
                <div className="col-md-5">
                  <label htmlFor="selectDocumentIssuedTribalJurisdictionCA" className="control-label">
                    <span className="text-danger">*</span>Document issued tribal jurisdiction
                  </label>
                  <TribalSelector 
               value={documentTribalBO}
               onChange={handleDocumentBOTribalChange}
                />
                </div>
              {isDocumentBOOtherTribe && (  <div className="col-md-5">
                  <div id="divOtherTribalCA">
                    <label htmlFor="selectOtherTribalCA" className="control-label">
                      <span className="text-danger">*</span>Other tribe:
                    </label>
                    <input
                  type="text"
                  className="form-control"
                  id="DocumentBOTribe"
                  value={documentBOOtherTribe}
                  onChange={(e) => setDocumentBOOtherTribe(e.target.value)}
                />
                  </div>
                </div>)}
              </div>
            </div>)}
            </div>
            )}
             
            </div>
  
            {/* Tribal Jurisdiction Section */}
          
          </div>
        )}    {/* Driver License Section */}
          {isForeignCountryBO && (   <div className="row d-flex mb-15px">  <div className="col-md-5">
                <label htmlFor="selectCountryForeignCARA" className="control-label">
                  <span className="text-danger">*</span>Document issued country/jurisdiction
                </label>
                <CountrySelector 
               value={documentBOForeignState}
               onChange={(e)=>{setDocumentBOForeignState(e.target.value)}}
                />
              </div>
              </div>
          )}
  
        {/* Personal Details Section */}
        <div className="row mt-3">
          <div className="col-md-10">
            <h3 className="head-3 mb-1">
              Personal Details
            </h3>
          </div>
        </div>
  
        <div className="row mb-12px">
          <div className="col-md-5">
            <label htmlFor="textFirstNameCAPS" className="control-label">
              First name
            </label>
            <input
                  type="text"
                  className="form-control"
                  id="textFirstNameBOPS"
                  name="textFirstNameBOPS"
                  value={firstNameBO}
                  onChange={(e) => setFirstNameBO(e.target.value)}
                />
          </div>
  
          <div className="col-md-5 mt-2 mt-md-0">
            <label htmlFor="textMiddleNameCAPS" className="control-label">
              Middle initial (optional)
            </label>
            <input
                  type="text"
                  className="form-control"
                  id="textMiddleNameBOPS"
                  name="textFirstNameBOPS"
                  value={middleNameBO}
                  onChange={(e) => setMiddleNameBO(e.target.value)}
                />
          </div>
        </div>
  
        <div className="row mb-12px">
          <div className="col-md-5">
            <label htmlFor="textLastNameCAPS" className="control-label">
             Last name
            </label>
            <input
                  type="text"
                  className="form-control"
                  id="textLastNameCAPS"
                  name="textFirstNameBOPS"
                  value={lastNameBO}
                  onChange={(e) => setLastNameBO(e.target.value)}
                />
          </div>
  
          <div className="col-md-5">
            <label htmlFor="selectSuffixCAPS" className="control-label">
              Suffix (optional)
            </label>
            <select className="form-control form-select" 
        id="suffix"
        value={selectedBoSuffix}
        onChange={(e)=>{setSelectedBoSuffix(e.target.value)}}
      >
        <option value="">-- Select Suffix --</option>
        {suffixes.map((suffix) => (
          <option key={suffix.value} value={suffix.value}>
            {suffix.label}
          </option>
        ))}
      </select>
          </div>
        </div>
  
        <div className="row mb-12px">
          <div className="col-md-5">
            <label htmlFor="textDateOfBirthCAPS" className="control-label me-2">
              Date of birth
            </label>
            <br></br>
            <CustomDatePicker
        selectedDate={dateOfBirthBo}
        onDateChange={setDateOfBirthBo} // Update state on date change
        id="textDateOfBirthBOPS"
      />
            
          </div>
          <div className="col-md-5"></div>
        </div>
        <div className="row">
          <div className="col-md-10">
            <div className="mt-2">
              <label>
                If the company applicant formed the entity as part of their business activities
                (for example, as a paralegal), enter their business address. Otherwise, enter
                their residential address.
              </label>
      <div className='d-md-flex mt-2 mb-2 mb-md-0'>
      <div className="d-flex align-items-center border rounded-pill me-12px px-3 py-1 cursor-pointer h-40px me-12px">
                <input
                  className="form-check-input cursor-pointer mt-0"
                  type="radio"
                  id="radioIsBusinessBO"
                  value="Business"
                  name="radioResidentialBO"
                />
                <label className="form-check-label fs-14px ms-2 cursor-pointer" htmlFor="radioIsBusinessBO">
                  Business Address
                </label>
              </div>
              <div className="d-flex align-items-center border rounded-pill me-12px px-3 py-1 cursor-pointer h-40px me-12px">
                <input
                  className="form-check-input cursor-pointer mt-0"
                  type="radio"
                  id="radioIsResidentialBO"
                  value="Residential"
                  name="radioResidentialBO"
                  defaultChecked
                />
                <label className="form-check-label fs-14px ms-2 cursor-pointer" htmlFor="radioIsResidentialBO">
                  Residential Address
                </label>
              </div>
      </div>
           
            </div>
          </div>
        </div>
  
        {/* Checkbox for Previously Used Address */}
        <div className='row mt-3 mb-12px'>
           <div className='d-md-flex'>
           <div className="col-lg-3 col-md-4">
            <input
              className="me-1 form-check-input cursor-pointer"
              type="checkbox"
              id="checkIsPreviouslyUsedAddressBO"
              checked={isPreviouslyUsedAddressBo}
              onChange={() => {setIsPreviouslyUsedAddressBo(!isPreviouslyUsedAddressBo);setIsForeignAddressBo(false)}}
            />
            <label className="control-label" htmlFor="checkIsPreviouslyUsedAddressBO">
              Is previously used address
            </label>
          </div>
  {/* Checkbox for Foreign Address */}
          <div className="col-lg-4 col-md-5">
            <input
              className="me-1 form-check-input cursor-pointer"
              type="checkbox"
              id="checkIsForeignAddress"
              checked={isForeignAddressBo}
              onChange={() => {setIsForeignAddressBo(!isForeignAddressBo);setIsPreviouslyUsedAddressBo(false)}}
            />
            <label className="control-label" htmlFor="checkIsForeignAddress">
              Foreign address (Outside U.S.)
            </label>
          </div>
           </div>
        </div>
      
  
      
      
  
        {/* US Address Section */}
        {!isForeignAddressBo && (
          <div id="divUSAddressBORA">
            <div className="row mb-12px">
              <div className="col-md-5">
                <label htmlFor="textStreetAddressCARA" className="control-label">
                  Street address
                </label>      <input
              type="text"
              className="form-control"
              id="textStreetAddressBORA"
              value={streetAddressBO}
              onChange={(e) => setStreetAddressBO(e.target.value)}
            />
                    </div>
              <div className="col-md-5">
                <label htmlFor="textCityBORA" className="control-label">
                 City/Town
                </label>
                <input
              type="text"
              className="form-control"
              id="textCityBORA"
              value={cityBO}
              onChange={(e) => setCityBO(e.target.value)}
            />
                  </div>
            </div>
  
            <div className="row mb-12px">
              <div className="col-md-5">
                <label htmlFor="selectStateBORA" className="control-label">
                 State
                </label>
                <StatesSelector 
               value={stateBO}
               onChange={(e)=>{setStateBO(e.target.value)}}
                />
              </div>
              <div className="col-md-5 mt-2 mt-md-0">
                <label htmlFor="textZipCodeBORA" className="control-label">
                 Zip code
                </label>
                <input
              type="text"
              className="form-control"
              id="textZipCodeBORA"
              value={zipCdBO}
              onChange={(e) => setZipCdBO(e.target.value)}
            />
                   </div>
            </div>
          </div>
        )}
  
        {/* Foreign Address Section */}
        {isForeignAddressBo && (
          <div id="divForeignAddressBORA">
            <div className="row mb-12px">
              <div className="col-md-5">
                <label htmlFor="selectCountryForeignCARA" className="control-label">
                  Country
                </label>
                <CountrySelector 
               value={countryForeignBO}
               onChange={(e)=>{setCountryForeignBO(e.target.value)}}
                />
              </div>
              <div className="col-md-5">
                <label htmlFor="textStreetAddressForeignCARA" className="control-label">
                  Street address
                </label>
                <input
              type="text"
              className="form-control"
              id="textStreetAddressForeignBORA"
              value={streetAddressForeignBO}
              onChange={(e) => setStreetAddressForeignBO(e.target.value)}
            />
                </div>
            </div>
  
            <div className="row mb-12px">
              <div className="col-md-5">
                <label htmlFor="textCityForeignCARA" className="control-label">
                  City/Town
                </label>
                <input
              type="text"
              className="form-control"
              id="textCityForeignBORA"
              value={cityForeignBO}
              onChange={(e) => setCityForeignBO(e.target.value)}
            />
                   </div>
              <div className="col-md-5">
                <label htmlFor="textStateOrProvinceForeignBORA" className="control-label">
                  State or province (optional)
                </label>
                <input
              type="text"
              className="form-control"
              id="textStateOrProvinceForeignBORA"
              value={stateForeignBO}
              onChange={(e) => setStateForeignBO(e.target.value)}
            />
                   </div>
            </div>
  
            <div className="row">
              <div className="col-md-5">
                <label htmlFor="textZipPostalCodeForeignCARA" className="control-label">
                ZIP or postal code
                </label>   <input
              type="text"
              className="form-control"
              id="textCityForeignBORA"
              value={zipCdForeignBO}
              onChange={(e) => setZipCdForeignBO(e.target.value)}
            />
                     </div>
            </div>
          </div>
        )}
      </div></>)}
    </div>
        )}
   
    </div>


    <div className="row mt-3">
        <div className="col-md-10">
          <h3 className="head-3 mb-1">
            Submitter Information
          </h3>
        </div>
      </div>

      <div className="row mb-12px">
          <div className="col-md-5">
            <label htmlFor="textFirstNameSI" className="control-label">
             First name
            </label>
            <input
              type="text"
              className="form-control"
              id="textFirstNameSI"
              value={submitterFirstName}
              onChange={(e) => setSubmitterFirstName(e.target.value)}
            />
          </div>

          <div className="col-md-5">
            <label htmlFor="textLastNameSI" className="control-label">
             Last name
            </label>
            <input
              type="text"
              className="form-control"
              id="textLastNameSI"
              value={submitterLastName}
              onChange={(e) => setSubmitterLastName(e.target.value)}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-5">
            <label htmlFor="textEmailSI" className="control-label">
           Email
            </label>
            <input
              type="email"
              className="form-control"
              id="textEmailSI"
              value={submitterEmail}
              onChange={(e) => setSubmitterEmail(e.target.value)}
            />
          </div>
          <div className="col-md-5"></div>
        </div>


       
        </form>
        </div>
    </div>
      
       
       
      </div>



      <div className="d-flex align-items-center justify-content-between text-center my-3">
        <Link
          to="/dashboard"
          style={{ marginRight: "60%" }}
          className="btn btn-secondary"
          id="backButton"
        >
          <i className='mdi mdi-chevron-left fs-6 text-white me-1'></i>
          Back
        </Link>
       <button
        className="btn btn_primary btn_md d-flex align-items-center"
        id="createBOIRButton"
        onClick={handleClick}
      >
       
        {isLoading && (
        <i
          className="spinner-border spinner-border-sm me-2"
          aria-hidden="true"
          id="createBOIRProgressBar"
        ></i>
        )} 
        <span> Create BOIR</span>
      </button>
      
       


{/* Pass the response to the modal if available */}
{apiResponse && <BOIRResponseModal response={apiResponse} isModalOpen={isModelOpen} onCLose={onCLose} />}
    </div>
    </div>
    </div>
    </>
  );
};

export default CreateBoir;
