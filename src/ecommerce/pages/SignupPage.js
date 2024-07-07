import React from 'react'
import { Link } from 'react-router-dom'

const SignupPage = () => {
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
                <form className='border border-3 border-light-subtle p-3 rounded-3'>
                    <h3 className='mb-0 text-center rounded-top-3 mb-3' style={{ lineHeight: "60px", backgroundColor: "#BBE9FF" }}>Signup Form</h3>
                    <div className=" mb-3">
                        <label htmlFor="inputName" className="form-label fw-semibold">Your name</label>
                        <input type="text" className="form-control" id="Name" />
                    </div>
                    <div className=" mb-3">
                        <label htmlFor="inputMobile" className="form-label fw-semibold">Mobile no.</label>
                        <input type="text" className="form-control" id="inputMobile" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputPassword" className="form-label fw-semibold">Password</label>
                        <input type="password" className="form-control" id="inputPassword" />
                    </div>
                    <button className=' w-100 border-0 py-2 rounded-2 fw-medium' style={{backgroundColor: "#BBE9FF"}}>Verify contact number</button>
                </form>
            </div>
        </div>
    )
}

export default SignupPage
