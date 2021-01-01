import React, { useState, useMemo } from 'react';
import axios from 'axios';

import SearchForm from '../../components/Forecast/SearchForm/SearchForm';
import Cards from '../../components/Forecast/Cards/Cards';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';

const Forecast = () => {
    let [city, setCity] = useState('');
    let [unit, setUnit] = useState('metric');
    let [forecast, setForecast] = useState([]);
    let [responseError, setResponseError] = useState(false);
    let [loading, setLoading] = useState(false);
    let [error, setError] = useState(false);

    // Fetch weather data for 5 day forecast
    const fetchForecast = async (cityName, unit) => { 
        const { data: { list } } = await axios.get(`${FORECAST_URL}?q=${cityName}&units=${unit}&appid=${API_KEY}`);
        return list;
    }

    const submitHandler = async (e) => {
        e.preventDefault();   
        if (!city.length) {
            return setError(true);
        }      
        // Reset and init values 
        setForecast([]);
        setResponseError(false);
        setLoading(true);       
        try {
            const uriEncodedCity = encodeURIComponent(city);
            const response = await fetchForecast(uriEncodedCity, unit);       
            setForecast(response);
            setLoading(false);
        } catch(error) {
            setResponseError(true);
            setLoading(false);
        }
    }

    const cityChangeHandler = (e) => {
        const value = e.target.value;
        setCity(value);
        if (!value) {
            setError(true);
        } else {
            setError(false);
        }
    }

    const unitChangeHandler = (e) => {
        setUnit(e.target.value);
    }

    // useMemo implementation sample
    // Only if unit changes the setTimeout will rerun cause the unit is
    // the dependency of useMemo callback
    const memoSearchedCity = useMemo(() => {
        const promise = new Promise((resolve, reject) => {
            setTimeout(function() {
                resolve(unit);
            }, 10000);
        });
        return promise;
    }, [ unit ]);
    console.log(memoSearchedCity);

    return (
        <>
            <SearchForm
                city={city}
                unit={unit}
                cityChanged={cityChangeHandler}
                unitChanged={unitChangeHandler}
                submited={submitHandler}
                error={error} />
            <Cards 
                forecast={forecast}
                isLoading={loading}
                unit={unit}
                city={city}               
                responseError={responseError} />
        </>
    );
}

export default Forecast;