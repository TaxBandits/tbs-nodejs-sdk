import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../images/tbsLogo.png'
import form1099NEC from '../images/1099-nec.png'
import topEyeIcon from '../images/shape-4.png' // Importing images

//Home page of the application
const Home = () => {
  // To navigate between pages using useNavigate Hook
  const navigate = useNavigate()

  //Navigating to List Business page
  const navigateToListBusiness = () => {
    navigate('/listBusiness')
  }

  return (
    <>
      <div className="bg-light-blue h-100vh">
        <div className="row justify-content-center pt-180px" >
          <div className="col-md-12 mt-3 text-center">
            <img src={logo} alt="TaxBandits Logo" className="mb-5 logo" />
            <h3>Form 1099-NEC</h3>
          </div>
          <div className="col-md-4 col-lg-4 mt-4">
            <div>
              <div className="shadow rounded p-4 bg-white card-box  position-relative">
                <img className="top-eye-icon" src={topEyeIcon} alt="TaxBandits" />
                <div className="text-center grediant-bg">
                  <img src={form1099NEC} className="w-70px" alt="Form 1099-NEC" />
                </div>
                <p className="mt-3 mb-0 text-start">Form 1099-NEC is used by businesses to report payments made to independent contractors, freelancers, sole proprietors, and self-employed individuals.
                  Using this SDK, you can Create, Update, Get Status, List, Transmit and Delete the 1099-NEC forms.
                </p>
                <div className="text-center mt-4">
                  <button className="btn btn_primary mx-2" onClick={navigateToListBusiness}>Form 1099-NEC</button>
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