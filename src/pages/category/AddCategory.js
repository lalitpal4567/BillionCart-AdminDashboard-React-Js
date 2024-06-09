import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';

const AddCategory = () => {
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState({
        name: '',
        description: '',
        imageUrl: '',
    });

    const navigate = useNavigate();
    // const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxMDAiLCJpYXQiOjE3MTc2NjEyMTIsImV4cCI6MTcxODI2NjAxMn0.YqYaETEwdzEXDzeFqifeQK55rOQu0xEnWI3KfhC7kdsSCA_Kz-l0U26362cIgF6Ammn5gGshjDDtg8Xqv347WA"

    const token = localStorage.getItem('token');

    const addCategory = async (e) => {
        e.preventDefault();
        setLoading(true);
        const res = await axios.post(`http://localhost:9090/api/v1/admin/category/add-category`, category, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })
        setLoading(false);
        navigate("/category");
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCategory(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleReset = () => {
        setCategory({
            name: '',
            description: '',
            imageUrl: '',
        });
    }

        return (
            <div className=' p-2'>
                <div className='d-flex justify-content-center'>
                    <BackButton to="/category" className="" />
                    <h1 className='text-center mx-auto'>Add Category</h1>
                </div>
                {loading ? <Spinner /> :
                    <form className=' w-50' onSubmit={addCategory}>
                        <div className='mb-3'>
                            <label htmlFor="inputCategory" className="form-label">Category Name</label>
                            <input
                                type="text"
                                id="inputCategory"
                                name="name"
                                aria-describedby="categoryHelp"
                                className="form-control"
                                value={category.name}
                                required
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputDescription" className="form-label">Description</label>
                            <textarea
                                type=""
                                className="form-control"
                                id="inputDescription"
                                name="description"
                                value={category.description}
                                rows="4"
                                required
                                style={{ resize: 'none' }}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputImageUrl" className="form-label">Image Url</label>
                            <input
                                type=""
                                className="form-control"
                                id="inputImageUrl"
                                name="imageUrl"
                                value={category.imageUrl}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className='d-flex justify-content-center gap-4'>
                            <button type="button" className="btn px-4" onClick={handleReset} style={{ backgroundColor: "orange" }}>reset</button>
                            <button type="submit" className="btn btn-success px-4">Add</button>
                        </div>
                    </form>
                }
            </div>
        )
    }

    export default AddCategory
