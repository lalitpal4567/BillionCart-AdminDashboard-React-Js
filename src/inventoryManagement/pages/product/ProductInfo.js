import React, { useEffect, useState } from 'react'
import BackButton from '../../components/BackButton'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import DeleteModal from '../../components/DeleteModal';

const ProductInfo = () => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState('');
  const [showModal, setShowModal] = useState(false);

  const { id } = useParams();

  const token = localStorage.getItem('token');

  const fetchProductById = async () => {
    setLoading(true);
    const res = await axios.get(`http://localhost:9090/api/v1/admin/noauth/product/fetch-product/${id}`);
    setLoading(false);
    setProduct(res.data.Product);
  }

  useEffect(() => {
    fetchProductById();
  }, [])

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:9090/api/v1/admin/product/delete-image/${selectedImageId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
      handleCloseModal();
    } catch (error) {
      console.error("Error deleting the image:", error);
    }
  }
  const handleImageId = (id) => {
    setSelectedImageId(id);
    setShowModal(true);
  }

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedImageId('');
  }
  return (
    <div className=' p-2'>
      <div className='d-flex justify-content-center'>
        <BackButton to="/product" />
        <h1 className='mx-auto'>Product Information</h1>
      </div>
      {
        loading ? <Spinner /> :
          <div className=' p-3 overflow-y-scroll' style={{ height: "450px" }}>
            <DeleteModal
              show={showModal}
              onClose={handleCloseModal}
              onConfirm={handleConfirmDelete}
            />
            <table className='table table-hover' style={{ cursor: "pointer" }}>
              <tbody>
                <tr>
                  <th scope="row">Product Id</th>
                  <td colSpan="2">{product.productId}</td>
                </tr>
                <tr>
                  <th scope="row">Subcategory name</th>
                  <td colSpan="2">{product.subcategory?.name}</td>
                </tr>
                <tr>
                  <th scope="row">Product name</th>
                  <td colSpan="2">{product.name}</td>
                </tr>
                <tr>
                  <th scope="row">Description</th>
                  <td colSpan="2">{product.description}</td>
                </tr>
                <tr>
                  <th scope="row">Details</th>
                  <td colSpan="2">{product.details}</td>
                </tr>
                { product.model ?
                  <tr>
                    <th scope="row">Model</th>
                    <td colSpan="2">{product.model}</td>
                  </tr> : ""
                }
                {
                  product.specifications?.map((spec, index) => {
                    return (
                      spec.value !== "" &&
                      <tr key={index}>
                        <th scope="row">{spec.name}</th>
                        <td>{spec.value}</td>
                      </tr>
                    )
                  })
                }
                <tr>
                  <th scope="row">Quantity</th>
                  <td colSpan="2">{product.quantity}</td>
                </tr>
                <tr>
                  <th scope="row">Current Price</th>
                  <td colSpan="2">{product.currentPrice}</td>
                </tr>
                <tr>
                  <th scope="row">Previous Price</th>
                  <td colSpan="2">{product.previousPrice}</td>
                </tr>
                <tr>
                  <th scope="row">Image Url</th>
                  <td className='d-flex justify-content-start gap-2'>
                    {
                      product.productImages?.map((image, index) => {
                        return (
                          <div key={index}>
                            <div className=' overflow-hidden ' style={{ width: "100px", height: "50px" }}>
                              <img
                                src={image.imageUrl}
                                alt={image.altText}
                                className=' w-100 h-100 object-fit-fill' />
                            </div>
                            <div>
                              <button type="button" className='btn btn-primary' onClick={() => handleImageId(image.imageUrlId)} >Remove</button>
                            </div>
                          </div>
                        )
                      })
                    }
                  </td>
                </tr>
              </tbody>
            </table>
            <section className=' p-2 d-flex justify-content-center gap-3'>
              <button className='btn btn-danger px-4'>Delete</button>
              <Link to={`/update-product/${product.productId}`} className='btn btn-info px-4'>Update</Link>
            </section>
          </div>
      }
    </div>
  )
}

export default ProductInfo;
