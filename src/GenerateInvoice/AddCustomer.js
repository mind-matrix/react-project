import React from 'react';
import { Grid, Box, Select, Typography, TextField, Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    header: {
      color: '#35332B',
      opacity: 0.6,
      fontSize: '12pt',
      marginTop: '30px'
    }
});

export default function AddCustomer(props) {
    
    const classes = useStyles();

    const cities = [
        'Bengaluru',
        'Agartala',
        'Mumbai'
    ];

    const [state, setState] = React.useState({
        customerName: null,
        city: '',
        phoneNumber: null
    });

    const handleOnCityChange = (e) => {
        setState({ city: e });
    };

    const handleOnApply = () => {
        props.onApply(state);
    };

    return (
        <Grid container style={{ maxWidth: 420 }} justify="space-around">
            <Grid item xs={12}>
                <Typography id="customer-number" className={classes.header} gutterBottom>
                    Customer Name
                </Typography>
                <TextField fullWidth aria-labelledby="customer-number" label="Customer Name" variant="outlined" />
            </Grid>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item xs={5}>
                        <Box pr={1}>
                            <Typography id="quantity" className={classes.header} gutterBottom>
                                City
                            </Typography>
                            <Select
                                native
                                fullWidth
                                variant="outlined"
                                value={state.city}
                                onChange={handleOnCityChange}
                                label="City"
                                color="primary"
                                >
                                <option aria-label="None" value="" />
                                {
                                    cities.map((city) => {
                                    return <option value={city}>{city}</option>;
                                    })
                                }
                            </Select>
                        </Box>
                    </Grid>
                    <Grid item xs={7}>
                        <Box pl={1}>
                            <Typography id="phone" className={classes.header} gutterBottom>
                                Phone Number
                            </Typography>
                            <TextField fullWidth aria-labelledby="phone" label="Phone Number" variant="outlined" />
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Box my={2} py={2}>
                    <Button onClick={handleOnApply} variant="contained" color="primary" fullWidth disableElevation>
                        Add
                    </Button>
                </Box>
            </Grid>
        </Grid>
    );
}