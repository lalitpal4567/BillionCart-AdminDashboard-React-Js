import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import { IoInformationCircleSharp } from "react-icons/io5";
import { RiEdit2Fill } from "react-icons/ri";
import { AiFillDelete } from "react-icons/ai";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddButton from '../../components/AddButton';
import Spinner from '../../components/Spinner';
import DeleteModal from '../../components/DeleteModal';



const Color = () => {
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [colors, setColors] = useState([]);
    const [deleteColorId, setDeleteColorId] = useState(null);

    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 5;

    const token = localStorage.getItem('token');

    const fetchColors = async () => {
        setLoading(true);
        try {
            const res = await axios.get("http://localhost:9090/api/v1/noauth/color/colors-list", {
                params: {
                    page: currentPage,
                    size: pageSize
                }
            });
            setLoading(false);
            setColors(res.data.content);
            setTotalPages(res.data.totalPages);
        } catch (error) {
            console.log("Error while fetching colors: ", error);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchColors();
    }, [currentPage]);

    useEffect(() => {
        console.log("colors", colors);
    }, [colors]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    return (
        <div className='p-2'>
            <h1 className=' text-center'>Color Management</h1>
            <div className=' p-3'>
                <AddButton btnName="Add Color" pathlink="/add-color" />
                {loading ? <Spinner /> :
                    <div className='pt-3'>
                        <form>
                            <table className='table table-hover caption-top'>
                                <caption>List of colors</caption>
                                <thead className=' table-info'>
                                    <tr>
                                        <th scope="col">Sr. No.</th>
                                        <th scope="col">Color</th>
                                        <th scope='col'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                    {
                                        colors.map((productColor, index) => {
                                            return (
                                                <tr key={index} className='' style={{ cursor: "pointer" }}>
                                                    <th>{index + 1}</th>
                                                    <td>{productColor.name}</td>
                                                    <td>
                                                        <div className='d-flex justify-content-between'>
                                                            <Link to={`/color-info/${productColor.id}`}><IoInformationCircleSharp className=' fs-4 text-info' /></Link>
                                                            <Link to={`/update-color/${productColor.id}`}><RiEdit2Fill className='fs-4 text-success' /></Link>
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

export default Color
