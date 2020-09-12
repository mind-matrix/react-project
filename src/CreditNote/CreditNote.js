import React from 'react';
import { CssBaseline, Grid, Typography, makeStyles, Divider, Box } from '@material-ui/core';

export default function CreditNote(props) {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline />
            {/* <AppBar elevation={1} position="absolute" style={{ backgroundColor: 'white' }}>
                <Toolbar>
                    <IconButton edge="start" onClick={() => history.back()} aria-label="close">
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        {props.type === "/invoice-preview" ? "View Invoice" : "Credit Note"}
                    </Typography>
                    <div style={{ width: 60 }}></div>
                </Toolbar>
            </AppBar>
            <div className={classes.appBarSpacer} /> */}
            <Box className={classes.page}>
                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <div className={classes.logo}>
                            <div className={classes.logoAltText}>
                                Logo
                        </div>
                        </div>
                    </Grid>
                    <Grid item xs={9}>
                        <Grid container justify="flex-start" alignItems="stretch" style={{ height: '100%' }}>
                            <Grid item xs={12}>
                                <Typography style={{ textTransform: 'uppercase', fontSize: 12, fontWeight: 'bold' }}>CREDIT NOTE 123</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography style={{ fontSize: 12 }} align="left">INV/20-21/1</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography style={{ fontSize: 12 }} align="right">01 Dec 19</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Divider className={classes.divider} />
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Typography style={{ fontSize: 12, opacity: '0.7', marginBottom: 10 }}>Bill To</Typography>
                        <Typography style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 5 }}>ABC Consulting</Typography>
                        <Typography style={{ fontSize: 10, opacity: '0.7' }}>493 HSR Layout</Typography>
                        <Typography style={{ fontSize: 10, opacity: '0.7' }}>Bangalore, Karnataka</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography style={{ fontSize: 12, opacity: '0.7', marginBottom: 10 }}>Bill From</Typography>
                        <Typography style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 5 }}>ABC Consulting</Typography>
                        <Typography style={{ fontSize: 10, opacity: '0.7' }}>493 HSR Layout</Typography>
                        <Typography style={{ fontSize: 10, opacity: '0.7' }}>Bangalore, Karnataka</Typography>
                    </Grid>
                </Grid>
                <Divider className={classes.divider} />
                <Grid container spacing={3}>
                    <Grid item xs={6} style={{ paddingBottom: 0, marginBottom: 0 }}>
                        <Typography style={{ fontSize: 12, fontWeight: 'bold' }}>Product 1</Typography>
                    </Grid>
                    <Grid item xs={6} style={{ paddingBottom: 0, marginBottom: 0 }}>
                        <Typography style={{ fontSize: 12, fontWeight: 'bold' }} align="right">₹5000</Typography>
                    </Grid>
                    <Grid item xs={6} style={{ paddingTop: 0, marginTop: 0 }}>
                        <Typography style={{ fontSize: 10, opacity: '0.7' }}>Item Subtotal</Typography>
                    </Grid>
                    <Grid item xs={6} style={{ paddingTop: 0, marginTop: 0 }}>
                        <Typography style={{ fontSize: 10, opacity: '0.7' }} align="right">5 X ₹1000</Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={6} style={{ paddingBottom: 0, marginBottom: 0 }}>
                        <Typography style={{ fontSize: 12, fontWeight: 'bold' }}>Product 2</Typography>
                    </Grid>
                    <Grid item xs={6} style={{ paddingBottom: 0, marginBottom: 0 }}>
                        <Typography style={{ fontSize: 12, fontWeight: 'bold' }} align="right">₹5000</Typography>
                    </Grid>
                    <Grid item xs={6} style={{ paddingTop: 0, marginTop: 0 }}>
                        <Typography style={{ fontSize: 10, opacity: '0.7' }}>Item Subtotal</Typography>
                    </Grid>
                    <Grid item xs={6} style={{ paddingTop: 0, marginTop: 0 }}>
                        <Typography style={{ fontSize: 10, opacity: '0.7' }} align="right">5 X ₹1000</Typography>
                    </Grid>
                </Grid>
                <Divider className={classes.divider} />
                <Grid container>
                    <Grid item xs={4}></Grid>
                    <Grid item xs={8}>
                        <Grid container>
                            <Grid item xs={8}>
                                <Typography style={{ fontSize: 12, opacity: '0.7' }}>Total Amount</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography style={{ fontSize: 12, fontWeight: 'bold' }} align="right">₹10000</Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography style={{ fontSize: 12, opacity: '0.7' }}>Advanced Paid</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography style={{ fontSize: 12 }} align="right">₹2000</Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography style={{ fontSize: 12, opacity: '0.7' }}>GST %9</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography style={{ fontSize: 12 }} align="right">₹900</Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography style={{ fontSize: 12, opacity: '0.7' }}>Shipping</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography style={{ fontSize: 12 }} align="right">₹0</Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography style={{ fontSize: 12, opacity: '0.7', marginTop: 7 }}>Balance Amount</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography style={{ fontSize: 14, fontWeight: 'bold', color: '#419945', marginTop: 5 }} align="right">₹10000</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Divider className={classes.divider} />
                <Grid container>
                    <Grid item xs={12}>
                        <Box><Typography style={{ fontSize: 12, opacity: '0.7', marginBottom: 5 }}>Bank Details</Typography></Box>
                        <Box><Typography style={{ fontSize: 12, opacity: '0.7' }}>Bank Name: <b style={{ opacity: 1 }}>ICICI Bank</b></Typography></Box>
                        <Box><Typography style={{ fontSize: 12, opacity: '0.7' }}>A/C no.: <b style={{ opacity: 1 }}>7842154512</b></Typography></Box>
                        <Box><Typography style={{ fontSize: 12, opacity: '0.7' }}>IFSC code: <b style={{ opacity: 1 }}>ICICI012345</b></Typography></Box>
                        <Box><Typography style={{ fontSize: 12, opacity: '0.7' }}>UPI: <b style={{ opacity: 1 }}>7845124754@ybl</b></Typography></Box>
                    </Grid>
                </Grid>
                <Divider className={classes.divider} />
                <Grid container>
                    <Grid item xs={12}>
                        <Box><Typography style={{ fontSize: 12, opacity: '0.7' }}>PAN Number: <b style={{ opacity: 1 }}>HERW1234D</b></Typography></Box>
                        <Box><Typography style={{ fontSize: 12, opacity: '0.7' }}>GST Number: <b style={{ opacity: 1 }}>HERW1234D</b></Typography></Box>
                    </Grid>
                </Grid>
                <Divider className={classes.divider} />
                <Typography style={{ fontSize: 12, opacity: '0.7' }}>Payment Terms/Note, if any</Typography>
                {/* <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <Button className={classes.button} variant="contained" disableElevation fullWidth>
                            Preview
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button className={classes.button} variant="contained" color="primary" disableElevation fullWidth>
                            Save
                        </Button>
                    </Grid>
                </Grid> */}
            </Box>
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
    page: {
        padding: "20px 0px 50px",
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
    },
    divider: {
        margin: "20px 0px"
    },
    button: {
        fontSize: '16px',
        height: '56px',
        textTransform: 'none'
    }
}));