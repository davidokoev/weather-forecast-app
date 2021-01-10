import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

interface Props {
    city: string,
    unit: string,
    cityChanged: (e: React.ChangeEvent<HTMLInputElement>) => void,
    unitChanged: (e: React.ChangeEvent<HTMLInputElement>) => void,
    submited: (e: React.FormEvent<HTMLFormElement>) => Promise<void>,
    error: boolean
}

const SearchForm: React.FC<Props> = ({ city, unit, cityChanged, unitChanged, submited, error }) => {
    const inputConfig: TextFieldProps = {
        label: "City name",
        fullWidth: true,
        variant: "outlined",
        value: city,
        onChange: cityChanged
    };

    if (error) {
        inputConfig.error = true;
        inputConfig.helperText = 'City name is required';
    }

    return (
        <div style={{marginTop: "80px", marginBottom: "60px"}}>
            <Container maxWidth="sm">
                <Typography variant="h3" component="h1" align="center" style={{marginBottom: "30px"}}>
                    Weather Forecast
                </Typography>
            </Container>
            <Container maxWidth="xs">
                <form onSubmit={submited}>
                    <TextField { ...inputConfig } />
                        <FormControl component="fieldset" fullWidth style={{marginBottom: "20px"}}>
                            <RadioGroup row aria-label="position" name="position" defaultValue="top" onChange={unitChanged}>
                                <FormControlLabel 
                                    value="metric" 
                                    control={<Radio color="primary" />} 
                                    label="Celcius"
                                    checked={unit === "metric"} />
                                <FormControlLabel 
                                    value="imperial" 
                                    control={<Radio color="primary" />} 
                                    label="Fahrenheit"
                                    checked={unit === "imperial"} />
                            </RadioGroup>
                        </FormControl>
                        <Button variant="contained" color="primary" fullWidth type="submit">
                            Get Forecast
                        </Button>
                </form>
            </Container>
        </div>
    );
}

export default SearchForm;