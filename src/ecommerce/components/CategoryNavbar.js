import React, { useEffect, useState } from 'react'
import CategoryButton from './CategoryButton'
import axios from 'axios';

const CategoryNavbar = () => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:9090/api/v1/noauth/category/categories-list", {
        params: {
          page: 0,
          size: 10
        }
      });
      setCategories(res.data.content);
    } catch (error) {
      console.log("error while fetching categories", error);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);
 
  return (
    <div className=' d-flex justify-content-center gap-5' style={{paddingTop: "70px"}}>
      {
        categories.map((category, index) => {
          return (
            <CategoryButton category={category} />
          )
        })
      }

    </div>
  )

}

export default CategoryNavbar
