import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

const Card = ({ day, temperature, icon, imgAlt }) => {
    return (
        <Grid item>      
            <Paper>
                <Box p={3}>
                    <Typography component="div" align="center">
                        <img alt={imgAlt} src={icon} />
                    </Typography>
                    <Typography component="div" align="center">
                        <Box fontWeight="fontWeightBold">
                            { temperature.max }
                        </Box>
                    </Typography>
                    <Typography component="div" align="center">
                        { temperature.min }
                    </Typography>
                    <Typography component="div" align="center">
                        { day.charAt(0).toUpperCase() + day.slice(1) }
                    </Typography>
                </Box>
            </Paper>    
        </Grid>
    );
}

export default Card;