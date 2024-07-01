import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className="sidebar border border-1 border-black">
            <div className="list-group" style={{ backgroundColor: "grey" }}>
                <Link to="/dashboard" className="list-group-item list-group-item-action" style={{ backgroundColor: "grey" }}>Dashboard</Link>
                <Link to="/user" className="list-group-item list-group-item-action">User</Link>
                <Link to="/brand" className="list-group-item list-group-item-action">Brand</Link>
                <Link to="/color" className="list-group-item list-group-item-action">Color</Link>
                <Link to="/product" className="list-group-item list-group-item-action">Product</Link>
                <Link to="/category" className="list-group-item list-group-item-action">Category</Link>
            </div>
            <div className="accordion" id="accordionExample">
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <button className="accordion-button bg-white" style={{ height: "40px" }} type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Subcategory & Specifications
                        </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                        <div className="list-group">
                            <Link to="/subcategory" className="list-group-item list-group-item-action">Subcategory</Link>
                            <Link to="/specification-info" className="list-group-item list-group-item-action">Specifications</Link>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
