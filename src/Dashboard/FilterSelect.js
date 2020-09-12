import React from 'react';
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
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    }
  }
})(Slider);

const paymentStatus = ['Pending', 'Received']

export default function FilterSelect(props) {
  const classes = useStyles();

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

  const [status, setStatus] = React.useState("");

  const handleStatusChange = (val) => {
    setStatus(val);
  };

  const handleOnApply = () => {
    props.onApply({ date, amount, status });
  };

  return (
    <Grid container style={{ maxWidth: 420 }} justify="space-around">
      <Grid item xs={12}>
        <Typography className={classes.header} gutterBottom>
          Date range
          </Typography>
        <Grid container justify="space-between" style={{ marginTop: '-10px' }}>
          <Grid item xs={5}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="none"
              fullWidth
              id="start-date"
              label="Start Date"
              value={date.start}
              onChange={handleDateStartChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </Grid>
          <Grid item xs={1}>
            <Typography style={{ textAlign: 'center', marginTop: '20px' }}>
              -
              </Typography>
          </Grid>
          <Grid item xs={5}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="none"
              fullWidth
              id="end-date"
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
      {props.dashboard ?
        <Grid item xs={12}>
          <Typography id="phone-number" className={classes.header} gutterBottom style={{ marginTop: '20px' }}>
            Phone Number
          </Typography>
          <TextField fullWidth aria-labelledby="phone-number" variant="outlined" />
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
          min={50}
          max={100000}
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
              value={status}
              onChange={handleStatusChange}
              color="primary"
              inputProps={{
                name: 'status',
                id: 'outlined-age-native-simple',
              }}
            >
              <option aria-label="None" value="" selected hidden />
              {
                paymentStatus.map((val) => {
                  return <option value={val}>{val}</option>;
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
      </Grid>
    </Grid>
  );
}