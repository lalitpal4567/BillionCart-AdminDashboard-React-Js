import React, { useState } from 'react';
import Navbar from "../../components/Navbar"
import Sidebar from "../../components/Sidebar"
import { Routes, Route } from 'react-router-dom';
import Product from '../product/Product';
import "../dashboard/AdminDashboard.css"
import CategoryInfo from '../category/CategoryInfo';
import UpdateCategory from '../category/UpdateCategory';
import Subcategory from '../subcategory/Subcategory';
import AddCategory from '../category/AddCategory';
import AddSubcategory from '../subcategory/AddSubcategory';
import SubcategoryInfo from '../subcategory/SubcategoryInfo';
import UpdateSubcategory from '../subcategory/UpdateSubcategory';
import ErrorPage from '../ErrorPage';
import AddProduct from '../product/AddProduct';
import ProductInfo from '../product/ProductInfo';
import UpdateProduct from '../product/UpdateProduct';
import Category from '../category/Category';
import SpecificationInfo from '../specifications/SpecificationInfo';
import AddSpecification from '../specifications/AddSpecification';
import UpdateSpecification from '../specifications/UpdateSpecification';

const AdminDashboard = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div>
      <Navbar toggleSidebar={toggleSidebar} />
      <div className='container-fluid'>
        <div className="row" style={{ height: "450px" }}>
          <div className="col">
            <Sidebar className={`${isSidebarVisible ? 'sidebar sidebar-visible' : 'sidebar sidebar-hidden'}`} id="sidebar" />
          </div>
          <div className={` ${isSidebarVisible ? 'col-10' : 'col-12'} border border-1 border-black`}>
            <Routes>
              <Route path='/product' element={<Product />} />
              <Route path='/add-product' element={<AddProduct />} />
              <Route path='/product-info/:id' element={<ProductInfo />} />
              <Route path='/update-product/:id' element={<UpdateProduct />} />

              <Route path='/category' element={<Category />} />
              <Route path="/add-category" element={<AddCategory/>}/>
              <Route path="/category-info/:id" element={<CategoryInfo />}/>
              <Route path="/update-category/:id" element={<UpdateCategory/>}/>

              <Route path="/subcategory" element={<Subcategory/>}/>
              <Route path="/add-subcategory" element={<AddSubcategory/>}/>
              <Route path='/subcategory-info/:id' element={<SubcategoryInfo/>}/>
              <Route path='/update-subcategory/:id' element={<UpdateSubcategory/>}/>

              <Route path="/specification-info" element={<SpecificationInfo/>}/>
              <Route path="/add-specification" element={<AddSpecification/>}/>
              <Route path='/update-specification/:id' element={<UpdateSpecification/>}/>

              <Route path='*' element={<ErrorPage/>} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
