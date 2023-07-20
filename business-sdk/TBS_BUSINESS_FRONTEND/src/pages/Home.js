import React from 'react'
import {useNavigate} from 'react-router-dom'
import logo from '../images/tbsLogo.png' // Importing images
import listBusiness from '../images/sdk-list.png' // Importing images
import createBusiness from '../images/create.png' // Importing images
import topEyeIcon from '../images/shape-4.png' // Importing images

//Home page of the application
const Home = () => {

    // To navigate between pages using useNavigate Hook
    const navigate = useNavigate()

    //Navigating to Create page
    const navigateToCreateBusiness = () => {
        navigate('/create')
    }

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
            <h1>Business Endpoints</h1>
          </div>
          <div className="col-md-4 col-lg-4 mt-4">
            <div>
              <div className="shadow rounded p-4 bg-white card-box  position-relative">
                <img className="top-eye-icon" src={topEyeIcon} alt="TaxBandits" />
                <div className="text-center grediant-bg">
                  <img src={createBusiness} className=" w-70px" alt="Create Business" />
                </div>
                <h2 className="card-head text-center mb-0 mt-2">Create Business</h2>
                <div className="d-flex align-items-center justify-content-center">
                  <p className="mt-3 mb-0 text-center">Business Endpoint allows you to Create Employers/Payers to add the Business Information to the TaxBandits account. In response, TaxBandits will provide BusinessId which is a unique identifier. You can provide the BusinessId alone in the future form filing requests instead of sending the complete Business information again for each return.</p>
                </div>
                <div className="text-center mt-4">
                  <button className="btn btn_primary mx-2" onClick={navigateToCreateBusiness}>Create Business</button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 col-lg-4 mt-4">
            <div>
              <div className="shadow rounded p-4 bg-white position-relative card-box">
                <img className="top-eye-icon" src={topEyeIcon} alt="TaxBandits" />
                <div className="text-center grediant-bg">
                  <img src={listBusiness} className="w-70px" alt="Business List" />
                </div>
                <h2 className="card-head text-center mt-2 mb-0">List and Update Business</h2>
                <div className="d-flex align-items-center justify-content-center">
                  <p className="mt-3 mb-0 text-center">The List method lists all the Employers/Payers in the TaxBandits account based on the date range (Date the Employer/Payer was created in TaxBandits) provided in the Request. From the Businesses listed, you can select a particular business and update Business information using the Update endpoint.</p>
                </div>
                <div className="text-center mt-4">
                  <button className="btn btn_primary mx-2" onClick={navigateToListBusiness}>List & Update Business</button>
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
