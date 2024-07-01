import React, { useEffect, useState } from 'react'
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateProduct = () => {
  const [loading, setLoading] = useState(false);
  const [initialProduct, setInitialproduct] = useState(null);
  const [initialSpecificationValues, setInitialSpecificationValues] = useState(null);
  const [initialProductImages, setInitialProductImages] = useState(null);
  const [fetchedProduct, setFetchedProduct] = useState(null);
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);

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

  const [productImages, setProductImages] = useState([{
    imageUrl: "",
    altText: ""
  }])

  const [specificationValues, setSpecificationValues] = useState([{
    value: "",
    nameId: ""
  }])

  const [specificationNames, setSpecificationNames] = useState([{
    nameId: "",
    name: "",
    value: ""
  }])

  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const fetchProductById = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:9090/api/v1/admin/product/fetch-product/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      setFetchedProduct(res.data.Product);
      const tempProduct = res.data.Product;
      console.log(tempProduct);
      product.name = tempProduct.name;
      product.brandId = tempProduct.brand.brandId;
      product.colorId = tempProduct.color.colorId;
      product.description = tempProduct.description;
      product.details = tempProduct.details;
      product.quantity = tempProduct.quantity;
      product.model = tempProduct.model;
      product.currentPrice = tempProduct.currentPrice;
      product.previousPrice = tempProduct.previousPrice;

      console.log("product: ", product);
      setProductImages(tempProduct.productImages.map(image => ({
        imageUrl: image.imageUrl,
        altText: image.altText
      })))

      setSpecificationValues(tempProduct.specifications.map(spec => ({
        value: spec.value,
        nameId: spec.nameId
      })))

      await fetchSpecificationNameBySubcategoryId(tempProduct.subcategory.subcategoryId);
      setInitialproduct(product);
      setInitialProductImages(productImages);
      setInitialSpecificationValues(specificationValues);
      setLoading(false);

    } catch (error) {
      console.error("Error while fetching product:", error);
      setLoading(false);
    }
  }

  const fetchBrandAndColor = async () => {
    setLoading(true);
    try {
      const productColors = await axios.get(`http://localhost:9090/api/v1/admin/color/colors-list`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        params: {
          page: 0,
          size: 10
        }
      });
      const productBrands = await axios.get(`http://localhost:9090/api/v1/admin/brand/brands-list`, {
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
      setBrands(productBrands.data.content);
      setColors(productColors.data.content);
    } catch (error) {
      console.log("Error while fetching brand or color:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProductById();
    fetchBrandAndColor();
  }, [])

  const fetchSpecificationNameBySubcategoryId = async (subcategoryId) => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:9090/api/v1/admin/spec-name/get-names/${subcategoryId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      })
      setLoading(false);
      setSpecificationNames(res.data.SpecificationName);
      const specNames = res.data.SpecificationName;

      setSpecificationNames(specNames.map(spec => ({
        nameId: spec.nameId,
        name: spec.name,
        value: spec.value
      })))

    } catch (error) {
      setLoading(false);
      console.log("Error while fetching specifications:", error);
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

  const handleSpecificationValuesChange = (index, e, nameId) => {
    const { name, value } = e.target;
    setSpecificationValues(prevState => {
      const newSpecificationValues = [...prevState];
      newSpecificationValues[index] = { ...newSpecificationValues[index], [name]: value, nameId: nameId };
      return newSpecificationValues;
    });
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const combinedProduct = { ...product, specificationValues, productImages };
      const res = await axios.put(`http://localhost:9090/api/v1/admin/product/update-product/${fetchedProduct.productId}`, combinedProduct, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      })
      setLoading(false);
      toast.success("Product updated successfully!");
      setTimeout(() => navigate("/product"), 2000);
    } catch (error) {
      setLoading(false);
      console.log("Error while updating product", error);
      toast.error("Error while updating product");
    }
  }

  const handleReset = () => {
    if (initialProduct || initialProductImages || initialSpecificationValues) {
      setProduct(initialProduct);
      setProductImages(initialProductImages);
      setSpecificationValues(initialSpecificationValues);
    }
  }

  return (
    <div className='p-2'>
      <div className='d-flex justify-content-center'>
        <BackButton to="/product" />
        <h1 className='mx-auto'>Update Product</h1>
      </div>
      {loading ? <Spinner /> :
        <div className=' overflow-y-scroll px-2' style={{ height: "450px" }}>
          <form className=' w-50' onSubmit={handleUpdateProduct}>
            <div className="mb-3">
              <label htmlFor="inputCategoryId" className="form-label">Subcategory Name</label>
              <input
                type="text"
                id="inputSubcategoryId"
                aria-describedby="subcategoryIdHelp"
                className="form-control"
                name='subcategory'
                value={fetchedProduct?.subcategory.name || ""}
                readOnly
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputProductId" className="form-label">Product Id</label>
              <input
                type="text"
                id="inputProductId"
                aria-describedby="productIdHelp"
                className="form-control"
                name='productId'
                value={fetchedProduct?.productId || ""}
                readOnly
              />
            </div>
            <div className='mb-3'>
              <label htmlFor="inputProductName" className="form-label">Product Name</label>
              <input
                type="text"
                id="inputProductName"
                name="name"
                aria-describedby="productNameHelp"
                className="form-control"
                value={product.name || ""}
                onChange={handleProductInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputDescription" className="form-label">Description</label>
              <textarea
                className="form-control"
                id="inputDescription"
                name="description"
                value={product.description || ""}
                rows="4"
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
                value={product.details || ""}
                rows="4"
                required
                style={{ resize: 'none' }}
                onChange={handleProductInputChange}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor="inputProductBrand" className="form-label">Brand</label>
              <select
                id="inputProductBrand"
                disabled
                name="brandId"
                value={product.brandId || ""}
                onChange={handleProductInputChange}
                className=' mb-3 form-select cursor-pointer'
              >
                <option value="">--Select Brand--</option>
                {
                  brands.map((productBrand, index) => {
                    return (
                      <option key={index} value={productBrand.brandId}>{productBrand.brand}</option>
                    )
                  })
                }
              </select>
            </div>
            <div className='mb-3'>
              <label htmlFor='inputProductColor' className="form-label">Color</label>
              <select
                id="inputProductColor"
                name="colorId"
                value={product.colorId || ""}
                onChange={handleProductInputChange}
                className=' mb-3 form-select cursor-pointer'
              >
                <option value="">--Select Color--</option>
                {
                  colors.map((productColor, index) => {
                    return (
                      <option key={index} value={productColor.colorId}>{productColor.color}</option>
                    )
                  })
                }
              </select>
            </div>
            <div className='mb-3'>
              <table className="table table-borderless">
                <tbody>
                  <tr className=''>
                    <th scope="row">
                      <label htmlFor="inputCurrentPrice" className="form-label">Current Price</label>
                    </th>
                    <td>
                      <input
                        type='text'
                        className='form-control'
                        id="inputCurrentPrice"
                        required
                        name="currentPrice"
                        value={product.currentPrice || ""}
                        onChange={handleProductInputChange}

                      />
                    </td>
                  </tr>
                  <tr className=''>
                    <th scope="row">
                      <label htmlFor="inputPreviousPrice" className="form-label">Previous Price</label>
                    </th>
                    <td>
                      <input
                        type='text'
                        className='form-control'
                        id="inputPreviousPrice"
                        required
                        name="previousPrice"
                        value={product.previousPrice || ""}
                        onChange={handleProductInputChange}
                      />
                    </td>
                  </tr>
                  <tr className=''>
                    <th scope="row">
                      <label htmlFor="inputQuantity" className="form-label">Quantity</label>
                    </th>
                    <td>
                      <input
                        type='text'
                        className='form-control'
                        id="inputQuantity"
                        required
                        name="quantity"
                        value={product.quantity || ""}
                        onChange={handleProductInputChange}
                      />
                    </td>
                  </tr>
                  <tr className=''>
                    <th scope="row">
                      <label htmlFor="inputModel" className="form-label">Model</label>
                    </th>
                    <td>
                      <input
                        type='text'
                        className='form-control'
                        id="inputModel"
                        name="model"
                        value={product.model || ""}
                        onChange={handleProductInputChange}
                      />
                    </td>
                  </tr>
                  {
                    specificationNames.map((specName, index) => {
                      return (
                        <tr key={index}>
                          <th scope="row">
                            <label htmlFor={`input${specName.name}`} className="form-label">{specName.name}</label>
                          </th>
                          <td>
                            <input
                              type='text'
                              id={`input${specName.name}`}
                              name="value"
                              value={specificationValues[index]?.value || ""}
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
              {productImages?.map((image, index) => (
                <div key={index} className=' bg-light rounded rounded-3 p-2 mb-2 border border-3 border-light-subtle'>
                  <div className='mb-3'>
                    <label htmlFor="inputImageUrl" className="form-label">Image Url</label>
                    <input
                      type="text"
                      className="form-control mb-1"
                      id="inputImageUrl"
                      name="imageUrl"
                      value={image.imageUrl}
                      onChange={(e) => handleProductImageChange(index, e)}
                    />
                  </div>
                  <div className='mb-3'>
                    <label htmlFor="inputImageAltText" className="form-label">Alternate Text</label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputImageAltText"
                      name="altText"
                      value={image.altText}
                      onChange={(e) => handleProductImageChange(index, e)}
                    />
                  </div>
                </div>
              ))}
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

export default UpdateProduct
