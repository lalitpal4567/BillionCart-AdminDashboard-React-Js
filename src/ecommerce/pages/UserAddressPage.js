import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { MdAddCircle } from "react-icons/md";
import { Link } from 'react-router-dom';
import "./UserAddressPage.css"
import DeleteModal from '../../inventoryManagement/components/DeleteModal';

const UserAddressPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deleteAddressId, setDeleteAddressId] = useState(null);


  const token = localStorage.getItem("token");

  const fetchUserAddresses = async () => {
    try {
      const res = await axios.get("http://localhost:9090/api/v1/user/address/address-list", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      const fetchedAddresses = res.data.Address;
      console.log("china", fetchedAddresses);
      bringDefaultAddressFront(fetchedAddresses);
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    fetchUserAddresses();
  }, []);


  const bringDefaultAddressFront = (fetchedAddresses) =>{
    const areNotDefaultAddress = fetchedAddresses.filter(address => address.isDefaultAddress !== true);
    const isDefaultAddress = fetchedAddresses.filter(address => address.isDefaultAddress === true);

    setAddresses([...isDefaultAddress, ...areNotDefaultAddress]);
  }

  const handleRemoveAddress = async () => {
    try {
      const res = await axios.delete(`http://localhost:9090/api/v1/user/address/remove-address/${deleteAddressId}`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      handleCloseModal();
      fetchUserAddresses();
    } catch (error) {
      console.log("error", error);
    }
  }

  const handleChangeDefaultAddress = async (id) => {
    try {
      const res = await axios.put(`http://localhost:9090/api/v1/user/address/change-default-address/${id}`, {}, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      fetchUserAddresses();
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    console.log("hey", addresses);
  }, [addresses])

  const handleDeleteAddressId = (id) => {
    setDeleteAddressId(id);
    setShowModal(true);
  }

  const handleCloseModal = () => {
    setShowModal(false);
    setDeleteAddressId(null);
  }

  return (
    <>
      <h1 className=' mb-0 py-2 text-white fw-bold fs-4 text-center' style={{ backgroundColor: "#ADC4CE" }}>Address</h1>
      <div className=' d-flex gap-3 pt-3'>
        <DeleteModal
          show={showModal}
          onClose={handleCloseModal}
          onConfirm={handleRemoveAddress}
        />
        <Link to="../add-new-address" className=' d-flex justify-content-center align-items-center border border-2 border-light-subtle rounded-3 ' style={{ width: "200px" }}>
          <MdAddCircle className=' text-info' style={{ fontSize: "100px" }} />
        </Link>

        {
          addresses?.map((address, index) => {
            return (
              <div key={index} className=' fw-medium border border-2 border-light-subtle rounded-3 px-2 py-3' style={{ width: "200px" }}>
                <p>{address.fullName || ""}</p>
                <p className='location-details'>
                  {address.locationDetails ? address.locationDetails + ", " : ""}
                  {address.pincode ? address.pincode + " " : ""}
                </p>
                <p className=' mb-0'>{address.city || ""}</p>
                <p className=' mb-0'>{address.state || ""}</p>
                <p className=''>{address.mobileNo || ""}</p>

                <div className=' d-flex justify-content-evenly gap-2 text-center'>
                  <button className='border-0 p-0 bg-info  fw-bold flex-grow-1 text-white' style={{ fontSize: "11px", backgroundColor: "" }} onClick={() => handleDeleteAddressId(address.addressId)}>REMOVE</button>
                  <Link to={`./update-user-address/${address.addressId}`} className=' flex-grow-1  bg-info fw-bold text-white text-decoration-none' style={{fontSize: "11px"}}>
                    EDIT
                  </Link>
                </div>
                <button className={`border-0 p-0 fw-bold text-white w-100 ${address.isDefaultAddress ? "d-none" : ""}`} style={{ fontSize: "11px" , backgroundColor: "#FFA62F"}} onClick={() => handleChangeDefaultAddress(address.addressId)}>SET AS DEFAULT</button>
              </div>
            )
          })
        }
      </div>
    </>
  )
}

export default UserAddressPage
