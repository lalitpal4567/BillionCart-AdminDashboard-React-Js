import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';



const UpdateCategory = () => {
  const [loading, setLoading] = useState(false);
  const [initialCategory, setInitialCategory] = useState(null);
  const [fetchedCategory, setFetchedCategory] = useState({});
  const [category, setCategory] = useState({});

  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const token = sessionStorage.getItem('token');

  const fetchCategoryById = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:9090/api/v1/noauth/category/get-category/${id}`);
      setLoading(false);
      setCategory({
        name: res.data.Category?.name,
        description: res.data.Category?.description,
      });
      setInitialCategory(category);
    } catch (error) {
      console.log("Error while fetching category: ", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCategoryById();
  }, [])

  const handleCategoryInputChange = (e) => {
    const { name, value } = e.target;
    setCategory(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const req = await axios.put(`http://localhost:9090/api/v1/admin/category/update-category/${id}`, category, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
      setLoading(false);
      toast.success("Category updated successfully!");
      setTimeout(() => navigate("/admin-dashboard/category"), 2000);
    } catch (error) {
      console.error("Error while updating category:", error);
      toast.error("Error while updating category");
    }
  }

  const handleReset = () => {
    if (initialCategory) {
      setCategory(initialCategory);
    }
  };

  return (
    <div className=' p-2'>
      <div className='d-flex justify-content-center'>
        <BackButton to="/admin-dashboard/category" className="" />
        <h1 className='text-center mx-auto'>Update Category</h1>
      </div>
      {loading ? <Spinner /> :
        <div className=' overflow-y-scroll px-2' style={{ height: "450px" }}>
          <form className=' w-50' onSubmit={handleUpdateCategory}>
            <div className="mb-3">
              <label htmlFor="inputCategoryId" className="form-label">Category Id</label>
              <input
                type="text"
                id="inputCategoryId"
                aria-describedby="categoryIdHelp"
                className="form-control"
                name='categoryId'
                value={id}
                readOnly
              />
            </div>
            <div className='mb-3'>
              <label htmlFor="inputCategory" className="form-label">Category Name</label>
              <input
                type="text"
                id="inputCategory"
                name="name"
                aria-describedby="categoryHelp"
                required
                className="form-control"
                value={category?.name}
                onChange={handleCategoryInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputDescription" className="form-label">Description</label>
              <textarea
                type="text"
                className="form-control"
                id="inputDescription"
                name="description"
                required
                value={category?.description}
                rows="4"
                style={{ resize: 'none' }}
                onChange={handleCategoryInputChange}
              />
            </div>
            <div className='d-flex justify-content-center gap-4'>
              <Link to={`/admin-dashboard/category/update-category-images/${id}`} className="btn btn-info px-4">Update Images</Link>
              <button type="button" className="btn px-4" onClick={handleReset} style={{ backgroundColor: "orange" }}>Reset</button>
              <button type="submit" className="btn btn-success px-4">Submit</button>
            </div>
          </form>
        </div>
      }
      <ToastContainer />
    </div>
  )
}

export default UpdateCategory
