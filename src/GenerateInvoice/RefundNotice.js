import React from 'react';
import { Grid, FormControl, InputLabel, Select, Toolbar, Box, Button, Typography, IconButton, AppBar, CssBaseline, makeStyles } from '@material-ui/core';
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';

import history from '../history';

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

    const [refundType, setRefundType] = React.useState(0);

    const handleSetRefundType = (e) => {
        setRefundType(e.target.value);
    };

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
                    You are about to process a refund against the Invoice <b>Invoice Number</b> dated <b>Invoice Date</b> paid on <b>Payment date </b> to <b>Customer Name</b>
                </Typography>
                        <div className={classes.spacer} />
                        <Box px={2}>
                            <FormControl variant="outlined" fullWidth className={classes.formControl}>
                                <InputLabel htmlFor="outlined-refund-type">Refund Type</InputLabel>
                                <Select
                                    native
                                    value={refundType}
                                    onChange={handleSetRefundType}
                                    label="Refund Type"
                                    color="primary"
                                    inputProps={{
                                        name: 'refundType',
                                        id: 'outlined-refund-type',
                                    }}
                                >
                                    <option aria-label="Full Type" value={0}>Full Refund</option>
                                    <option aria-label="Another Type" value={1}>Half Type</option>
                                </Select>
                            </FormControl>
                            <div className={classes.spacer} />
                            <Grid container spacing={1}>
                                <Grid item xs={6}>
                                    <Button className={classes.button} variant="contained" disableElevation fullWidth>
                                        Preview
                            </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button className={classes.button} variant="contained" color="primary" disableElevation fullWidth>
                                        Save &amp; Issue
                            </Button>
                                </Grid>
                            </Grid>
                        </Box>
            </main>
        </div>
    );
}