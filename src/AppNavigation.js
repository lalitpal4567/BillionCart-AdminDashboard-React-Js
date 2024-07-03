import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminDashboard from './inventoryManagement/pages/dashboard/AdminDashboard'
import HomePage from './ecommerce/pages/HomePage'
import ProductsPage from './ecommerce/pages/ProductsPage'

const AppNavigation = () => {
  return (
    <Routes>
        {/* <Route path='/*' element={<AdminDashboard/>}></Route> */}
        <Route path='/' element={<HomePage/>}></Route>
        <Route path='/products/:id' element={<ProductsPage/>}></Route>
    </Routes>
  )
}

export default AppNavigation
