import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar';
import { Route, Routes } from 'react-router-dom';

import "./AdminDashboard.css"
import User from '../user/User';
import UserInfo from '../user/UserInfo';
import Brand from '../brand/Brand';
import AddBrand from '../brand/AddBrand';
import BrandInfo from '../brand/BrandInfo';
import UpdateBrand from '../brand/UpdateBrand';
import Color from '../color/Color';
import AddColor from '../color/AddColor';
import ColorInfo from '../color/ColorInfo';
import Product from '../product/Product';
import UpdateColor from '../color/UpdateColor';
import AddProduct from '../product/AddProduct';
import ProductInfo from '../product/ProductInfo';
import UpdateProduct from '../product/UpdateProduct';
import Category from '../category/Category';
import AddCategory from '../category/AddCategory';
import CategoryInfo from '../category/CategoryInfo';
import UpdateCategory from '../category/UpdateCategory';
import Subcategory from '../subcategory/Subcategory';
import AddSubcategory from '../subcategory/AddSubcategory';
import SubcategoryInfo from '../subcategory/SubcategoryInfo';
import UpdateSubcategory from '../subcategory/UpdateSubcategory';
import SpecificationInfo from '../specifications/SpecificationInfo';
import AddSpecification from '../specifications/AddSpecification';
import UpdateSpecification from '../specifications/UpdateSpecification';
import ErrorPage from '../ErrorPage';


const AdminDashboard = () => {
    const [isSidebarVisible, setIsSidebarVisible] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    }
    return (
        <div>
            <Navbar toggleSidebar={toggleSidebar} />
            <div className=' d-flex' style={{ height: "537px" }}>
                <div className=' border border-2 border-danger h-100'>
                    <Sidebar />
                </div>
                <div className='border border-2 border-info flex-grow-1 h-100'>
                    <Routes>

                        <Route path='/user' element={<User />} />
                        <Route path='/user-info/:id' element={<UserInfo />} />

                        <Route path='/brand' element={<Brand />} />
                        <Route path='/add-brand' element={<AddBrand />} />
                        <Route path='/brand-info/:id' element={<BrandInfo />} />
                        <Route path='/update-brand/:id' element={<UpdateBrand />} />

                        <Route path='/color' element={<Color />} />
                        <Route path='/add-color' element={<AddColor />} />
                        <Route path='/color-info/:id' element={<ColorInfo />} />
                        <Route path='/update-color/:id' element={<UpdateColor />} />

                        <Route path='/product' element={<Product />} />
                        <Route path='/add-product' element={<AddProduct />} />
                        <Route path='/product-info/:id' element={<ProductInfo />} />
                        <Route path='/update-product/:id' element={<UpdateProduct />} />

                        <Route path='/category' element={<Category />} />
                        <Route path="/add-category" element={<AddCategory />} />
                        <Route path="/category-info/:id" element={<CategoryInfo />} />
                        <Route path="/update-category/:id" element={<UpdateCategory />} />

                        <Route path="/subcategory" element={<Subcategory />} />
                        <Route path="/add-subcategory" element={<AddSubcategory />} />
                        <Route path='/subcategory-info/:id' element={<SubcategoryInfo />} />
                        <Route path='/update-subcategory/:id' element={<UpdateSubcategory />} />

                        <Route path="/specification-info" element={<SpecificationInfo />} />
                        <Route path="/add-specification" element={<AddSpecification />} />
                        <Route path='/update-specification/:id' element={<UpdateSpecification />} />

                        <Route path='*' element={<ErrorPage />} />
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard
