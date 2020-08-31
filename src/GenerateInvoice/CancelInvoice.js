import React from 'react';
import { Grid, TextField, Toolbar, Box, Button, Typography, IconButton, AppBar, CssBaseline, makeStyles } from '@material-ui/core';
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';
import Wave from '../Wave';

import history from '../history';

const useStyles = makeStyles( (theme) => ({
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
        paddingRight: 24, // keep right padding when drawer closed
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
}) );

export default function CancelInvoice(props) {
    
    const classes = useStyles();

    return (
    <div className={classes.root}>
      <Wave />
      <CssBaseline />
      <AppBar elevation={1} position="absolute" style={{backgroundColor: 'white'}}>
        <Toolbar>
            <IconButton edge="start" onClick={() => history.back()} aria-label="close">
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
            Cancel Invoice
            </Typography>
            <div style={{width: 60}}></div>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Typography style={{ padding: '10px', backgroundColor: '#F8F5E8' }}>
            You are about to cancel <b>{ props.location.state.number }</b> dated <b>{ props.location.state.date }</b>
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
            <Grid container>
                <Grid item xs={6}>
                <Button variant="contained" disableElevation>
                    <Box py={1} px={3}>
                    Preview
                    </Box>
                </Button>
                </Grid>
                <Grid item xs={6}>
                <Button variant="contained" color="primary" disableElevation>
                    <Box py={1} px={3}>
                    Save &amp; Issue
                    </Box>
                </Button>
                </Grid>
            </Grid>
        </Box>
      </main>
    </div>
    );
}