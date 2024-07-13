import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { IoInformationCircleSharp } from "react-icons/io5";
import { RiEdit2Fill } from "react-icons/ri";
import { AiFillDelete } from "react-icons/ai";

import Spinner from '../../components/Spinner';
import AddButton from '../../components/AddButton';
import DeleteModal from '../../components/DeleteModal';

const Subcategory = () => {
    const [loading, setLoading] = useState(false);
    const [subcategories, setSubcategories] = useState([]);
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState();
    const [searchQuery, setSearchQuery] = useState("");

    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [deleteSubcategoryId, setDeleteSubcategoryId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const pageSize = 5;

    const token = localStorage.getItem('token');

    const fetchSubcategories = async () => {
        setLoading(true);
        try {
            const res = await axios.get("http://localhost:9090/api/v1/noauth/subcategory/subcategories-list", {
                params: {
                    page: currentPage,
                    size: pageSize
                }
            });
            setLoading(false);
            setSubcategories(res.data.content);
            setTotalPages(res.data.totalPages);
        } catch (error) {
            console.log("Error while fetching subcategories: ", error);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchSubcategories();
        fetchCategories();
    }, [currentPage]);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const res = await axios.get("http://localhost:9090/api/v1/noauth/category/categories-list", {
                params: {
                    page: currentPage,
                    size: pageSize
                }
            });
            setLoading(false);
            setCategories(res.data.content);
            setTotalPages(res.data.totalPages);
        } catch (error) {
            console.log("Error while fetching categories: ", error);
            setLoading(false);
        }
    }

    const fetchSubcategoriesByCategory = async () => {
        if (!categoryId) return;
        setLoading(true);
        try {
            const res = await axios.get(`http://localhost:9090/api/v1/noauth/subcategory/subcategories-categories/${categoryId}`, {
                params: {
                    page: 0,
                    size: pageSize
                }
            });
            setLoading(false);
            setSubcategories(res.data.content);
            setTotalPages(res.data.totalPages);
        } catch (error) {
            console.log("Error while fetching subcategories by category: ", error);
            setLoading(false);
        }
    }

    useEffect(() => {
        if (categoryId) {
            fetchSubcategoriesByCategory();
        } else {
            fetchSubcategories();
        }
    }, [categoryId])

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    const handleCategoryChange = (id) => {
        setCategoryId(id);
        setSearchQuery("");
        setCurrentPage(0);
    }
    const handleConfirmDelete = async () => {
        setLoading(true);
        try {
            await axios.delete(`http://localhost:9090/api/v1/admin/subcategory/remove-subcategory/${deleteSubcategoryId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            setLoading(false);
            handleCloseModal();
            toast.success("Subcategory deleted successfully!");
            fetchSubcategories();
        } catch (error) {
            console.error("Error while deleting the subcategory:", error);
            toast.error("Error while deleting subcategory");
            setLoading(false);
        }
    }

    const handleDeleteSubcategoryId = (id) => {
        setDeleteSubcategoryId(id);
        setShowModal(true);
    }
    const handleCloseModal = () => {
        setShowModal(false);
        setDeleteSubcategoryId('');
    }

    const fetchSubcategoriesBySearchQuery = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.get("http://localhost:9090/api/v1/admin/subcategory/subcategories-query", {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                params: {
                    page: 0,
                    size: pageSize,
                    query: searchQuery
                }
            })
            setLoading(false);
            setSubcategories(res.data.content);
        } catch (error) {
            console.log("Error while fetching subcategories by query: ", error);
            setLoading(false);
        }
    }

    const handleSearchQueryChange = (e) => {
        setSearchQuery(e.target.value);
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            fetchSubcategoriesBySearchQuery(e);
        }
    };
    return (
        <div className='p-2'>
            <h1 className=' text-center'>Subcategory Management</h1>
            <div className=' p-3'>
                <div className='d-flex justify-content-center align-items-center gap-2'>
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Category Wise
                        </button>
                        <ul className='dropdown-menu'>
                            <li key="245A" style={{ cursor: "pointer" }}>
                                <a className="dropdown-item" onClick={() => handleCategoryChange(null)}>All</a>
                            </li>
                            {
                                categories.map((category, index) => {
                                    return (
                                        <li key={index}>
                                            <a
                                                className="dropdown-item"
                                                onClick={() => handleCategoryChange(category.categoryId)}
                                                style={{ cursor: "pointer" }}>{category.name}
                                            </a>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <AddButton btnName="Add Subcategory" pathlink="/add-subcategory" />
                    <form onSubmit={fetchSubcategoriesBySearchQuery}>
                        <div className='d-flex justify-content-evenly gap-xl-2 mb-3 align-items-center'>
                            <input
                                type='text'
                                placeholder='search...'
                                value={searchQuery || ""}
                                onKeyDown={handleKeyDown}
                                onChange={handleSearchQueryChange}
                            />
                            <button
                                type='submit'
                                className=" rounded rounded-2"
                            >Search
                            </button>
                        </div>
                    </form>
                </div>
                {loading ? <Spinner /> :
                    <div className='pt-3'>
                        <DeleteModal
                            show={showModal}
                            onClose={handleCloseModal}
                            onConfirm={handleConfirmDelete}
                        />
                        <form>
                            <table className='table table-hover caption-top'>
                                <caption>List of Subcategories</caption>
                                <thead className=' table-info'>
                                    <tr>
                                        <th scope="col">Sr. No.</th>
                                        <th scope="col">Subcategory</th>
                                        <th scope="col">Description</th>
                                        <th scope='col'>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                    {
                                        subcategories.map((subcategory, index) => {
                                            return (
                                                <tr key={subcategory.subcategoryId} className='' style={{ cursor: "pointer" }}>
                                                    <th>{index + 1}</th>
                                                    <td>{subcategory.name}</td>
                                                    <td className='text-truncate ' style={{ maxWidth: '300px' }}>{subcategory.description}</td>
                                                    <td>
                                                        <div className='d-flex justify-content-between'>
                                                            <Link to={`/subcategory-info/${subcategory.subcategoryId}`}><IoInformationCircleSharp className=' fs-4 text-info' /></Link>
                                                            <Link to={`/update-subcategory/${subcategory.subcategoryId}`}><RiEdit2Fill className='fs-4 text-success' /></Link>
                                                            <AiFillDelete onClick={() => handleDeleteSubcategoryId(subcategory.subcategoryId)} className='fs-4 text-danger' />
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

export default Subcategory
