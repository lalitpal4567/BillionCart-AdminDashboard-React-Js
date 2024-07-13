import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import './ShoppingCartPage.css'
import PriceTag from '../components/PriceTag'


import { Link} from 'react-router-dom';
import axios from 'axios';
import CartItemCard from '../components/CartItemCard';
import Footer from '../components/Footer';

const ShoppingCartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const markedItems = cartItems.filter(item => item.isSelectedForOrder === true);
    const savedItems = cartItems.filter(item => item.isSelectedForOrder === false);

    const token = localStorage.getItem("token");

    const fetchCartItems = async () => {
        try {
            const res = await axios.get("http://localhost:9090/api/v1/user/cart/cartItems", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            setCartItems(res.data.CartItems);
        } catch (error) {
            console.log("error", error);;
        }
    }

    useEffect(() => {
        fetchCartItems();
    }, []);

    useEffect(() =>{
        fetchCartItems();
    }, [cartItems, markedItems, savedItems]);

    return (
        <>
            <Navbar />
            <div className=' container-fluid' style={{ paddingTop: "60px" }}>
                <div className='row'>
                    <div className='col-9 border border-2 border-danger py-3'>
                        {
                            markedItems.length > 0 &&
                            <div>
                                <h2>Shopping Cart</h2>
                                {
                                    markedItems.map((item, index) => {
                                        return (
                                            <CartItemCard key={index} cartItem={item} sectionName="SAVE FOR LATER" />
                                        )
                                    })
                                }
                            </div>
                        }
                        {
                            savedItems.length > 0 &&
                            <div>
                                <h2>Saved For Later</h2>
                                {
                                    savedItems.map((item, index) => {
                                        return (
                                            <CartItemCard key={index} cartItem={item} sectionName="MOVE TO CART" />
                                        )
                                    })
                                }
                            </div>
                        }
                    </div>
                    <div className='col border border-2 border-success '>
                        <div className=' sticky-element'>
                            <h4>Amount Details</h4>
                            <div className=' d-flex justify-content-between fw-bolder fs-5'>
                                <p>Total Amount</p>
                                <p>8599</p>
                            </div>
                            <Link to="/checkout" type="button" className=" text-decoration-none py-3 fw-bold text-white w-100 text-center" style={{ backgroundColor: "#FFA62F" }}>PLACE ORDER</Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default ShoppingCartPage
