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



const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteCategoryId, setDeleteCategoryId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5;

  // const token = sessionStorage.getItem('token');
  const jwttoken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMDEiLCJpYXQiOjE3MjEyMzU4OTMsImV4cCI6MTcyMTg0MDY5M30.fUB9e1CeSxKUYitBr8wYhHFaKgRT03xQyqVAr0hWabOnvYxei8NEj3eL3_loA9bCgkzYk2q1tY4FcVA6Ei0S_g";
  sessionStorage.setItem("token", jwttoken);
  const token = sessionStorage.getItem("token");

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

  useEffect(() => {
    fetchCategories();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  }

  const handleConfirmDelete = async () => {
    console.log("long", deleteCategoryId);
    setLoading(true);
    try {
      await axios.delete(`http://localhost:9090/api/v1/admin/category/remove-category/${deleteCategoryId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      setLoading(false);
      handleCloseModal();
      toast.success("Category deleted successfully!");
      fetchCategories();
    } catch (error) {
      console.error("Error while deleting the category:", error);
      toast.error("Error while deleting category");
      setLoading(false);
    }
  }

  const handleDeleteCategoryId = (id) => {
    setDeleteCategoryId(id);
    setShowModal(true);
  }

  const changeCategoryVisibilityStatus = async (categoryId) => {
    setLoading(true);

    try {
      const res = await axios.put(`http://localhost:9090/api/v1/admin/category/change-category-active-status/${categoryId}`, {}, {
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      });
      setLoading(false);
      fetchCategories();
    } catch (error) {
      setLoading(false);
      console.log("error", error);
    }
  }

  const handleCloseModal = () => {
    setShowModal(false);
    setDeleteCategoryId('');
  }
  return (
    <div className='p-2'>
      <h1 className=' text-center'>Category Management</h1>
      <div className=' p-3'>
        <AddButton btnName="Add Category" pathlink="/admin-dashboard/category/add-category" />
        {loading ? <Spinner /> :
          <div className='pt-3'>
            <DeleteModal
              show={showModal}
              onClose={handleCloseModal}
              onConfirm={handleConfirmDelete}
            />
            <table className='table table-hover caption-top'>
              <caption>List of Categories</caption>
              <thead className=' table-info'>
                <tr>
                  <th scope="col">Sr. No.</th>
                  <th scope="col">Category</th>
                  <th scope="col">Description</th>
                  <th scope="col">Status</th>
                  <th scope='col'>Actions</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {
                  categories.map((category, index) => {
                    return (
                      <tr key={index} className='' style={{ cursor: "pointer" }}>
                        <th>{index + 1}</th>
                        <td>{category.name}</td>
                        <td className='text-truncate ' style={{ maxWidth: '300px' }}>{category.description}</td>
                        <td className='text-truncate ' style={{ maxWidth: '300px' }}>
                          <button className="btn"
                            style={category.active ? { backgroundColor: "#FFA62F" } : { backgroundColor: "#ADC4CE" }} onClick={() => changeCategoryVisibilityStatus(category.categoryId)}>
                            {category.active ? "Enabled" : "Disabled"}
                          </button>
                        </td>
                        <td>
                          <div className='d-flex justify-content-between'>
                            <Link to={`/admin-dashboard/category/category-info/${category.categoryId}`}><IoInformationCircleSharp className=' fs-4 text-info' /></Link>
                            <Link to={`/admin-dashboard/category/update-category/${category.categoryId}`}><RiEdit2Fill className='fs-4 text-success' /></Link>
                            <AiFillDelete onClick={() => handleDeleteCategoryId(category.categoryId)} className='fs-4 text-danger' />
                          </div>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>

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

export default Category
