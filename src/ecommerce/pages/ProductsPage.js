import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'
import ProductFilter from '../components/ProductFilter'
import SidebarFilter from '../components/SidebarFilter'
import axios from 'axios'
import Pagination from '../components/Pagination'
import { useParams } from 'react-router-dom'

const ProductsPage = () => {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(10);
    const pageSize = 10;

    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);

    const [availableBrands, setAvailableBrands] = useState([]);
    const [availableColors, setAvailableColors] = useState([]);

    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const { id } = useParams();

    const fetchProducts = async (filters = {}) => {
        setLoading(true);
        try {

            const params = new URLSearchParams({
                page: currentPage,
                size: pageSize,
                ...filters
            }).toString();

            const res = await axios.get(`http://localhost:9090/api/v1/noauth/product/product-subcategory-wise/${id}?${params}`);
            setProducts(res.data.content);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log("error: ", error);
        }
    }

    useEffect(() =>{
        console.log("india: ", products);
    }, [products]);

    const fetchFilters = async () => {
        setLoading(true);
        try {
            const brandRes = await axios.get(`http://localhost:9090/api/v1/noauth/brands/${id}`);
            const colorRes = await axios.get(`http://localhost:9090/api/v1/noauth/colors/${id}`);

            setAvailableBrands(brandRes.data.Brands);
            setAvailableColors(colorRes.data.Colors);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log("error: ", error);
        }
    }

    useEffect(() => {
        fetchProducts({ brands: selectedBrands, colors: selectedColors });
        fetchFilters();
    }, []);

    const handleBrandSelect = async(brandId) => {
        const updatedBrands = selectedBrands.includes(brandId) 
            ? selectedBrands.filter(id => id !== brandId)
            : [...selectedBrands, brandId];
        
        setSelectedBrands(updatedBrands);
        await fetchProducts({ brands: updatedBrands, colors: selectedColors });
    };
    
    const handleColorSelect = async (colorId) => {
        const updatedColors = selectedColors.includes(colorId) 
            ? selectedColors.filter(id => id !== colorId)
            : [...selectedColors, colorId];
    
        setSelectedColors(updatedColors);
        await fetchProducts({ brands: selectedBrands, colors: updatedColors });
    };
    

    const handlePriceChange = (min, max) => {
        setMinPrice(min);
        setMaxPrice(max);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    return (
        <div>
            <Navbar />
            <div className="container-fluid border border-2 border-black" style={{paddingTop: "60px"}}>
                <div className="container-fluid row">
                    <div className="col border border-2 border-black">
                        <div className=' border border-2 border-danger'>
                            <SidebarFilter
                                availableBrands={availableBrands}
                                availableColors={availableColors}
                                handleBrandSelect={handleBrandSelect}
                                handleColorSelect={handleColorSelect}
                            />
                        </div>
                    </div>
                    <div className=" col-9 border border-2 border-black py-2">
                        <div className=' d-flex justify-content-start flex-wrap gap-5 px-3 py-3' style={{ backgroundColor: "#f5f5f5" }}>
                            {
                                products.map((productInfo, index) => {
                                    return (
                                        <ProductCard key={index} product={productInfo} />
                                    )
                                })
                            }

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
            <Footer />
        </div>
    )
}

export default ProductsPage




  // const res = await axios.get(`http://localhost:9090/api/v1/noauth/product/product-subcategory-wise/${id}`, {
            //     params: {
            //         page: currentPage,
            //         size: pageSize,
            //         ...filters
            //     }
            // });