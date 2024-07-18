import React, { useEffect, useState } from 'react'
import CategoryButton from './CategoryButton'
import axios from 'axios';

const CategoryNavbar = () => {
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
 
  useEffect(() =>{
    console.log("hello hi ", categories);
  }, [categories]);

  return (
    <div className=' d-flex justify-content-center gap-5' style={{paddingTop: "70px"}}>
      {
        categories.map((category, index) => {
          return (
            <CategoryButton key={index} keyIndex={index} category={category} />
          )
        })
      }

    </div>
  )

}

export default CategoryNavbar
