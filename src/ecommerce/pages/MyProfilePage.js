import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link, Route, Routes } from 'react-router-dom'
import UserAddressPage from './UserAddressPage'
import ProfileInformation from './ProfileInformation'
import AddNewAddress from './AddNewAddress'
import UpdateExistingAddress from './UpdateExistingAddress'

const MyProfilePage = () => {
  return (
    <>
      <Navbar />
      <div className='container-fluid border border-2 border-danger' style={{ paddingTop: "60px" }}>
        <div className="row py-4 vh-100">
          <div className="col">
            <div className="list-group w-75 mx-auto text-center fw-medium">
              <Link to="./" className="list-group-item list-group-item-action py-3">My profile</Link>
              <Link to="./user-address" className="list-group-item list-group-item-action py-3">Address</Link>
              <Link to="./user-address" className="list-group-item list-group-item-action py-3">Change Mobile no</Link>
              <Link to="######" className="list-group-item list-group-item-action py-3">Delete Account</Link>
            </div>
          </div>
          <div className="col-8">
            <Routes>
              <Route path="/" element={<ProfileInformation/>}/>
              <Route path="/add-new-address" element={<AddNewAddress/>}/>
              <Route path="/user-address/*" element={<UserAddressPage/>}/>
              <Route path="/user-address/update-user-address/:id" element={<UpdateExistingAddress/>}/>
            </Routes>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default MyProfilePage
