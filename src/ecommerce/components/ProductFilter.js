import React, { useEffect } from 'react'

const ProductFilter = ({ productFilter, keyIndex}) => {
  // console.log("hi hello", productFilter.filterType);
  return (
    <div key={keyIndex} className=' pt-3'>
      <p className='mb-0' style={{ fontWeight: "bold" }}>{productFilter.filterName}</p>
      {
        productFilter?.filterType.map((item, index) => {
          return (
            <div key={index} className=' d-flex justify-content-start align-items-center gap-2'>
              <input
                type='checkbox'
                id={`selectFilter-${keyIndex}-${index}`}
                className=' input-checkbox'
                onChange={() => productFilter.handleSelect(item.id)}
              />
              <label htmlFor={`selectFilter-${keyIndex}-${index}`} className='checkbox-label'>{item.name}</label>
            </div>
          )
        })
      }
    </div>
  )
}

export default ProductFilter
