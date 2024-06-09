import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { IoInformationCircleSharp } from "react-icons/io5";
import { RiEdit2Fill } from "react-icons/ri";
import { AiFillDelete } from "react-icons/ai";
import { IoAddCircle } from "react-icons/io5";
import { Link } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import AddButton from '../../components/AddButton';


const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 2;

  localStorage.setItem("token", "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMDAiLCJpYXQiOjE3MTc3NDU5MDgsImV4cCI6MTcxODM1MDcwOH0.bS3unMO9nSdmpbIgzZ1pvetU_9WnZUTn8YxiOyFbvRn1neyWjX13eikpfHYGxpzC0Z6BApoCzIkby-LU0hAlWg");
  const token = localStorage.getItem('token');

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

  useEffect(() => {
    fetchCategories();
  }, [currentPage]);

  const handlePageChange = (page) =>{
    setCurrentPage(page);
  }
  return (
    <div className='p-2'>
      <h1 className=' text-center'>Category Management</h1>
      <div className=' p-3'>
        <AddButton btnName="Add Category" to="/category"/>
        {loading ? <Spinner /> :
          <div className='pt-3'>
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

export default Category
