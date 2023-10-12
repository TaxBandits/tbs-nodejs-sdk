import React, { useState } from "react";
import axios from "axios"; //Axios to make HTTP calls
import * as bootstrap from "bootstrap/dist/js/bootstrap"; // Importing bootstrap for bootstrap modal
import Spinner from "../components/Spinner"; // Importing Spinner component for loader
import ReviewModal from "./ReviewModal";

const ViewPdfUrlModal = ({ viewPdfUrlData, reviewPdfData, pdfHeader, setReviewPdfData, setPdfHeader }) => {
  const [loading, setLoading] = useState(false); // Initializing state for loading

  const viewPdf = async (pdfData) => {
    const url = pdfData;
    if (url != null) {
      try {
        setLoading(true);
        const decryptPdf = await axios(
          `${process.env.REACT_APP_TBS_BACKEND_URL}/Form1099K/decryptPdf`,
          {
            method: "post",
            responseType: "blob",
            data: {
              urlLink: url,
            },
          }
        );
        setLoading(true);

        const pdfData = await decryptPdf.data;

        const file = new Blob([pdfData], { type: "application/pdf" });

        const fileURL = URL.createObjectURL(file);
        setReviewPdfData(fileURL);
        setPdfHeader("Request Pdf Preview");
        setLoading(true);
        //Modal to show the pdf from the Form1099K/decrypt Endpoint.
        let awaitingModal = new bootstrap.Modal(
          document.getElementById("review")
        );
        awaitingModal.show();

        setLoading(false);
      } catch (e) {
        console.log("error", e);
      }
    }
  };

  return (
    <>
      {loading && (
        <div className="mt-3">
          <Spinner />
        </div>
      )}

      <div
        class="offcanvas offcanvas-end w-50 modal-xl modal-md modal-dialog-scrollable m-0 h-100  ms-auto "
        data-bs-scroll="false"
        tabindex="-1"
        id="viewPdfModal"
        aria-labelledby="offcanvasWithBothOptionsLabel"
        data-bs-backdrop="static"
      >
        <div class="offcanvas-header rounded-0 border-0 bg-secondary text-white">
          <h5 class="modal-title" id="staticBackdropLabel">
            Request PDF Url Response
          </h5>
          <button
            type="button"
            className="btn-close bg-white rounded-circle border-0 fw-bold position-absolute end-n-10 top-n-13 modal-close button-hide fs-18 fw-500"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >
            X
          </button>
        </div>
        <div class="offcanvas-body p-12 border-1 border">
          <div className="table-container mt-2 mb-4">
            <table>
              <tbody>
                <tr className="fw-600 ">
                  <th className="text-center">PDF Copy</th>
                  <th className="text-center">PDF URL</th>
                  <th className="text-center">Action</th>
                </tr>
                {viewPdfUrlData !== null ? (
                  <>
                    <tr>
                      <td className="taL">Copy1</td>
                      <td className="taL">
                        {
                          viewPdfUrlData?.Form1099KRecords?.SuccessRecords[0]
                            ?.Files?.Copy1?.Masked
                        }
                      </td>
                      <td className="text-center border-radious-bottom-right align-top text-danger">
                        <button
                          className="btn btn-primary status-btn btn_smm"
                          onClick={() => {
                            viewPdf(
                              viewPdfUrlData?.Form1099KRecords
                                ?.SuccessRecords[0]?.Files?.Copy1?.Masked
                            );
                          }}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="taL">Copy2</td>
                      <td className="taL">
                        {
                          viewPdfUrlData?.Form1099KRecords?.SuccessRecords[0]
                            ?.Files?.Copy2?.Masked
                        }
                      </td>
                      <td className="text-center border-radious-bottom-right align-top text-danger">
                        <button
                          className="btn btn-primary status-btn btn_smm"
                          onClick={() => {
                            viewPdf(
                              viewPdfUrlData?.Form1099KRecords
                                ?.SuccessRecords[0]?.Files?.Copy2?.Masked
                            );
                          }}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="taL">CopyB</td>
                      <td className="taL">
                        {
                          viewPdfUrlData?.Form1099KRecords?.SuccessRecords[0]
                            ?.Files?.CopyB?.Masked
                        }
                      </td>
                      <td className="text-center border-radious-bottom-right align-top text-danger">
                        <button
                          className="btn btn-primary status-btn btn_smm"
                          onClick={() => {
                            viewPdf(
                              viewPdfUrlData?.Form1099KRecords
                                ?.SuccessRecords[0]?.Files?.CopyB?.Masked
                            );
                          }}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td className="taL">CopyC</td>
                      <td className="taL">
                        {
                          viewPdfUrlData?.Form1099KRecords?.SuccessRecords[0]
                            ?.Files?.CopyC?.Masked
                        }
                      </td>
                      <td className="text-center border-radious-bottom-right align-top text-danger">
                        <button
                          className="btn btn-primary status-btn btn_smm"
                          onClick={() => {
                            viewPdf(
                              viewPdfUrlData?.Form1099KRecords
                                ?.SuccessRecords[0]?.Files?.CopyC?.Masked
                            );
                          }}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  </>
                ) : (
                  <></>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ReviewModal reviewPdfData={reviewPdfData} pdfHeader={pdfHeader} />
    </>
  );
};

export default ViewPdfUrlModal;
