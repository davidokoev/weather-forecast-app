import React, { useState, useMemo } from 'react';
import axios from 'axios';

import { Forecast as ForecastResponse } from '../../types';
import SearchForm from '../../components/Forecast/SearchForm/SearchForm';
import Cards from '../../components/Forecast/Cards/Cards';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const FORECAST_URL: string = 'https://api.openweathermap.org/data/2.5/forecast';

const Forecast: React.FC = () => {
    let [city, setCity] = useState('');
    let [unit, setUnit] = useState('metric');
    let [forecast, setForecast] = useState<ForecastResponse[]>([]);
    let [responseError, setResponseError] = useState(false);
    let [loading, setLoading] = useState(false);
    let [error, setError] = useState(false);

    // Fetch weather data for 5 day forecast
    const fetchForecast = async (cityName: string, unit: string): Promise<ForecastResponse[]> => { 
        const { data: { list } } = await axios.get(`${FORECAST_URL}?q=${cityName}&units=${unit}&appid=${API_KEY}`);
        return list;
    }

    // Handle form submission
    const submitHandler = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();   
        if (!city.length) {
            return setError(true);
        }      
        // Reset and init values 
        setForecast([]);
        setResponseError(false);
        setLoading(true);       
        try {
            const uriEncodedCity: string = encodeURIComponent(city);
            const response: ForecastResponse[] = await fetchForecast(uriEncodedCity, unit);       
            setForecast(response);
            setLoading(false);
        } catch(error) {
            setResponseError(true);
            setLoading(false);
        }
    }

    // Handle city change
    const cityChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value;
        setCity(value);
        if (!value) {
            setError(true);
        } else {
            setError(false);
        }
    }

    // Handle unit change
    const unitChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setUnit(e.target.value);
    }

    // useMemo implementation sample
    // Only if unit changes the setTimeout will rerun cause the unit is
    // the dependency of useMemo callback
    const memoSearchedCity = useMemo((): Promise<string> => {
        const promise: Promise<string> = new Promise((resolve, reject) => {
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