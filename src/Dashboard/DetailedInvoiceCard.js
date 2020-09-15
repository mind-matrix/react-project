import React from 'react';
import { Card, CardContent, Grid, Typography, makeStyles, styled, Box, Button } from '@material-ui/core';
import { CalendarToday, Check } from '@material-ui/icons';
import { Link } from 'react-router-dom';

export default function DetailedInvoiceCard(props) {
    const classes = useStyles();

    return (
        <Card elevation={4} className={classes.root}>
            <CardContent style={{ padding: 0 }}>
                {props.individual ?
                    <Box style={{ padding: '16px', paddingBottom: '5px' }}>
                        <Grid container>
                            <Grid item xs={5}>
                                <Typography className={classes.title}>
                                    <CalendarToday className={classes.icon} />
                                    {props.date}
                                </Typography>
                                <Typography className={classes.sub} align="left" gutterBottom>{props.invoice}</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                {
                                    (props.due) ?
                                        <Box>
                                            <Typography className={classes.title + ' ' + classes.dueAmount} align="left">₹{props.due}</Typography>
                                            <Typography className={classes.due} display="inline" gutterBottom>Due</Typography>
                                        </Box>
                                        :
                                        <Box>
                                            <Typography className={classes.title + ' ' + classes.paidAmount} align="left">₹{props.total}</Typography>
                                            <Typography className={classes.paid} display="inline" gutterBottom>Received</Typography>
                                        </Box>
                                }
                            </Grid>
                            <Grid item xs={4}>
                                {
                                    (props.due) ?
                                        <Button variant="contained" className={classes.receiveButton} onClick={props.mark}>Mark Received</Button>
                                        :
                                        // <Box>
                                        //     <Typography variant="caption" className={classes.bank} align="right" display="block">YR142643</Typography>
                                        //     <Typography variant="caption" className={classes.bank} align="right" display="block" gutterBottom>BANK 6644</Typography>
                                        // </Box>
                                        null
                                }
                            </Grid>
                        </Grid>
                    </Box>
                    :
                    <Box style={{ padding: '16px', paddingBottom: '5px' }}>
                        <Typography className={classes.date}>
                            <CalendarToday className={classes.icon} />
                            {props.date}
                        </Typography>
                        <Grid container>
                            <Grid item xs={5}>
                                <Typography className={classes.title} align="left">{props.name}</Typography>
                                <Typography className={classes.sub} align="left" gutterBottom>{props.phone}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography className={classes.title} align="left">₹{props.total}</Typography>
                                <Typography className={classes.sub} align="left" gutterBottom>Total</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                {
                                    (props.due) ?
                                        <Box>
                                            <Typography className={classes.title + ' ' + classes.dueAmount} align="left">₹{props.due}</Typography>
                                            <Typography className={classes.due} display="inline" gutterBottom>Due</Typography>
                                        </Box>
                                        :
                                        <Box>
                                            <Typography className={classes.title + ' ' + classes.paidAmount} align="left">₹{props.due}</Typography>
                                            <Typography className={classes.paid} display="inline" gutterBottom><Check className={classes.iconMiddle} />Paid</Typography>
                                        </Box>
                                }
                            </Grid>
                        </Grid>
                    </Box>
                }
                {
                    props.individual ?
                        (
                            props.due ?
                                <Grid style={{ borderTop: '1px solid rgba(53, 51, 43, 0.1)' }} container alignItems="center">
                                    <Grid item xs={4} className={classes.link}>
                                        <Link to='/cancelInvoice' style={{ textDecoration: 'none' }}>
                                            <Typography className={classes.linkText}>Cancel Invoice</Typography>
                                        </Link>
                                    </Grid>
                                    <Grid item xs={4} className={classes.link}>
                                        <Typography>Send Reminder</Typography>
                                    </Grid>
                                    <Grid item xs={4} className={classes.link}>
                                        <Typography>View Invoice</Typography>
                                    </Grid>
                                </Grid>
                                :
                                <Grid style={{ borderTop: '1px solid rgba(53, 51, 43, 0.1)' }} container alignItems="center">
                                    <Grid item xs={4} className={classes.link}>
                                        <Link to='/refundNotice' style={{ textDecoration: 'none' }}>
                                            <Typography className={classes.linkText}>Process Refund</Typography>
                                        </Link>
                                    </Grid>
                                    <Grid item xs={4} className={classes.link}>
                                        <Typography>Payment Details</Typography>
                                    </Grid>
                                    <Grid item xs={4} className={classes.link}>
                                        <Typography>View Invoice</Typography>
                                    </Grid>
                                </Grid>
                        )
                        :
                        <Grid style={{ borderTop: '1px solid rgba(53, 51, 43, 0.1)' }} container alignItems="center">
                            <Grid item xs={6} className={classes.link}>
                                <Link to={{ pathname: '/payment-history', query: { name: props.name, phone: props.phone } }} style={{ textDecoration: 'none' }}>
                                    <Typography className={classes.linkText}>Payment History</Typography>
                                </Link>
                            </Grid>
                            <Grid item xs={6} className={classes.link}>
                                {
                                    (props.due) ? <Typography>Send Reminder</Typography> : <Typography>Acknowledge Payment</Typography>
                                }
                            </Grid>
                        </Grid>
                }
            </CardContent>
        </Card>
    );
}

const useStyles = makeStyles({
    root: {
        display: 'block',
        margin: '0 auto',
        maxWidth: 420,
        backgroundColor: 'white'
    },
    date: {
        color: '#35332B',
        fontSize: '10px',
        textAlign: 'left',
        lineHeight: '13px',
        display: 'flex'
    },
    icon: {
        fontSize: '10px',
        opacity: '0.4',
        marginRight: 2
    },
    iconMiddle: {
        fontSize: '10pt',
        verticalAlign: 'middle',
        marginRight: '2px'
    },
    title: {
        fontWeight: 'bold',
        textAlign: 'left',
        fontSize: '12px',
        lineHeight: '24px',
        margin: '5px 10px',
        color: '#35332B'
    },
    sub: {
        color: '#35332B',
        opacity: 0.6,
        fontSize: '10px',
        marginLeft: '10px'
    },
    due: {
        backgroundColor: '#E87716',
        borderRadius: '4px',
        padding: '2px 6px',
        fontSize: '10px',
        color: 'white',
        lineHeight: '13px',
        marginLeft: '14px',
        textAlign: 'left',
        marginTop: '-5px'
    },
    dueAmount: {
        color: '#E87716'
    },
    paidAmount: {
        color: '#419945'
    },
    paid: {
        backgroundColor: '#419945',
        borderRadius: '4px',
        padding: '2px 6px',
        fontSize: '10px',
        color: 'white',
        lineHeight: '13px',
        marginLeft: '14px',
        textAlign: 'left'
    },
    bank: {
        color: '#35332B',
        opacity: 0.6,
        fontSize: '10px',
        marginLeft: '10px',
        margin: '5px 10px',
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
            fontSize: '12px'
        }
    },
    linkText: {
        textDecoration: 'none',
        fontSize: '12px',
        color: '#2958C1',
    },
    receiveButton: {
        fontSize: '12px',
        textTransform: 'none',
        backgroundColor: '#419945',
        color: '#FFFFFF',
        maxWidth: '360px',
        padding: '5px 8px',
        margin: '5px 0px 0px',
        '&:hover': {
            backgroundColor: '#E2714E'
        }
    }
});