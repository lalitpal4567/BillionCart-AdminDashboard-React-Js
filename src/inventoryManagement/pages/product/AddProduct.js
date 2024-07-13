import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import AlertMessageModal from '../../components/AlertMessageModal';


const AddProduct = () => {
  const [loading, setLoading] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [subcategoryId, setSubcategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [specificationNames, setSpecificationNames] = useState([]);
  const [isFileSizeExceeded, setIsFileSizeExceeded] = useState([false]);
  const [isAllFilesSelected, setIsAllFilesSelected] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [imageFiles, setImageFiles] = useState([{ imageFile: null }]);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    details: "",
    brandId: "",
    colorId: "",
    currentPrice: "",
    previousPrice: "",
    quantity: "",
    model: ""
  })

  const [altTexts, setAltTexts] = useState([{
    altText: ""
  }])

  const [specificationValues, setSpecificationValues] = useState([{
    value: "",
    nameId: ""
  }])

  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const token = localStorage.getItem('token');

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:9090/api/v1/noauth/category/categories-list`, {
        params: {
          page: 0,
          size: 10
        }
      });
      setLoading(false);
      setCategories(res.data.content);
    } catch (error) {
      setLoading(false);
      console.log("Error while fetching categories:", error);
    }
  }

  const fetchBrandAndColor = async () => {
    setLoading(true);
    try {
      const productColors = await axios.get(`http://localhost:9090/api/v1/noauth/color/colors-list`, {
        params: {
          page: 0,
          size: 10
        }
      });
      const productBrands = await axios.get(`http://localhost:9090/api/v1/noauth/brand/brands-list`, {
        params: {
          page: 0,
          size: 20
        }
      });
      setLoading(false);
      setBrands(productBrands.data.content);
      setColors(productColors.data.content);
    } catch (error) {
      console.log("Error while fetching brand or color:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCategories();
    fetchBrandAndColor();
  }, [])

  const fetchSubategories = async () => {
    if (!categoryId) return;
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:9090/api/v1/noauth/subcategory/subcategories-category/${categoryId}`, {
        params: {
          page: 0,
          size: 10
        }
      })
      setLoading(false);
      setSubcategories(res.data.content);
    } catch (error) {
      setLoading(false);
      console.log("Error while fetching subcategories:", error);
    }
  }

  useEffect(() => {
    fetchSubategories();
  }, [categoryId])

  const fetchSpecificationNameBySubcategoryId = async () => {
    if (!subcategoryId) return;
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:9090/api/v1/noauth/spec-name/get-names/${subcategoryId}`, {
        params: {
          page: 0,
          size: 20
        }
      })
      setLoading(false);
      setSpecificationNames(res.data.SpecificationName);

      setSpecificationValues(
        res.data.SpecificationName.map(name => ({ value: "", nameId: name.nameId }))
      );

    } catch (error) {
      setLoading(false);
      console.log("Error while fetching subcategories:", error);
    }
  }

  useEffect(() => {
    fetchSpecificationNameBySubcategoryId();
  }, [subcategoryId])

  useEffect(() => {
    checkAllFilesSelected();
  }, [imageFiles]);

  const addProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (isFileSizeExceeded.some(exceeded => exceeded)) {
      setLoading(false);
      setShowModal(true);
      return;
    }

    const formData = new FormData();
    formData.append('product', new Blob([JSON.stringify({ ...product, specificationValues, altTexts })], { type: 'application/json' }));
    imageFiles.forEach((file) => {
      if (file.imageFile) {
        formData.append('imageFiles', file.imageFile);
      }
    });

    try {
      const res = await axios.post(`http://localhost:9090/api/v1/admin/product/add-product/${subcategoryId}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multiplart/form-data',
        }
      })
      setLoading(false);
      toast.success("Product added successfully!");
      setTimeout(() => navigate("/product"), 2000);
    } catch (error) {
      setLoading(false);
      console.log("Error while adding product:", error);
      toast.error("Error while adding product");
    }
  }

  const handleProductInputChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleProductImageAltTextInputChange = (index, e) => {
    const { type, value, files } = e.target;
    const newImageFiles = [...imageFiles];
    const newAltTexts = [...altTexts];

    if (type === "file") {
      if (files && files[0]) {
        const file = files[0];
        const maxSizeInBytes = 1 * 1024 * 1024;
        
        newImageFiles[index] = { ...newImageFiles[index], imageFile: files[0] };
        const isExceeded = file.size > maxSizeInBytes;
        const updatedSizeExceeded = [...isFileSizeExceeded];
        updatedSizeExceeded[index] = isExceeded;

        setImageFiles(newImageFiles);
        setIsFileSizeExceeded(updatedSizeExceeded);
      }
    }
    else if (type === "text") {
      newAltTexts[index] = { ...newAltTexts[index], altText: value };
    }
    setAltTexts(newAltTexts);
  };

  const checkAllFilesSelected = () => {
    const allSelected = imageFiles.every(file => file.imageFile !== null);
    setIsAllFilesSelected(allSelected);
  };

  const handleAddImageField = () => {
    setImageFiles([...imageFiles, { imageFile: null }]);
    setAltTexts([...altTexts, { altText: "" }])
  };

  const handleRemoveImageField = (index) => {
    const updatedImageFiles = imageFiles.filter((_, i) => i !== index);
    const updatedAltTexts = altTexts.filter((_, i) => i !== index);
    const updatedSizeExceeded = isFileSizeExceeded.filter((_, i) => i !== index);

    setImageFiles(updatedImageFiles);
    setAltTexts(updatedAltTexts);
    setIsFileSizeExceeded(updatedSizeExceeded);
    checkAllFilesSelected();
  };

  const handleSpecificationValuesChange = (index, e, nameId) => {
    const { name, value } = e.target;
    setSpecificationValues(prevState => {
      const newSpecificationValues = [...prevState];
      newSpecificationValues[index] = { ...newSpecificationValues[index], [name]: value, nameId: nameId };
      return newSpecificationValues;
    });
  };

  const handleCategoryChange = (e) => {
    setCategoryId(e.target.value);
    setSubcategoryId("");
    handleReset();
  }

  const handleSubcategoryChange = (e) => {
    setSubcategoryId(e.target.value);
    handleReset();
  }

  const handleCloseModal = () => {
    setShowModal(false);
  }

  const handleReset = () => {
    setProduct({
      name: "",
      description: "",
      details: "",
      currentPrice: "",
      previousPrice: "",
      quantity: ""
    });

    setSpecificationValues([{
      value: "",
      nameId: ""
    }])

    setImageFiles([{ imageFile: null }]);
    setAltTexts([{ altText: "" }]);

    setIsFileSizeExceeded([false]);
    setIsAllFilesSelected(false);
  }

  return (
    <div className=' p-2'>
      <div className='d-flex justify-content-center'>
        <BackButton to="/product" className="" />
        <h1 className='text-center mx-auto'>Add Product</h1>
      </div>
      {loading ? <Spinner /> :
        <div className="overflow-y-scroll px-2" style={{ height: "450px" }}>
          <AlertMessageModal
            onClose={handleCloseModal}
            show={showModal}
          />
          <form className=' w-50' onSubmit={addProduct}>
            <div className='mb-3'>
              <label htmlFor="inputCategory" className="form-label">Category</label>
              <select
                required
                id="inputCategory"
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
            </div>

            <div className='mb-3'>
              <label htmlFor="inputSubcategory" className="form-label">Subcategory</label>
              <select
                disabled={!categoryId}
                required
                id="inputSubcategory"
                value={subcategoryId}
                onChange={handleSubcategoryChange}
                className=' mb-3 form-control'
              >
                <option value="">--Select Subcategory--</option>
                {
                  subcategories.map((subcategory, index) => {
                    return (
                      <option key={index} value={subcategory.subcategoryId}>{subcategory.name}</option>
                    )
                  })
                }
              </select>
            </div>

            {subcategoryId &&
              <section>
                <div className='mb-3'>
                  <label htmlFor="inputProduct" className="form-label">Product Name
                    <span style={{ color: 'red' }}>*</span>
                  </label>
                  <input
                    type="text"
                    id="inputProduct"
                    name="name"
                    aria-describedby="productHelp"
                    className="form-control"
                    value={product.name}
                    required
                    onChange={handleProductInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="inputDescription" className="form-label">Description
                    <span style={{ color: 'red' }}>*</span>
                  </label>
                  <textarea
                    type=""
                    className="form-control"
                    id="inputDescription"
                    name="description"
                    value={product.description}
                    rows="4"
                    required
                    style={{ resize: 'none' }}
                    onChange={handleProductInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="inputDetail" className="form-label">Details
                    <span style={{ color: 'red' }}>*</span>
                  </label>
                  <textarea
                    type=""
                    className="form-control"
                    id="inputDetail"
                    name="details"
                    value={product.details}
                    rows="4"
                    required
                    style={{ resize: 'none' }}
                    onChange={handleProductInputChange}
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor="inputProductBrand" className="form-label">Brand
                    <span style={{ color: 'red' }}>*</span>
                  </label>
                  <select
                    id="inputProductBrand"
                    name="brandId"
                    onChange={handleProductInputChange}
                    className=' mb-3 form-control'
                  >
                    <option value="">--Select Brand--</option>
                    {
                      brands.map((productBrand, index) => {
                        return (
                          <option key={index} value={productBrand.id}>{productBrand.name}</option>
                        )
                      })
                    }
                  </select>
                </div>
                <div className='mb-3'>
                  <label htmlFor='inputProductColor' className="form-label">Color
                    <span style={{ color: 'red' }}>*</span>
                  </label>
                  <select
                    id="inputProductColor"
                    name="colorId"
                    onChange={handleProductInputChange}
                    className=' mb-3 form-control'
                  >
                    <option value="">--Select Color--</option>
                    {
                      colors.map((productColor, index) => {
                        return (
                          <option key={index} value={productColor.id}>{productColor.name}</option>
                        )
                      })
                    }
                  </select>
                </div>
                <div className='mb-3'>
                  <table className="table table-borderless">
                    <tbody>
                      <tr className=''>
                        <th scope="row">Current Price
                          <span style={{ color: 'red' }}>*</span>
                        </th>
                        <td>
                          <input
                            type='text'
                            className='form-control'
                            required
                            name="currentPrice"
                            value={product.currentPrice}
                            onChange={handleProductInputChange}

                          />
                        </td>
                      </tr>
                      <tr className=''>
                        <th scope="row">Previous Price</th>
                        <td>
                          <input
                            type='text'
                            className='form-control'
                            required
                            name="previousPrice"
                            value={product.previousPrice}
                            onChange={handleProductInputChange}
                          />
                        </td>
                      </tr>
                      <tr className=''>
                        <th scope="row">Quantity
                          <span style={{ color: 'red' }}>*</span>
                        </th>
                        <td>
                          <input
                            type='text'
                            className='form-control'
                            required
                            name="quantity"
                            value={product.quantity}
                            onChange={handleProductInputChange}
                          />
                        </td>
                      </tr>
                      <tr className=''>
                        <th scope="row">Model</th>
                        <td>
                          <input
                            type='text'
                            className='form-control'
                            name="model"
                            value={product.model}
                            onChange={handleProductInputChange}
                          />
                        </td>
                      </tr>
                      {
                        specificationNames.map((specName, index) => {
                          return (
                            <tr key={index}>
                              <th scope="row">{specName.name}</th>
                              <td>
                                <input
                                  type='text'
                                  name="value"
                                  className='form-control'
                                  value={specificationValues[index]?.value || ""}
                                  onChange={(e) => handleSpecificationValuesChange(index, e, specName.nameId)}
                                />
                              </td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                </div>
                <div className="mb-3">
                  <label className="form-label">Image
                    <span style={{ color: 'red' }}>*</span>
                  </label>
                  <p className='' style={{ fontSize: "12px", color: "green" }}>At least one image should be uploaded
                    <span className=' text-danger ms-2'>size &lt; 10 Mb</span>
                    <br></br>
                    File format: <span>jpg/jpeg/png</span>
                  </p>
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
                            required
                            ref={fileInputRef}
                            accept="image/jpg, image/jpeg, image/png"
                            onChange={(e) => handleProductImageAltTextInputChange(index, e)}
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
                              required
                              value={altTexts[index].altText || ""}
                              onChange={(e) => handleProductImageAltTextInputChange(index, e)}
                            />
                            {index === 0 && isFileSizeExceeded[index] &&
                              <p className=' text-danger ms-3'>Size exceeded!!!</p>
                            }
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
                          <div className=' d-flex align-items-center'>
                            <button type="button" className="btn btn-danger mt-2" onClick={() => handleRemoveImageField(index)}>Remove</button>
                            {isFileSizeExceeded[index] && <span className=' text-danger ms-3'>Size exceeded!!!</span>}
                          </div>
                        )}
                      </div>
                    ))}
                  <button type="button" className="btn btn-primary" onClick={handleAddImageField}>Add more</button>
                </div>
                <div className='d-flex justify-content-center gap-4'>
                  <button type="button" className="btn px-4" onClick={handleReset} style={{ backgroundColor: "orange" }}>Reset</button>
                  <button type="submit" className="btn btn-success px-4" disabled={!isAllFilesSelected}>Submit</button>
                </div>
              </section>
            }
          </form>
        </div>
      }
      <ToastContainer />
    </div>
  )
}

export default AddProduct
