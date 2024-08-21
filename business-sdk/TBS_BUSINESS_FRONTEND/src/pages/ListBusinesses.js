import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios' //Axios to make HTTP calls
import { FaEdit } from 'react-icons/fa' // Importing Edit Icon from react icons
import logo from '../images/tbsLogo.png' // Importing images
import Spinner from '../components/Spinner' // Importing Spinner component for loader

//List Business page
const ListBusinesses = () => {

    // Calling get business list function in Use Effect
    useEffect(() => {
      getBusinessList()
    },[]);

    const [noListFound,setNoListFound] = useState(false) // Initializing state for listing error response
    const [businessList,setBusinessList] = useState([]) // Initializing state for business list
    const [loading,setLoading] = useState(false) // Initializing state for loading

    //To navigate between pages using useNavigate Hook
    const navigate = useNavigate()

    // Function for navigating to Home page
    const navigateToHome = () => {
        navigate('/')
    }

    // To create business by requesting create business API when no records found
    const navigateToCreate = () =>{
      navigate('/create')
    }

    // To list business by requesting list business API
    const getBusinessList = async () =>{
      try {
        setLoading(true)
        const listBusinessResponse = await axios.get(`${process.env.REACT_APP_TBS_BUSINESS_BACKEND_URL}/Business/List`)
        if (listBusinessResponse?.data?.StatusCode === 200) {
          setNoListFound(false)
          setBusinessList(listBusinessResponse?.data?.Businesses)
        }
        console.log('listBusinessResponse?.data',listBusinessResponse?.data)
        setLoading(false)
      } catch (e) {
        console.log('e',e?.response?.data)
        setBusinessList([])
        setNoListFound(true)
        setLoading(false)
      }
    }

  return (
    <>
      <div className="header text-center mb-3">
        <img src={logo} alt="tbsLogo" />
      </div>

      {/*Checks loader state and displays spinner component*/}
      {loading &&
        <div className='mt-3'>
          <Spinner />
        </div>
      }

      {/*Checks no list found state and displays create business button*/}
      {noListFound === true && (
        <div className='container mx-auto mt-5'>
          <div className="text-center">
            <p>Since there is no business found, Create a new business </p>
            <button className='btn btn_primary btn_md' onClick={navigateToCreate}>Create Business</button>
          </div>
        </div>)
      }

      <div className="container">
        <div className="text-center mb-3">
          {/*Checks business list length and displays list business*/}
          {businessList.length > 0 && (
            <div className="response-table p-5">
               <div className='d-flex align-items-center justify-content-between'>
                          <div>
                            <h1 className='head-1'>Businesses</h1>
                            <div className="heading-bottom-line position-relative pb-0  mb-3"></div>
                          </div>
                          <button className='btn btn_primary btn_md float-right' onClick={navigateToCreate}>Create Business</button>
                        </div>
              <table className="table table-striped mt-2 table-bordered">
                <thead>
                  <tr>
                    <th>BusinessId</th>
                    <th>Business Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {businessList.map((businessDetail, i) => {
                    return (
                      <tr key={i}>
                        <td className='text-start'>{businessDetail?.BusinessId}</td>
                        <td className='text-start'>{businessDetail?.BusinessNm == null ? businessDetail?.FirstNm : businessDetail?.BusinessNm }</td>
                        <td className='text-start'>{businessDetail?.Email}</td>
                        <td className='text-center'><Link className='btn btn-primary status-btn btn_smm' to={`/update/${businessDetail?.BusinessId}`}><FaEdit /></Link></td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              <div className='text-start'>
              <button className='btn_back mb-3' onClick={navigateToHome}>Back</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default ListBusinesses
