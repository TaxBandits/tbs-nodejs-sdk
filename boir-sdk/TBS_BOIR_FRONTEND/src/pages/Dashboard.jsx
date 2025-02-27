import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { PDFDocument } from 'pdf-lib';
import { toast } from 'react-toastify';
import upload from '../images/Files-upload.svg'
import view from '../images/View.svg'
import { Tooltip } from "react-tooltip";
import BOIRAttachmentResponse from '../components/BOIRAttachmentResponse';
import BOIRStatus from '../components/BOIRStatus';
import Loader from '../components/ReusableComponents/Loader';

const Dashboard = () => {
  const [data, setData] = useState([]); // Array to directly hold BOIRRecords
  const [fromDate, setFromDate] = useState(new Date(new Date().setMonth(new Date().getMonth() - 1))); // Default to 1 month ago
  const [toDate, setToDate] = useState(new Date()); // Default to today
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadError, setUploadError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [apiResponse, setApiResponse] = useState(null);
  const [statusResponse, setStatusResponse] = useState(null);
  const API_Url=process.env.REACT_APP_API_URL;

  const allowedFileTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
  const maxFileSize = 4 * 1024 * 1024; // 4MB
  const navigateToCreteBOIR = () => {
    window.location.href = "/createBOIR"; // Replace with React Router navigation if using Router
  };
  const onCLose =() =>{
    setIsModelOpen(false);
  }
  const onClose =() =>{
    setIsStatusOpen(false);
  }

  const handleStatus=async(submissionId)=>{
    try {
        const apiUrl =  `${API_Url}/Status`
        const payload ={
          SubmissionId:submissionId
        }
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        if (response.ok) {
          const responseData = await response.json();
          setStatusResponse(responseData);
          setIsStatusOpen(true);
        }else{
          setIsStatusOpen(false);
        }
      } catch (err) {
        toast.error('Error Transmit data:', err);
        setIsStatusOpen(false);
      }
  }

  const handleTransmit=async(submissionId)=>{
    try {
      const apiUrl=`${API_Url}/Transmit`;
      const body={
          SubmissionId:submissionId,
          ReportNumber: null,
      }
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
      });
      if (!response.ok) {
        // Parse error response if the status is not ok
        const errorData = await response.json();
        if (response.status === 400) {
          if (errorData?.Errors?.length > 0) {
            toast.error(errorData.Errors[0].Message);
          } 
          else {
            toast.error("Failed to transmit");
          }
        }
      }else{
        const responseData = await response.json();
        toast.success("Transmitted Successfully");
      }
    } catch (err) {
      toast.error('Error Transmit data:', err);
    }
  }
  
  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const formattedFromDate = fromDate.toLocaleDateString('en-US');
      const formattedToDate = toDate.toLocaleDateString('en-US');
      const response = await axios.get(`${API_Url}/list`, {
        params: {
          Page: 1,
          PageSize: 10, // Adjust page size as needed
          TINType: '',
          TIN: '',
          FromDate: moment(formattedFromDate).format('MM/DD/YYYY'),
          ToDate: moment(formattedToDate).format('MM/DD/YYYY'),
          SubmissionId: '',
          ReportNumber: '',
          ReportType: 'INITIAL',
        },
      });   
      if (response.data.StatusCode === 200 && Array.isArray(response.data.BOIRRecords)) {
        setData(response.data.BOIRRecords); // Set the array directly
      } else {
        setData([]); // Empty data if response is invalid
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load data.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (file, recordId, type,e) => {
    setUploadError('');
    setSuccessMessage('');

    if (!file) {
      setUploadError('Please select a file to upload.');
      return;
    }

    // Validate file type
    if (!allowedFileTypes.includes(file.type)) {
      setUploadError('Invalid file type. Allowed types are PDF, JPG, JPEG, PNG.');
      return;
    }

    // Validate file size
    if (file.size > maxFileSize) {
      setUploadError('File size exceeds the 4MB limit.');
      return;
    }

 
      let pdfBytes;

      if (file.type.startsWith('image/')) {
        // If the file is an image, convert it to PDF
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage();
        const { width, height } = page.getSize();

        // Convert the image to a Uint8Array buffer
        const imageBuffer = await file.arrayBuffer();
        const imageBytes = new Uint8Array(imageBuffer);

        // Embed the image in the PDF
        const imageEmbed =  file.type === "image/jpeg" ? await pdfDoc.embedJpg(imageBytes) :await pdfDoc.embedPng(imageBytes);

        // Scale the image to fit in the PDF
        const imageDims = imageEmbed.scale(0.5); // Adjust as needed
        page.drawImage(imageEmbed, {
          x: (width - imageDims.width) / 2,
          y: (height - imageDims.height) / 2,
          width: imageDims.width,
          height: imageDims.height,
        });

        // Save the PDF as bytes
        pdfBytes = await pdfDoc.save();
      } else if (file.type === 'application/pdf') {
        // If the file is already a PDF, read it as bytes
        const pdfBuffer = await file.arrayBuffer();
        pdfBytes = new Uint8Array(pdfBuffer);
      } else {
        setError('Please upload a valid file type.');
        setLoading(false);
        return;
      }
        const payload = {
          CompanyApplicantAttachments: type === 'CompanyApplicant' ? [{ CompanyApplicantId: recordId, PDFByte: Uint8Array.from(pdfBytes), FilePath: null }] : null,
          BeneficialOwnerAttachments: type === 'BeneficialOwners' ? [{ BeneficialOwnerId: recordId, PDFByte: Uint8Array.from(pdfBytes), FilePath: null }] : null,
        };
        const apiUrl =  `${API_Url}/AttachDocuments`

        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
          const responseData = await response.json(); // Axios automatically parses JSON responses
          if (responseData.StatusCode === 200) {
            console.log("API Response:", responseData);
            toast.success('File uploaded successfully');
            fetchData();
            setIsModelOpen(false);
          } 
          else{
          setApiResponse(responseData);
          setIsModelOpen(true);
          e.target.value = '';
          }
    
  };

  useEffect(() => {
    fetchData(); // Fetch data on mount and when dates change
  }, []);

  return (
   
    <div className='container py-3'> 

     <div class="d-inline-block mb-4">
     <h1 className='head-1 mb-0'>Dashboard</h1>
        <div class="heading-bottom-line"></div>
      </div>
    

      {/* Filters */}
      <div className='d-flex justify-content-between mb-12px'>
  
    <div>
    <label className='control-label me-4'>
          From Date:
          <DatePicker
            selected={fromDate}
            onChange={(date) => setFromDate(date)}
            dateFormat="MM/dd/yyyy"
            maxDate={toDate}
            className='form-control ms-2'
          />
        </label>
        <label className='control-label me-2'>
          To Date:
          <DatePicker
            selected={toDate}
            onChange={(date) => setToDate(date)}
            dateFormat="MM/dd/yyyy"
            minDate={fromDate}
              className='form-control ms-2'
          />
        </label>
    </div>
        <div className='d-flex'>
        <button onClick={fetchData} disabled={loading} className='btn btn btn-outline-secondary me-12px'>
          {loading ? 'Loading...' : 'Fetch Data'}
        </button>      
              <button 
                className="btn btn-primary"
                onClick={navigateToCreteBOIR}
              >
               Create BOIR
              </button>
        </div>
      
            </div>
        

      {/* Table */}
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (<>{loading ?<Loader/>:
        <div className='table-responsive w-100'>
          <table border="1" cellPadding="10" className='table table-bordered border border-disable mb-0'>
          <thead>
            <tr>
              <th>Submission ID</th>
              <th>Report Number</th>
              <th>Legal Name</th>
              <th>TIN</th>
              <th>Company Applicants</th>
              <th>Beneficial Owners</th>
              <th>Status</th>
              <th>Transmit</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((record, index) => (
                <tr key={index}>
                  <td className='align-middle'>{record.SubmissionId}</td>
                  <td className='align-middle'>{record.ReportNumber}</td>
                  <td className='align-middle'>{record.LegalNm}</td>
                  <td className='align-middle'>{record.TIN}</td>
                  <td className='align-middle'>
                    {record.CompanyApplicants ? (record.CompanyApplicants).map((applicant) => (
                      <div key={applicant.CompanyApplicantId} className='d-flex align-items-center'>
                       <div className='align-middle'> {applicant.FirstNm} {applicant.LastNm}{' '}</div>
                       {applicant.Attachment !==null ? (<Link href={applicant.Attachment} target="_blank" rel="noopener noreferrer">
                        {/* <div type="button" className='icon-hover position-relative cursor-pointer d-flex align-items-center justify-content-center ms-3'  title="View"
                              data-tooltip-id="View"
                              data-tooltip-content="View">
                                 <img src={view} className="fs-6" alt='View'/>
                               </div>
                               <Tooltip
                      id="View"
                      className="z-index-9999"
                      place={"bottom"}
                    /> */}

                        </Link>):<>
                        {applicant.FinCENID==null && (
                          <div type='button' className='icon-hover position-relative cursor-pointer d-flex align-items-center ' title="Upload File"  data-tooltip-id="Upload"
                          data-tooltip-content="Upload">
                          <label htmlFor="file-upload2" >
                            <img src={upload} className="fs-6" alt='upload'></img>
                                <Tooltip
                                                id="Upload"
                                                className="z-index-9999"
                                                place={"bottom"}
                                              />
                          </label>
                          <input
                              id="file-upload2"
                              type="file"
                              onChange={(e) => handleFileUpload(e.target.files[0], applicant.CompanyApplicantId, 'CompanyApplicant')}
                              accept=".pdf,.jpg,.jpeg,.png"
                              style={{ display: "none" }}
                            />
                          </div>
                          )}
                        </>
                        }
                      </div>
                    )):'-'}
                  </td>
                  <td className='align-middle'>
                    {record.BeneficialOwners ? (record.BeneficialOwners).map((owner) => (
                      <div key={owner.BeneficialOwnerId} className='d-flex align-items-center'>
                      <div className='align-middle'> {owner.FirstNm} {owner.LastNm} {' '}</div>
                        {owner.Attachment !==null ? (<Link href={owner.Attachment} target="_blank" rel="noopener noreferrer">
                          
                          {/* <div type="button" className='icon-hover position-relative cursor-pointer d-flex align-items-center justify-content-center' title="view"
                              data-tooltip-id="view"
                              data-tooltip-content="view">
                                 <img src={view} className="fs-6" alt='View'/>
                               </div>
                               <Tooltip
                      id="view"
                      className="z-index-9999"
                      place={"bottom"}
                    /> */}

                        </Link>):(<>
                        {owner.ExemptEntityInformation?.EntityLegalNm!=null ?(<div className='align-middle'>{owner.ExemptEntityInformation.EntityLegalNm}</div>)
                        :<>{owner.FinCENID==null && (
                            <div type='button' className='icon-hover position-relative cursor-pointer d-flex align-items-center ' title="Upload File"  data-tooltip-id="Upload"
                            data-tooltip-content="Upload">
                            <label htmlFor="file-upload2" >
                              <img src={upload} className="fs-6" alt='upload'></img>
                                  <Tooltip
                                                  id="Upload"
                                                  className="z-index-9999"
                                                  place={"bottom"}
                                                />
                            </label>
                            <input
                                id="file-upload2"
                                type="file"
                                onChange={(e) => handleFileUpload(e.target.files[0], owner.BeneficialOwnerId, 'BeneficialOwners')}
                                accept=".pdf,.jpg,.jpeg,.png"
                                style={{ display: "none" }}
                              />
                            </div>
                            )}
                            </>
                            }
                            </>
                          )
                        }
                      </div>
                    )):'-'}
                  </td>
                  <td className='align-middle cursor-pointer'>
                      <img src={view} onClick={()=>handleStatus(record.SubmissionId)} className="fs-6"/>
                  </td>
                  <td className='align-middle'>
                    <button onClick={()=>handleTransmit(record.SubmissionId)} className='btn btn btn-outline-secondary me-12px'>
                      Transmit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center' }}>
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
          }
        </>
      )}
      {apiResponse && <BOIRAttachmentResponse response={apiResponse} isModalOpen={isModelOpen} onCLose={onCLose} />}
      {statusResponse && <BOIRStatus response={statusResponse} isModalOpen={isStatusOpen} onCLose={onClose}/> }
    </div>
  );
};

export default Dashboard;
