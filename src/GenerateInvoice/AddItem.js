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
        productDescription: "",
        productQty: 0,
        unitPrice: 0,
        productRoundAmt: 0,
        productTotAmt: 0
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
                <TextField fullWidth aria-labelledby="product-number" variant="outlined" onChange={(e) => setState({...state, productDescription: e.target.value})} />
            </Grid>
            <Grid item xs={12}>
                <Grid container>
                    <Grid item xs={5}>
                        <Box pr={1}>
                            <Typography id="quantity" className={classes.header} gutterBottom>
                                Quantity
                            </Typography>
                            <TextField fullWidth aria-labelledby="quantity" variant="outlined" type="number" onChange={(e) => setState({...state, productQty: e.target.value})} />
                        </Box>
                    </Grid>
                    <Grid item xs={7}>
                        <Box pl={1}>
                            <Typography id="rate" className={classes.header} gutterBottom>
                                Rate (Prince/Unit)
                            </Typography>
                            <TextField fullWidth aria-labelledby="rate" variant="outlined" type="number" onChange={(e) => setState({...state, unitPrice: e.target.value, productRoundAmt: e.target.value, productTotAmt: e.target.value})} />
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