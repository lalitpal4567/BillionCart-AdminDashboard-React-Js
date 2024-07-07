import React, { useState } from 'react'
import "./ProductCard.css"
import PriceTag from './PriceTag'
import { Link } from 'react-router-dom';
import Color from '../../inventoryManagement/pages/color/Color';

const ProductCard = () => {
    const [onHover, setOnHover] = useState(false);

    return (
        <Link to="##" className=' text-decoration-none'>
            <div className={`card card-box ${onHover ? "border-0" : ""}`} style={{ width: "250px"}}>
                <div className=''>
                    <img
                        src="/images/fastrack.png"
                        className="card-img-top"
                        onMouseEnter={() => setOnHover(true)}
                        onMouseLeave={() => setOnHover(false)}
                        alt="..." />
                </div>
                <div className={`card-body ${onHover ? "hide-over-hover" : ""}`}>
                    <h5 className="">Noise</h5>
                    <p className={`card-text description-text ${onHover ? " d-none" : ""}`}>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <PriceTag className={`${onHover ? " d-none" : ""}`} currentPrice={11000} previousPrice={10000} />
                </div>
                {
                    onHover &&
                    <PriceTag className="w-100 py-2 px-3 rounded-3 mt-5" style={{backgroundColor: "#FFC96F"}} currentPrice={11000} previousPrice={10000} />
                }
            </div>
        </Link>
    )
}
export default ProductCard
