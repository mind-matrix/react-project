import React from 'react';
import { Grid, Box, Typography, TextField, Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    header: {
      color: '#35332B',
      opacity: 0.6,
      fontSize: '12pt',
      marginTop: '30px'
    }
});

export default function AddItem(props) {
    
    const classes = useStyles();

    const [state, setState] = React.useState({
        productName: null,
        quantity: 0,
        rate: 0
    });

    const handleOnApply = () => {
        props.onApply(state);
    };

    return (
        <Grid container style={{ maxWidth: 420 }} justify="space-around">
            <Grid item xs={12}>
                <Typography id="product-number" className={classes.header} gutterBottom>
                    Product/Service Name
                </Typography>
                <TextField fullWidth aria-labelledby="product-number" label="Prpduct/Service Name" variant="outlined" />
            </Grid>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item xs={5}>
                        <Box pr={1}>
                            <Typography id="quantity" className={classes.header} gutterBottom>
                                Quantity
                            </Typography>
                            <TextField fullWidth aria-labelledby="quantity" label="Quantity" variant="outlined" />
                        </Box>
                    </Grid>
                    <Grid item xs={7}>
                        <Box pl={1}>
                            <Typography id="rate" className={classes.header} gutterBottom>
                                Rate (Prince/Unit)
                            </Typography>
                            <TextField fullWidth aria-labelledby="rate" label="Rate (Prince/Unit)" variant="outlined" />
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