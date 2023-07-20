import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../images/tbsLogo.png' // Importing images
import tinMatch from '../images/tinMatch.png'
import topEyeIcon from '../images/shape-4.png' // Importing images

//Home page of the application
const Home = () => {
  // To navigate between pages using useNavigate Hook
  const navigate = useNavigate()

  //Navigating to List page
  const navigateToListBusiness = () => {
    navigate('/list')
  }

  return (
    <>
      <div className="bg-light-blue h-100vh">
        <div className="row justify-content-center pt-180px" >
          <div className="col-md-12 mt-3 text-center">
            <img src={logo} alt="TaxBandits Logo" className="mb-5 logo" />
            <h3>TIN Matching Recipients</h3>
          </div>
          <div className="col-md-4 col-lg-4 mt-4">
            <div>
              <div className="shadow rounded p-4 bg-white card-box  position-relative">
                <img className="top-eye-icon" src={topEyeIcon} alt="TaxBandits" />
                <div className="text-center grediant-bg">
                  <img src={tinMatch} className=" w-70px" alt="TIN Match" />
                </div>
                <p className="mt-3 mb-0 text-start">Use this endpoint to verify the TINs against the records maintained by the Internal Revenue Service (IRS).
                  TaxBandits will assign a unique RecordId for each of the TIN Match requests. You can use the RecordIds to get the TIN matching statuses.
                </p>
                <div className="text-center mt-4">
                  <button className="btn btn_primary mx-2" onClick={navigateToListBusiness}>Request TIN Match</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home