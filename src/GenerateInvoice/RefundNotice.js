import React, { useEffect, useState } from 'react';
import { Grid, FormControl, InputLabel, Select, Toolbar, Box, Button, Typography, IconButton, AppBar, CssBaseline, makeStyles, TextField } from '@material-ui/core';
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';
import { INVOICE_TYPE, MERCHANT_ID, MERCHANT_LOGO } from '../shared/constant';
import { getCustomerDetail, getInvoice, getInvoiceNo, getMer, refundInvoice } from '../shared/dataService';
import { useHistory } from 'react-router-dom';
import FullScreenDialog from '../Common/FullScreenDialog';
import InvoiceView from '../CreditNote/InvoiceView';
import Message from '../Common/Message';

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
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        maxWidth: 340
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
        color: '#E2714D'
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

export default function RefundNotice(props) {

    const classes = useStyles();
    let refId = props.location.query.refId;
    const [refundType, setRefundType] = useState("FR");
    const [refundAmount, setRefundAmount] = useState(props.location.query.amount);
    const [refundId, setRefundId] = useState(null);
    const [message, setMessage] = useState(`Refund notice against the Invoice ${props.location.query.invoice} dated ${props.location.query.date} paid on ${props.location.query.paymentDate} by ${props.location.query.name}`);
    const [invoiceData, setInvoiceData] = useState({});
    const [invoicePreview, setInvoicePreview] = useState(false);
    const [disabledButton, setDisabledButton] = useState(false);
    const [messageSuccess, setMessageSuccess] = useState(null);
    const [messageOpen, setMessageOpen] = useState(false);
    const [dialogMessage, setDialogMessage] = useState("");

    let history = useHistory();

    useEffect(() => {
        getInvoiceNo(sessionStorage.getItem(MERCHANT_ID), INVOICE_TYPE.REFUND)
            .then(res => res.json())
            .then(data => {
                if (data.nextInvoiceNumber) {
                    setRefundId(data.nextInvoiceNumber);
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
                                                customerName: customer.firstName + (customer.lastName? ' '+customer.lastName : ''),
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
        if (refundId) {
            refundInvoice(refId, refundId, refundAmount, refundType, message)
                .then(res => res.json())
                .then(data => {
                    if (data.invoiceRefundRef) {
                        setMessageOpen(true);
                        setMessageSuccess(true);
                        setDialogMessage("Refund notice successfully generated")
                    } else {
                        setMessageOpen(true);
                        setMessageSuccess(false);
                        setDialogMessage("Error in generating refund invoice, kindly try after sometime")
                        setDisabledButton(false);
                    }
                })
        }
    }

    const handleDialogClose = () => {
        setMessageOpen(false);
        if(messageSuccess) {
            history.push('/payment-history');
        }
    }

    return (
        <div className={classes.root}>

            <CssBaseline />
            <AppBar elevation={1} position="absolute" style={{ backgroundColor: 'white' }}>
                <Toolbar className={classes.toolbar}>
                    <IconButton edge="start" onClick={() => history.push('payment-history')} aria-label="close">
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title} align="center">
                        Refund Notice
                    </Typography>
                    <div style={{ width: 60 }}></div>
                </Toolbar>
            </AppBar>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Typography style={{ padding: '10px', backgroundColor: '#F8F5E8' }}>
                    You are about to process a refund against the Invoice <b>{props.location.query.invoice}</b> dated <b>{props.location.query.date}</b> paid on <b>{props.location.query.paymentDate} </b> by <b>{props.location.query.name}</b>
                </Typography>
                <div className={classes.spacer} />
                <Box px={2}>
                    <Select
                        native
                        fullWidth
                        variant="outlined"
                        value={refundType}
                        onChange={e => setRefundType(e.target.value)}
                        color="primary"
                        inputProps={{
                            name: 'refundType',
                            id: 'outlined-refund-type',
                        }}
                    >
                        <option aria-label="Full Type" value="FR">Full Refund</option>
                        <option aria-label="Another Type" value="PR">Partial Refund</option>
                    </Select>
                    {refundType === "PR" ?
                        <TextField
                            variant="outlined"
                            fullWidth
                            style={{ marginTop: 15 }}
                            label="Refund Amount"
                            value={refundAmount}
                            onChange={e => setRefundAmount(e.target.value)}
                        /> : null
                    }
                    <TextField
                        label="Refund Invoice Subject/Message"
                        multiline
                        required
                        fullWidth
                        style={{ marginTop: 15 }}
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
            <FullScreenDialog title="Refund Invoice Preview" header value={invoicePreview} onClick={invoicePreviewHandler} onClose={invoicePreviewClose}>
                <InvoiceView data={invoiceData} logo={sessionStorage.getItem(MERCHANT_LOGO)} message={message} invoice={refundId}/>
            </FullScreenDialog>
            {messageSuccess != null ? <Message success={messageSuccess} open={messageOpen} handleClose={handleDialogClose} message={dialogMessage}/> : null}
        </div>
    );
}