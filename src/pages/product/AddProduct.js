import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';

const AddCategory = () => {
  const [categoryId, setCategoryId] = useState("");
  const [subcategoryId, setSubcategoryId] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [specificationNames, setSpecificationNames] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    details: "",
    currentPrice: "",
    previousPrice: "",
    quantity: "",
    model: ""
  })

  const [productImages, setProductImages] = useState([{
    imageUrl: "",
    description: "",
    altText: ""
  }])

  const [specificationValues, setSpecificationValues] = useState([{
    value: "",
    nameId: ""
  }])

  const navigate = useNavigate();
  const token = localStorage.getItem('token');


  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:9090/api/v1/admin/category/categories-list`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
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

  useEffect(() => {
    fetchCategories();
  }, [])


  const fetchSubategories = async () => {
    if (!categoryId) return;
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:9090/api/v1/admin/subcategory/subcategories-categories/${categoryId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
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
      const res = await axios.get(`http://localhost:9090/api/v1/admin/spec-name/get-names/${subcategoryId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        params: {
          page: 0,
          size: 10
        }
      })
      setLoading(false);
      setSpecificationNames(res.data.SpecificationName);
    } catch (error) {
      setLoading(false);
      console.log("Error while fetching subcategories:", error);
    }
  }

  useEffect(() => {
    fetchSpecificationNameBySubcategoryId();
  }, [subcategoryId])

  const addProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const combinedProduct = { ...product, specificationValues, productImages };
      const res = await axios.post(`http://localhost:9090/api/v1/admin/product/add-product/${subcategoryId}`, combinedProduct, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      })
      setLoading(false);
      console.log(combinedProduct);
      console.log("res", res.data);
      navigate("/product");
    } catch (error) {
      setLoading(false);
      console.log("Error adding product:", error);
    }
  }

  const handleProductInputChange = (e) => {
    const { name, value } = e.target;
    setProduct(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleProductImageChange = (index, e) => {
    const { name, value } = e.target;
    setProductImages(prevState => {
      const newProductImages = [...prevState];
      newProductImages[index] = { ...newProductImages[index], [name]: value };
      return newProductImages;
    });
  };

  const handleAddImage = () => {
    setProductImages(prevState => [
      ...prevState,
      { imageUrl: '', description: '', altText: '' }
    ]);
  };

  const handleRemoveImage = (index) => {
    setProductImages(prevState => [
      prevState.filter((_, i) => i !== index)
    ]);
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

  const handleReset = () => {
    setProduct({
      name: "",
      description: "",
      details: "",
      currentPrice: "",
      previousPrice: "",
      quantity: ""
    });
    setProductImages([{
      imageUrl: "",
      description: "",
      altText: ""
    }]);

    setSpecificationValues([{
      value: "",
      nameId: ""
    }])
  }

  return (
    <div className=' p-2'>
      <div className='d-flex justify-content-center'>
        <BackButton to="/product" className="" />
        <h1 className='text-center mx-auto'>Add Product</h1>
      </div>
      {loading ? <Spinner /> :
        <div className="overflow-y-scroll px-2" style={{ height: "450px" }}>
          <form className=' w-50' onSubmit={addProduct}>
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

            <select
              disabled={!categoryId}
              required
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
            { subcategoryId &&
              <section>
                <div className='mb-3'>
                  <label htmlFor="inputProduct" className="form-label">Product Name</label>
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
                  <label htmlFor="inputDescription" className="form-label">Description</label>
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
                  <label htmlFor="inputDetail" className="form-label">Details</label>
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
                  <table className="table table-borderless">
                    <tbody>
                      <tr className=''>
                        <th scope="row">Current Price</th>
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
                        <th scope="row">Quantity</th>
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
                  <label className="form-label">Images</label>
                  {productImages.map((image, index) => (
                    <div key={index} className="mb-3">
                      <input
                        type="text"
                        className="form-control mb-1"
                        placeholder="Image URL"
                        name="imageUrl"
                        value={image.imageUrl}
                        onChange={(e) => handleProductImageChange(index, e)}
                      />
                      <input
                        type="text"
                        className="form-control mb-1"
                        placeholder="Image Description"
                        name="description"
                        value={image.description}
                        onChange={(e) => handleProductImageChange(index, e)}
                      />
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Alt Text"
                        name="altText"
                        value={image.altText}
                        onChange={(e) => handleProductImageChange(index, e)}
                      />
                      {index !== 0 && (
                        <button type="button" className="btn btn-danger ms-2" onClick={() => handleRemoveImage(index)}>Remove</button>
                      )}
                    </div>
                  ))}
                  <button type="button" className="btn btn-primary" onClick={handleAddImage}>Add more</button>
                </div>
                <div className='d-flex justify-content-center gap-4'>
                  <button type="button" className="btn px-4" onClick={handleReset} style={{ backgroundColor: "orange" }}>reset</button>
                  <button type="submit" className="btn btn-success px-4">Add</button>
                </div>
              </section>
            }
          </form>
        </div>
      }
    </div>
  )
}

export default AddCategory
