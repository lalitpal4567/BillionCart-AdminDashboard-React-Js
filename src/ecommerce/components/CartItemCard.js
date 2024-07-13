import React, { useEffect, useState } from 'react'

import { TiArrowDownThick } from "react-icons/ti";
import { TiArrowUpThick } from "react-icons/ti";
import PriceTag from './PriceTag';
import axios from 'axios';

const CartItemCard = ({ cartItem, sectionName }) => {
    const [currentQuantity, setCurrentQuantity] = useState(cartItem.quantity);

    const token = localStorage.getItem("token");

    const changeCartItemQuantity = async (newQuantity) => {
        try {
            const res = await axios.put(`http://localhost:9090/api/v1/user/cart/cart-item-quantity/${cartItem.cartItemId}`, {}, {
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                params: {
                    quantity: newQuantity
                }
            })
        } catch (error) {
            console.log("error", error);
        }
    }

    useEffect(() => {
        if (!(currentQuantity <= 0 || isNaN(currentQuantity))) {
            changeCartItemQuantity(currentQuantity);
        }
    }, [currentQuantity])


    const handleToggleMarkCartItemForOrder = async () => {
        try {
            const res = await axios.put(`http://localhost:9090/api/v1/user/cart/toggle-cartItem-for-order/${cartItem.cartItemId}`, {}, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
        } catch (error) {
            console.log("error", error);
        }
    }

    const removeCartItemFromCart = async () => {
        try {
            const res = await axios.delete(`http://localhost:9090/api/v1/user/cart/remove-cart-item/${cartItem.cartItemId}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
        } catch (error) {
            console.log("error", error);
        }
    }

    const handleIncreaseQuantity = () => {
        const newQuantity = currentQuantity + 1;
        setCurrentQuantity(newQuantity);
    }

    const handleDecreaseQuantity = () => {
        if (currentQuantity > 1) {
            const newQuantity = currentQuantity - 1;
            setCurrentQuantity(newQuantity);
        }
    }

    const handleQuantityChange = (event) => {
        const newQuantity = parseInt(event.target.value);
        setCurrentQuantity(newQuantity);
    }

    return (
        < div className="card mb-3 py-3" style={{ maxWidth: "100%" }}>
            <div className="row g-0">
                <div className="col-md-3 d-flex justify-content-center align-items-center">
                    <div className='' style={{ width: "170px", height: "170px" }}>
                        <img src={cartItem.imageUrl} className="img-fluid rounded-start w-100 h-100 object-fit-cover" alt="..." />
                    </div>
                </div>
                <div className="col-md-8">
                    <div class="card-body">
                        <h5 className="card-title">{cartItem.name}</h5>
                        <p className="description-text fs-5">{cartItem.description}</p>
                        <PriceTag className="" currentPrice={cartItem.currentPrice} previousPrice={cartItem.previousPrice} />
                        <span className=' mt-3 d-inline-block'>
                            <button type='button' className='quantity-btn'><TiArrowDownThick className=' fs-5' style={{ color: "#FFA62F" }} onClick={() => handleDecreaseQuantity()} /></button>
                            <input
                                type='number'
                                className=' ms-2 me-2'
                                style={{ width: "50px", outline: "none", appearance: "textfield"}}
                                value={currentQuantity || ""}
                                onChange={handleQuantityChange}
                            />
                            <button type="button" className=' quantity-btn'><TiArrowUpThick className=' fs-5' style={{ color: "#03AED2" }} onClick={() => handleIncreaseQuantity()} /></button>
                        </span>
                        <div className=' d-flex justify-content-between  mt-3'>
                            <button type="button" className=' py-2 px-3 fw-bold border-0 text-white' style={{ backgroundColor: "#FFA62F" }} onClick={removeCartItemFromCart}>REMOVE FROM CART</button>
                            <button type="button" className=' py-2 px-3 fw-bold border-0 text-white' style={{ backgroundColor: "#03AED2" }} onClick={handleToggleMarkCartItemForOrder}>{sectionName}</button>
                            <button type="button" className=' py-2 px-3 fw-bold border-0 text-white' style={{ backgroundColor: "#03AED2" }}>ADD TO WISHLIST</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default CartItemCard