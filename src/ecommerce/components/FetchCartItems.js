import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

// const useCartItems = () => {
//     const [cartItems, setCartItems] = useState([]);
//     const markedItems = cartItems.filter(item => item.isSelectedForOrder === true);
//     const savedItems = cartItems.filter(item => item.isSelectedForOrder === false);
//     const token = localStorage.getItem('token');

//     const fetchCartItems = async () => {
//         try {
//             const res = await axios.get("http://localhost:9090/api/v1/user/cart/cartItems", {
//                 headers: {
//                     "Authorization": `Bearer ${token}`
//                 }
//             });
//             setCartItems(res.data.CartItems);
//         } catch (error) {
//             console.log("error", error);;
//         }
//     }

//     useEffect(() =>{
//      fetchCartItems();
//     }, []);

//   return {cartItems, markedItems, savedItems};
// }

// export default useCartItems;

const useCartItems = () => {
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const markedItems = cartItems.filter(item => item.isSelectedForOrder === true);
    const savedItems = cartItems.filter(item => item.isSelectedForOrder === false);
    const token = localStorage.getItem('token');

    const fetchCartItems = async () => {
        try {
            const res = await axios.get("http://localhost:9090/api/v1/user/cart/cartItems", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            setCartItems(res.data.CartItems);
        } catch (error) {
            console.log("error", error);
        }
    };

    const addProductToCart = async (productId) => {
        try {
            const res = await axios.post(`http://localhost:9090/api/v1/user/cart/add-product-to-cart/${productId}`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            fetchCartItems();
            navigate("/shopping-cart")
        } catch (error) {
            console.log("error", error);
        }
    }

    const removeCartItemFromCart = async (cartItemId) => {
        try {
            const res = await axios.delete(`http://localhost:9090/api/v1/user/cart/remove-cart-item/${cartItemId}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            fetchCartItems();
        } catch (error) {
            console.log("error", error);
        }
    }

    return { cartItems, markedItems, savedItems, addProductToCart, removeCartItemFromCart, fetchCartItems };
};

export default useCartItems;
