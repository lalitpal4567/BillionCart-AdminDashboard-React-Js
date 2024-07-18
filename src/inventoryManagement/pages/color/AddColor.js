import axios from 'axios';
import React, {useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BackButton from '../../components/BackButton';
import Spinner from '../../components/Spinner';




const AddColor = () => {
    const [loading, setLoading] = useState(false);
    const [colors, setColors] = useState([]);
    const [newColor, setNewColor] = useState("");

    const navigate = useNavigate();
    // const token = localStorage.getItem('token');
    const token = sessionStorage.getItem('token');

    const handleAddColor = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await axios.post(`http://localhost:9090/api/v1/admin/color/add-color`, colors, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            setLoading(false);
            toast.success("Color added successfully");
            setTimeout(() => navigate("../color"), 2000);
        } catch (error) {
            console.log("Error while adding color", error);
            toast.error("Error while adding color");
            setLoading(false);
        }
    }

    const handleInputColorChange = () => {
        if (newColor.trim() !== "") {
            setColors([...colors, newColor]);
            setNewColor("");
        }
    }

    const handleRemoveColor = (index) => {
        setColors(colors.filter((_, i) => i !== index));
    }

    const handleReset = () => {
        setColors([]);
        setNewColor("");
    }

    return (
        <div className='p-2'>
            <div className='d-flex justify-content-center'>
                <BackButton to="/admin-dashboard/color" />
                <h1 className='mx-auto'>Add Color</h1>
            </div>
            <div className='p-3'>
                {loading ? <Spinner /> :
                    <div className='pt-3'>
                        <form className='w-50' onSubmit={handleAddColor}>

                            <div className="mb-3">
                                <label htmlFor="inputBrand" className="form-label">Add Color</label>
                                <div className="d-flex">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="inputBrand"
                                        name="name"
                                        value={newColor}
                                        onChange={(e) => setNewColor(e.target.value)}
                                    />
                                    <button type="button" className="btn btn-primary ms-2" onClick={handleInputColorChange}>Add</button>
                                </div>
                            </div>
                            <div className="d-flex flex-wrap overflow-y-scroll" style={{ height: "170px" }}>
                                {colors.map((brand, index) => (
                                    <div key={index} className="btn btn-outline-secondary m-1 d-flex border border-2 border-black" style={{ height: "40px" }}>
                                        {brand}
                                        <button type="button" className="btn-close ms-2" onClick={() => handleRemoveColor(index)}></button>
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

export default AddColor;
