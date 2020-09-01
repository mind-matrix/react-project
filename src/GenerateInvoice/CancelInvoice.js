import React from 'react';
import { Grid, TextField, Toolbar, Box, Button, Typography, IconButton, AppBar, CssBaseline, makeStyles } from '@material-ui/core';
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

    return (
        <div className={classes.root}>

            <CssBaseline />
            <AppBar elevation={1} position="absolute" style={{ backgroundColor: 'white' }}>
                <Toolbar className={classes.toolbar}>
                    <IconButton edge="start" onClick={() => history.back()} aria-label="close">
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
                    You are about to cancel invoice <b>INV/20-21/1</b> dated <b>12th March 2020</b>
                </Typography>
                <div className={classes.spacer} />
                <Box px={2}>
                    <TextField
                        label="Cancel Invoice Subject/Message"
                        multiline
                        required
                        fullWidth
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