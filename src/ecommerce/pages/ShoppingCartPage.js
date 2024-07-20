import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import './ShoppingCartPage.css'


import { Link} from 'react-router-dom';
import CartItemCard from '../components/CartItemCard';
import Footer from '../components/Footer';
import useCartItems from '../components/FetchCartItems';

const ShoppingCartPage = () => {
    const {cartItems,markedItems, savedItems, fetchCartItems} = useCartItems();

    const calculateTotalAmount = () =>{
        const amount = markedItems.reduce((total, item) => total + item.price, 0);
        return amount;
    }

 
    return (
        <>
            <Navbar />
            <div className=' container-fluid' style={{ paddingTop: "60px"}}>
                <div className='row' style={{paddingBottom: "400px"}}>
                    <div className='col-9 py-3' >
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
                    <div className='col  '>
                        <div className=' sticky-element'>
                            <h4>Amount Details</h4>
                            <div className=' d-flex justify-content-between fw-bolder fs-5'>
                                <p>Total Amount</p>
                                <p>{calculateTotalAmount()}</p>
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
