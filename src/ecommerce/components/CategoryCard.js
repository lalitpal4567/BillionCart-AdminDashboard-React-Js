import React, { useEffect, useState } from 'react'
import SubcategoryCard from './SubcategoryCard'
import "./CategoryCard.css"
import axios from 'axios'

const CategoryCard = ({keyIndex, category}) => {
    const [subcategories, setSubcategories] = useState([]);

    const fetchSubcategoryByCategoryId = async() =>{
        try {
            const res = await axios.get(`http://localhost:9090/api/v1/noauth/active-subcategory/subcategories-list-category/${category.categoryId}`);
            setSubcategories(res.data.Subcategories);
        } catch (error) {
            console.log("error while fetching subcategories", error);
        }
    }

    useEffect(() =>{
        fetchSubcategoryByCategoryId();
    }, []);

    return (
        <div key={keyIndex} className=' rounded-3 pt-4' style={{backgroundColor: "#F2F1EB"}}>
            <p className=' text-center fs-1 '>{category.name}</p>
            <div className='subcategory-card-container d-flex justify-content-evenly flex-wrap bg-light p-3 rounded-4'>
                {
                    subcategories.map((subcategory, index) =>{
                        return (
                            <SubcategoryCard keyIndex={`${(keyIndex + index) * 1000}`} subcatImage={subcategory.subcategoryImages} subcatId={subcategory.subcategoryId}/>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default CategoryCard
