import axios from 'axios';
import React, {useState } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';

const AddBrand = () => {
    const [loading, setLoading] = useState(false);
    const [brands, setBrands] = useState([]);
    const [newBrand, setNewBrand] = useState("");


    const token = localStorage.getItem('token');
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await axios.post(`http://localhost:9090/api/v1/admin/brand/add-brand`, brands, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            setLoading(false);
            toast.success("Brand added successfully");
            setTimeout(() => navigate("/brand"), 2000);
        } catch (error) {
            console.log("Error while adding brand", error);
            toast.error("Error while adding brand");
            setLoading(false);
        }
    }

    const handleAddBrand = () => {
        if (newBrand.trim() !== "") {
            setBrands([...brands, newBrand]);
            setNewBrand("");
        }
    }

    const handleRemoveBrand = (index) => {
        setBrands(brands.filter((_, i) => i !== index));
    }

    const handleReset = () => {
        setBrands([]);
        setNewBrand("");
    }
    return (
        <div className='p-2'>
            <div className='d-flex justify-content-center'>
                <BackButton to="/brand" />
                <h1 className='mx-auto'>Add Brand</h1>
            </div>
            <div className='p-3'>
                {loading ? <Spinner /> :
                    <div className='pt-3'>
                        <form className='w-50' onSubmit={handleSubmit}>

                            <div className="mb-3">
                                <label htmlFor="inputBrand" className="form-label">Add Brand</label>
                                <div className="d-flex">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputBrand"
                                        name="name"
                                        value={newBrand}
                                        onChange={(e) => setNewBrand(e.target.value)}
                                    />
                                    <button type="button" className="btn btn-primary ms-2" onClick={handleAddBrand}>Add</button>
                                </div>
                            </div>

                            <div className="d-flex flex-wrap overflow-y-scroll" style={{ height: "170px" }}>
                                {brands.map((brand, index) => (
                                    <div key={index} className="btn btn-outline-secondary m-1 d-flex border border-2 border-black" style={{ height: "40px" }}>
                                        {brand}
                                        <button type="button" className="btn-close ms-2" onClick={() => handleRemoveBrand(index)}></button>
                                    </div>
                                ))}
                            </div>
                            <button type="button" className="btn btn-outline-secondary mt-3 me-2" onClick={handleReset}>Reset</button>
                            <button type="submit" className="btn btn-success mt-3">Submit</button>
                        </form>
                    </div>
                }
            </div>
            <ToastContainer />
        </div>
    );
}

export default AddBrand;
