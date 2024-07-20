import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import "./ProductInformation.css"
import PriceTag from '../components/PriceTag'
import { FaStar } from "react-icons/fa";
import ImageViewer from '../components/ImageViewer';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import useCartItems from '../components/FetchCartItems';

const ProductInformation = () => {
    const [product, setProduct] = useState(null);

    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const fetchProduct = async () => {
        try {
            const res = await axios.get(`http://localhost:9090/api/v1/noauth/product/fetch-product/${id}`);
            setProduct(res.data.Product);
        } catch (error) {
            console.log("error", error);
        }
    }

    const { addProductToCart } = useCartItems();

    const handleAddProductToCart = (id) => {
        addProductToCart(id);
    };
    // const addProductToCart = async(productId) =>{
    //     console.log("product cart");
    //     try {
    //         const res = await axios.post(`http://localhost:9090/api/v1/user/cart/add-product-to-cart/${productId}`,{}, {
    //             headers: {
    //                 'Authorization': `Bearer ${token}`,
    //                 'Content-Type': 'application/json',
    //               }
    //         });
    //         setTimeout(() =>{
    //             navigate("/shopping-cart")
    //         }, 2000);
    //     } catch (error) {
    //         console.log("error", error);
    //     }
    // }

    useEffect(() => {
        fetchProduct();
    }, []);

    return (
        <>
            <Navbar />
            <div className='container-fluid pt-5'>
                <div className='row '>
                    <div className="col-5 border border-2 border-success ">
                        <div className={` py-2 sticky-element`}>
                            <ImageViewer
                                images={product?.productImages}
                            />
                            <div className="row">
                                <div className=' d-flex justify-content-evenly py-2 mt-4'>
                                    <button type='button' className='px-5 py-2 border-0  fw-bolder text-white add-to-cart-btn' onClick={() => handleAddProductToCart(product?.productId)}>ADD TO CART</button>
                                    <button type='button' className=' px-xl-5 py-2  border-0  fw-bolder text-white buy-now-btn'>BUY NOW</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col border border-2 border-danger pt-4">
                        <p className=' fs-5'>{product?.description}</p>
                        <div className=' position-relative'>
                            <FaStar className='fs-1' style={{ color: "#FFA62F" }} />
                            <span className=' fw-semibold star-rating-position'>4.3</span>
                        </div>
                        {/* <PriceTag className=" fs-2" currentPrice={product?.currentPrice} previousPrice={product?.previousPrice} /> */}
                        <PriceTag className=" fs-2" currentPrice={1000} previousPrice={5000} />
                        <div className=' mt-3 w-50'>
                            <table className=' table table-borderless'>
                                <caption className=' caption-top'>Specifications</caption>
                                <tbody>
                                    <tr>
                                        <th scope='col'>Brand</th>
                                        <td>{product?.brand.name}</td>
                                    </tr>
                                    <tr>
                                        <th scope='col'>Model</th>
                                        <td>{product?.model}</td>
                                    </tr>
                                    <tr>
                                        <th scope='col'>Color</th>
                                        <td>{product?.color.name}</td>
                                    </tr>
                                    {

                                        product?.specifications.map((specification, index) => {
                                            return (
                                                <tr key={index}>
                                                    <th scope='col'>{specification.name}</th>
                                                    <td>{specification.value}</td>
                                                </tr>
                                            )
                                        })

                                    }
                                </tbody>
                            </table>
                        </div>
                        <div>
                            <p>{product?.details}</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default ProductInformation
