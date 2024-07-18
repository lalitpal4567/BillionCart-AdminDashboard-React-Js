import React, { useEffect, useState } from 'react'
import CategoryCard from './CategoryCard'
import axios from 'axios';

const CategoryGroup = () => {
    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        try {
            const res = await axios.get("http://localhost:9090/api/v1/noauth/category/active-categories-list");
            setCategories(res.data.Categories);
        } catch (error) {
            console.log("error while fetching categories", error);
        }
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div className=''> 
            {
                categories.map((category, index) => {
                    return (
                        <CategoryCard keyIndex={index} category={category} />
                    )
                })
            }
        </div>
    )
}

export default CategoryGroup
