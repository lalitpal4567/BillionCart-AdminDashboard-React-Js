import React, {useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'
import WishlistCard from '../components/WishlistCard'
import axios from 'axios'

const WishlistPage = () => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(10);
    const pageSize = 10;

    const token = localStorage.getItem("token");

    const fetchWishlistItems = async () => {
        try {
            const res = await axios.get("http://localhost:9090/api/v1/user/wishlist/wishlist-items", {
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                params: {
                    page: currentPage,
                    size: pageSize
                }
            })
            setWishlistItems(res.data.content);
        } catch (error) {
            console.log("error", error);
        }
    }

    useState(() => {
        fetchWishlistItems();
    }, [currentPage, wishlistItems]);

    const handleItemRemoved = () => {
        setCurrentPage(0);
        fetchWishlistItems();
    }

    const handleLoadMore = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    }

    return (
        <>
            <Navbar />
            <div className=' container-fluid' style={{ paddingTop: "60px" }}>
                <div className='row'>
                    <div className='col-9 border border-2 border-danger py-3'>
                        <h3>Wishlist</h3>
                        <div className=' d-flex justify-content-start flex-wrap gap-3'>
                            {
                                wishlistItems.map((item, index) => {
                                    return (
                                        <WishlistCard key={index} wishlistItem={item} onItemRemoved={handleItemRemoved}/>
                                    )
                                })
                            }
                        </div>
                        {currentPage < totalPages - 1 && (
                            <button onClick={handleLoadMore} className="btn btn-primary mt-3">
                                Load More
                            </button>
                        )}
                    </div>
                    <div className='col border border-2 border-success '>
                        <div className=' sticky-element'>
                            <h4>Amount Details</h4>
                            <div className=' d-flex justify-content-between fw-bolder fs-5'>
                                <p>Total Amount</p>
                                <p>8599</p>
                            </div>
                            <Link to="/checkout" type="button" className=" text-decoration-none py-3 fw-bold text-white w-100 text-center" style={{ backgroundColor: "#FFA62F" }}>PLACE ORDER</Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default WishlistPage
