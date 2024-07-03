import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'
import ProductFilter from '../components/ProductFilter'
import SidebarFilter from '../components/SidebarFilter'
import axios from 'axios'
import Pagination from '../components/Pagination'

const ProductsPage = () => {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(10);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await axios.get("http://localhost:9090/api/v1/user/");
            setProducts(res.data.content);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log("error: ", error);
        }
    }

    useEffect(() => {
        fetchProducts();
    }, []);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        // Perform actions based on page change, e.g., fetching new data
    };
    return (
        <div>
            <Navbar />
            <div className="container-fluid border border-2 border-black">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col border border-2 border-black">
                            <SidebarFilter />
                        </div>
                        <div className=" col-9 border border-2 border-black p-4">
                            <div className=' d-flex justify-content-start flex-wrap gap-5'>
                                <ProductCard />
                                <ProductCard />
                                <ProductCard />
                                <ProductCard />
                                <ProductCard />
                                <ProductCard />
                                <ProductCard />
                            </div>
                            <div className=' pt-4'>
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={handlePageChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ProductsPage
