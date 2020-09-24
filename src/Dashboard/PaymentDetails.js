import React, { useEffect, useState } from 'react';
import { AppBar, Box, CssBaseline, Grid, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { ArrowBack } from '@material-ui/icons';
import DetailedInvoiceCard from './DetailedInvoiceCard';
import { invoiceHistory } from '../shared/dataService';
import moment from 'moment';

function PaymentDetails(props) {
    const [data, setData] = useState({});
    const classes = useStyles();
    useEffect(() => {
        invoiceHistory(props.location.state.invoice)
            .then(res => res.json())
            .then(data => {
                if (data.invoiceNumber) {
                    setData(data);
                }
            })
    }, [])
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar elevation={1} position="absolute" style={{ backgroundColor: 'white' }}>
                <Toolbar className={classes.toolbar}>
                    <Link to='/payment-history'>
                        <ArrowBack style={{ color: '#000000' }} />
                    </Link>
                    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                        <Typography variant="h6" className={classes.title} align="center" display="block">Payment History</Typography>
                        <Typography variant="caption" className={classes.number} align="center" display="block">INV/23-24/21</Typography>
                    </Box>
                    <ArrowBack />
                </Toolbar>
            </AppBar>
            <Grid container>
                <Grid item xs={12} display="flex">
                    <Box style={{ maxWidth: 448, margin: '0px auto', padding: '0px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography className={classes.header} display="block">Received</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} style={{ padding: '10px 14px' }}>
                    <DetailedInvoiceCard payment date={moment(data.invoiceDate).format('ll')} invoice={data.invoiceNumber} paymentMode={data.paymentMode} history receive />
                </Grid>
                <Grid item xs={12} display="flex">
                    <Box style={{ maxWidth: 448, margin: '0px auto', padding: '0px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography className={classes.header} display="block">Refund</Typography>
                    </Box>
                </Grid>
                {data.invoiceHistoryList && data.invoiceHistoryList.length > 0 ?
                    data.invoiceHistoryList.map((invoice, i) =>
                        <Grid key={i} item xs={12} style={{ padding: '10px 14px' }}>
                            <DetailedInvoiceCard payment date={moment(invoice.refundDate).format('ll')} invoice={invoice.invoiceNumber} amount={invoice.refundAmount} history />
                        </Grid>
                    ) : null
                }
            </Grid>
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        paddingTop: '90px',
        paddingBottom: 50
    },
    toolbar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingTop: '10px',
        paddingBottom: '10px'
    },
    title: {
        flexGrow: 1,
        fontWeight: 600,
        color: '#E2714D',
        fontSize: '20px'
    },
    number: {
        fontSize: '14px',
        opacity: '0.7',
        color: '#35332B'
    },
    header: {
        fontSize: '16px',
        fontWeight: '600',
        color: '#35332B',
        padding: '20px 0px'
    },
    button: {
        height: '44px',
        fontSize: '16px',
        textTransform: 'none',
    },
    dialogTitle: {
        fontSize: '20px',
        fontWeight: '600'
    },
    extraButton: {
        textTransform: 'none',
        fontSize: '10px',
        height: '24px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'white',
        border: '0.5px solid #aaaaaa',
        borderRadius: 4,
        outline: 'none',
        padding: '0px 5px',
        '&:focus, &:hover, &:active': {
            outline: 'none'
        }
    }
}))

export default PaymentDetails;
