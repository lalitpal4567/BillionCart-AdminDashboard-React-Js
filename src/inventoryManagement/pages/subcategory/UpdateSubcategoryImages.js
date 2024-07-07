import React, { useEffect, useRef, useState } from 'react'
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateSubcategoryImages = () => {
    const [loading, setLoading] = useState(false);
    const [subcategoryImages, setSubcategoryImages] = useState([]);
    const [imageFiles, setImageFiles] = useState([{ imageFile: null }])
    const [altTexts, setAltTexts] = useState([{
        altText: ""
    }])

    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const { id } = useParams();

    const fetchSubcategoryImages = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`http://localhost:9090/api/v1/admin/subcategory/get-subcategory-images/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "Application/json"
                }
            });
            setLoading(false);
            setSubcategoryImages(res.data.SubcategoryImages);
            console.log("eeee", subcategoryImages);
        } catch (error) {
            setLoading(false);
            console.log("error: ", error);
        }
    }

    useEffect(() => {
        fetchSubcategoryImages();
    }, []);

    useEffect(() => {
        console.log("yes", subcategoryImages);
    }, [subcategoryImages]);

    const addSubcategoryimages = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('altTexts', new Blob([JSON.stringify(altTexts)], { type: 'application/json' }));
        imageFiles.forEach((file) => {
            if (file.imageFile) {
                formData.append('imageFiles', file.imageFile);
            }
        });

        try {
            const res = await axios.post(`http://localhost:9090/api/v1/admin/subcategory/add-subcategory-images/${id}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            })

            setLoading(false);
            toast.success("Subcategory images added successfully!");
            setTimeout(() => navigate(`/subcategory-info/${id}`), 2000);
        } catch (error) {
            console.log("Error while adding subcategory images: ", error);
            toast.error("Error while adding subcategory images");
            setLoading(false);
        }
    }

    const removeSubcategoryImage = async(imageId) =>{
        setLoading(true);
        try {
            const res = await axios.delete(`http://localhost:9090/api/v1/admin/subcategory/remove-subcategory-image/${imageId}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            setLoading(false);
            toast.success("Subcategory image removed successfully");
        } catch (error) {
            setLoading(false); 
            console.log("Error while removing subcategory image", error);
            toast.error("Error while removing subcategory image");
        }
    }

    const handleSubcategoryImageAltTextInputChange = (index, e) => {
        const { type, value, files } = e.target;
        const newImageFiles = [...imageFiles];
        const newAltTexts = [...altTexts];

        if (type === "file") {
            newImageFiles[index] = { ...newImageFiles[index], imageFile: files[0] };
        }
        if (type === "text") {
            newAltTexts[index] = { ...newAltTexts[index], altText: value };
        }
        setImageFiles(newImageFiles);
        setAltTexts(newAltTexts);
    };

    const handleAddImageField = () => {
        setImageFiles([...imageFiles, { imageFile: null }]);
        setAltTexts([...altTexts, { altText: "" }])
    };

    const handleRemoveImageField = (index) => {
        const updatedImageFiles = imageFiles.filter((_, i) => i !== index);
        const updatedAltTexts = altTexts.filter((_, i) => i !== index);
        setImageFiles(updatedImageFiles);
        setAltTexts(updatedAltTexts);
    };

    const handleResetImages = () => {
        setImageFiles({ imageFile: null });
        setAltTexts({ altText: "" });
    }

    return (
        <div className='p-2 border border-2 border-danger'>
            <div className='d-flex justify-content-center'>
                <BackButton to="/subcategory" />
                <h1 className='mx-auto'>Add Subcategory Images</h1>
            </div>
            {loading ? <Spinner /> :

                <div className='overflow-y-scroll' style={{ height: "450px" }}>
                    <div className=' d-flex justify-content-evenly ' >
                        <div className=' border border-3 border-light-subtle p-2' style={{ width: "50%" }}>
                            {
                                subcategoryImages.map((image, index) => {
                                    return (
                                        <div key={index} className='d-flex align-items-center justify-content-between border border-2 border-light-subtle '>
                                            <div className='' style={{ height: "130px", width: "200px" }}>
                                                <img src={image.imageUrl} className=' object-fit-cover w-100 h-100' />
                                            </div>
                                            <button type='button' className='btn btn-danger' onClick={() => removeSubcategoryImage(image.imageUrlId)}>Delete</button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div>
                            <div className='px-2'>
                                <form className=' w-100' onSubmit={addSubcategoryimages} >
                                    <div className="mb-3">
                                        <label className="form-label">Image</label>
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
                                                            ref={fileInputRef}
                                                            accept="image/jpg, image/jpeg, image/png"
                                                            onChange={(e) => handleSubcategoryImageAltTextInputChange(index, e)}
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
                                                                value={altTexts[index].altText || ""}
                                                                onChange={(e) => handleSubcategoryImageAltTextInputChange(index, e)}

                                                            />
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
                                                        <button type="button" className="btn btn-danger mt-2" onClick={() => handleRemoveImageField(index)}>Remove</button>
                                                    )}
                                                </div>
                                            ))}
                                        <button type="button" className="btn btn-primary" onClick={handleAddImageField}>Add more</button>
                                    </div>
                                    <div className=' d-flex justify-content-center gap-4'>
                                        <button type='button' className=' btn btn-secondary' onClick={handleResetImages}>Reset</button>
                                        <button type='submit' className=' btn btn-success'>Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div >
            }
            <ToastContainer />
        </div>
    )
}

export default UpdateSubcategoryImages
