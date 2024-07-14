import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminDashboard from './inventoryManagement/pages/dashboard/AdminDashboard'
import HomePage from './ecommerce/pages/HomePage'
import ProductsPage from './ecommerce/pages/ProductsPage'
import SignupPage from './ecommerce/pages/SignupPage'
import ContactVerificationPage from './ecommerce/pages/ContactVerificationPage'
import ProductInformation from './ecommerce/pages/ProductInformation'
import ShoppingCartPage from './ecommerce/pages/ShoppingCartPage'
import CheckoutPage from './ecommerce/pages/CheckoutPage'
import WishlistPage from './ecommerce/pages/WishlistPage'
import Navbar from './ecommerce/components/Navbar'
import MyProfilePage from './ecommerce/pages/MyProfilePage'

const AppNavigation = () => {
  return (
    <Routes>
        <Route path='/*' element={<AdminDashboard/>}></Route>
        {/* <Route path='/' element={<HomePage/>}></Route> */}
        {/* <Route path='/' element={<Navbar/>}></Route> */}
        {/* <Route path='/' element={<SignupPage/>}></Route> */}
        {/* <Route path='/' element={<ContactVerificationPage/>}></Route> */}
        <Route path='/products/:id' element={<ProductsPage/>}></Route>
        <Route path='/product/:id' element={<ProductInformation/>}></Route>
        <Route path='/shopping-cart' element={<ShoppingCartPage/>}></Route>
        <Route path='/checkout' element={<CheckoutPage/>}></Route>
        <Route path='/wishlist' element={<WishlistPage/>}></Route>
        <Route path='/my-profile' element={<MyProfilePage/>}></Route>
    </Routes>
  )
}

export default AppNavigation
