import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Spinner from '../../components/Spinner';
import { SiAnsys } from 'react-icons/si';

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
      const res = await axios.get("http://localhost:9090/api/v1/admin/category/categories-list", {
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
      const res = await axios.get(`http://localhost:9090/api/v1/admin/subcategory/subcategories-categories/${categoryId}`, {
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
      const res = await axios.get(`http://localhost:9090/api/v1/admin/spec-name/get-names/${subcategoryId}`, {
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
    fetchSpecificationNamesBySubcategoryId();
  }, [subcategoryId])

  const handleCategoryChange = (e) => {
    setCategoryId(e.target.value);
  }

  const handleSubcategoryChange = (e) => {
    setSubcategoryId(e.target.value);
  }
  return (
    <div className=' py-2'>
      <div className='d-flex justify-content-center'>
        <h1 className='text-center mx-auto'>Specification Management</h1>
      </div>
      {loading ? <Spinner /> :
        <div className=' overflow-y-scroll px-2' style={{ height: "450px" }}>
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
          <table className="table">

            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope="col">Specification Name</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {
                specificationNames.map((spec, index) => {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{spec.name}</td>
                      <td>Delete</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      }
    </div>
  )
}

export default SpecificationInfo
