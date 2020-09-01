import React from 'react';
import { Card, CardContent, Grid, Divider, Typography, makeStyles, styled, Box } from '@material-ui/core';

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
        fontSize: '10px',
        textAlign: 'left',
        lineHeight: '13px',
        display: 'flex',
        alignItems: 'center'
    },
    icon: {
        fontSize: '10px',
        verticalAlign: 'bottom',
        opacity: '0.4'
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
            return (Math.round(number * 100 / 100000) / 100).toFixed(2) + ' L';
        } else {
            return (Math.round(number * 100 / 10000000) / 100).toFixed(2) + ' Cr';
        }
    };

    return (
        <Card elevation={4} className={classes.root}>
            <CardContent style={{ padding: 0 }}>
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
                            <Typography className={classes.title} align="left">&#8377; {format(props.total)}</Typography>
                            <Typography className={classes.sub} align="left" gutterBottom>Total</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            {
                                (props.due) ?
                                    <Box>
                                        <Typography className={classes.title + ' ' + classes.dueAmount} align="left">&#8377; {format(props.due)}</Typography>
                                        <Typography className={classes.due} display="inline" utterBottom>Due</Typography>
                                    </Box>
                                    :
                                    <Box>
                                        <Typography className={classes.title + ' ' + classes.paidAmount} align="left">&#8377; {format(props.due)}</Typography>
                                        <Typography className={classes.paid} display="inline" gutterBottom><Check className={classes.iconMiddle} />Paid</Typography>
                                    </Box>
                            }
                        </Grid>
                    </Grid>

                </Box>
                <Grid style={{ borderTop: '1px solid rgba(53, 51, 43, 0.1)' }} container alignItems="center">
                    <Grid item xs={6} className={classes.link}>
                        <Typography>Payment History</Typography>
                    </Grid>
                    <Grid item xs={6} className={classes.link}>
                        {
                            (props.due) ? <Typography>Send Reminder</Typography> : <Typography>Acknowledge Payment</Typography>
                        }
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}