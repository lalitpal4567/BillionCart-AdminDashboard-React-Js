import React, { useEffect, useState } from 'react'
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateSubcategory = () => {
  const [loading, setLoading] = useState(false);
  const [initialSubcategory, setInitialSubcategory] = useState(null);
  const [fetchedSubcategory, setFetchedSubcategory] = useState(null);
  const [subcategory, setSubcategory] = useState({
    name: '',
    description: '',
    subcategoryImages: [{ imageUrl: '', description: '', altText: '' }]
  });

  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const fetchSubcategoryById = async () => {
    setLoading(true);
    const res = await axios.get(`http://localhost:9090/api/v1/admin/subcategory/get-subcategory/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    setFetchedSubcategory(res.data.Subcategory);
    const transformedSubcategory = {
      name: fetchedSubcategory?.name,
      description: fetchedSubcategory?.description,
      subcategoryImages: fetchedSubcategory?.subcategoryImages?.map(image => ({
        imageUrl: image.imageUrl,
        description: image.description,
        altText: image.altText
      }))
    };

    setSubcategory(transformedSubcategory);
    setInitialSubcategory(transformedSubcategory);
    setLoading(false);
  }

  useEffect(() => {
    fetchSubcategoryById();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(subcategory);

    try {
      const res = await axios.put(`http://localhost:9090/api/v1/admin/subcategory/update-subcategory/${id}`, subcategory, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      setLoading(false);
      navigate("/subcategory");
    } catch (error) {
      console.error("Error updating subcategory:", error);
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSubcategory(prevState => ({
      ...prevState,
      [name]: value
    }));
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
    if (initialSubcategory) {
      setSubcategory(initialSubcategory);
    }
  }

  return (
    <div className='p-2'>
      <div className='d-flex justify-content-center'>
        <BackButton to="/subcategory" />
        <h1 className='mx-auto'>Update Subcategory</h1>
      </div>
      {loading ? <Spinner /> :
        <div className=' overflow-y-scroll px-2' style={{ height: "450px" }}>
          <form className=' w-50' onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="inputCategoryId" className="form-label">Category Name</label>
              <input
                type="text"
                id="inputcategoryId"
                aria-describedby="categoryIdHelp"
                className="form-control"
                name='category'
                value={fetchedSubcategory?.category?.name}
                readOnly
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputsubcategoryId" className="form-label">Subcategory Id</label>
              <input
                type="text"
                id="inputsubcategoryId"
                aria-describedby="subcategoryIdHelp"
                className="form-control"
                name='subcategoryId'
                value={fetchedSubcategory?.subcategoryId}
                readOnly
              />
            </div>
            <div className='mb-3'>
              <label htmlFor="inputCategory" className="form-label">Subcategory Name</label>
              <input
                type="text"
                id="inputSubcategory"
                name="name"
                aria-describedby="subcategoryHelp"
                className="form-control"
                value={subcategory.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputDescription" className="form-label">Description</label>
              <textarea
                className="form-control"
                id="inputDescription"
                name="description"
                value={subcategory.description}
                rows="4"
                style={{ resize: 'none' }}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Images</label>
              {subcategory.subcategoryImages?.map((image, index) => (
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
              <button type="submit" className="btn btn-success px-4">Submit</button>
            </div>
          </form>
        </div>
      }
    </div>
  )
}

export default UpdateSubcategory
