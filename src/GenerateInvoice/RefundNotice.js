import React, { useEffect, useState } from 'react';
import { Grid, FormControl, InputLabel, Select, Toolbar, Box, Button, Typography, IconButton, AppBar, CssBaseline, makeStyles, TextField } from '@material-ui/core';
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';

import history from '../history';
import { INVOICE_TYPE, MERCHANT_ID } from '../shared/constant';
import { getInvoiceNo, refundInvoice } from '../shared/dataService';
import { useHistory } from 'react-router-dom';

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
    const [message, setMessage] = useState("")

    let history = useHistory();

    useEffect(() => {
        console.log(props.location.query.amount)
        getInvoiceNo(sessionStorage.getItem(MERCHANT_ID), INVOICE_TYPE.REFUND)
            .then(res => res.json())
            .then(data => {
                if (data.nextInvoiceNumber) {
                    setRefundId(data.nextInvoiceNumber);
                }
            })
    }, [])

    const submit = () => {
        if (refundId) {
            refundInvoice(refId, refundId, refundAmount, refundType, message)
                .then(res => res.json())
                .then(data => {
                    if (data.invoiceRefundRef) {
                        window.alert('Refund has been initiated');
                        history.push('/payment-history');
                    }
                })
        }
    }

    return (
        <div className={classes.root}>

            <CssBaseline />
            <AppBar elevation={1} position="absolute" style={{ backgroundColor: 'white' }}>
                <Toolbar className={classes.toolbar}>
                    <IconButton edge="start" onClick={() => history.back()} aria-label="close">
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
                    You are about to process a refund against the Invoice <b>{props.location.query.invoice}</b> dated <b>{props.location.query.date}</b> paid on <b>Payment date </b> to <b>{props.location.query.name}</b>
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
                            <Button className={classes.button} variant="contained" disableElevation fullWidth>
                                Preview
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button className={classes.button} variant="contained" color="primary" disableElevation fullWidth onClick={submit}>
                                Save &amp; Issue
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </main>
        </div>
    );
}