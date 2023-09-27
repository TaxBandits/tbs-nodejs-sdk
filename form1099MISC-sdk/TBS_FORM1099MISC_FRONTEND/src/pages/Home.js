import React from 'react'
import logo from '../images/tbsLogo.png'
import { useNavigate } from 'react-router-dom'
import topEyeIcon from '../images/shape-4.png' // Importing images
import form1099MISC from '../images/1099MISC.png'

const Home = () => {

    const navigate=useNavigate()
    const navigateToListBusiness=()=>{
        navigate('/listBusiness')
    }

  return (
    <>
    <div className="bg-light-blue h-100vh">
      <div className="row justify-content-center pt-180px" >
        <div className="col-md-12 mt-3 text-center">
          <img src={logo} alt="TaxBandits Logo" className="mb-5 logo" />
          <h3>Form 1099MISC</h3>
        </div>
        <div className="col-md-4 col-lg-4 mt-4">
          <div>
            <div className="shadow rounded p-4 bg-white card-box  position-relative">
              <img className="top-eye-icon" src={topEyeIcon} alt="TaxBandits" />
              <div className="text-center grediant-bg">
                <img src={form1099MISC} className=" w-70px" alt="TIN Match" />
              </div>
              <p className="mt-3 mb-0 text-start">Form 1099-MISC is used by Payers to report Miscellaneous payments like Rents, Royalties etc, made to independent contractors, businesses, sole proprietors, and self-employed individuals.<br></br>
              Using this SDK, you can Create, Update, Get Status, List, Transmit and Delete the 1099-MISC forms.</p>
              <div className="text-center mt-4">
                <button className="btn btn_primary mx-2" onClick={navigateToListBusiness}>Form1099MISC</button>
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