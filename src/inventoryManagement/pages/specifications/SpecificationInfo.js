import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Spinner from '../../components/Spinner';
import { IoInformationCircleSharp } from "react-icons/io5";
import { RiEdit2Fill } from "react-icons/ri";
import { AiFillDelete } from "react-icons/ai";
import { SiAnsys } from 'react-icons/si';
import { Link } from 'react-router-dom';
import AddButton from '../../components/AddButton';

const SpecificationInfo = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [specificationNames, setSpecificationNames] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [subcategoryId, setSubcategoryId] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('token');

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:9090/api/v1/noauth/category/categories-list", {
        params: {
          page: 0,
          size: 10
        }
      });
      setLoading(false);
      setCategories(res.data.content);
    } catch (error) {
      console.log("fetchCategories", error);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, [])

  const fetchSubcategoriesByCategory = async () => {
    if (!categoryId) return;
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:9090/api/v1/noauth/subcategory/subcategories-category/${categoryId}`, {
        params: {
          page: 0,
          size: 10
        }
      });
      setLoading(false);
      setSubcategories(res.data.content);
      console.log(res.data.content);
    } catch (error) {
      console.log("fetchSubcategoriesByCategory", error);
    }
  }

  const fetchSpecificationNamesBySubcategoryId = async () => {
    if (!subcategoryId) return;
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:9090/api/v1/noauth/spec-name/get-names/${subcategoryId}`, {
        params: {
          page: 0,
          size: 10
        }
      });
      setLoading(false);
      setSpecificationNames(res.data.SpecificationName);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (categoryId) {
      fetchSubcategoriesByCategory();
    } else {
      setSubcategories([]);
    }
  }, [categoryId]);

  useEffect(() => {
    if (subcategoryId) {
      fetchSpecificationNamesBySubcategoryId();
    } else {
      setSpecificationNames([]);
    }
  }, [subcategoryId])

  const handleCategoryChange = (e) => {
    setCategoryId(e.target.value);
    setSubcategoryId(null);
    setSubcategories([]);
    setSpecificationNames([]);
  }

  const handleSubcategoryChange = (e) => {
    setSubcategoryId(e.target.value);
  }
  return (
    <div className=' py-2'>
      <h1 className='text-center mx-auto'>Specification Management</h1>
      <div className=' p-3'>
        <AddButton btnName="Add Specification" pathlink="/add-specification" />
        {loading ? <Spinner /> :
          <div className=' pt-3'>
            <form className=' w-50'>
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
            </form>
            <table className="table table-hover caption-top">
                <caption>List of Specifications</caption>
              <thead className='table-info'>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Specification Name</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody className=' overflow-y-scroll px-2 table-group-divider' style={{ height: "100px" }}>
                {
                  specificationNames.map((spec, index) => {
                    return (
                      <tr key={index} style={{ cursor: "pointer" }}>
                        <td>{index + 1}</td>
                        <td>{spec.name}</td>
                        <td>
                          <div className='d-flex justify-content-between'>
                            <Link to={`/update-specification/${subcategoryId}`}><RiEdit2Fill className='fs-4 text-success' /></Link>
                            <AiFillDelete className='fs-4 text-danger' />
                          </div>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        }
      </div>
    </div>
  )
}

export default SpecificationInfo
