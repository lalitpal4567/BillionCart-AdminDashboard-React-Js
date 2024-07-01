import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import { IoInformationCircleSharp } from "react-icons/io5";
import { RiEdit2Fill } from "react-icons/ri";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Spinner from '../../components/Spinner';
import AddButton from '../../components/AddButton';


const User = () => {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);

    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 5;

    const token = localStorage.getItem('token');

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await axios.get("http://localhost:9090/api/v1/admin/users-list", {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                params: {
                    page: currentPage,
                    size: pageSize
                }
            });
            setLoading(false);
            // console.log("hi: ", res.data.content);
            setUsers(res.data.content);
            setTotalPages(res.data.totalPages);
        } catch (error) {
            setLoading(false);
            console.log("Error while fetching users: ", error);
            toast.error("Error while fetching users");
        }
    }   

    useEffect(() => {
        fetchUsers();
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    return (
        <div className='p-2'>
            <h1 className=' text-center'>User Management</h1>
            <div className=' p-3'>
                <AddButton btnName="Add Category" pathlink="/add-category" />
                {loading ? <Spinner /> :
                    <div className='pt-3'>
                        <form>
                            <table className='table table-hover caption-top'>
                                <caption>List of Users</caption>
                                <thead className=' table-info'>
                                    <tr>
                                        <th scope="col">Sr. No.</th>
                                        <th scope="col">Account Id</th>
                                        <th scope="col">Username</th>
                                        <th scope="col">Full Name</th>
                                        <th scope='col'>Email</th>
                                        <th scope='col'>IsUserNonEnabled</th>
                                        <th scope='col'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                    {
                                        users.map((user, index) => {
                                            return (
                                                <tr key={index} className='' style={{ cursor: "pointer" }}>
                                                    {/* {console.log(user)} */}
                                                    <th>{index + 1}</th>
                                                    <td>{user.accountId}</td>
                                                    <td>{user.username}</td>
                                                    <td className='' >{user.firstName + " " + user.lastName}</td>
                                                    <td className='' >{user.email}</td>
                                                    <td className='' >{user.userNonEnabled ? "Enabled" : "Disabled"}</td>
                                                    <td>
                                                        <div className='d-flex justify-content-between'>
                                                            <Link to={`/user-info/${user.accountId}`}><IoInformationCircleSharp className=' fs-4 text-info' /></Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </form>

                        {/* pagination */}
                        <nav aria-label="Page navigation">
                            <ul className="pagination pagination-sm">
                                <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
                                    <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>&laquo;</button>
                                </li>
                                {[...Array(totalPages)].map((_, index) => (
                                    <li key={index} className={`page-item ${index === currentPage ? 'active' : ''}`}>
                                        <button className="page-link" onClick={() => handlePageChange(index)}>{index + 1}</button>
                                    </li>
                                ))}
                                <li className={`page-item ${currentPage === totalPages - 1 ? 'disabled' : ''}`}>
                                    <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>&raquo;</button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                }
            </div>
            <ToastContainer />
        </div>
    )
}

export default User
