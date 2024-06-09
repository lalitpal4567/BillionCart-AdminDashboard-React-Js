import React from 'react'
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = ({ toggleSidebar }) => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid  justify-content-start">
                <a className="navbar-brand" href="#">Admin Dashboard</a>
               <GiHamburgerMenu onClick={toggleSidebar}/>
            </div>
        </nav>
    )
}

export default Navbar
