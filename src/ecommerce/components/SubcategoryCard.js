import React from 'react'
import "./SubcategoryCard.css"
import { Link } from 'react-router-dom'

// const SubcategoryCard = ({ subcatImage, keyIndex, subcatId }) => {
    const SubcategoryCard = ({ subcategory, keyIndex }) => {
    return (
        <div key={keyIndex * 200} className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ width: "150px" }}>
            <div className="carousel-inner">
                {
                    subcategory?.subcategoryImages.map((image, index) => {
                        return (
                            <div key={`${(keyIndex + index )* 10000}`} data-bs-interval="1000" className={index === 0 ? "carousel-item active " : "carousel-item"}>
                                <Link to={`/products/${subcategory.subcategoryId}`} className="subcategory-card-main-container text-decoration-none ">
                                    <div className='border border-2 border-light-subtle rounded-5 overflow-hidden'>
                                        <div className='image-container p-1' style={{ width: "140px", height: "140px" }}>
                                            <img
                                                src={image.imageUrl}
                                                className='object-fit-contain w-100 h-100 d-block'
                                                alt="subcategory images"
                                            />
                                        </div>
                                        <p className='mb-0 fs-6 text-center bg-info text-black' style={{ height: "38px" }}>{subcategory.name}</p>
                                    </div>
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default SubcategoryCard


// <Link to={`/products/:${2}`} className="subcategory-card-main-container text-decoration-none">
//     <div className='subcategory-card border border-2 border-light-subtle rounded-5 overflow-hidden'>
//         <div className='abc' style={{ width: "150px", height: "150px" }}>
//             <img
//                 src='/images/smart_watch.webp'
//                 className='object-fit-contain w-100 h-100 d-block'
//             />
//         </div>
//         <p className='mb-0 fs-6 text-center bg-info text-black' style={{ height: "38px" }}>Smart Watch</p>
//     </div>
// </Link>