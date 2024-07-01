import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminDashboard from './inventoryManagement/pages/dashboard/AdminDashboard'

const AppNavigation = () => {
  return (
    <Routes>
        <Route path='/*' element={<AdminDashboard/>}></Route>
    </Routes>
  )
}

export default AppNavigation
