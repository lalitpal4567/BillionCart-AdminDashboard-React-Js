import React from 'react'
import "./CheckboxFilter.css"

const CheckboxFilter = () => {
    return (
        <div className=' d-flex justify-content-start align-items-center gap-2'>
            <input
                type='checkbox'
                className=' input-checkbox'
            />
            <label className='checkbox-label'>Noise</label>
        </div>
    )
}

export default CheckboxFilter
