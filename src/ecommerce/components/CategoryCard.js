import React from 'react'
import SubcategoryCard from './SubcategoryCard'
import "./CategoryCard.css"
import axios from 'axios'

const CategoryCard = ({keyIndex, category}) => {
    const fetchSubcategoryByCategoryId = async() =>{
        try {
            const res = await axios.get(`http://localhost:9090/api/v1/subcategory/subcategories-categories/${category.categoryId}`, {
                params: {
                    page: 0,
                    size: 10
                }
            })
        } catch (error) {
            
        }
    }
    return (
        <div key={keyIndex} className=' rounded-3 pt-4' style={{backgroundColor: "#F2F1EB"}}>
            <p className=' text-center fs-1 '>{category.name}</p>
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
