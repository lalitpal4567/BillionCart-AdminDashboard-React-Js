import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Carousel = () => {
    const [carouselImages, setCarouselImages] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const pageSize = 15;

    const fetchCarouselImages = async () => {
        try {
            const res = await axios.get("http://localhost:9090/api/v1/noauth/carousel/carousel-images-list", {
                params: {
                    page: currentPage,
                    size: pageSize
                }
            });
            setCarouselImages(res.data.content);
        } catch (error) {
            console.log("error", error);
        }
    }

    useEffect(() =>{
        fetchCarouselImages();
    }, []);

    return (
        <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                {
                    carouselImages.map((image, index) => {
                        return (
                            <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                                <img src={image.imageUrl} className="d-block w-100" alt="..." />
                            </div>
                        )
                    })
                }
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )
}

export default Carousel
