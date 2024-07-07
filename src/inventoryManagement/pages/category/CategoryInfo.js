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
      const res = await axios.get(`http://localhost:9090/api/v1/admin/category/get-category/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      })
      setLoading(false);
      setCategory(res.data.Category);
    } catch (error) {
      setLoading(false);
      console.log("error: ", error);
    }
  }

  const handleCopyImageUrl = () => {
    if (category.imageUrl) {
      navigator.clipboard.writeText(category.imageUrl);
      setisUrlCopied(true);
      setTimeout(() => {
        setisUrlCopied(false);
      }, 2000);
    }
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
                  <th scope="row">Image</th>
                  <td className=' d-flex justify-content-start gap-4'>
                    <div className=' overflow-hidden ' style={{ width: "200px", height: "100px" }}>
                      <img src={category.imageUrl} className=' w-100 h-100 object-fit-fill' />
                    </div>
                    <div className=' d-flex flex-column justify-content-between'>
                      {
                        isUrlCopied &&
                        <div className=' bg-info rounded-3 px-2 py-1 align-bottom'>
                          <p className=' fw-medium m-0' style={{ fontSize: "12px" }}>Url copied</p>
                        </div>
                      }
                      <div className=' mt-auto'>
                        <FaCopy className=' fs-4' onClick={handleCopyImageUrl} />
                        <span className=' fw-medium ms-2' style={{ fontSize: "12px"}}>Copy Url</span>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
      }
      <section className=' p-2 d-flex justify-content-center gap-3'>
        <button className='btn btn-danger px-4'>Delete</button>
        <Link to={`/update-category/${category.categoryId}`} className='btn btn-info px-4'>Update</Link>
      </section>
    </div>
  )
}

export default CategoryInfo
