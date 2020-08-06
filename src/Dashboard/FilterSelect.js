import React from 'react';
import Grid from '@material-ui/core/Grid';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { Typography, TextField, Slider, Select, Input, FormControl, InputLabel, withStyles } from '@material-ui/core';

const ProSlider = withStyles({
  root: {
    color: '#2958C1'
  },
  thumb: {
    backgroundColor: '#2958C1',
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    }
  }
})(Slider);

const paymentStatus = ['Pending', 'Received']

export default function FilterSelect(props) {
    const [date, setDate] = React.useState({
        start: null,
        end: null
    });

    const handleDateStartChange = (val) => {
        setDate({ ...date, start: val });
    };

    const handleDateEndChange = (val) => {
        setDate({ ...date, end: val });
    };

    const [amount, setAmount] = React.useState([0, 1000]);

    const handleAmountChange = (e, val) => {
        setAmount(val);
    };

    const [status, setStatus] = React.useState(paymentStatus[0]);

    const handleStatusChange = (val) => {
      setStatus(val);
    };

    const formatCurrency = (number) => {
      if (number < 1000) {
          return Math.round(number);
      } else if (number < 100000) {
          return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      } else if (number < 10000000) {
          return (Math.round(number * 100/100000) / 100).toFixed(2) + ' L';
      } else {
          return (Math.round(number * 100/10000000) / 100).toFixed(2) + ' Cr';
      }
  };

    return (
      <Grid container style={{ maxWidth: 420 }} justify="space-around">
        <Grid item xs={12}>
          <Typography gutterBottom>
            Date range
          </Typography>
          <Grid container justify="space-between">
            <Grid item xs={5}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                fullWidth
                id="date-picker-inline"
                label="Start Date"
                value={date.start}
                onChange={handleDateStartChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </Grid>
            <Grid item xs={1}>
              <Typography style={{ textAlign: 'center', marginTop: '30px' }}>
                -
              </Typography>
            </Grid>
            <Grid item xs={5}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                fullWidth
                id="date-picker-inline"
                label="End Date"
                value={date.end}
                onChange={handleDateEndChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography id="phone-number" gutterBottom>
            Phone Number
          </Typography>
          <TextField fullWidth aria-lanbelledby="phone-number" label="Phone Number" variant="outlined" />
        </Grid>
        <Grid item xs={12}>
          <Typography id="amount-range" gutterBottom>
            Amount range
          </Typography>
          <Typography style={{ fontWeight: 'bolder' }} gutterBottom>
            &#8377; {formatCurrency(amount[0])} - &#8377; {formatCurrency(amount[1])}
          </Typography>
          <ProSlider
            value={amount}
            onChange={handleAmountChange}
            valueLabelDisplay="off"
            min={50}
            max={10000000}
            aria-labelledby="range-slider"
            getAriaValueText={ (val) => `INR ${val}` }
          />
        </Grid>
        <Grid item xs={12}>
          <Typography id="payment-status" gutterBottom>
            Payment Status
          </Typography>
          <FormControl required fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-age-native-simple">Payment Status</InputLabel>
            <Select
              native
              value={status}
              onChange={handleStatusChange}
              label="Payment Status"
              color="primary"
              inputProps={{
                  name: 'status',
                  id: 'outlined-age-native-simple',
              }}
            >
              <option aria-label="None" value="" />
              {
                paymentStatus.map((val) => {
                  return <option value={val}>{val}</option>;
                })
              }
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    );
}