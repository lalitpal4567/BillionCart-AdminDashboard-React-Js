import React, { useEffect, useState } from 'react'
import PriceTag from './PriceTag'
import axios from 'axios'

const WishlistCard = ({ wishlistItem, onItemRemoved }) => {
    const token = localStorage.getItem("token");

    const removeWishlistItemFromWishlist = async () => {
        try {
            const res = await axios.delete(`http://localhost:9090/api/v1/user/wishlist/remove-wishlist-item/${wishlistItem.wishlistItemId}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            onItemRemoved();
        } catch (error) {
            console.log("error", error);
        }
    }

    const moveWishlistItemToCart = async(productId) =>{
        try {
            const res = await axios.post(`http://localhost:9090/api/v1/user/cart/add-product-to-cart/${wishlistItem.productId}`,{}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                  }
            });
            removeWishlistItemFromWishlist();
        } catch (error) {
            console.log("error", error);
        }
    }
    

    return (
        <div className="card" style={{ width: "18rem" }}>
            <div className=' m-auto mt-2' style={{ width: "170px", height: "170px" }}>
                <img
                    src={wishlistItem.imageUrl}
                    className=" w-100 h-100 object-fit-cover"
                    alt="..." />
            </div>
            <div className="card-body">
                <p className="card-text">{wishlistItem.description}</p>
                <PriceTag className=" fs-6" currentPrice={wishlistItem.currentPrice} previousPrice={wishlistItem.previousPrice} />
                <div className=' d-flex justify-content-evenly gap-1 mt-2   '>
                    <button type='button' className='border-0 py-1 flex-grow-1 fw-bold text-white' style={{ backgroundColor: "#FFA62F" }} onClick={removeWishlistItemFromWishlist}>REMOVE</button>
                    <button type='button' className='border-0 py-1 flex-grow-1 fw-bold text-white' style={{ backgroundColor: "#03AED2" }} onClick={moveWishlistItemToCart}>MOVE TO CART</button>
                </div>
            </div>
        </div>
    )
}

export default WishlistCard
