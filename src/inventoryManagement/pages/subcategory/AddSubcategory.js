import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast, useToast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';

const AddSubcategory = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [imageFiles, setImageFiles] = useState([{ imageFile: null }]);
  const [altTexts, setAltTexts] = useState([{
    altText: ""
  }])

  const [subcategory, setSubcategory] = useState({
    name: '',
    description: ''
  });

  const pageSize = 10;
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const token = localStorage.getItem('token');

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:9090/api/v1/admin/noauth/category/categories-list`, {
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
    } catch (error) {
      console.log("Error while fetching categories: ", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, [])

  const addSubcategory = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    const newSubcategory = { ...subcategory, altTexts };

    formData.append('subcategory', new Blob([JSON.stringify(newSubcategory)], { type: 'application/json' }));
    imageFiles.forEach((file) => {
      if (file.imageFile) {
        formData.append('imageFiles', file.imageFile);
      }
    });

    try {
      const res = await axios.post(`http://localhost:9090/api/v1/admin/subcategory/add-subcategory/${categoryId}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        }
      })

      setLoading(false);
      toast.success("Subcategory added successfully!");
      setTimeout(() => navigate("/subcategory"), 2000);
    } catch (error) {
      console.log("Error while adding subcategory: ", error);
      toast.error("Error while adding subcategory");
      setLoading(false);
    }
  }

  const handleSubcategoryInputChange = (e) => {
    const { name, value } = e.target;
    setSubcategory(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCategoryChange = (e) => {
    setCategoryId(e.target.value);
    // handleReset();
  };

  const handleAddImageField = () => {
    setImageFiles([...imageFiles, { imageFile: null }]);
    setAltTexts([...altTexts, { altText: "" }])
  };

  const handleRemoveImageField = (index) => {
    const updatedImageFiles = imageFiles.filter((_, i) => i !== index);
    const updatedAltTexts = altTexts.filter((_, i) => i !== index);
    setImageFiles(updatedImageFiles);
    setAltTexts(updatedAltTexts);
  };

  const handleSubcategoryImageAltTextInputChange = (index, e) => {
    const {type, value, files } = e.target;
    const newImageFiles = [...imageFiles];
    const newAltTexts = [...altTexts];
    
    if(type === "file"){
      newImageFiles[index] = { ...newImageFiles[index], imageFile: files[0] };
    }
    if(type === "text"){
      newAltTexts[index] = {...newAltTexts[index], altText: value};
    }
    setImageFiles(newImageFiles);
    setAltTexts(newAltTexts);
  };

  const handleReset = () => {
    setSubcategory({
      name: '',
      description: '',
    });
    setImageFiles({
      imageFile: null
    })
  }

  return (
    <div className=' p-2'>
      <div className='d-flex justify-content-center'>
        <BackButton to="/subcategory" className="" />
        <h1 className='text-center mx-auto'>Add Subcategory</h1>
      </div>
      {loading ? <Spinner /> :
        <div className=' overflow-y-scroll px-2' style={{ height: "450px" }}>
          <form className=' w-50' onSubmit={addSubcategory}>
            <div>
              <label htmlFor='inputCategoryName'>Category</label>
              <select
                required
                id="inputCategoryName"
                value={categoryId}
                onChange={handleCategoryChange}
                className=' mb-3 form-control mt-2'
              >
                <option value="" style={{ backgroundColor: "#9DB2BF" }}>--Select Category--</option>
                {
                  categories.map((category, index) => {
                    return (
                      <option key={index} value={category.categoryId}>{category.name}</option>
                    )
                  })
                }
              </select>

            </div>
            {categoryId &&
              <div>
                <div className='mb-3'>
                  <label htmlFor="inputSubcategory" className="form-label">Subcategory</label>
                  <input
                    type="text"
                    id="inputSubcategory"
                    name="name"
                    value={subcategory.name}
                    required
                    onChange={handleSubcategoryInputChange}
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
                    onChange={handleSubcategoryInputChange}
                    aria-describedby="descriptionHelp"
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Image</label>
                  {
                    imageFiles.map((image, index) => (
                      <div key={index} className=' bg-light rounded rounded-3 p-2 mb-2 border border-3 border-light-subtle'>
                        <div className="mb-2">
                          <label htmlFor="inputImageFile" className="form-label">Image File</label>
                          <input
                            type="file"
                            className="form-control"
                            id="inputImageFile"
                            name="imageFile"
                            ref={fileInputRef}
                            accept="image/jpg, image/jpeg, image/png"
                            onChange={(e) => handleSubcategoryImageAltTextInputChange(index, e)}
                          />
                        </div>
                        <div className=' d-flex justify-content-between flex-wrap pt-2'>
                          <div className="mb-3">
                            <label htmlFor="inputAltText" className="form-label">Alt Text</label>
                            <input
                              type="text"
                              className="form-control"
                              id="inputAltText"
                              name="altText"
                              value={altTexts[index].altText || ""}
                              onChange={(e) => handleSubcategoryImageAltTextInputChange(index, e)}

                            />
                          </div>
                          <div className='' style={{ width: "200px", height: "120px" }}>
                            <img
                              src={image.imageFile ? URL.createObjectURL(image.imageFile) : '/images/image_photo.jpg'}
                              className=' object-fit-cover w-100 h-100'
                              alt='image'
                            />
                          </div>
                        </div>
                        {index !== 0 && (
                          <button type="button" className="btn btn-danger mt-2" onClick={() => handleRemoveImageField(index)}>Remove</button>
                        )}
                      </div>
                    ))}
                  <button type="button" className="btn btn-primary" onClick={handleAddImageField}>Add more</button>
                </div>
                <div className='d-flex justify-content-center gap-4'>
                  <button type="button" className="btn px-4" onClick={handleReset} style={{ backgroundColor: "orange" }}>Reset</button>
                  <button type="submit" className="btn btn-success px-4">Add</button>
                </div>
              </div>
            }
          </form>
        </div>
      }
      <ToastContainer />
    </div>
  )
}

export default AddSubcategory
