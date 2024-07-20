import React, { useEffect, useState } from 'react'
import { FaCartShopping } from "react-icons/fa6";
import { FaUserLarge } from "react-icons/fa6";
import "./Navbar.css"
import { Link, useNavigate } from 'react-router-dom';
import useAuth from './UserAuthentication';
import axios from 'axios';
import useCartItems from './FetchCartItems';

const Navbar = () => {
    const { isAuthenticated, redirectToSignIn } = useAuth();
    const navigate = useNavigate();

    const handleLogoutSession = () => {
        localStorage.removeItem('token');
        navigate("/");
    }

    const handleUserRedirect = (redirectPath) => {
        if (isAuthenticated) {
            navigate(redirectPath);
        } else {
            redirectToSignIn(redirectPath);
        }
    };

    const {markedItems, fetchCartItems} = useCartItems();
    console.log("lekjr", markedItems);

    useEffect(() =>{
        fetchCartItems();
    }, [])

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
                                <li><Link to="/signin" className={`dropdown-item ${isAuthenticated ? "d-none" : ""}`} >Signin</Link></li>
                                <li className=''>
                                    <button className="dropdown-item" onClick={() => handleUserRedirect("/my-profile")}>My Profile</button>
                                </li>
                                <li><Link to="/wishlist" className="dropdown-item" >Wishlist</Link></li>
                                <li><Link to="###" className="dropdown-item" >Orders</Link></li>

                                <li><button type='button' className={`dropdown-item ${isAuthenticated ? "" : "d-none"}`} onClick={handleLogoutSession}>Logout</button></li>
                            </ul>
                        </div>
                        <button type="button" className="border-0 bg-transparent position-relative" style={{ color: "#03AED2" }} onClick={() => handleUserRedirect("/shopping-cart")}>
                            <FaCartShopping className='' style={{ fontSize: "25px" }} /><span className=' fw-bold ms-2 d-none d-lg-inline'>Cart</span>
                            {
                                markedItems.length > 0 &&
                                <span className="position-absolute start-50 translate-middle badge rounded-pill bg-danger" style={{ top: "-3px" }}>
                                    {markedItems.length}
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

{/* <Link to="/shopping-cart" className=" text-decoration-none" aria-current="page" style={{ color: "#03AED2" }}><FaCartShopping className='' style={{ fontSize: "25px" }} /><span className=' fw-bold ms-2 d-none d-lg-inline'>Cart</span></Link> */ }
