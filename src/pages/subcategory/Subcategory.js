import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { IoInformationCircleSharp } from "react-icons/io5";
import { RiEdit2Fill } from "react-icons/ri";
import { AiFillDelete } from "react-icons/ai";
import { IoAddCircle } from "react-icons/io5";
import { Link } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import AddButton from '../../components/AddButton';

const Subcategory = () => {
    const [subcategories, setSubcategories] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subcategoriesByCategory, setSubcategoriesByCategory] = useState([]);
    const [categoryId, setCategoryId] = useState();
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 10;

    const token = localStorage.getItem('token');

    const fetchSubcategories = async () => {
        setLoading(true);
        const res = await axios.get("http://localhost:9090/api/v1/admin/subcategory/subcategories-list", {
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
        setSubcategories(res.data.content);
        setTotalPages(res.data.totalPages);
    }

    useEffect(() => {
        fetchSubcategories();
        fetchCategories();
    }, [currentPage]);

    const fetchCategories = async () => {
        setLoading(true);
        const res = await axios.get("http://localhost:9090/api/v1/admin/category/categories-list", {
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
        setCategories(res.data.content);
        setTotalPages(res.data.totalPages);
    }

    const fetchSubcategoriesByCategory = async () => {
        if (!categoryId) return;
        setLoading(true);
        const res = await axios.get(`http://localhost:9090/api/v1/admin/subcategory/subcategories-categories/${categoryId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            params: {
                page: 0,
                size: pageSize
            }
        });
        setLoading(false);
        setSubcategories(res.data.content);
        setTotalPages(res.data.totalPages);
    }

    useEffect(() => {
        fetchSubcategoriesByCategory();
    }, [categoryId])

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    const handleCategoryChange = (id) => {
        setCategoryId(id);
        setCurrentPage(0);

    }
    return (
        <div className='p-2'>
            <h1 className=' text-center'>Subcategory Management</h1>
            <div className=' p-3'>
                <div className='d-flex justify-content-center align-items-center p-2 gap-2'>
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Category Wise
                        </button>
                        <ul className='dropdown-menu'>
                            {
                                categories.map((category, index) => {
                                    return (
                                        <li key={index}>
                                            <a className="dropdown-item" onClick={() => handleCategoryChange(category.categoryId)}>{category.name}</a>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                    <AddButton btnName="Add Subcategory" pathlink="/subcategory" />
                </div>
                {loading ? <Spinner /> :
                    <div>
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
                                                            <AiFillDelete className='fs-4 text-danger' />
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
                                <li className={`page-item ${currentPage === 0 ? 'active' : ''}`} aria-current="page">
                                    <span className="page-link" onClick={() => handlePageChange(currentPage - 1)}>1</span>
                                </li>
                                <li className={`page-item ${currentPage !== 0 ? '' : 'active'}`}><a className="page-link" href="#" onClick={() => handlePageChange(currentPage + 1)}>2</a></li>
                            </ul>
                        </nav>
                    </div>
                }
            </div>
        </div>
    )
}

export default Subcategory
