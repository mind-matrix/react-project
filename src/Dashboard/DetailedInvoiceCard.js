import React from 'react';
import { Card, CardContent, Grid, Divider, Typography, makeStyles, styled } from '@material-ui/core';

import { CalendarToday, Check } from '@material-ui/icons';

import { Link } from 'react-router-dom';

const ItemLink = styled(Link)({
    textDecoration: 'none'
});

const useStyles = makeStyles({
    root: {
        display: 'block',
        margin: '0 auto',
        maxWidth: 420,
        backgroundColor: 'white'
    },
    date: {
        color: '#35332B',
        fontSize: '10pt',
        textAlign: 'left',
        lineHeight: '13px'
    },
    icon: {
        fontSize: '10pt',
        verticalAlign: 'bottom'
    },
    iconMiddle: {
        fontSize: '10pt',
        verticalAlign: 'middle',
        marginRight: '2px'
    },
    title: {
        fontWeight: 'bolder',
        textAlign: 'left',
        fontSize: '12pt',
        lineHeight: '24px',
        margin: '5px 13px',
        color: '#35332B'
    },
    sub: {
        color: '#35332B',
        opacity: 0.6,
        fontWeight: 'lighter',
        fontSize: '10pt'
    },
    due: {
        width: 'fit-content',
        textAlign: 'center',
        backgroundColor: '#E87716',
        borderRadius: '4pt',
        padding: '4px 4px',
        fontSize: '10pt',
        color: 'white',
        lineHeight: '13px'
    },
    dueAmount: {
        color: '#E87716'
    },
    paid: {
        width: 'fit-content',
        textAlign: 'center',
        margin: '0 auto',
        backgroundColor: '#419945',
        borderRadius: '4pt',
        padding: '4px 4px',
        fontSize: '10pt',
        color: 'white',
        lineHeight: '13px'
    },
    link: {
        textAlign: 'center',
        color: '#2958C1',
        cursor: 'pointer',
        padding: '10px',
        height: '100%',
        borderRight: '1pt solid rgba(53, 51, 43, 0.1)',
        '&:last-child': {
            borderRight: 0
        },
        '& > *': {
            fontSize: '10pt'
        }
    }
});

export default function DetailedInvoiceCard(props) {
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
            <CardContent style={{ paddingBottom: 0 }}>
                <Typography className={classes.date}>
                    <CalendarToday className={classes.icon} />
                    {props.date}
                </Typography>
                <Grid container alignItems="center">
                    <Grid item xs={5}>
                        <Typography className={classes.title} gutterBottom>
                            <div className={classes.number}>
                                {props.name}
                            </div>
                            <div className={classes.sub}>
                                {props.phone}
                            </div>
                        </Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Typography className={classes.title} gutterBottom>
                            <div className={classes.number}>
                                &#8377; {format(props.total)}
                            </div>
                            <div className={classes.sub}>
                                Total
                            </div>
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                    {
                        (props.due) ?
                        <Typography is="div" className={classes.title} gutterBottom>
                            <div className={classes.dueAmount}>
                                &#8377; {format(props.due)}
                            </div>
                            <div className={classes.due}>
                                Due
                            </div>
                        </Typography>
                        :
                        <Typography className={classes.paid} gutterBottom>
                            <Check className={classes.iconMiddle} />
                            Paid
                        </Typography>
                    }
                    </Grid>
                </Grid>
                <Grid style={{ borderTop: '1pt solid rgba(53, 51, 43, 0.1)' }} container alignItems="center">
                    <Grid item xs={4} className={classes.link}>
                        <Typography>
                            View Invoice
                        </Typography>
                    </Grid>
                    <Grid item xs={4} className={classes.link}>
                        <Typography>
                            Payment History
                        </Typography>
                    </Grid>
                    <Grid item xs={4} className={classes.link}>
                        {
                            (props.due) ?
                            <ItemLink to={{
                                pathname: '/cancelInvoice',
                                state: { invoice: props.number, date: props.date }
                            }}>
                                <Typography>
                                    Cancel Invoice
                                </Typography>
                            </ItemLink>
                            :
                            <ItemLink to={{
                                pathname: '/refundNotice',
                                state: { invoice: props.number, date: props.date, paymentId: 'XXXX', paymentDate: 'XXXX' }
                            }}>
                                <Typography>
                                    Process Refund
                                </Typography>
                            </ItemLink>
                        }
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}