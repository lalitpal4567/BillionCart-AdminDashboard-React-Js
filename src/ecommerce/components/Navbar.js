import React from 'react'
import { FaCartShopping } from "react-icons/fa6";
import { FaUserLarge } from "react-icons/fa6";

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <a className="navbar-brand " href="#">
                    <div className=' overflow-hidden' style={{height: "50px", width: "200px"}}>
                        <img src='/images/billioncart_logo.png' className=' object-fit-cover w-100 h-100'/>
                    </div>
                </a>
                <div className=' d-flex justify-content-evenly align-content-center'>
                    <ul className=" d-flex justify-content-evenly list-unstyled gap-3 align-items-center">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#"><FaUserLarge className='' style={{ fontSize: "20px" }} /></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#"><FaCartShopping className='' style={{ fontSize: "20px" }} /></a>
                        </li>
                    </ul>
                    <div className="w-100" id="navbarSupportedContent">
                        <form className="d-flex mx-auto" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
