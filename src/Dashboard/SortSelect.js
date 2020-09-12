import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Typography, Slider, Select, Button, Box, FormControl, InputLabel, withStyles, makeStyles } from '@material-ui/core';
import ToggleOption from '../ToggleOption';

const useStyles = makeStyles({
  header: {
    color: '#35332B',
    opacity: 0.6,
    fontSize: '12pt',
    marginTop: '30px'
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

    const [state, setState] = React.useState({
        by: null,
        order: null
    });

    const handleOrderByChange = (val) => {
        setState({ ...state, by: val });
    };

    const handleOrderChange = (val) => {
        setState({ ...state, order: val });
    };

    const handleOnApply = () => {
        props.onApply(state);
    };

    return (
      <Grid container style={{ maxWidth: 420 }} justify="space-around">
        <Grid item xs={12}>
          <Typography id="payment-status" className={classes.header} gutterBottom>
            Order by
          </Typography>
          <FormControl required fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-age-native-simple">Order by</InputLabel>
            <Select
              native
              value={state.by}
              onChange={handleOrderByChange}
              label="Order by"
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
        <Grid item xs={12} style={{ marginTop: '10px' }}>
          <ToggleOption value={state.order} onToggle={handleOrderChange} buttons={['Ascending', 'Descending']} />
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            disableElevation
            variant="contained"
            onClick={handleOnApply}
            color="primary"
            style={{ marginTop: '20px', textTransform: 'none' }}
          >
            <Box py={1}>
              Apply
            </Box>
          </Button>
        </Grid>
      </Grid>
    );
}