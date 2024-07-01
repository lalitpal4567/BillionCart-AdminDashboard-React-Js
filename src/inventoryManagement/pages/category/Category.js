import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link} from 'react-router-dom';

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

  localStorage.setItem("token", "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMDEiLCJpYXQiOjE3MTk0NzQzMjUsImV4cCI6MTcyMDA3OTEyNX0.szliND3riTih-OvuWuiDYbg8L9v7uvK_iz-kwVKkkRHjrvoMTef7xOlMkaILAfWbICOlWlgnKpXr88FZMDXI2A");
  const token = localStorage.getItem('token');

  const fetchCategories = async () => {
    setLoading(true);
   try {
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
    setLoading(true);
    try {
      await axios.delete(`http://localhost:9090/api/v1/admin/category/remove-category/${deleteCategoryId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
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
  const handleCloseModal = () => {
    setShowModal(false);
    setDeleteCategoryId('');
  }
  return (
    <div className='p-2'>
      <h1 className=' text-center'>Category Management</h1>
      <div className=' p-3'>
        <AddButton btnName="Add Category" pathlink="/add-category" />
        {loading ? <Spinner /> :
          <div className='pt-3'>
            <DeleteModal
              show={showModal}
              onClose={handleCloseModal}
              onConfirm={handleConfirmDelete}
            />
            <form>
              <table className='table table-hover caption-top'>
                <caption>List of Categories</caption>
                <thead className=' table-info'>
                  <tr>
                    <th scope="col">Sr. No.</th>
                    <th scope="col">Category</th>
                    <th scope="col">Description</th>
                    <th scope='col'>Actions</th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {
                    categories.map((category, index) => {
                      return (
                        <tr key={category.categoryId} className='' style={{ cursor: "pointer" }}>
                          <th>{index + 1}</th>
                          <td>{category.name}</td>
                          <td className='text-truncate ' style={{ maxWidth: '300px' }}>{category.description}</td>
                          <td>
                            <div className='d-flex justify-content-between'>
                              <Link to={`/category-info/${category.categoryId}`}><IoInformationCircleSharp className=' fs-4 text-info' /></Link>
                              <Link to={`/update-category/${category.categoryId}`}><RiEdit2Fill className='fs-4 text-success' /></Link>
                              <AiFillDelete onClick={() => handleDeleteCategoryId(category.categoryId)} className='fs-4 text-danger' />
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

export default Category
