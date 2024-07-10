import React, { useEffect, useState } from 'react'
import BackButton from '../../components/BackButton'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner';

const SubcategoryInfo = () => {
  const [loading, setLoading] = useState(false);
  const [subcategory, setSubcategory] = useState({});
  const { id } = useParams();

  const token = localStorage.getItem('token');

  const fetchSubcategoryById = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:9090/api/v1/admin/noauth/subcategory/get-subcategory/${id}`);
      setLoading(false);
      setSubcategory(res.data.Subcategory);
      console.log(res.data.Subcategory);
    } catch (error) {
      setLoading(false);
      console.log("error: ", error);
    }
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
      {loading ? <Spinner /> :
        <div className=' p-3 overflow-y-scroll' style={{ height: "400px" }}>
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
                <th scope="row">Images</th>
                <td className='d-flex justify-content-start gap-2 flex-wrap'>
                  {
                    subcategory.subcategoryImages?.map((image, index) => {
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
                <th scope="row">Specifications</th>
                <td>
                  <div className=' d-flex justify-content-start flex-wrap gap-4'>
                    <div>
                      <p>Common Specifications</p>
                      <ul className=' list-unstyled'>
                        <li className=' px-2 py-1 text-center rounded-4 fw-semibold mt-1' style={{ backgroundColor: "#BBE9FF" }}>Product Name</li>
                        <li className=' px-2 py-1 text-center rounded-4 fw-semibold mt-1' style={{ backgroundColor: "#BBE9FF" }}>Description</li>
                        <li className=' px-2 py-1 text-center rounded-4 fw-semibold mt-1' style={{ backgroundColor: "#BBE9FF" }}>Details</li>
                        <li className=' px-2 py-1 text-center rounded-4 fw-semibold mt-1' style={{ backgroundColor: "#BBE9FF" }}>Brand</li>
                        <li className=' px-2 py-1 text-center rounded-4 fw-semibold mt-1' style={{ backgroundColor: "#BBE9FF" }}>Color</li>
                        <li className=' px-2 py-1 text-center rounded-4 fw-semibold mt-1' style={{ backgroundColor: "#BBE9FF" }}>Quantity</li>
                        <li className=' px-2 py-1 text-center rounded-4 fw-semibold mt-1' style={{ backgroundColor: "#BBE9FF" }}>Current Price</li>
                        <li className=' px-2 py-1 text-center rounded-4 fw-semibold mt-1' style={{ backgroundColor: "#BBE9FF" }}>Previous Price</li>
                      </ul>
                    </div>
                    <div>
                      <p>Defined Specifications</p>
                      <ul className=' list-unstyled'>
                        {
                          subcategory.specificationName?.map((spec, index) => {
                            return (
                              <li
                                key={index}
                                className=' px-2 py-1 text-center rounded-4 fw-semibold mt-1' style={{ backgroundColor: "#BBE9FF" }}
                              >{spec.name}</li>
                            )
                          })
                        }
                      </ul>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th>Created At</th>
                <td>{subcategory.createdAt}</td>
              </tr>
              <tr>
                <th>Updated At</th>
                <td>{subcategory.updatedAt}</td>
              </tr>
              <tr>
                <th>Created By</th>
                <td>{subcategory.createdBy}</td>
              </tr>
              <tr>
                <th>Updated By</th>
                <td>{subcategory.updatedBy}</td>
              </tr>
            </tbody>
          </table>
        </div>
      }
      <section className=' p-2 d-flex justify-content-center gap-3'>
        <button className='btn btn-danger px-4'>Delete</button>
        <Link to={`/update-subcategory/${subcategory.subcategoryId}`} className='btn btn-info px-4'>Update</Link>
      </section>
    </div>
  )
}

export default SubcategoryInfo
