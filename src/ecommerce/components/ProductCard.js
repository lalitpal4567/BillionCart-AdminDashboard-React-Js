import React, { useState } from 'react'
import "./ProductCard.css"
import PriceTag from './PriceTag'
import { Link } from 'react-router-dom';

const ProductCard = () => {
    const [isHovered, setIsHovered] = useState(false);

    // return (
    //     <div className="card" style={{ width: "250px" }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
    //         <div className=' border border-2 border-danger bg-danger'>
    //             <img src="/images/smart_watch.webp" className="card-img-top" alt="..." />
    //         </div>
    //         <div className="card-body">
    //             <h5 className="">Noise</h5>
    //             <p className="card-text description-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    //             <PriceTag currentPrice={11000} previousPrice={10000}/>
    //         </div>
    //     </div>
    // )
    return (
        <Link to="####" className=' text-decoration-none'>
            <div
                className={`card ${isHovered ? 'zoom-in overflow-visible border-0' : ''}`}
                style={{ width: "250px" }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div>
                    <img
                        src="/images/fastrack.png"
                        className={`card-img-top `}
                        alt="..."
                        style={{ transition: "transform 0.3s ease-in-out" }}
                    />
                </div>
                <div className={`card-body ${isHovered ? 'hidden' : ''}`} style={{ transition: "opacity 0.3s ease-in-out" }}>
                    <h5 className="">Noise</h5>
                    <p className="card-text description-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <PriceTag currentPrice={1800} previousPrice={2000} />
                </div>
            </div>
        </Link>
    );
}
export default ProductCard
