import React from 'react'
import { Link } from 'react-router-dom'

const ContactVerificationPage = () => {
    return (
        <div className="container">
            <div className="d-flex flex-column gap-5 justify-content-center vh-100 align-items-center p-3">
                <div>
                    <Link to="/" className="" >
                        <div className=' overflow-hidden' style={{ height: "60px", width: "200px" }}>
                            <img src='/images/billioncart_logo.png' className=' object-fit-cover w-100 h-100' />
                        </div>
                    </Link>
                </div>
                <form className='border border-3 border-light-subtle p-3 rounded-3' style={{width: "350px"}}>
                    <h4 className='mb-0 text-center rounded-top-3 mb-3 px-4' style={{ lineHeight: "60px", backgroundColor: "#BBE9FF" }}>Verify mobile number</h4>
                    <div>
                        <p className='' style={{fontSize: "14px"}}>A text with a One Time Password (OTP) has been sent to your mobile number: <span className=' fw-medium'>87987965454</span></p>
                    </div>
                    <div className=" mb-3">
                        <label htmlFor="inputName" className="form-label fw-semibold">OTP</label>
                        <input type="text" className="form-control" id="Name" />
                    </div>
                    <button className=' w-100 border-0 py-2 rounded-2 fw-medium' style={{ backgroundColor: "#BBE9FF" }}>Create Account</button>
                </form>
            </div>
        </div>
    )
}

export default ContactVerificationPage
