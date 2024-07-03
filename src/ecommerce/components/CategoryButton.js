import React from 'react'

const CategoryButton = () => {
    return (
        <div className=' p-2'>
            <div className=' overflow-hidden' style={{ height: "60px", weight: "60px" }}>
                <img
                    src="/images/smart_watch.webp"
                    className=" object-fit-contain w-100 h-100"
                />
            </div>
            <div class="">
                <a class=" dropdown-toggle text-decoration-none" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Dropdow
                </a>
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#">Action</a></li>
                    <li><a class="dropdown-item" href="#">Another action</a></li>
                    <li><a class="dropdown-item" href="#">Something else here</a></li>
                </ul>
            </div>
        </div>
    )
}

export default CategoryButton
