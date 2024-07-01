import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import BackButton from '../../components/BackButton';

const CategoryInfo = () => {
  const [category, setCategory] = useState({});
  const { id } = useParams();

  const token = localStorage.getItem('token');

  const fetchCategoryById = async () => {
    const res = await axios.get(`http://localhost:9090/api/v1/admin/category/get-category/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
    setCategory(res.data.Category);
  }

  useEffect(() => {
    fetchCategoryById();
  }, [])

  return (
    <div className='p-2'>
      <div className='d-flex justify-content-center'>
        <BackButton to="/category" />
        <h1 className='mx-auto'>Category Information</h1>
      </div>
      <div className=' p-3' style={{ backgroundColor: "grey" }}>
        <table className='table table-hover' style={{ cursor: "pointer" }}>
          <tbody>
            <tr>
              <th scope="row">CategoryId</th>
              <td colSpan="2">{category.categoryId}</td>
            </tr>
            <tr>
              <th scope="row">Category name</th>
              <td colSpan="2">{category.name}</td>
            </tr>
            <tr>
              <th scope="row">Description</th>
              <td colSpan="2">{category.description}</td>
            </tr>
            <tr>
              <th scope="row">Image Url</th>
              <td>{category.imageUrl}</td>
              <td>
                <div className=' overflow-hidden ' style={{ width: "200px", height: "100px" }}>
                  <img src="/images/fashion3.jpg" className=' w-100 h-100 object-fit-fill' />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <section className=' p-2 d-flex justify-content-center gap-3'>
        <button className='btn btn-danger px-4'>Delete</button>
        <Link to={`/update-category/${category.categoryId}`} className='btn btn-info px-4'>Update</Link>
      </section>
    </div>
  )
}

export default CategoryInfo
