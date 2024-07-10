import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { IoInformationCircleSharp } from "react-icons/io5";
import { RiEdit2Fill } from "react-icons/ri";
import { AiFillDelete } from "react-icons/ai";
import { Link } from 'react-router-dom';
import AddButton from '../../components/AddButton';
import Spinner from '../../components/Spinner';



const Product = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 5;

  const token = localStorage.getItem('token');

  const fetchCategories = async () => {
    setLoading(true);
    const res = await axios.get("http://localhost:9090/api/v1/admin/noauth/category/categories-list", {
      params: {
        page: currentPage,
        size: pageSize
      }
    });
    setLoading(false);
    setCategories(res.data.content);
    setTotalPages(res.data.totalPages);
  }

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:9090/api/v1/admin/noauth/product/product-list", {
        params: {
          page: currentPage,
          size: pageSize
        }
      });
      setLoading(false);
      setProducts(res.data.content)
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.log("Error while fetching products: ", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  }
  return (
    <div className=' py-2'>
      <h1 className=' text-center'>Product Management</h1>
      <div className=' p-3'>
        <AddButton btnName="Add Product" pathlink="/add-product" />
        {loading ? <Spinner /> :
          <div className=' pt-3'>
            <table className='table table-hover caption-top'>
              <caption>List of Products</caption>
              <thead className=' table-info'>
                <tr>
                  <th scope="col">Sr. No.</th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Quantity</th>
                  <th scope='col'>Current Price</th>
                  <th scope='col'>Actions</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {
                  products.map((product, index) => {
                    return (
                      <tr key={index} className='' style={{ cursor: "pointer" }}>
                        <th>{index + 1}</th>
                        <td>{product.name}</td>
                        <td className='text-truncate ' style={{ maxWidth: '300px' }}>{product.description}</td>
                        <td className='text-truncate ' style={{ maxWidth: '300px' }}>{product.quantity}</td>
                        <td className='text-truncate ' style={{ maxWidth: '300px' }}>{product.currentPrice}</td>
                        <td>
                          <div className='d-flex justify-content-between'>
                            <Link to={`/product-info/${product.productId}`}><IoInformationCircleSharp className=' fs-4 text-info' /></Link>
                            <Link to={`/update-product/${product.productId}`}><RiEdit2Fill className='fs-4 text-success' /></Link>
                            <AiFillDelete className='fs-4 text-danger' />
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
    </div>
  )
}

export default Product
