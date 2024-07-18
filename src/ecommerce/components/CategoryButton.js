import React from 'react'
import { Link } from 'react-router-dom'

const CategoryButton = ({category, keyIndex}) => {
    return (
        <div className=' p-2 text-center'>
            <div className=' overflow-hidden' style={{ height: "70px", weight: "70px" }}>
                <img
                    src={category.images[0].imageUrl}
                    className=" object-fit-contain w-100 h-100"
                    alt={category.images.altText}
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
                                <li key={`${keyIndex}-${index}`} className=''>
                                    <Link to="###" className="dropdown-item">{subcategory.name}</Link>
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
