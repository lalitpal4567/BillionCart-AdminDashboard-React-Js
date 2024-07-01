import React from 'react'
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from 'react-router-dom';

const BackButton = ({to, className}) => {
  return (
    <div className={className}>
      <Link to={to}><IoMdArrowRoundBack className='fs-1 bg-info rounded-5 p-1'/></Link>
    </div>
  )
}

export default BackButton
