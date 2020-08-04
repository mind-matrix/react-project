import React from 'react';
import { Card, CardContent, Grid, Divider, Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        display: 'block',
        margin: '0 auto',
        maxWidth: 420,
        backgroundColor: 'white'
    },
    header: {
        color: '#0A0A0A',
        opacity: 0.6,
        fontSize: '14pt',
        textAlign: 'left',
        lineHeight: '19px',
        marginBottom: '26px'
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
        fontSize: '18pt',
        lineHeight: '24px',
        margin: '5px 8px'
    },
    number: {
        display: 'block',
        fontSize: 20,
        fontWeight: 'bolder',
    },
    name: {
        fontSize: 12,
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
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.header}>
                    {props.header}
                </Typography>
                <Grid container alignItems="center">
                    <Grid className={classes.item} item xs={4}>
                        <Typography className={classes.title} gutterBottom>
                            <div className={classes.number}>
                                &#8377; {format(props.total)}
                            </div>
                            <div className={classes.name}>
                                Total Amount
                            </div>
                        </Typography>
                    </Grid>
                    <Grid className={classes.item} item xs={4}>
                        <Typography className={classes.title} gutterBottom>
                            <div className={classes.number}>
                                &#8377; {format(props.received)}
                            </div>
                            <div className={classes.name}>
                                Amount Received
                            </div>
                        </Typography>
                    </Grid>
                    <Grid className={classes.item} item xs={4}>
                        <Typography className={classes.title} gutterBottom>
                            <div className={classes.number}>
                                &#8377; {format(props.pending)}
                            </div>
                            <div className={classes.name}>
                                Amount Pending
                            </div>
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}