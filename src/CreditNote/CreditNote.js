import React from 'react';
import { CssBaseline, Grid, AppBar, Toolbar, IconButton, Typography, makeStyles } from '@material-ui/core';
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';

import history from '../history';

export default function CreditNote() {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar elevation={1} position="absolute" style={{ backgroundColor: 'white' }}>
                <Toolbar>
                <IconButton edge="start" onClick={() => history.back()} aria-label="close">
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    Credit Note
                    </Typography>
                <div style={{ width: 60 }}></div>
                </Toolbar>
            </AppBar>
            <div className={classes.appBarSpacer} />
            <Grid container>
                <Grid item className={classes.logoContainer}>
                    <div className={classes.logo}>
                        <div className={classes.logoAltText}>
                            Logo
                        </div>
                    </div>
                </Grid>
                <Grid item xs="auto">
                    <Grid container>
                        <Grid item xs={12} className={classes.header}>
                            CREDIT NOTE 123
                        </Grid>
                        <Grid item xs={12} className={classes.subheader}>
                            <div>REF: 4663</div>
                            <div style={{ float: 'right' }}>01 Dec 19</div>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
};

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column'
    },
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    title: {
        flexGrow: 1,
        fontWeight: 600,
        color: '#E2714D',
        textAlign: 'center'
    },
    logoContainer: {
        width: '71pt',
        margin: '14px'
    },
    logo: {
        display: 'block',
        position: 'relative',
        width: '100%',
        height: '44pt',
        backgroundColor: 'rgba(65, 65, 65, 0.05)'
    },
    logoAltText: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: '8pt',
        color: '#35332B',
        opacity: 0.5
    },
    appBarSpacer: theme.mixins.toolbar,
    spacer: theme.mixins.toolbar,
    header: {
        fontSize: '12pt',
        color: '#35332B',
        fontWeight: 'bold',
        lineHeight: 16
    },
    subheader: {
        color: '#35332B',
        fontSize: '12pt',
        lineHeight: 16
    }
}));