import React from 'react'
import { FaCartShopping } from "react-icons/fa6";
import { FaUserLarge } from "react-icons/fa6";
import "./Navbar.css"
import { Link } from 'react-router-dom';

const Navbar = ({ totalItems }) => {
    return (
        <nav className=" bg-body-tertiary py-2 fixed-element" style={{ width: "100%" }}>
            <div className="container-fluid">
                <div className=' navbar-container'>
                    <Link to="/" className=" flex-item">
                        <div className=' overflow-hidden' style={{ height: "50px", width: "200px" }}>
                            <img src='/images/billioncart_logo.png' className=' object-fit-cover w-100 h-100' />
                        </div>
                    </Link>
                    <div className=" d-flex justify-content-evenly list-unstyled gap-3 align-items-center flex-fill m-0">
                        <div className="dropdown">
                            <Link to="" className=" dropdown-toggle text-decoration-none" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ color: "#03AED2" }}>
                                <FaUserLarge className='' style={{ fontSize: "25px", }} /><span className=' fw-bold ms-2 d-none d-lg-inline'>My Account</span>
                            </Link>

                            <ul class="dropdown-menu mt-2">
                                <li className=''><Link to="/my-profile" className="dropdown-item" >My Profile</Link></li>
                                <li><Link to="/wishlist" className="dropdown-item" >Wishlist</Link></li>
                                <li><Link to="###" className="dropdown-item" >Orders</Link></li>
                                <li><Link to="####" className="dropdown-item" >Logout</Link></li>
                            </ul>
                        </div>
                        <button type="button" className="border-0 bg-transparent position-relative">
                            <Link to="/shopping-cart" className="nav-link active " aria-current="page" style={{ color: "#03AED2" }}><FaCartShopping className='' style={{ fontSize: "25px" }} /><span className=' fw-bold ms-2 d-none d-lg-inline'>Cart</span></Link>
                            {
                                totalItems > 0 &&
                                <span className="position-absolute start-50 translate-middle badge rounded-pill bg-danger" style={{ top: "-3px" }}>
                                    {totalItems}
                                </span>
                            }
                        </button>
                    </div>
                    <div className=" flex-item" id="navbarSupportedContent">
                        <form className="d-flex" role="search">
                            <input className="me-2" type="search" placeholder="Search" aria-label="Search" style={{ width: "100%" }} />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar