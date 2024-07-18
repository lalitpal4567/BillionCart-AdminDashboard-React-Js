import React, { useEffect, useState } from 'react'
import BackButton from '../../components/BackButton'
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import DeleteModal from '../../components/DeleteModal';

const UserInfo = () => {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const [selectedImageId, setSelectedImageId] = useState('');
    const [showModal, setShowModal] = useState(false);

    const { id } = useParams();
    // const token = localStorage.getItem('token');
    const token = sessionStorage.getItem('token');

    const fetchUserById = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`http://localhost:9090/api/v1/admin/get-account/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            setLoading(false);
            setUser(res.data.Account);
            console.log(res.data.Account);
        } catch (error) {
            setLoading(false);
            console.log("Error while fetching user: ", error)
        }
    }

    useEffect(() => {
        fetchUserById();
    }, [])

    const handleImageId = (id) => {
        setSelectedImageId(id);
        setShowModal(true);
    }

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedImageId('');
    }
    return (
        <div className=' p-2'>
            <div className='d-flex justify-content-center'>
                <BackButton to="/admin-dashboard/user" />
                <h1 className='mx-auto'>User Information</h1>
            </div>
            {
                loading ? <Spinner /> :
                    <div className=' p-3 overflow-y-scroll' style={{ height: "450px" }}>
                        <table className='table table-hover' style={{ cursor: "pointer" }}>
                            <tbody>
                                <tr>
                                    <th scope="row">Account Id</th>
                                    <td colSpan="2">{user.accountId}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Username</th>
                                    <td colSpan="2">{user.username}</td>
                                </tr>
                                <tr>
                                    <th scope="row">First name</th>
                                    <td colSpan="2">{user.firstName}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Last name</th>
                                    <td colSpan="2">{user.lastName}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Email</th>
                                    <td colSpan="2">{user.email}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Dob</th>
                                    <td colSpan="2">{user.dob}</td>
                                </tr>
                                <tr>
                                    <th scope="row">ProfilePictureUrl</th>
                                    <td colSpan="2">{user.profilePictureUrl}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Roles</th>
                                    {
                                        user?.roles?.map((role, index) => {
                                            return <td key={index}>{role.role}</td>
                                        })
                                    }
                                </tr>
                                <tr>
                                    <th scope="row">IsUserNonEnabled</th>
                                    <td colSpan="2">{user.userNonEnabled ? "true" : "false"}</td>
                                </tr>
                                <tr>
                                    <th scope="row">IsCredentialNonExpired</th>
                                    <td colSpan="2">{user.credentialNonExpired ? "true" : "false"}</td>
                                </tr>
                                <tr>
                                    <th scope="row">IsAccountNonLocked</th>
                                    <td colSpan="2">{user.accountNonLocked ? "true" : "false"}</td>
                                </tr>
                                <tr>
                                    <th scope="row">IsAccountNonExpired</th>
                                    <td colSpan="2">{user.accountNonExpired ? "true" : "false"}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Cart Id</th>
                                    <td colSpan="2">{user.cartId}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Wishlist Id</th>
                                    <td colSpan="2">{user.wishlistId}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Updated At</th>
                                    <td colSpan="2">{user.updatedAt}</td>
                                </tr>
                                <tr>
                                    <th scope="row">Created At</th>
                                    <td colSpan="2">{user.createdAt}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
            }
        </div>
    )
}

export default UserInfo
