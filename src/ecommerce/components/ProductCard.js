import React, { useState } from 'react'
import "./ProductCard.css"
import PriceTag from './PriceTag'
import { Link, useParams } from 'react-router-dom';

const ProductCard = ({product}) => {
    const [onHover, setOnHover] = useState(false);

    return (
        <Link to={`/product/${product.productId}`} className=' text-decoration-none'>
            <div className={`card card-box ${onHover ? "border-0" : ""}`} style={{ width: "250px"}}>
                <div className=''>
                    <img
                        src={product.productImages[0].imageUrl}
                        className="card-img-top"
                        onMouseEnter={() => setOnHover(true)}
                        onMouseLeave={() => setOnHover(false)}
                        alt={product.productImages[0].altText} />
                </div>
                <div className={`card-body ${onHover ? "hide-over-hover" : ""}`}>
                    <h5 className="">{product.brand.brand}</h5>
                    <p className={`card-text ${onHover ? " d-none" : ""}`}>{product.description}</p>
                    <PriceTag className={`${onHover ? " d-none" : ""}`} currentPrice={product.currentPrice} previousPrice={product.previousPrice} />
                </div>
                {
                    onHover &&
                    <PriceTag className="w-100 py-2 px-3 rounded-3 mt-5" style={{backgroundColor: "#FFC96F"}} currentPrice={product.currentPrice} previousPrice={product.previousPrice} />
                }
            </div>
        </Link>
    )
}
export default ProductCard
