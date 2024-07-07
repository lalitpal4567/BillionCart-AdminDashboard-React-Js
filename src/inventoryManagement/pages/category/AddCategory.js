import axios from 'axios';
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';

const AddCategory = () => {
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState({
        name: "",
        description: "",
        altText: ""
    });

    const [imageFile, setImageFile] = useState(null);
    const fileInputRef = useRef(null);

    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const addCategory = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('category', new Blob([JSON.stringify(category)], { type: 'application/json' }));
        formData.append('imageFile', imageFile);

        try {
            await axios.post(`http://localhost:9090/api/v1/admin/category/add-category`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            })
            setLoading(false);
            toast.success("Category added successfully!");
            setTimeout(() => navigate("/category"), 2000);
        } catch (error) {
            console.log("Error while adding category: ", error);
            toast.error("Error while adding category");
            setLoading(false);
        }
    }

    const handleCategoryInputChange = (e) => {
        const { name, value } = e.target;
        setCategory(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCategoryImageInputChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
    }

    const handleReset = () => {
        setCategory({
            name: "",
            description: "",
            altText: ""
        });
        setImageFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }

    return (
        <div className=' p-2'>
            <div className='d-flex justify-content-center'>
                <BackButton to="/category" className="" />
                <h1 className='text-center mx-auto'>Add Category</h1>
            </div>
            {loading ? <Spinner /> :
                <div className=' overflow-y-scroll px-2' style={{ height: "450px" }}>
                    <form className=' w-50' onSubmit={addCategory}>
                        <div className='mb-2'>
                            <label htmlFor="inputCategory" className="form-label">Category Name</label>
                            <input
                                type="text"
                                id="inputCategory"
                                name="name"
                                aria-describedby="categoryHelp"
                                className="form-control"
                                value={category.name}
                                required
                                onChange={handleCategoryInputChange}
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="inputDescription" className="form-label">Description</label>
                            <textarea
                                type="text"
                                className="form-control"
                                id="inputDescription"
                                name="description"
                                value={category.description}
                                rows="4"
                                required
                                style={{ resize: 'none' }}
                                onChange={handleCategoryInputChange}
                            />
                        </div>
                        <div className=' bg-light rounded rounded-3 p-2 mb-2 border border-3 border-light-subtle'>
                            <div className="mb-2">
                                <label htmlFor="inputImageFile" className="form-label">Image File</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="inputImageFile"
                                    name="imageFile"
                                    ref={fileInputRef}
                                    accept="image/jpg, image/jpeg, image/png"
                                    onChange={handleCategoryImageInputChange}
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
                                        value={category.altText}
                                        onChange={handleCategoryInputChange}
                                    />
                                </div>
                                <div className='' style={{ width: "200px", height: "120px" }}>
                                    <img
                                        src={imageFile ? URL.createObjectURL(imageFile) : '/images/image_photo.jpg'}
                                        className=' object-fit-cover w-100 h-100'
                                        alt='image'
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='d-flex justify-content-center gap-4'>
                            <button type="button" className="btn px-4" onClick={handleReset} style={{ backgroundColor: "orange" }}>reset</button>
                            <button type="submit" className="btn btn-success px-4">Add</button>
                        </div>
                    </form>
                </div>
            }
            <ToastContainer />
        </div>
    )
}

export default AddCategory
