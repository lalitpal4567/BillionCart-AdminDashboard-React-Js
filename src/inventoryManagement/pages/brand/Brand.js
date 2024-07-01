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





const Brand = () => {
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [brands, setBrands] = useState([]);
    const [deleteBrandId, setDeleteBrandId] = useState(null);

    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 5;

    const token = localStorage.getItem('token');

    const fetchBrands = async () => {
        setLoading(true);
        try {
            const res = await axios.get("http://localhost:9090/api/v1/admin/brand/brands-list", {
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
            setBrands(res.data.content);
            setTotalPages(res.data.totalPages);
        } catch (error) {
            console.log("Error while fetching brands: ", error);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchBrands();
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    const handleConfirmDelete = async () => {
        setLoading(true);
        try {
            await axios.delete(`http://localhost:9090/api/v1/admin/brand/remove-brand/${deleteBrandId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            setLoading(false);
            handleCloseModal();
            toast.success("Brand deleted successfully!");
            fetchBrands();
        } catch (error) {
            console.error("Error while deleting the brand:", error);
            toast.error("Error while deleting brand");
            setLoading(false);
        }
    }

    const handleDeleteBrandId = (id) => {
        setDeleteBrandId(id);
        setShowModal(true);
    }
    const handleCloseModal = () => {
        setShowModal(false);
        setDeleteBrandId('');
    }
    return (
        <div className='p-2'>
            <h1 className=' text-center'>Brand Management</h1>
            <div className=' p-3'>
                <AddButton btnName="Add Brand" pathlink="/add-brand" />
                {loading ? <Spinner /> :
                    <div className='pt-3'>
                        <DeleteModal
                            show={showModal}
                            onClose={handleCloseModal}
                            onConfirm={handleConfirmDelete}
                        />
                        <form>
                            <table className='table table-hover caption-top'>
                                <caption>List of Brand</caption>
                                <thead className=' table-info'>
                                    <tr>
                                        <th scope="col">Sr. No.</th>
                                        <th scope="col">Brand</th>
                                        <th scope='col'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                    {
                                        brands.map((productBrand, index) => {
                                            return (
                                                <tr key={index} className='' style={{ cursor: "pointer" }}>
                                                    <th>{index + 1}</th>
                                                    <td>{productBrand.brand}</td>
                                                    <td>
                                                        <div className='d-flex justify-content-between'>
                                                            <Link to={`/brand-info/${productBrand.brandId}`}><IoInformationCircleSharp className=' fs-4 text-info' /></Link>
                                                            <Link to={`/update-brand/${productBrand.brandId}`}><RiEdit2Fill className='fs-4 text-success' /></Link>
                                                            <AiFillDelete onClick={() => handleDeleteBrandId(productBrand.brandId)} className='fs-4 text-danger' />
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

export default Brand
