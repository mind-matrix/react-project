import React, { useState, useEffect } from 'react'
import { CssBaseline, AppBar, Toolbar, Typography, makeStyles, Box, Grid, Button, Dialog, DialogTitle, DialogContent, Select, FormControl, InputLabel, TextField } from '@material-ui/core'
import { ArrowBack, Tune } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import DetailedInvoiceCard from './DetailedInvoiceCard';
import FullScreenDialog from '../FullScreenDialog';
import FilterSelect from './FilterSelect';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { paymentHistory } from '../shared/dataService';
import { CUSTOMER_NAME, CUSTOMER_NUMBER, MERCHANT_ID } from '../shared/constant';
import moment from 'moment';

function PaymentHistory(props) {
    if (props.location.query && props.location.query.name) {
        sessionStorage.setItem(CUSTOMER_NAME, props.location.query.name)
    }
    if (props.location.query && props.location.query.phone) {
        sessionStorage.setItem(CUSTOMER_NUMBER, props.location.query.phone)
    }
    const [name, setName] = useState(sessionStorage.getItem(CUSTOMER_NAME));
    const [phone, setPhone] = useState(sessionStorage.getItem(CUSTOMER_NUMBER));
    const [pending, setPending] = useState([]);
    const [receive, setReceive] = useState([]);
    const [filter, setFilterOpen] = useState(false);
    const [openMark, setOpenMark] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [mode, setMode] = useState('');
    const [state, setState] = React.useState({
        recordsPerPage: 5,
        page: 1,
        totalPage: 1,
        totalReceivePage: 1,
        receivePage: 1
    });
    const classes = useStyles();

    useEffect(() => {
        paymentHistory({
            merchantId: sessionStorage.getItem(MERCHANT_ID),
            customerPhone: phone,
            paymentStatus: "P"
        })
            .then(res => res.json())
            .then(data => {
                if (data.paymentInfoList) {
                    setPending(data.paymentInfoList);
                    setState({ ...state, totalPage: Math.ceil(data.paymentInfoList.length / state.recordsPerPage) })
                }
            })

        paymentHistory({
            merchantId: sessionStorage.getItem(MERCHANT_ID),
            customerPhone: phone,
            paymentStatus: "R"
        })
            .then(res => res.json())
            .then(data => {
                if (data.paymentInfoList) {
                    setReceive(data.paymentInfoList);
                    setState({ ...state, totalReceivePage: Math.ceil(data.paymentInfoList.length / state.recordsPerPage) })
                }
            })
    }, [])

    const modeChangeHandler = (event) => {
        setMode(event.target.value)
    }

    const handleDateChange = (date) => {
        setSelectedDate(date)
    }

    const openMarkDialog = () => {
        setOpenMark(true);
    }

    const closeMarkDialog = () => {
        setOpenMark(false);
    }

    const handleFilterOpen = () => {
        setFilterOpen(true);
    };

    const handleFilterClose = () => {
        setFilterOpen(false);
    };

    const handleFilterApply = (options) => {
        paymentHistory({
            merchantId: sessionStorage.getItem(MERCHANT_ID),
            customerPhone: phone,
            amountFrom: options.amount[0],
            amountTo: options.amount[1],
            dateFrom: options.date.start,
            dateTo: options.date.end,
            paymentStatus: "R"
        })
            .then(res => res.json())
            .then(data => {
                if (data.paymentInfoList) {
                    setReceive(data.paymentInfoList);
                    setState({ ...state, totalReceivePage: Math.ceil(data.paymentInfoList.length / state.recordsPerPage) })
                }
            })
        setFilterOpen(false);
    };

    const prevPage = () => {
        if (state.page > 1) {
            setState({ ...state, page: state.page - 1 });
        }
    };

    const nextPage = () => {
        if (state.page < state.totalPage) {
            setState({ ...state, page: state.page + 1 });
        }
    };

    const prevReceivePage = () => {
        if (state.receivePage > 1) {
            setState({ ...state, page: state.receivePage - 1 });
        }
    };

    const nextReceivePage = () => {
        if (state.receivePage < state.totalReceivePage) {
            setState({ ...state, page: state.receivePage + 1 });
        }
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar elevation={1} position="absolute" style={{ backgroundColor: 'white' }}>
                <Toolbar className={classes.toolbar}>
                    <Link to='/Dashboard'>
                        <ArrowBack style={{ color: "#000000" }} />
                    </Link>
                    <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
                        <Typography variant="h6" className={classes.title} align="center" display="block">{name}</Typography>
                        <Typography variant="caption" className={classes.number} align="center" display="block">{phone}</Typography>
                    </Box>
                    <ArrowBack />
                </Toolbar>
            </AppBar>
            <Grid container>
                <Grid item xs={12} display="flex">
                    <Box style={{ maxWidth: 448, margin: '0px auto', padding: '0px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography className={classes.header} display="block">Pending</Typography>
                    </Box>
                </Grid>
                {pending && pending.length > 0 ?
                    pending.map((invoice, i) => {
                        if (i < (state.page - 1) * state.recordsPerPage) return;
                        if (i > (state.page) * state.recordsPerPage - 1) return;
                        return <Grid key={i} item xs={12} style={{ padding: '10px 14px' }}>
                            <DetailedInvoiceCard individual date={moment(invoice.invoiceDate).format('ll')} invoice={invoice.invoiceNumber} name={invoice.customerName} phone={invoice.mobileNumber} total={invoice.totalAmount} due={invoice.balanceAmount} invoiceRef={invoice.invoiceRefId} url={invoice.invoiceUrl} mark={() => openMarkDialog()} />
                        </Grid>
                    }) : null
                }
                {state.totalPage ?
                    <Grid item xs={12}>
                        <Box maxWidth={200} style={{ width: 'fit-content', margin: '0 auto' }}>
                            <Typography>
                                <Button onClick={prevPage} style={{ padding: '5px 5px', minWidth: 0 }} variant="outlined">
                                    <ChevronLeft style={{ verticalAlign: 'middle', fontSize: '10pt' }} />
                                </Button>
                                <span style={{ padding: '5px 10px', fontSize: '10pt' }}>
                                    {state.page}/{state.totalPage}
                                </span>
                                <Button onClick={nextPage} style={{ padding: '5px 5px', minWidth: 0 }} variant="outlined">
                                    <ChevronRight style={{ verticalAlign: 'middle', fontSize: '10pt' }} />
                                </Button>
                            </Typography>
                        </Box>
                    </Grid> : null
                }
                <Grid item xs={12}>
                    <Box style={{ maxWidth: 448, margin: '0px auto', padding: '0px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography className={classes.header} display="block">Received</Typography>
                        <Box onClick={handleFilterOpen} className={classes.extraButton}>
                            <Tune style={{ marginRight: '5px', height: '15px' }} />
                            Filter
                        </Box>
                    </Box>
                </Grid>
                {receive && receive.length > 0 ?
                    receive.map((invoice, i) => {
                        if (i < (state.receivePage - 1) * state.recordsPerPage) return;
                        if (i > (state.receivePage) * state.recordsPerPage - 1) return;
                        return <Grid key={i} item xs={12} style={{ padding: '10px 14px' }}>
                            <DetailedInvoiceCard individual date={moment(invoice.invoiceDate).format('ll')} invoice={invoice.invoiceNumber} name={invoice.customerName} phone={invoice.mobileNumber} total={invoice.balanceAmount} invoiceRef={invoice.invoiceRefId} url={invoice.invoiceUrl} />
                        </Grid>
                    }) : null
                }
                {state.totalReceivePage ?
                    <Grid item xs={12}>
                        <Box maxWidth={200} style={{ width: 'fit-content', margin: '0 auto' }}>
                            <Typography>
                                <Button onClick={prevReceivePage} style={{ padding: '5px 5px', minWidth: 0 }} variant="outlined">
                                    <ChevronLeft style={{ verticalAlign: 'middle', fontSize: '10pt' }} />
                                </Button>
                                <span style={{ padding: '5px 10px', fontSize: '10pt' }}>
                                    {state.receivePage}/{state.totalReceivePage}
                                </span>
                                <Button onClick={nextReceivePage} style={{ padding: '5px 5px', minWidth: 0 }} variant="outlined">
                                    <ChevronRight style={{ verticalAlign: 'middle', fontSize: '10pt' }} />
                                </Button>
                            </Typography>
                        </Box>
                    </Grid> : null
                }
            </Grid>
            <FullScreenDialog title="Filter" value={filter} onClick={handleFilterOpen} onClose={handleFilterClose}>
                <FilterSelect onApply={handleFilterApply} />
            </FullScreenDialog>
            <Dialog onClose={closeMarkDialog} aria-labelledby="mark-dialog" open={openMark}>
                <DialogTitle className={classes.dialogTitle} id="mark-dialog" onClose={closeMarkDialog}>
                    Mark Received
                </DialogTitle>
                <DialogContent>
                    <Grid container>
                        <Grid item xs={12}>
                            <KeyboardDatePicker
                                margin="normal"
                                fullWidth
                                id="date-picker-dialog"
                                label="Payment Date"
                                format="DD/MM/yyyy"
                                value={selectedDate}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'Payment Date',
                                }}
                                inputVariant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12} style={{ marginTop: '20px' }}>
                            <FormControl variant="outlined" className={classes.formControl} fullWidth>
                                <InputLabel htmlFor="outlined-age-native-simple">Payment Mode</InputLabel>
                                <Select
                                    native
                                    value={mode}
                                    onChange={modeChangeHandler}
                                    label="Payment Mode"
                                >
                                    <option aria-label="None" value="" hidden disabled></option>
                                    <option value={10}>Online</option>
                                    <option value={20}>Cash</option>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} style={{ marginTop: '20px' }}>
                            <TextField id="outlined-basic" label="Payment Details" variant="outlined" fullWidth />
                        </Grid>
                        <Grid item xs={12} style={{ margin: '30px 0px' }}>
                            <Button className={classes.button} variant="contained" color="primary" fullWidth onClick={closeMarkDialog}>
                                Update
                            </Button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
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

export default PaymentHistory;
