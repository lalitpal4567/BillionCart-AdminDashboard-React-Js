import React from 'react'
import { Link } from 'react-router-dom'

const CategoryButton = ({category}) => {
    return (
        <div className=' p-2 text-center'>
            <div className=' overflow-hidden' style={{ height: "70px", weight: "70px" }}>
                <img
                    src={category.imageUrl}
                    className=" object-fit-contain w-100 h-100"
                    alt={category.altText}
                />
            </div>
            <div className="">
                <a className=" dropdown-toggle text-decoration-none text-black" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {category.name}
                </a>
                <ul className="dropdown-menu">
                    {
                        category.subcategories.map((subcategory, index) =>{
                            return (
                                <li className=''>
                                    <Link to="###" className="dropdown-item" href="#">{subcategory.name}</Link>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default CategoryButton
