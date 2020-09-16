import React, { useState, useEffect } from 'react';
import { Grid, Box, Select, Typography, TextField, Button, makeStyles } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { createUser, getCity, saveCustomer } from '../shared/dataService';

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

    const [cities, setCities] = useState(['New Delhi', 'Mumbai', 'Kolkata', 'Chennai', 'Guwahati']);

    const [state, setState] = React.useState({
        customerName: null,
        city: '',
        phoneNumber: props.phone,
        customerId: null
    });

    const handleOnCityChange = (e) => {
        setState({ city: e });
    };

    const handleOnApply = () => {
        createUser(state.phoneNumber, 'C')
            .then(res => res.json())
            .then(data => {
                if (data.customerId) {
                    setState({ ...state, customerId: data.customerId });
                    saveCustomer(data.customerId, state.customerName, state.city)
                        .then(res => res.json())
                        .then(data => data ? props.onApply(state, data) : null)
                }
            })
    };

    const getCityNamehandler = (event) => {
        if (event.target.value.length >= 3) {
            getCity(event.target.value)
                .then(res => res.json())
                .then(data => setCities(data))
        }
    }

    return (
        <Grid container style={{ maxWidth: 420 }} justify="space-around">
            <Grid item xs={12}>
                <Typography id="customer-number" className={classes.header} gutterBottom>
                    Customer Name
                </Typography>
                <TextField fullWidth aria-labelledby="customer-number" variant="outlined" onChange={(e) => setState({...state, customerName: e.target.value})} />
            </Grid>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item xs={6}>
                        <Box pr={1}>
                            <Typography id="quantity" className={classes.header} gutterBottom>
                                City
                            </Typography>
                            <Autocomplete
                                id="cities"
                                fullWidth
                                onChange={(e, val) => setState({...state, city: val})}
                                options={cities}
                                getOptionLabel={(option) => option}
                                renderInput={(params) => <TextField {...params} onChange={getCityNamehandler} variant="outlined" />}
                            />
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Box pl={1}>
                            <Typography id="phone" className={classes.header} gutterBottom>
                                Phone Number
                            </Typography>
                            <TextField fullWidth aria-labelledby="phone" variant="outlined" value={state.phoneNumber} disabled />
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