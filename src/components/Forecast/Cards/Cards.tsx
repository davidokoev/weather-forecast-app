import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';

import { Forecast } from '../../../types';
import Card from './Card/Card';
import smoke from '../../../assets/images/smoke.png';
import clouds from '../../../assets/images/clouds.png';
import thunderstorm from '../../../assets/images/thunderstorm.png';
import clear from '../../../assets/images/clear.png';
import rain from '../../../assets/images/rain.png';
import snow from '../../../assets/images/snow.png';

interface Props {
    forecast: Forecast[],
    isLoading: boolean,
    unit: string,
    city: string,
    responseError: boolean
}

// Filter data by date
const groupByDay = (data: Forecast[]): {[key: string]: Forecast[]} => {
    return (data.reduce((list: {[key: string]: Forecast[]}, item: Forecast): {[key: string]: Forecast[]} => {
        const forecastDate: string = item.dt_txt.substr(0, 10);
        list[forecastDate] = list[forecastDate] || [];
        list[forecastDate].push(item);
        return list;
    }, {}));
};

// Get day name
const getDayName = (data: Forecast[]): string => {
    const daysOfWeek: string[] = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    return daysOfWeek[new Date(data[0].dt * 1000).getDay()];
}

// Get appropriate image for weather
const getWeatherIcon = (data: Forecast[]): string => {
    const weatherIcons: { [key: string]: string } = {
        "Smoke" : smoke,
        "Clouds" : clouds,
        "Thunderstorm" : thunderstorm,
        "Clear" : clear,
        "Rain" : rain,
        "Drizzle" : rain,
        "Snow" : snow
    };
    return weatherIcons[data[0]['weather'][0]['main']];
}

// Get temperature info
const getTemperature = (data: Forecast[], unit: string): { min: string, max: string } => {
    const min: any[] = [];
    const max: any[] = [];
    const unitSymbol: string = ( unit === 'metric' ) ? ' °C' : ' °F';
    
    for (const item of data) {
        min.push(item.main.temp_min);
        max.push(item.main.temp_max);
    }
    const minMax: { min: string, max: string } = {
        min: Math.round(Math.min(...min)) + unitSymbol,
        max: Math.round(Math.max(...max)) + unitSymbol,
    };
    return minMax;
}    

const Cards: React.FC<Props> = ({ forecast, isLoading, unit, city, responseError }) => {
    let forecastList: Forecast[][] = Object.values(groupByDay(forecast));
    // If the webservice returns forecast for 6 days make it for 5 days
    forecastList = forecastList.length > 5 ? forecastList.slice(0, 5) : forecastList;
    const loader: React.ReactElement | null = isLoading ? <CircularProgress /> : null;
    
    return (
        <Container maxWidth="md">
            <Grid container justify="center" spacing={3}>
                { loader }
                {
                    responseError 
                        ? <Alert severity="error">Please check the city name you entered or try it later.</Alert>
                        : (forecastList.map((day, i) => {
                            return <Card 
                                key={i + city + unit}
                                day={getDayName(day)} 
                                temperature={getTemperature(day, unit)}
                                icon={getWeatherIcon(day)}
                                imgAlt={day[0].weather[0].description } />
                        }))
                    
                }
            </Grid>
        </Container>
    );
}

export default React.memo(Cards, (prevProps: Props, nextProps: Props): boolean => {
    return prevProps.forecast === nextProps.forecast &&
           prevProps.isLoading === nextProps.isLoading;
});