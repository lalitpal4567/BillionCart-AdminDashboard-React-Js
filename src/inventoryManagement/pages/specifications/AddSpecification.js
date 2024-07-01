import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Spinner from '../../components/Spinner';
import BackButton from '../../components/BackButton';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const AddSpecification = () => {
    const [subcategories, setSubcategories] = useState([]);
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState();
    const [subcategoryId, setSubcategoryId] = useState("");
    const [loading, setLoading] = useState(false);
    const [specificationNames, setSpecificationNames] = useState([]);
    const [newSpec, setNewSpec] = useState("");

    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const fetchCategories = async () => {
        setLoading(true);
        const res = await axios.get("http://localhost:9090/api/v1/admin/category/categories-list", {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            params: {
                page: 0,
                size: 20
            }
        });
        setLoading(false);
        setCategories(res.data.content);
    }

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

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        if (categoryId) {
            fetchSubcategoriesByCategory();
        } else {
            setSubcategories([]);
        }
    }, [categoryId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await axios.post(`http://localhost:9090/api/v1/admin/spec-name/add-name/${subcategoryId}`, specificationNames, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            setLoading(false);
            toast.success("Specification added successfully");
            setTimeout(() => navigate("/specification-info"), 2000);
        } catch (error) {
            console.log("Error submitting specifications", error);
            toast.error("Error while adding specifications");
            setLoading(false);
        }
    }

    const handleCategoryChange = (e) => {
        setCategoryId(e.target.value);
        setSubcategoryId(null);
        setSubcategories([]);
        setSpecificationNames([]);
    }

    const handleSubcategoryChange = (e) => {
        setSubcategoryId(e.target.value);
        setSpecificationNames([]);
    }

    const handleAddSpec = () => {
        if (newSpec.trim() !== "") {
            setSpecificationNames([...specificationNames, newSpec]);
            setNewSpec("");
        }
    }

    const handleRemoveSpecification = (index) => {
        setSpecificationNames(specificationNames.filter((_, i) => i !== index));
    }

    const handleReset = () =>{
        setSpecificationNames([]);
    }
    return (
        <div className='p-2'>
            <div className='d-flex justify-content-center'>
                <BackButton to="/specification-info" />
                <h1 className='mx-auto'>Add Specification</h1>
            </div>
            <div className='p-3'>
                {loading ? <Spinner /> :
                    <div className='pt-3'>
                        <form className='w-50' onSubmit={handleSubmit}>
                            <select
                                required
                                value={categoryId}
                                onChange={handleCategoryChange}
                                className='mb-3 form-control'
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
                                className='mb-3 form-control'
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

                            {subcategoryId && (
                                <div className="mb-3">
                                    <label htmlFor="newSpec" className="form-label">Add Specification</label>
                                    <div className="d-flex">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="newSpec"
                                            value={newSpec}
                                            onChange={(e) => setNewSpec(e.target.value)}
                                        />
                                        <button type="button" className="btn btn-primary ms-2" onClick={handleAddSpec}>Add</button>
                                    </div>
                                </div>
                            )}

                            {
                                subcategoryId && (
                                    <>
                                        <div className="d-flex flex-wrap overflow-y-scroll" style={{ height: "170px" }}>
                                            {specificationNames.map((spec, index) => (
                                                <div key={index} className="btn btn-outline-secondary m-1 d-flex border border-2 border-black" style={{ height: "40px" }}>
                                                    {spec}
                                                    <button type="button" className="btn-close ms-2" onClick={() => handleRemoveSpecification(index)}></button>
                                                </div>
                                            ))}
                                        </div>
                                        <button type="button" className="btn btn-outline-secondary mt-3 me-2" onClick={handleReset}>Reset</button>
                                        <button type="submit" className="btn btn-success mt-3">Submit</button>
                                    </>
                                )
                            }

                        </form>
                    </div>
                }
            </div>
            <ToastContainer />
        </div>
    );
}

export default AddSpecification;
