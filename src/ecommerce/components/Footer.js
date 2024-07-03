import React from 'react'

const Footer = () => {
    return (
        <footer>
            <div className='pt-4' style={{ backgroundColor: "#526D82" }}>
                <div className=' d-flex justify-content-evenly text-white-50 px-4 pb-4'>
                    <div className=' p-3'>
                        <p>About</p>
                        <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
                            <li className='nav-item'>
                                <a className="nav-link active" href="#">About us</a>
                            </li>
                            <li className='nav-item'>
                                <a className="nav-link active" href="##">Contact us</a>
                            </li>
                        </ul>
                    </div>
                    <div className=' p-3'>
                        <p>Help</p>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className='nav-item'>
                                <a className="nav-link active" href="###">Your Account</a>
                            </li>
                            <li className='nav-item'>
                                <a className="nav-link active" href="####">FAQ</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='text-white d-flex justify-content-center align-items-center' style={{height: "50px", backgroundColor: "#27374D"}}>
                    <p className=' m-0'>© 2023-2024, BillionCart.com</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
