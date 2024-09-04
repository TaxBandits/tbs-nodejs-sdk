import React from 'react'
import logo from '../images/tbsLogo.png'
import { useNavigate } from 'react-router-dom'
import topEyeIcon from '../images/shape-4.png' // Importing images
import form1099k from '../images/form-1099-k.png'

//Home page of Form1099-K
const Home = () => {
  //Hook to navigate between pages
  const navigate = useNavigate()

  //Function to navigate to the List business page
  const navigateToListBusiness = () => {
    navigate('/listBusiness')
  }

  return (
    <>
      <div className="bg-light-blue h-100vh">
        <div className="row justify-content-center pt-180px" >
          <div className="col-md-12 mt-3 text-center">
            <img src={logo} alt="TaxBandits Logo" className="mb-5 logo" />
            <h3>Form 1099K</h3>
          </div>
          <div className="col-md-4 col-lg-4 mt-4">
            <div>
              <div className="shadow rounded p-4 bg-white card-box  position-relative">
                <img className="top-eye-icon" src={topEyeIcon} alt="TaxBandits" />
                <div className="text-center grediant-bg">
                  <img src={form1099k} className=" w-70px" alt="Form 1099 K" />
                </div>
                <p class="mt-3 mb-0 text-start">
                  Payment card companies, payment apps, and online marketplaces are required to file Form 1099-K with the IRS, when the gross payment amount for a tax year is more than $600
                </p>
                <p class="mt-4">
                  Using this SDK, you can Create, Update, Get Status, List, Transmit and Delete the 1099-K forms.
                </p>
                <div className="text-center mt-4">
                  <button className="btn btn_primary mx-2" onClick={navigateToListBusiness}>Form1099K</button>
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