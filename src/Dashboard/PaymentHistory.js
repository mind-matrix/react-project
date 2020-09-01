import React, { useState } from 'react'
import { CssBaseline, AppBar, Toolbar, Typography, makeStyles, Box, Grid, Button } from '@material-ui/core'
import { ArrowBack, Tune } from '@material-ui/icons';
import AppIcon from '../AppIcon';
import FreechargeIcon from '../FreechargeIcon';
import { Link } from 'react-router-dom';
import DetailedInvoiceCard from './DetailedInvoiceCard';
import FullScreenDialog from '../FullScreenDialog';
import FilterSelect from './FilterSelect';

function PaymentHistory(props) {
    const [filter, setFilterOpen] = React.useState(false);
    const classes = useStyles();

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
                    <DetailedInvoiceCard individual due />
                </Grid>
                <Grid item xs={12} style={{ padding: '10px 14px' }}>
                    <DetailedInvoiceCard individual due />
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
    }
}))

export default PaymentHistory
