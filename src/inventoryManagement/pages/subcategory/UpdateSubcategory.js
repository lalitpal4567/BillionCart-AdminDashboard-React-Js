import React, { useEffect, useState } from 'react'
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateSubcategory = () => {
  const [loading, setLoading] = useState(false);
  const [initialSubcategory, setInitialSubcategory] = useState([]);
  const [initialSubcategoryImages, setInitialSubcategoryImages] = useState([]);
  const [fetchedSubcategory, setFetchedSubcategory] = useState({});
  const [subcategory, setSubcategory] = useState({});
  const [subcategoryImages, setSubcategoryImages] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const fetchSubcategoryById = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:9090/api/v1/admin/subcategory/get-subcategory/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      setLoading(false);
      setFetchedSubcategory(res.data.Subcategory);
      const subcategory = res.data.Subcategory;

      const transformedSubcategory = {
        name: subcategory?.name,
        description: subcategory?.description
      };

      const transformedSubcategoryImages = subcategory?.subcategoryImages.map(image => ({
        imageUrl: image?.imageUrl,
        altText: image?.altText
      }))

      setSubcategory(transformedSubcategory);
      setSubcategoryImages(transformedSubcategoryImages)
      setInitialSubcategory(transformedSubcategory);
      setInitialSubcategoryImages(transformedSubcategoryImages);
    } catch (error) {
      console.log("Error while fetching subcategory: ", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSubcategoryById();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const combinedSubcategory = { subcategory, subcategoryImages };
      const res = await axios.put(`http://localhost:9090/api/v1/admin/subcategory/update-subcategory/${id}`, combinedSubcategory, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      setLoading(false);
      toast.success("Subcategory updated successfully!");
      setTimeout(() => navigate("/subcategory"), 2000);
    } catch (error) {
      console.error("Error while updating subcategory:", error);
      toast.error("Error while updating subcategory");
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

  const handleAddImage = () => {
    setSubcategoryImages(prevState => [
      ...prevState,
      { imageUrl: '', altText: '' }
    ]);
  };

  const handleRemoveImage = (index) => {
    setSubcategoryImages(prevState => prevState.filter((_, i) => i !== index))
  };

  const handleSubcategoryImageChange = (index, e) => {
    const { name, value } = e.target;
    const images = [...subcategoryImages];
    images[index][name] = value;
    setSubcategoryImages(images);
  };

  const handleReset = () => {
    setSubcategory(initialSubcategory);
    setSubcategoryImages(initialSubcategoryImages);
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
                required
                aria-describedby="subcategoryHelp"
                className="form-control"
                value={subcategory.name}
                onChange={handleSubcategoryInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputDescription" className="form-label">Description</label>
              <textarea
                className="form-control"
                id="inputDescription"
                name="description"
                required
                value={subcategory.description || ""}
                rows="4"
                style={{ resize: 'none' }}
                onChange={handleSubcategoryInputChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Image</label>
              {subcategoryImages.map((image, index) => (
                <div key={index} className=' bg-light rounded rounded-3 p-2 mb-3 border border-3 border-light-subtle'>
                  <div className='mb-3'>
                    <label htmlFor='inputSubcategoryImageUrl'>Image Url</label>
                    <input
                      type="text"
                      id='inputSubcategoryImageUrl'
                      className="form-control mb-1"
                      name="imageUrl"
                      value={image.imageUrl || ""}
                      onChange={(e) => handleSubcategoryImageChange(index, e)}
                    />
                  </div>
                  <div className='mb-3'>
                    <label htmlFor='inputSubcategoryAltText'>Alt Text</label>
                    <input
                      type="text"
                      id='inputSubcategoryAltText'
                      className="form-control"
                      required
                      name="altText"
                      value={image.altText || ""}
                      onChange={(e) => handleSubcategoryImageChange(index, e)}
                    />
                  </div>
                  {index !== 0 && (
                    <button type="button" className="btn btn-danger" onClick={() => handleRemoveImage(index)}>Remove</button>
                  )}
                </div>
              ))}
              <button type="button" className="btn btn-primary mt-3" onClick={handleAddImage}>Add more</button>
            </div>
            <div className='d-flex justify-content-center gap-4'>
              <button type="button" className="btn px-4" onClick={handleReset} style={{ backgroundColor: "orange" }}>Reset</button>
              <button type="submit" className="btn btn-success px-4">Submit</button>
            </div>
          </form>
        </div>
      }
      <ToastContainer/>
    </div>
  )
}

export default UpdateSubcategory
