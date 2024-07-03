import React from 'react'
import "./SubcategoryCard.css"
import { Link } from 'react-router-dom'

const SubcategoryCard = () => {
    return (
        <Link to={`/products/:${2}`} className="subcategory-card-main-container text-decoration-none">
            <div className='subcategory-card border border-2 border-light-subtle rounded-5 overflow-hidden'>
                <div className='abc' style={{ width: "150px", height: "150px" }}>
                    <img
                        src='/images/smart_watch.webp'
                        className='object-fit-contain w-100 h-100'
                    />
                </div>
                <p className='mb-0 fs-6 text-center bg-info text-black' style={{ height: "38px" }}>Smart Watch</p>
            </div>
        </Link>
    )
}

export default SubcategoryCard
