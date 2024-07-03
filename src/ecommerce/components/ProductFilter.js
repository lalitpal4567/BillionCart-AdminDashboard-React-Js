import React from 'react'
import CheckboxFilter from './CheckboxFilter'

const ProductFilter = () => {
  return (
    <div className=' pt-3'>
      <p className='mb-0' style={{fontWeight: "bold"}}>Brands</p>
      <CheckboxFilter/>
      <CheckboxFilter/>
      <CheckboxFilter/>
      <CheckboxFilter/>
      <CheckboxFilter/>
    </div>
  )
}

export default ProductFilter
