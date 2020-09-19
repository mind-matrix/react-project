import React, { useEffect, useState } from 'react';
import { Grid, TextField, Toolbar, Box, Button, Typography, IconButton, AppBar, CssBaseline, makeStyles } from '@material-ui/core';
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';
import { cancelInvoice, getCustomerDetail, getInvoice, getInvoiceNo, getMer } from '../shared/dataService';
import { INVOICE_TYPE, MERCHANT_ID, MERCHANT_LOGO } from '../shared/constant';
import { useHistory } from 'react-router-dom';
import FullScreenDialog from '../FullScreenDialog';
import InvoiceView from '../CreditNote/InvoiceView';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        paddingBottom: '100px'
    },
    toolbar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px'
    },
    title: {
        flexGrow: 1,
        fontWeight: 600,
        color: '#E2714D',
        fontSize: '20px'
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarSpacer: theme.mixins.toolbar,
    spacer: theme.mixins.toolbar,
    button: {
        fontSize: '16px',
        height: '56px',
        textTransform: 'none'
    }
}));

export default function CancelInvoice(props) {
    const classes = useStyles();
    let refId = props.location.query.refId;
    const [message, setMessage] = useState("");
    const [cancelId, setCancelId] = useState(null);
    const [invoiceData, setInvoiceData] = useState({});
    const [invoicePreview, setInvoicePreview] = useState(false);
    const [disabledButton, setDisabledButton] = useState(false);
    let history = useHistory();

    useEffect(() => {
        getInvoiceNo(sessionStorage.getItem(MERCHANT_ID), INVOICE_TYPE.CANCELLATION)
            .then(res => res.json())
            .then(data => {
                if (data.nextInvoiceNumber) {
                    setCancelId(data.nextInvoiceNumber);
                }
            })

        getInvoice(props.location.query.refId)
            .then(res => res.json())
            .then(collection => {
                if (collection[0].merchantId) {
                    let dataForInvoice = collection[0];
                    getMer(sessionStorage.getItem(MERCHANT_ID))
                        .then(res => res.json())
                        .then(data => {
                            if (data.merchantId) {
                                let merchantData = {
                                    ...dataForInvoice,
                                    merchantName: data.merchantName,
                                    merchantAddress: `${data.merchantAddress1 ? data.merchantAddress1 : ''} ${data.merchantAddress2 ? data.merchantAddress2 : ''} ${data.merchantCity ? data.merchantCity : ''}`,
                                    pan: data.merchantPan,
                                    gst: data.merchantGstn,
                                    ...invoiceData
                                }
                                getCustomerDetail(dataForInvoice.customerId)
                                    .then(res => res.json())
                                    .then(customer => {
                                        if (customer.customerId) {
                                            setInvoiceData({
                                                ...merchantData,
                                                customerName: customer.firstName + (customer.lastName ? ' ' + customer.lastName : ''),
                                                customerCity: customer.city
                                            })
                                        }
                                    })
                            }
                        })
                }
            })
    }, [])

    const invoicePreviewHandler = () => {
        setInvoicePreview(true);
    }

    const invoicePreviewClose = () => {
        setInvoicePreview(false);
    }

    const submit = () => {
        setDisabledButton(true);
        if (cancelId) {
            cancelInvoice(refId, cancelId, message)
                .then(res => res.json())
                .then(data => {
                    if (data.invoiceCanRef) {
                        window.alert('Invoice has been cancelled');
                        history.push('/payment-history');
                    } else {
                        setDisabledButton(false);
                    }
                })
        }
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar elevation={1} position="absolute" style={{ backgroundColor: 'white' }}>
                <Toolbar className={classes.toolbar}>
                    <IconButton edge="start" onClick={() => history.push('/payment-history')} aria-label="close">
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title} align="center">
                        Cancel Invoice
                    </Typography>
                    <div style={{ width: 60 }}></div>
                </Toolbar>
            </AppBar>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Typography style={{ fontSize: '14px', padding: '10px', backgroundColor: '#F8F5E8' }}>
                    You are about to cancel invoice <b>{props.location.query.invoice}</b> dated <b>{props.location.query.date}</b>
                </Typography>
                <div className={classes.spacer} />
                <Box px={2}>
                    <TextField
                        label="Cancel Invoice Subject/Message"
                        multiline
                        required
                        fullWidth
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        rows={4}
                        variant="outlined"
                    />
                    <div className={classes.spacer} />
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <Button className={classes.button} variant="contained" onClick={invoicePreviewHandler} disableElevation fullWidth>
                                Preview
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button className={classes.button} variant="contained" color="primary" disableElevation fullWidth onClick={submit} disabled={disabledButton}>
                                Save &amp; Issue
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </main>
            <FullScreenDialog title="Cancel Invoice Preview" header value={invoicePreview} onClick={invoicePreviewHandler} onClose={invoicePreviewClose}>
                <InvoiceView data={invoiceData} logo={sessionStorage.getItem(MERCHANT_LOGO)} />
            </FullScreenDialog>
        </div>
    );
}