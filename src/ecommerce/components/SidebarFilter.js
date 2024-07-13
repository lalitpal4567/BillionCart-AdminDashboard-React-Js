import React from 'react'
import ProductFilter from './ProductFilter'

const SidebarFilter = ({ availableBrands, availableColors, handleBrandSelect, handleColorSelect }) => {
  const filterCollection = [
    { filterName: 'Brands', filterType: availableBrands, handleSelect: handleBrandSelect },
    { filterName: 'Colors', filterType: availableColors, handleSelect: handleColorSelect }
  ];

  return (
    <div className='border border-2 border-danger'>
      {filterCollection.map((filter, index) => (
        <ProductFilter
          key={index}
          productFilter={filter}
          keyIndex={index}
        />
      ))}
    </div>
  )
}

export default SidebarFilter
