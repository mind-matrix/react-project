import React from 'react';
import { Card, CardContent, Grid, Divider, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        display: 'block',
        width: 'fit-content',
        margin: '0 auto'
    },
    title: {
        textAlign: 'center',
        margin: '5px 15px',
        '&:nth-child(1)': {
            color: '#35332B'
        },
        '&:nth-child(3)': {
            color: '#419945'
        },
        '&:nth-child(5)': {
            color: '#E87716'
        }
    },
    number: {
        display: 'block',
        fontSize: 24,
        fontWeight: 'bolder',
    },
    name: {
        fontSize: 12
    }
});

export default function InvoiceCard(props) {
    const classes = useStyles();

    const format = (number) => {
        if (number < 1000) {
            return Math.round(number);
        } else if (number < 100000) {
            return (Math.round(number * 100/1000) / 100).toFixed(2) + ' K';
        } else if (number < 10000000) {
            return (Math.round(number * 100/100000) / 100).toFixed(2) + ' L';
        } else {
            return (Math.round(number * 100/10000000) / 100).toFixed(2) + ' Cr';
        }
    };

    return (
        <Card className={classes.root}>
            <CardContent>
                <Grid container alignItems="center">
                    <Typography className={classes.title} gutterBottom>
                        <div className={classes.number}>
                            &#8377; {format(props.total)}
                        </div>
                        <div className={classes.name}>
                            Total Amount
                        </div>
                    </Typography>
                    <Divider orientation="vertical" flexItem />
                    <Typography className={classes.title} gutterBottom>
                        <div className={classes.number}>
                            &#8377; {format(props.received)}
                        </div>
                        <div className={classes.name}>
                            Amount Received
                        </div>
                    </Typography>
                    <Divider orientation="vertical" flexItem />
                    <Typography className={classes.title} gutterBottom>
                        <div className={classes.number}>
                            &#8377; {format(props.pending)}
                        </div>
                        <div className={classes.name}>
                            Amount Pending
                        </div>
                    </Typography>
                </Grid>
            </CardContent>
        </Card>
    );
}