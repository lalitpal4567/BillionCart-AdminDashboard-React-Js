import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const UpdateExistingAddress = () => {
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [address, setAddress] = useState({});
    const [initialAddress, setInitialAddress] = useState({});
    const {id} = useParams();
    
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    
    const fetchExistingUserAddress = async() =>{
        try {
            const res = await axios.get(`http://localhost:9090/api/v1/user/address/get-address/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "Application/json"
                }
            })
            setAddress(res.data.Address);
            setInitialAddress(res.data.Address);
        } catch (error) {
            console.log("error", error);
        }
    }

    const handleUpdateExistingAddress = async (e) => {
        e.preventDefault();
        
        console.log("lon", address);
        try {
            const res = await axios.put("http://localhost:9090/api/v1/user/address/update-address", address, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "Application/json"
                }
            })
            navigate("../user-address")
        } catch (error) {
            console.log("error", error);
        }
    }
    
    // const fetchCountries = async () => {
    //     try {
    //         const response = await axios.get('https://api.countrystatecity.in/v1/countries', {
    //             headers: {
    //                 'X-CSCAPI-KEY': 'UXNXU1RNVGZ3c1BETGQzSElPandmYVZsOWNpQnJMbFduVW0zVldxSQ=='
    //             }
    //         });
    //         setCountries(response.data);
    //     } catch (error) {
    //         console.error('Error fetching countries:', error);
    //     }
    // };
    
    const fetchStates = async (iso2) => {
        try {
            const response = await axios.get(`https://api.countrystatecity.in/v1/countries/${iso2}/states`, {
                headers: {
                    'X-CSCAPI-KEY': 'UXNXU1RNVGZ3c1BETGQzSElPandmYVZsOWNpQnJMbFduVW0zVldxSQ=='
                }
            });
            setStates(response.data);
        } catch (error) {
            console.error('Error fetching states:', error);
        }
    };

    useEffect(() => {
        // fetchCountries();
        fetchExistingUserAddress();
    }, []);

    // useEffect(() => {
    //     if (selectedCountry) {
    //         fetchStates(selectedCountry);
    //     } else {
    //         setStates([]);
    //     }
    // }, [selectedCountry]);


    const handleAddressInputChange = (event) => {
        const { name, value } = event.target;
        setAddress({
            ...address,
            [name]: value
        });
    };
    
    const handleResetAddress = () =>{
        setAddress(initialAddress);
    }
    
    return (
        <form onSubmit={handleUpdateExistingAddress} className="row g-3">
            <div className="colmd-12">
                <label htmlFor="inputCountry4" className="form-label">Country</label>
                <select
                    className="form-select"
                    id="inputCountry"
                    value={address?.country}
                    disabled
                    name="country"
                    >
                    <option defaultValue>Select Country...</option>
                    {countries.map(country => (
                        <option key={country.name} value={country.iso2}>{country.name}</option>
                    ))}
                </select>
            </div>
            <div className="col-md-6">
                <label htmlFor="inputFullName4" className="form-label">Full Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="inputFullName4"
                    required
                    name="fullName"
                    value={address?.fullName}
                    onChange={handleAddressInputChange}
                    />
            </div>
            <div className="col-md-6">
                <label htmlFor="inputMobile4" className="form-label">Mobile no.</label>
                <input
                    type="text"
                    className="form-control"
                    id="inputMobile4"
                    required
                    name="mobileNo"
                    value={address?.mobileNo}
                    onChange={handleAddressInputChange}
                    />
            </div>
            <div className="col-12">
                <label htmlFor="inputAddress" className="form-label">Area / Street / locality / landmark / Sector / Village</label>
                <input
                    type="text"
                    className="form-control"
                    id="inputAddress"
                    placeholder="1234 Main St"
                    required
                    name="locationDetails"
                    value={address?.locationDetails}
                    onChange={handleAddressInputChange}
                    />
            </div>
            <div className="col-md-6">
                <label htmlFor="inputCity" className="form-label">City</label>
                <input
                    type="text"
                    className="form-control"
                    id="inputCity"
                    required
                    name="city"
                    value={address?.city}
                    onChange={handleAddressInputChange}
                />
            </div>
            <div className="col-md-4">
                <label htmlFor="inputState" className="form-label">State</label>
                <select
                    className="form-select"
                    id="inputState"
                    required
                    name="state"
                    value={address?.state}
                    onChange={handleAddressInputChange}>

                    <option defaultValue>Select State/Province...</option>
                    {states.map(state => (
                        <option key={state.name} value={state.name}>{state.name}</option>
                    ))}
                </select>
            </div>
            <div className="col-md-2">
                <label htmlFor="inputZip" className="form-label">Zip</label>
                <input
                    type="text"
                    className="form-control"
                    id="inputZip"
                    name="pincode"
                    value={address?.pincode}
                    onChange={handleAddressInputChange}
                    />
            </div>
            <div className="col-12">
                <button type="button" className="btn btn-primary px-4 me-3" onClick={handleResetAddress}>Reset</button>
                <button type="submit" className="btn btn-primary px-4 ">Add</button>
            </div>
        </form>
    )
}

export default UpdateExistingAddress