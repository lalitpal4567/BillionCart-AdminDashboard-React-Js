import axios from 'axios';
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import AlertMessageModal from '../../components/AlertMessageModal';

const AddCategory = () => {
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const [imageFiles, setImageFiles] = useState([{ imageFile: null }]);
    const [altTexts, setAltTexts] = useState([{ altText: "" }])
    const [isFileSizeExceeded, setIsFileSizeExceeded] = useState([false]);

    const [category, setCategory] = useState({
        name: "",
        description: "",
    });

    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const token = sessionStorage.getItem('token');

    const addCategory = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (isFileSizeExceeded.some(exceeded => exceeded)) {
            setLoading(false);
            setShowModal(true);
            return;
        }

        const formData = new FormData();
        formData.append('category', new Blob([JSON.stringify({ ...category, altTexts })], { type: 'application/json' }));
        imageFiles.forEach((file) => {
            if (file.imageFile) {
                formData.append('imageFiles', file.imageFile);
            }
        });

        try {
            const res = await axios.post(`http://localhost:9090/api/v1/admin/category/add-category`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            })

            console.log("categoryres",res.data);
            setLoading(false);
            toast.success("Category added successfully!");
            setTimeout(() => navigate("../category"), 2000);
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

    const handleCategoryImageAltTextInputChange = (index, e) => {
        const { type, value, files } = e.target;
        const newImageFiles = [...imageFiles];
        const newAltTexts = [...altTexts];

        if (type === "file") {
            const file = files[0];
            const maxSizeInBytes = 1 * 1024 * 1024;
            newImageFiles[index] = { ...newImageFiles[index], imageFile: files[0] };

            const isExceeded = file.size > maxSizeInBytes;
            const updatedSizeExceeded = [...isFileSizeExceeded];
            updatedSizeExceeded[index] = isExceeded;

            setImageFiles(newImageFiles);
            setIsFileSizeExceeded(updatedSizeExceeded);
        }
        else if (type === "text") {
            newAltTexts[index] = { ...newAltTexts[index], altText: value };
        }
        setAltTexts(newAltTexts);
    };

    const handleRemoveImageField = (index) => {
        const updatedImageFiles = imageFiles.filter((_, i) => i !== index);
        const updatedAltTexts = altTexts.filter((_, i) => i !== index);
        const updatedSizeExceeded = isFileSizeExceeded.filter((_, i) => i !== index);

        setImageFiles(updatedImageFiles);
        setAltTexts(updatedAltTexts);
        setIsFileSizeExceeded(updatedSizeExceeded);

    };

    const handleAddImageField = () => {
        setImageFiles([...imageFiles, { imageFile: null }]);
        setAltTexts([...altTexts, { altText: "" }])
    };

    const handleCloseModal = () => {
        setShowModal(false);
    }

    const handleReset = () => {
        setCategory({
            name: "",
            description: "",
        });

        setImageFiles([{
            imageFile: null
        }])

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }

    return (
        <div className=' p-2'>
            <div className='d-flex justify-content-center'>
                <BackButton to="/admin-dashboard/category" className="" />
                <h1 className='text-center mx-auto'>Add Category</h1>
            </div>
            {loading ? <Spinner /> :
                <div className=' overflow-y-scroll px-2' style={{ height: "450px" }}>
                    <AlertMessageModal
                        onClose={handleCloseModal}
                        show={showModal}
                    />
                    <form className=' w-50' onSubmit={addCategory}>
                        <div className='mb-2'>
                            <label htmlFor="inputCategory" className="form-label">Category Name
                                <span style={{ color: 'red' }}>*</span>
                            </label>
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
                            <label htmlFor="inputDescription" className="form-label">Description
                                <span style={{ color: 'red' }}>*</span>
                            </label>
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
                        <div className="mb-3">
                            <label className="form-label">
                                Image <span style={{ color: 'red' }}>*</span></label>
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
                                                onChange={(e) => handleCategoryImageAltTextInputChange(index, e)}
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
                                                    onChange={(e) => handleCategoryImageAltTextInputChange(index, e)}
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
                            <div className='d-flex justify-content-center gap-4'>
                                <button type="button" className="btn px-4" onClick={handleReset} style={{ backgroundColor: "orange" }}>reset</button>
                                <button type="submit" className="btn btn-success px-4">Add</button>
                            </div>
                        </div>
                    </form>
                </div>
            }
            <ToastContainer />
        </div>
    )
}

export default AddCategory
