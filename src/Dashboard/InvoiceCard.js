import React from 'react';
import { Card, CardContent, Grid, Divider, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        display: 'block',
        margin: '5px auto',
        maxWidth: 420,
        width: '100%',
        backgroundColor: 'white'
    },
    header: {
        color: '#0A0A0A',
        opacity: 0.6,
        fontSize: '14px',
        textAlign: 'left',
        marginBottom: '20px'
    },
    item: {
        '&:nth-child(1)': {
            color: '#35332B',
            borderRight: '1pt solid rgba(53, 51, 43, 0.1)'
        },
        '&:nth-child(2)': {
            color: '#419945',
            borderRight: '1pt solid rgba(53, 51, 43, 0.1)'
        },
        '&:nth-child(3)': {
            color: '#E87716'
        }
    },
    title: {
        textAlign: 'center',
        fontSize: '18px',
        lineHeight: '24px',
        margin: '5px 8px'
    },
    number: {
        padding: 0,
        margin: 0,
        display: 'block',
        fontSize: '18px',
        fontWeight: 'bold',
        fontFamily: 'Open Sans'
    },
    name: {
        fontSize: '10px',
        fontWeight: 'bold',
        lineHeight: 1
    }
});

export default function InvoiceCard(props) {
    const classes = useStyles();

    const format = (number) => {
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
        <Card elevation={2} className={classes.root}>
            <CardContent>
                <Typography className={classes.header}>
                    {props.header}
                </Typography>
                <Grid container>
                    <Grid className={classes.item} item xs={4}>
                        <Typography className={classes.title} gutterBottom>
                            <p className={classes.number}>
                                &#8377; {format(props.total)}
                            </p>
                            <p className={classes.name}>
                                Total Amount
                            </p>
                        </Typography>
                    </Grid>
                    <Grid className={classes.item} item xs={4}>
                        <Typography className={classes.title} gutterBottom>
                            <p className={classes.number}>
                                &#8377; {format(props.received)}
                            </p>
                            <p className={classes.name}>
                                Amount Received
                            </p>
                        </Typography>
                    </Grid>
                    <Grid className={classes.item} item xs={4}>
                        <Typography className={classes.title} gutterBottom>
                            <p className={classes.number}>
                                &#8377; {format(props.pending)}
                            </p>
                            <p className={classes.name}>
                                Amount Pending
                            </p>
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}