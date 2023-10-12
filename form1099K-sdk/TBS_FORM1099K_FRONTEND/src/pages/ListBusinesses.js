import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios' //Axios to make HTTP calls
import logo from '../images/tbsLogo.png' // Importing images
import Spinner from '../components/Spinner' // Importing Spinner component for loader

//List Business page
const ListBusinesses = () => {

  // Calling get business list function in Use Effect
  useEffect(() => {
    getBusinessList()
  }, [])

  const [noListFound, setNoListFound] = useState() // Initializing state for listing error response
  const [businessList, setBusinessList] = useState([]) // Initializing state for business list
  const [loading, setLoading] = useState(false) // Initializing state for loading

  //To navigate between pages using useNavigate Hook
  const navigate = useNavigate()

  // Function for navigating to Home page
  const navigateToHomePage = () => {
    navigate('/')
  }

  // To create business by requesting create business API when no records found
  const navigateToCreateBusiness = () => {
    navigate('/createBusiness')
  }

  // To list business by requesting list business API
  const getBusinessList = async () => {
    try {
      setNoListFound(false)
      setLoading(true)
      const listBusinessResponse = await axios.get(`${process.env.REACT_APP_TBS_BACKEND_URL}/Business/List`)
      if (listBusinessResponse?.data?.StatusCode === 200) {
        setNoListFound(false)
        setBusinessList(listBusinessResponse?.data?.Businesses)
      }

      setLoading(false)
    } catch (e) {
      setBusinessList([])
      setNoListFound(true)
      setLoading(false)
    }
  }

  return (
    <>
      <div className='vertical-center'>
        <div>
          <div className="header text-center">
            <img src={logo} alt="tbsLogo" />
          </div>

          {/*Checks loader state and displays spinner component*/}
          {loading &&
            <Spinner />
          }

          {/*Checks no list found state and displays create business button*/}
          {noListFound ? (
            <>
              <div className='container mx-auto mt-5'>
                <div className="text-center">
                  <p>Before you create Form1099K in your TaxBandits account, you should have atleast one Business in your account. To add a new business, click 'Create Business' button below.</p>
                  <button className='btn btn_primary btn_md' onClick={navigateToCreateBusiness}>Create Business</button>
                </div>
                <div className='text-start'>
                  <button className='btn btn_back mb-3' onClick={navigateToHomePage}>Back</button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="container">
                <div className="text-center mb-3">
                  {/*Checks business list length and displays list business*/}
                  {businessList.length > 0 && (
                    <>
                      <div className="response-table p-5">
                        <div className='d-flex align-items-center justify-content-between'>
                          <div>
                            <h1 className='head-1'>Businesses</h1>
                            <div className="heading-bottom-line position-relative pb-0  mb-3"></div>
                          </div>
                          <button className='btn btn_primary shadow btn_md float-right' onClick={navigateToCreateBusiness}>Create Business</button>
                        </div>
                        <table className="table table-striped mt-2 table-bordered">
                          <thead>
                            <tr>
                              <th>BusinessId</th>
                              <th>Business Name</th>
                              <th>Email</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {businessList.map((businessDetail, i) => {
                              return (
                                <tr key={i}>
                                  <td className='taL'>{businessDetail?.BusinessId}</td>
                                  <td className='taL' >{businessDetail?.BusinessNm}</td>
                                  <td className='taL'>{businessDetail?.Email == "" ? <span>-</span> : businessDetail?.Email}</td>
                                  <td className='text-center d-flex flex-row justify-content-center'>
                                    <Link className='btn btn-primary status-btn btn_smm me-2' to={`/createForm1099K/${businessDetail?.BusinessId}`}>Create 1099K</Link>
                                    <Link className='btn btn-primary status-btn btn_smm me-2' to={`/listForm1099K/${businessDetail?.BusinessId}`}>List 1099Ks</Link>
                                  </td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                        <div className='text-start'>
                          <button className='btn btn_back mb-3' onClick={navigateToHomePage}>Back</button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default ListBusinesses