import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { Typography, TextField, Slider, Select, Button, Box, FormControl, InputLabel, withStyles, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  header: {
    color: '#35332B',
    opacity: 0.6,
    fontSize: '14px',
  }
});

const ProSlider = withStyles({
  root: {
    color: '#2958C1'
  },
  thumb: {
    backgroundColor: '#2958C1',
    '&:focus, &:hover, &:active': {
      boxShadow: 'inherit',
    }
  }
})(Slider);

const paymentStatus = [
  {
    name: 'Pending',
    value: 'P'
  },
  {
    name: 'Received',
    value: 'R'
  }
]

export default function FilterSelect(props) {
  const classes = useStyles();

  const [date, setDate] = useState({
    start: undefined,
    end: undefined
  });
  const [amount, setAmount] = useState([0, 50000]);
  const [status, setStatus] = useState(undefined);
  const [phone, setPhone] = useState(undefined);

  const handleDateStartChange = (event) => {
    console.log(event.target.value)
    setDate({ ...date, start: event.target.value });
  };

  const handleDateEndChange = (event) => {
    setDate({ ...date, end: event.target.value });
  };


  const handleAmountChange = (e, val) => {
    setAmount(val);
  };

  const handleStatusChange = (event) => {
    console.log(event.target.value)
    setStatus(event.target.value);
  };

  const handleOnApply = () => {
    props.onApply({ date, amount, status, phone });
  };

  const resetFilter = () => {
    props.reset();
  }

  return (
    <Grid container style={{ maxWidth: 420 }} justify="space-around">
      <Grid item xs={12}>
        <Typography className={classes.header} gutterBottom>
          Date range
          </Typography>
        <Grid container justify="space-between" style={{ marginTop: '-10px' }}>
          <Grid item xs={5}>
            <Typography id="start-date" className={classes.header} gutterBottom style={{ marginTop: '20px' }}>
              Start Date
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              type="date"
              id="start-date"
              onChange={handleDateStartChange}
            />
          </Grid>
          <Grid item xs={1}>
            <Typography style={{ textAlign: 'center', marginTop: '60px' }}>
              -
              </Typography>
          </Grid>
          <Grid item xs={5}>
          <Typography id="end-date" className={classes.header} gutterBottom style={{ marginTop: '20px' }}>
              End Date
            </Typography>
            <TextField
              variant="outlined"
              fullWidth
              type="date"
              id="end-date"
              onChange={handleDateEndChange}
            />
          </Grid>
        </Grid>
      </Grid>
      {props.dashboard ?
        <Grid item xs={12}>
          <Typography id="phone-number" className={classes.header} gutterBottom style={{ marginTop: '20px' }}>
            Phone Number
          </Typography>
          <TextField fullWidth aria-labelledby="phone-number" variant="outlined" value={phone} onChange={e => setPhone(e.target.value)} />
        </Grid> : null
      }
      <Grid item xs={12}>
        <Typography id="amount-range" className={classes.header} gutterBottom style={{ marginTop: '20px' }}>
          Amount range
          </Typography>
        <Typography style={{ fontWeight: 'bolder' }} gutterBottom>
          &#8377; {amount[0]} - &#8377; {amount[1]}
        </Typography>
        <ProSlider
          value={amount}
          onChange={handleAmountChange}
          valueLabelDisplay="off"
          min={0}
          max={100000}
          step={1000}
          aria-labelledby="range-slider"
          getAriaValueText={(val) => `INR ${val}`}
        />
      </Grid>
      {props.dashboard ?
        <Grid item xs={12}>
          <Typography id="payment-status" className={classes.header} gutterBottom>
            Payment Status
          </Typography>
          <FormControl required fullWidth variant="outlined">
            <Select
              native
              onChange={handleStatusChange}
              color="primary"
              value={status}
              inputProps={{
                name: 'status',
                id: 'outlined-age-native-simple',
              }}
            >
              <option aria-label="None" value="" hidden />
              {
                paymentStatus.map((val) => {
                  return <option key={val.value} value={val.value}>{val.name}</option>;
                })
              }
            </Select>
          </FormControl>
        </Grid> : null}
      <Grid item xs={12}>
        <Button
          fullWidth
          disableElevation
          variant="contained"
          color="primary"
          onClick={handleOnApply}
          style={{ marginTop: '20px', textTransform: 'none', backgroundColor: '#E2714D', height: '44px' }}
        >Apply</Button>
        <Button
          fullWidth
          disableElevation
          onClick={resetFilter}
          style={{ marginTop: '10px', textTransform: 'none', height: '44px' }}
        >Reset</Button>
      </Grid>
    </Grid>
  );
}