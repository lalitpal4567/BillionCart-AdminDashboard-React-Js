import React from 'react'
import "./PriceTag.css"

const CurrencyFormatter = ({ price }) => {
    return (
        Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 2
        }).format(price).replace(/\.00$/, '')
    );
};

// Function to calculate discount percentage
const calculateDiscount = (currentPrice, previousPrice) => {
    if (previousPrice <= 0 || currentPrice >= previousPrice) return 0;
    return ((previousPrice - currentPrice) / previousPrice) * 100;
};

const PriceTag = ({style, className, currentPrice, previousPrice }) => {
    const discount = calculateDiscount(currentPrice, previousPrice).toFixed(0);
    const tag = `d-flex justify-content-start align-items-end gap-3 flex-wrap ${className}`
    return (
        <div className={tag} style={{fontSize: "17px", backgroundColor: style?.backgroundColor}}>
            <span className='currentPrice'>
                <CurrencyFormatter price={currentPrice} />
            </span>
            <span className='label text-light-emphasis'>
                <CurrencyFormatter price={previousPrice} />
            </span>
            <span className='discount'>{discount}% Off</span>
        </div>
    );
}

export default PriceTag
