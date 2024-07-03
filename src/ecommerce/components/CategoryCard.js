import React from 'react'
import SubcategoryCard from './SubcategoryCard'
import "./CategoryCard.css"

const CategoryCard = () => {
    return (
        <div className=' rounded-3 ' style={{backgroundColor: "#F2F1EB"}}>
            <p className=' text-center fs-1 '>Electronics</p>
            <div className='subcategory-card-container d-flex justify-content-evenly flex-wrap bg-light p-3 rounded-4'>
                <SubcategoryCard />
                <SubcategoryCard />
                <SubcategoryCard />
                <SubcategoryCard />
            </div>
        </div>
    )
}

export default CategoryCard
