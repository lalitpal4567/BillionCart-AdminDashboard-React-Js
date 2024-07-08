import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminDashboard from './inventoryManagement/pages/dashboard/AdminDashboard'
import HomePage from './ecommerce/pages/HomePage'
import ProductsPage from './ecommerce/pages/ProductsPage'
import SignupPage from './ecommerce/pages/SignupPage'
import ContactVerificationPage from './ecommerce/pages/ContactVerificationPage'
import CartPage from './ecommerce/pages/CartPage'

const AppNavigation = () => {
  return (
    <Routes>
        {/* <Route path='/*' element={<AdminDashboard/>}></Route> */}
        <Route path='/' element={<HomePage/>}></Route>
        {/* <Route path='/' element={<CartPage/>}></Route> */}
        {/* <Route path='/' element={<HomePage/>}></Route> */}
        {/* <Route path='/' element={<SignupPage/>}></Route> */}
        {/* <Route path='/' element={<ContactVerificationPage/>}></Route> */}
        {/* <Route path='/products/:id' element={<ProductsPage/>}></Route> */}
    </Routes>
  )
}

export default AppNavigation
