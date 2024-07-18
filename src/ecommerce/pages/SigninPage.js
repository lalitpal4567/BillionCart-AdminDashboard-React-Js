import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import "./SigninPage.css"

const SigninPage = () => {
    const [mobile, setMobile] = useState();
    const [password, setPassword] = useState();
    const [selectedRole, setSelectedRole] = useState("USER");
    const [isCredentialsTrue, setIsCredentialsTrue] = useState(true);

    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:9090/api/v1/auth/signin', {
                username: mobile,
                password: password
            });

            const { token, roles } = res.data.Token;
            selectedRole === "ADMIN" ? sessionStorage.setItem("token", token) : localStorage.setItem("token", token);

            if (roles.some(role => role.role === selectedRole) && (selectedRole === "ADMIN")) {
                navigate("/admin-dashboard");
            }
            else if(roles.some(role => role.role === selectedRole) && (selectedRole === "USER")){
                const from = location.state?.from || '/';
                navigate(from);
            }else {
                setIsCredentialsTrue(false);
            }
            
        } catch (error) {
            console.error('There was an error!', error);
            setIsCredentialsTrue(false);
        }
    };


    const handleChangeRole = async (role) => {
        setSelectedRole(role);
    }

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-center vh-100 align-items-center">
                <div className='' style={{ minWidth: "150px", maxWidth: "400px", width: "100%" }}>
                    <div className=' mb-3 d-flex justify-content-center'>
                        <Link to="/" className=" d-inline-block overflow-hidden mx-auto" style={{ height: "60px", width: "200px" }}>
                            <img src='/images/billioncart_logo.png' className=' object-fit-cover w-100 h-100 mx-auto' />
                        </Link>
                    </div>
                    <div className=' border border-3 border-info p-2 rounded-3' style={{ width: "100%" }}>
                        <h3 className='mb-0 text-center rounded-top-3 mb-3 fw-bolder text-white' style={{ lineHeight: "60px", backgroundColor: "#03AED2" }}>Signin Page</h3>
                        <div className=' d-flex'>
                            <button type="button" className={`border-0 py-2 flex-grow-1 ${selectedRole === "USER" ? "highlight" : ""}`} onClick={() => handleChangeRole("USER")}>USER</button>
                            <button type="button" className={`border-0 py-2 flex-grow-1 ${selectedRole === "ADMIN" ? "highlight" : ""}`} onClick={() => handleChangeRole("ADMIN")}>ADMIN</button>
                        </div>
                        <form onSubmit={handleSubmit} className=' mt-3'>
                            <div>
                                <div className=" mb-3">
                                    <label htmlFor="inputMobile" className="form-label fw-semibold">Mobile no.</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputMobile"
                                        value={mobile}
                                        onChange={(e) => setMobile(e.target.value)}

                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="inputPassword" className="form-label fw-semibold">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="inputPassword"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                            {
                                !isCredentialsTrue &&
                                <p className=' text-danger' style={{ fontSize: "12px" }}>Invalid username or password</p>
                            }
                            <button
                                type="submit"
                                className=' w-100 border-0 py-2 fw-bold text-white submit-btn'
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SigninPage
