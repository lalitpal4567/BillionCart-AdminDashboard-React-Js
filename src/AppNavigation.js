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
import MyProfilePage from './ecommerce/pages/MyProfilePage'
import SigninPage from './ecommerce/pages/SigninPage'
import UserAddressPage from './ecommerce/pages/UserAddressPage'

const AppNavigation = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />}></Route>
      <Route path='/admin-dashboard/*' element={<AdminDashboard />}></Route>
      <Route path='/signin' element={<SigninPage />}></Route>
      <Route path='/signup' element={<SignupPage />}></Route>
      <Route path='/verification' element={<ContactVerificationPage />}></Route>
      <Route path='/products/:id' element={<ProductsPage />}></Route>
      <Route path='/product/:id' element={<ProductInformation />}></Route>
      <Route path='/shopping-cart' element={<ShoppingCartPage />}></Route>
      <Route path='/checkout' element={<CheckoutPage />}></Route>
      <Route path='/wishlist' element={<WishlistPage />}></Route>
      <Route path='/my-profile/*' element={<MyProfilePage />}></Route>
      
    </Routes>
  )
}

export default AppNavigation
