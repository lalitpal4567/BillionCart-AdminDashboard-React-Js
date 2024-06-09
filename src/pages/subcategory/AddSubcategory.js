import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';

const AddSubcategory = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [subcategory, setSubcategory] = useState({
    name: '',
    description: '',
    subcategoryImages: [{ imageUrl: '', description: '', altText: '' }]
  });

  const pageSize = 10;
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const fetchCategories = async () => {
    setLoading(true);
    const res = await axios.get(`http://localhost:9090/api/v1/admin/category/categories-list`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      params: {
        page: 0,
        size: pageSize
      }
    });
    setLoading(false);
    setCategories(res.data.content);
  }

  useEffect(() => {
    fetchCategories();
  }, [])

  const addSubcategory = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios.post(`http://localhost:9090/api/v1/admin/subcategory/add-subcategory/${categoryId}`, subcategory, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
    setLoading(false);
    navigate("/subcategory");
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSubcategory(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCategoryChange = (e) => {
    setCategoryId(e.target.value);
  };

  const handleAddImage = () => {
    setSubcategory(prevState => ({
      ...prevState,
      subcategoryImages: [...prevState.subcategoryImages, { imageUrl: '', description: '', altText: '' }]
    }));
  };

  const handleRemoveImage = (index) => {
    setSubcategory(prevState => ({
      ...prevState,
      subcategoryImages: prevState.subcategoryImages.filter((_, i) => i !== index)
    }));
  };

  const handleImageChange = (index, e) => {
    const { name, value } = e.target;
    const images = [...subcategory.subcategoryImages];
    images[index][name] = value;
    setSubcategory(prevState => ({
      ...prevState,
      subcategoryImages: images
    }));
  };

  const handleReset = () => {
    setSubcategory({
      name: '',
      description: '',
      subcategoryImages: [{ imageUrl: '', description: '', altText: '' }]
    });
  }

  return (
    <div className=' py-2'>
      <div className='d-flex justify-content-center'>
        <BackButton to="/category" className="" />
        <h1 className='text-center mx-auto'>Add Subcategory</h1>
      </div>
      {loading ? <Spinner /> :
        <div className=' overflow-y-scroll px-2' style={{ height: "450px" }}>
          <form className=' w-50' onSubmit={addSubcategory}>
            <select
              required
              value={categoryId}
              onChange={handleCategoryChange}
              className=' mb-3 form-control'
            >
              <option value="">--Select Category--</option>
              {
                categories.map((category, index) => {
                  return (
                    <option key={index} value={category.categoryId}>{category.name}</option>
                  )
                })
              }
            </select>
            <fieldset disabled={!categoryId}>
              <div className='mb-3'>
                <label htmlFor="inputSubcategory" className="form-label">Subcategory Name</label>
                <input
                  type="text"
                  id="inputSubcategory"
                  name="name"
                  value={subcategory.name}
                  required
                  onChange={handleInputChange}
                  aria-describedby="subcategoryHelp"
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="inputDescription" className="form-label">Description</label>
                <textarea
                  id="inputDescription"
                  name="description"
                  value={subcategory.description}
                  rows="3"
                  required
                  style={{ resize: 'none' }}
                  onChange={handleInputChange}
                  aria-describedby="descriptionHelp"
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Images</label>
                {subcategory.subcategoryImages.map((image, index) => (
                  <div key={index} className="mb-3">
                    <input
                      type="text"
                      className="form-control mb-1"
                      placeholder="Image URL"
                      name="imageUrl"
                      value={image.imageUrl}
                      onChange={(e) => handleImageChange(index, e)}
                    />
                    <input
                      type="text"
                      className="form-control mb-1"
                      placeholder="Image Description"
                      name="description"
                      value={image.description}
                      onChange={(e) => handleImageChange(index, e)}
                    />
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Alt Text"
                      name="altText"
                      value={image.altText}
                      onChange={(e) => handleImageChange(index, e)}
                    />
                    {index !== 0 && (
                      <button type="button" className="btn btn-danger ms-2" onClick={() => handleRemoveImage(index)}>Remove</button>
                    )}
                  </div>
                ))}
                <button type="button" className="btn btn-primary" onClick={handleAddImage}>Add more</button>
              </div>
              <div className='d-flex justify-content-center gap-4'>
                <button type="button" className="btn px-4" onClick={handleReset} style={{ backgroundColor: "orange" }}>Reset</button>
                <button type="submit" className="btn btn-success px-4">Add</button>
              </div>
            </fieldset>
          </form>
        </div>
      }
    </div>
  )
}

export default AddSubcategory
