import React, { useEffect, useRef, useState } from 'react'
import { useNavigate} from 'react-router-dom';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';
import AlertMessageModal from '../../components/AlertMessageModal';
import DeleteModal from '../../components/DeleteModal';

const CarouselImage = () => {
    const [loading, setLoading] = useState(false);
    const [carouselImages, setCarouselImages] = useState([]);
    const [DeleteCarouselImageId, setDeleteCarouselImageId] = useState(null);

    const [isFileSizeExceeded, setIsFileSizeExceeded] = useState([false]);
    const [isAllFilesSelected, setIsAllFilesSelected] = useState(false);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAlertModal, setShowAlertModal] = useState(false);

    const [imageFiles, setImageFiles] = useState([{ imageFile: null }])
    const [altTexts, setAltTexts] = useState([{
        altText: ""
    }])

    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    // const token = localStorage.getItem('token');
    const token = sessionStorage.getItem('token');

    const fetchCarouselImages = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`http://localhost:9090/api/v1/noauth/carousel/carousel-images-list`, {
                params: {
                    page: 0,
                    size: 10
                }
            });
            setLoading(false);
            setCarouselImages(res.data.content);
        } catch (error) {
            setLoading(false);
            console.log("error while fetching carousel images ", error);
        }
    }

    useEffect(() => {
        fetchCarouselImages();
    }, []);


    useEffect(() => {
        checkAllFilesSelected();
    }, [imageFiles]);


    const addCarouselImages = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (isFileSizeExceeded.some(exceeded => exceeded)) {
            setLoading(false);
            setShowAlertModal(true);
            return;
        }

        const formData = new FormData();
        formData.append('altTexts', new Blob([JSON.stringify(altTexts)], { type: 'application/json' }));
        imageFiles.forEach((file) => {
            if (file.imageFile) {
                formData.append('imageFiles', file.imageFile);
            }
        });

        try {
            const res = await axios.post(`http://localhost:9090/api/v1/admin/carousel/add-carousel-image`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            })

            setLoading(false);
            toast.success("Carousel images added successfully!");
            fetchCarouselImages();
            handleResetImages();
        } catch (error) {
            console.log("Error while adding carousel images: ", error);
            toast.error("Error while adding carousel images");
            setLoading(false);
        }
    }

    const removeCarouselImage = async (imageId) => {
        setLoading(true);
        try {
            const res = await axios.delete(`http://localhost:9090/api/v1/admin/carousel/remove-carousel-image/${imageId}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            setLoading(false);
            toast.success("Carousel image removed successfully");
            fetchCarouselImages();
        } catch (error) {
            setLoading(false);
            console.log("Error while removing carousel image", error);
            toast.error("Error while removing carousel image");
        }
    }

    const handleCarouselImageAltTextInputChange = (index, e) => {
        const { type, value, files } = e.target;
        const newImageFiles = [...imageFiles];
        const newAltTexts = [...altTexts];

        if (type === "file") {
            if (files && files[0]) {
                const file = files[0];
                const maxSizeInBytes = 10 * 1024 * 1024;

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

    const checkAllFilesSelected = () => {
        const allSelected = imageFiles.every(file => file.imageFile !== null);
        setIsAllFilesSelected(allSelected);
    };

    const handleCloseModal = () => {
        setShowDeleteModal(false);
        setShowAlertModal(false);
        setDeleteCarouselImageId(null);
    }

    const handleResetImages = () => {
        setImageFiles([{ imageFile: null }]);
        setAltTexts([{ altText: "" }]);
        setIsFileSizeExceeded([false]);
        setIsAllFilesSelected(false);
    }

    return (
        <div className='p-2 border border-2 border-danger'>
            <div className='d-flex justify-content-center'>
                {/* <BackButton to="/subcategory" /> */}
                <h1 className='mx-auto'>Carousel Management</h1>
            </div>
            {loading ? <Spinner /> :
                <div className='overflow-y-scroll' style={{ height: "450px" }}>
                    <AlertMessageModal
                        onClose={handleCloseModal}
                        show={showAlertModal}
                    />
                    <DeleteModal
                        show={showDeleteModal}
                        onClose={handleCloseModal}
                        onConfirm={removeCarouselImage}
                    />
                    <div className=' d-flex flex justify-content-evenly ' >
                        <div className=' border border-3 border-light-subtle p-2' style={{ width: "50%" }}>
                            {
                                carouselImages.map((image, index) => {
                                    return (
                                        <div key={index} className='d-flex flex-column gap-3 justify-content-between border border-2 border-light-subtle mt-3 '>
                                            <div className='' style={{ height: "130px", width: "100%" }}>
                                                <img src={image.imageUrl} className=' object-fit-cover w-100 h-100' />
                                            </div>
                                            <div className=' d-flex justify-content-center gap-3'>
                                                <button type='button' className='btn btn-danger' onClick={() => removeCarouselImage(image.imageUrlId)}>Delete</button>
                                                <button type='button' className='btn btn-outline-warning' onClick={() => removeCarouselImage(image.imageUrlId)}>Delete</button>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className='px-2' style={{ width: "50%" }}>
                            <form className=' w-100' onSubmit={addCarouselImages} >
                                <div className="mb-3">
                                    <label className="form-label">Image</label>
                                    {
                                        imageFiles.map((image, index) => (
                                            <div key={index} className=' bg-light rounded rounded-3 p-2 mb-2 border border-3 border-light-subtle' >
                                                <div className="mb-2">
                                                    <label htmlFor="inputImageFile" className="form-label">Image File</label>
                                                    <input
                                                        type="file"
                                                        className="form-control"
                                                        required
                                                        id="inputImageFile"
                                                        name="imageFile"
                                                        ref={fileInputRef}
                                                        accept="image/jpg, image/jpeg, image/png"
                                                        onChange={(e) => handleCarouselImageAltTextInputChange(index, e)}
                                                    />
                                                </div>
                                                <div className=' d-flex flex-column justify-content-between flex-wrap pt-2'>
                                                    <div className="mb-3">
                                                        <label htmlFor="inputAltText" className="form-label">Alt Text</label>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="inputAltText"
                                                            required
                                                            name="altText"
                                                            value={altTexts[index].altText || ""}
                                                            onChange={(e) => handleCarouselImageAltTextInputChange(index, e)}
                                                        />
                                                        {index === 0 && isFileSizeExceeded[index] &&
                                                            <p className=' text-danger ms-3'>Size exceeded!!!</p>
                                                        }
                                                    </div>
                                                    <div className='' style={{ width: "100%", height: "120px" }}>
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
                                <div className=' d-flex justify-content-center gap-4'>
                                    <button type='button' className=' btn btn-secondary' onClick={handleResetImages}>Reset</button>
                                    <button type='submit' className=' btn btn-success' disabled={!isAllFilesSelected}>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div >
            }
            <ToastContainer />
        </div>
    )
}
export default CarouselImage
