import React from 'react'

const Spinner = () => {
  return (
    <div className='position-relative text-center'>
        <div className="position-fixed w-100 h-100 d-flex align-items-center justify-content-center z-index-9999">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    </div>
  )
}

export default Spinner