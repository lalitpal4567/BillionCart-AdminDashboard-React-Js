import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import { FaCopy } from "react-icons/fa6";

const CategoryInfo = () => {
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState({});
  const [isUrlCopied, setisUrlCopied] = useState(false);
  const { id } = useParams();

  const token = localStorage.getItem('token');

  const fetchCategoryById = async () => {
    setLoading(true);

    try {
      const res = await axios.get(`http://localhost:9090/api/v1/noauth/category/get-category/${id}`);
      setLoading(false);
      setCategory(res.data.Category);
    } catch (error) {
      setLoading(false);
      console.log("error: ", error);
    }
  }

  useEffect(() => {
    fetchCategoryById();
  }, [])

  return (
    <div className='p-2'>
      <div className='d-flex justify-content-center'>
        <BackButton to="/admin-dashboard/category" />
        <h1 className='mx-auto'>Category Information</h1>
      </div>
      {
        loading ? <Spinner /> :
          <div className=' p-3'>
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
                  <th scope="row">Images</th>
                  <td className='d-flex justify-content-start gap-2 flex-wrap'>
                    {
                      category?.images?.map((image, index) => {
                        return (
                          <div key={index} className=' overflow-hidden ' style={{ width: "150px", height: "70px" }}>
                            <img
                              src={image.imageUrl}
                              alt={image.altText}
                              className=' w-100 h-100 object-fit-cover' />
                          </div>
                        )
                      })
                    }
                  </td>
                </tr>
                <tr>
                  <th>Created At</th>
                  <td>{category?.createdAt}</td>
                </tr>
                <tr>
                  <th>Updated At</th>
                  <td>{category?.updatedAt}</td>
                </tr>
                <tr>
                  <th>Created By</th>
                  <td>{category?.createdBy}</td>
                </tr>
                <tr>
                  <th>Updated By</th>
                  <td>{category?.updatedBy}</td>
                </tr>
              </tbody>
            </table>
          </div>
      }
      <section className=' p-2 d-flex justify-content-center gap-3'>
        <button className='btn btn-danger px-4'>Delete</button>
        <Link to={`/admin-dashboard/category/update-category/${category.categoryId}`} className='btn btn-info px-4'>Update</Link>
      </section>
    </div>
  )
}

export default CategoryInfo
