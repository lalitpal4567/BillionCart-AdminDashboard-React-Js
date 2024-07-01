import React, { useEffect, useState } from 'react'
import BackButton from '../../components/BackButton'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const SubcategoryInfo = () => {
  const [subcategory, setSubcategory] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const token = localStorage.getItem('token');

  const fetchSubcategoryById = async () => {
    setLoading(true);
    const res = await axios.get(`http://localhost:9090/api/v1/admin/subcategory/get-subcategory/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    setLoading(false);
    setSubcategory(res.data.Subcategory);
    console.log(res.data.Subcategory);
  }

  useEffect(() => {
    fetchSubcategoryById();
  }, [])

  return (
    <div className=' p-2'>
      <div className='d-flex justify-content-center'>
        <BackButton to="/subcategory" />
        <h1 className='mx-auto'>Subcategory Information</h1>
      </div>
      <div className=' p-3'>
        <table className='table table-hover' style={{ cursor: "pointer" }}>
          <tbody>
            <tr>
              <th scope="row">SubcategoryId</th>
              <td colSpan="2">{subcategory.subcategoryId}</td>
            </tr>
            <tr>
              <th scope="row">Subcategory name</th>
              <td colSpan="2">{subcategory.name}</td>
            </tr>
            <tr>
              <th scope="row">Category name</th>
              <td colSpan="2">{subcategory.category?.name}</td>
            </tr>
            <tr>
              <th scope="row">Description</th>
              <td colSpan="2">{subcategory.description}</td>
            </tr>

            <tr>
              <th scope="row">Image Url</th>
              <td className='d-flex justify-content-start gap-2'>
                {
                  subcategory.subcategoryImages?.map((imageUrl, index) => {
                    return (
                      <div className=' overflow-hidden ' style={{ width: "100px", height: "50px" }}>
                        <img 
                          src="/images/fashion3.jpg"
                          alt={imageUrl.altText} 
                          className=' w-100 h-100 object-fit-fill' />
                      </div>
                    )
                  })
                }
              </td>
            </tr>
            <tr>
              <th scope="row">Specifications</th>
              <td>
                <div>
                  <p>Common Specifications</p>
                  <ul className='d-flex justify-content-start gap-5 list-unstyled'>
                    <li>Product Name</li>
                    <li>Description</li>
                    <li>Details</li>
                    <li>Quantity</li>
                    <li>Current Price</li>
                    <li>Previous Price</li>
                  </ul>
                </div>
                <div>
                  <ul className='d-flex justify-content-start gap-5 list-unstyled'>
                    {
                      subcategory.specificationNames?.map((spec, index) => {
                        return (
                          <li key={index + 1}>{spec.name}</li>
                        )
                      })
                    }
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <section className=' p-2 d-flex justify-content-center gap-3'>
        <button className='btn btn-danger px-4'>Delete</button>
        <Link to={`/update-subcategory/${subcategory.subcategoryId}`} className='btn btn-info px-4'>Update</Link>
      </section>
    </div>
  )
}

export default SubcategoryInfo
