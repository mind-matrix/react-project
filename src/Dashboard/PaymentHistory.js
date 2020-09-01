import React, { useState } from 'react'
import { CssBaseline, AppBar, Toolbar, Typography, makeStyles, Box, Grid, Button, Dialog, DialogTitle, DialogContent, Select, FormControl, InputLabel, TextField } from '@material-ui/core'
import { ArrowBack, Tune } from '@material-ui/icons';
import AppIcon from '../AppIcon';
import FreechargeIcon from '../FreechargeIcon';
import { Link } from 'react-router-dom';
import DetailedInvoiceCard from './DetailedInvoiceCard';
import FullScreenDialog from '../FullScreenDialog';
import FilterSelect from './FilterSelect';
import { KeyboardDatePicker } from '@material-ui/pickers';

function PaymentHistory(props) {
    const [filter, setFilterOpen] = React.useState(false);
    const [openMark, setOpenMark] = useState(false);
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [mode, setMode] = useState('');
    const classes = useStyles();

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
        // apply filters
        setFilterOpen(false);
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
                        <Typography variant="h6" className={classes.title} align="center" display="block">Rakesh Gupta</Typography>
                        <Typography variant="caption" className={classes.number} align="center" display="block">5475123645</Typography>
                    </Box>
                    <ArrowBack />
                </Toolbar>
            </AppBar>
            <Grid container>
                <Grid item xs={12}>
                    <Box style={{ padding: '0px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography className={classes.header} display="block">Pending</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} style={{ padding: '10px 14px' }}>
                    <DetailedInvoiceCard individual due mark={() => openMarkDialog()} />
                </Grid>
                <Grid item xs={12} style={{ padding: '10px 14px' }}>
                    <DetailedInvoiceCard individual due mark={() => openMarkDialog()} />
                </Grid>
                <Grid item xs={12}>
                    <Box style={{ padding: '0px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography className={classes.header} display="block">Received</Typography>
                        <Button onClick={handleFilterOpen} style={{ textTransform: 'none', fontSize: '10px', height: '24px', padding: '5px 5px' }} variant="outlined">
                            <Tune style={{ marginRight: '5px', height: '15px' }} />
                            Filter
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={12} style={{ padding: '10px 14px' }}>
                    <DetailedInvoiceCard individual />
                </Grid>
                <Grid item xs={12} style={{ padding: '10px 14px' }}>
                    <DetailedInvoiceCard individual />
                </Grid>
                <Grid item xs={12} style={{ padding: '10px 14px' }}>
                    <DetailedInvoiceCard individual />
                </Grid>
                <Grid item xs={12} style={{ padding: '10px 14px' }}>
                    <DetailedInvoiceCard individual />
                </Grid>
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
                        <Grid item xs={12} style={{margin:'30px 0px'}}>
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
        paddingTop: '90px'
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
    }
}))

export default PaymentHistory