import axios from 'axios';
import React, { useEffect, useState } from 'react'

const AddNewAddress = () => {
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');


    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get('https://restcountries.com/v3.1/all');
                setCountries(response.data);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };

        fetchCountries();
    }, []);


    useEffect(() => {
        console.log("hihihihi", countries);
    }, [countries]);

    const handleCountryChange = async (event) => {
        const country = event.target.value;
        setSelectedCountry(country);
        // Clear previous state selections
        setSelectedState('');

        // Fetch states/provinces from an alternative source or use a predefined list
        const statesForCountry = getStatesForCountry(country);
        setStates(statesForCountry);
    };

    const getStatesForCountry = (country) => {
        // Example function to retrieve states/provinces based on country
        switch (country) {
            case 'United States':
                return ['Alabama', 'Alaska', 'Arizona', /* ... */];
            case 'India':
                return ['Delhi', 'Uttar Pradesh', 'Gujarat', /* ... */];
            // Add more cases for other countries as needed
            default:
                return []; // Return empty array if no states/provinces available
        }
    };
    return (
        <form class="row g-3">
            <div class="colmd-12">
                <label for="inputCountry4" class="form-label">Country</label>
                <select className="form-select" id="inputCountry" onChange={handleCountryChange} value={selectedCountry}>
                    <option defaultValue>Select Country...</option>
                    {countries.map(country => (
                        <option key={country.name.common} value={country.name.common}>{country.name.common}</option>
                    ))}
                </select>
            </div>
            <div class="col-md-6">
                <label for="inputFullName4" class="form-label">Full Name</label>
                <input type="email" class="form-control" id="inputFullName4" />
            </div>
            <div class="col-md-6">
                <label for="inputMobile4" class="form-label">Mobile no.</label>
                <input type="password" class="form-control" id="inputMobile4" />
            </div>
            <div class="col-12">
                <label for="inputAddress" class="form-label">Area / Street / Sector / Village</label>
                <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St" />
            </div>
            <div class="col-md-6">
                <label for="inputCity" class="form-label">City</label>
                <input type="text" class="form-control" id="inputCity" />
            </div>
            <div class="col-md-4">
                <label for="inputState" class="form-label">State</label>
                <select className="form-select" id="inputState" value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
                    <option defaultValue>Select State/Province...</option>
                    {states.map(state => (
                        <option key={state} value={state}>{state}</option>
                    ))}
                </select>
            </div>
            <div class="col-md-2">
                <label for="inputZip" class="form-label">Zip</label>
                <input type="text" class="form-control" id="inputZip" />
            </div>
            <div class="col-12">
                <button type="submit" class="btn btn-primary">Add</button>
            </div>
        </form>
    )
}

export default AddNewAddress
