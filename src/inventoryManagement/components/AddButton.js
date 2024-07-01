import React from 'react'
import { Link } from 'react-router-dom'
import { IoAddCircle } from "react-icons/io5";


const AddButton = ({btnName, pathlink }) => {
    return (
        <div className='d-flex justify-content-center align-items-center p-2 gap-3  d-inline-block mx-auto rounded-5' style={{ backgroundColor: "#CAF4FF" }}>
            <p className=' fs-3 m-0'>{btnName}</p>
            <Link to={pathlink}>
                <IoAddCircle className='fs-1' />
            </Link>
        </div>
    )
}

export default AddButton
