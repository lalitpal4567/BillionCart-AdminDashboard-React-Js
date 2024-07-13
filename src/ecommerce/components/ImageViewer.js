import React, { useState, useEffect } from 'react';
import './ImageViewer.css'; // Assuming you have a CSS file for styling

const ImageViewer = ({ images }) => {
    const [selectedImage, setSelectedImage] = useState({});
    const [zoomStyle, setZoomStyle] = useState({ display: 'none', backgroundPosition: '0% 0%' });

    useEffect(() => {
        if (images && images.length > 0) {
            setSelectedImage(images[0]);
        }
    }, [images]);

    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.target.getBoundingClientRect();
        const x = ((e.pageX - left) / width) * 100;
        const y = ((e.pageY - top) / height) * 100;
        setZoomStyle({
            display: 'block',
            backgroundPosition: `${x}% ${y}%`,
            backgroundImage: `url(${selectedImage.imageUrl})`
        });
    };

    const handleMouseLeave = () => {
        setZoomStyle({ display: 'none', backgroundPosition: '0% 0%' });
    };

    return (
        <>
            <div className='row d-flex justify-content-center'>
                <div
                    className='zoom-container'
                    style={{ height: "350px", width: "350px", position: 'relative' }}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                >
                    <img
                        src={selectedImage.imageUrl}
                        className='w-100 h-100 object-fit-cover'
                        alt={selectedImage.altText}
                    />
                    <div className='zoom-image' style={zoomStyle}></div>
                </div>
            </div>
            <div className=' row'>
                <div className='d-flex justify-content-center gap-2 pt-3'>
                    {
                        images?.map((image, index) => {
                            return (
                                <div key={index} className='' style={{ height: "60px", width: "60px" }}>
                                    <img
                                        className='w-100 h-100 object-fit-cover border border-2 border-light-sublte rounded-4'
                                        src={image.imageUrl}
                                        alt={image.altText}
                                        onMouseEnter={() => setSelectedImage(image)}
                                    />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    );
}

export default ImageViewer;
