import React from 'react'
import { MdAddCircle } from "react-icons/md";
import { Link } from 'react-router-dom';

const UserAddressPage = () => {
  return (
    <div className=' d-flex gap-3'>
        <Link to="../add-new-address" className=' d-flex justify-content-center align-items-center border border-2 border-light-subtle rounded-3 ' style={{width: "200px", height: "220px"}}>
           <MdAddCircle className=' text-info' style={{fontSize: "100px"}}/>
        </Link>
            <div className='border border-2 border-light-subtle rounded-3 px-2 py-3' style={{width: "200px", height: "220px"}}>
                <p>Lalit</p>
                <p>Khora Village, Ghaziabad, Uttar Pradesh</p>
                <p>India</p>
                <p>8789878218</p>
            </div>
        </div>
  )
}

export default UserAddressPage
