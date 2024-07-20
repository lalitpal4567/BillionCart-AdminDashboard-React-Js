import React from 'react'
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = ({ toggleSidebar }) => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid  justify-content-start">
                <a className="navbar-brand" href="#">Admin Dashboard</a>
                <GiHamburgerMenu onClick={toggleSidebar} />
                <div className=' overflow-hidden m-auto' style={{ width: "190px", height: "50px" }}>
                    <img src="/images/billioncart_logo.png"
                        className=' w-100 h-100 object-fit-cover'
                    />
                </div>
            </div>
        </nav>
    )
}

export default Navbar
