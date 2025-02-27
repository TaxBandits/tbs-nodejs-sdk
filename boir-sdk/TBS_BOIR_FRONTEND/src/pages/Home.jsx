import React from "react";
import logo from "../images/tbslogo.png";
import shape from "../images/shape-4.png";

const Home = () => {
  const navigateToDashboard = () => {
    window.location.href = "/dashboard"; // Replace with React Router navigation if using Router
  };

  return (
    <div className="">
    <div className="bg-light-blue h-100vh w-85 mx-auto">
      <div className="pt-5">
        <div className="text-center mt-3">
          <img src={logo} alt="TaxBandits Logo" className="mb-5 logo" />
        </div>
        <div className="mt-4">
          <div className="w-35 mx-auto">
             <div className="shadow-medium rounded p-4 bg-white card-box position-relative ">
            <img className="top-eye-icon" src={shape} alt="TaxBandits" />
            <p className="mt-3 mb-0 text-start">
              Use this API to create Beneficial Ownership Information Report. To
              create the BOI report, you have to provide the Reporting Company,
              Beneficial Owner, and Company Applicant information.
            </p>
            <div className="text-center mt-3">
              <button
                className="btn btn-primary"
                onClick={navigateToDashboard}
              >
                Go To Dashboard
              </button>
            </div>
          </div>
             
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Home;
