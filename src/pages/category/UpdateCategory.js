import React, { useEffect, useState } from 'react'
import BackButton from '../../components/BackButton'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../../components/Spinner';

const UpdateCategory = () => {
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState({
    categoryId: '',
    name: '',
    description: '',
    imageUrl: '',
  });

  const [initialCategory, setInitialCategory] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const fetchCategoryById = async () => {
    const res = await axios.get(`http://localhost:9090/api/v1/admin/category/get-category/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
    setCategory(res.data.Category);
    setInitialCategory(res.data.Category); // Save the initial category data

  }

  useEffect(() => {
    fetchCategoryById();
  }, [])


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategory(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
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
      navigate("/category")
    } catch (error) {
      console.error("Error updating category:", error);
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
        <BackButton to="/category" className="" />
        <h1 className='text-center mx-auto'>Update Category</h1>
      </div>
      {loading ? <Spinner /> :
        <form className=' w-50' onSubmit={handleSubmit}>
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
              className="form-control"
              value={category.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="inputDescription" className="form-label">Description</label>
            <textarea
              type=""
              className="form-control"
              id="inputDescription"
              name="description"
              value={category.description}
              rows="4"
              style={{ resize: 'none' }}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="inputImageUrl" className="form-label">Image Url</label>
            <input
              type=""
              className="form-control"
              id="inputImageUrl"
              name="imageUrl"
              value={category.imageUrl}
              onChange={handleInputChange}
            />
          </div>
          <div className='d-flex justify-content-center gap-4'>
            <button type="button" className="btn px-4" onClick={handleReset} style={{ backgroundColor: "orange" }}>reset</button>
            <button type="submit" className="btn btn-success px-4">Submit</button>
          </div>
        </form>
      }
    </div>
  )
}

export default UpdateCategory
