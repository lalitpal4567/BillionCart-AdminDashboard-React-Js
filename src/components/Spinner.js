import React from 'react'
import "./Spinner.css"

const Spinner = () => {
  return (
    <div className=' d-flex justify-content-center align-items-center w-100' style={{height: "350px"}}>
      <span className="loader"></span>
    </div>
  )
}

export default Spinner
