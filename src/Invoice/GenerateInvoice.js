import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { CssBaseline, Icon, Grid, TextField, InputLabel, Divider } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { ArrowBack as ArrowBackIcon, Person as PersonIcon } from '@material-ui/icons';
import Wave from '../Wave';
import CustomerSelectInput from './CustomerSelectInput';

import history from '../history';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
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
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    menuButtonHidden: {
      display: 'none',
    },
    title: {
      flexGrow: 1,
      fontWeight: 600,
      color: '#35332B'
    },
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    },
    appBarSpacer: theme.mixins.toolbar,
    spacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
      paddingBottom: '100px'
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    fixedHeight: {
      height: 240,
    },
    customer: {
      color: '#2958C1',
      fontSize: '16pt',
      marginTop: '15px'
    },
    customerIcon: {
      verticalAlign: 'sub',
      marginRight: '10px'
    },
    customerPhone: {
      display: 'inline',
      marginLeft: '15px',
      color: '#35332B',
      opacity: 0.7,
      fontSize: '10pt'
    }
}));

export default function GenerateInvoice() {
  const classes = useStyles();

  const [state, setState] = React.useState({
    inv: null,
    date: new Date(),
    customers: [
      {
        name: 'Salim K',
        number: '7466366554'
      },
      {
        name: 'Rakesh P',
        number: '7466366354'
      },
      {
        name: 'Sure Kumar',
        number: '7466361233'
      },
      {
        name: 'Akash Gupta',
        number: '7466369872'
      }
    ],
    selectedCustomer: null
  });

  const handleChange = (event) => {
    setState({value: event.target.value});
  };

  const handleDateChange = (val) => {
    setState({date: val});
  };

  const handleCustomerChange = (number) => {
    let customer = state.customers.find(v => v.number === number);
    setState({ ...state, selectedCustomer: customer });
  };

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
            Generate Invoice
            </Typography>
            <div style={{width: 60}}></div>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Grid style={{ padding: '10px', backgroundColor: '#F8F5E8' }} container justify="space-between">
          <Grid item xs={6}>
            <Typography style={{ display: 'inline', marginRight: '10px' }}>
              Inv No.
            </Typography>
            <TextField value={state.inv} onChange={handleChange} style={{ verticalAlign: 'middle', backgroundColor: '#ffffff' }} variant="outlined" size="small" />
          </Grid>
          <Grid item xs={6}>
            <Typography style={{ display: 'inline', marginRight: '10px' }}>
              Date
            </Typography>
            <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="DD MMM YY"
                value={state.date}
                onChange={handleDateChange}
                style={{ verticalAlign: 'middle', backgroundColor: '#ffffff' }}
                inputVariant="outlined"
                size="small"
              />
          </Grid>
        </Grid>
        <div className={classes.spacer} />
        <Grid container style={{ maxWidth: 480, margin: '0 auto' }}>
          <CustomerSelectInput customers={state.customers} onChange={handleCustomerChange} />
          {
            state.selectedCustomer ?
            <Typography className={classes.customer}>
              <PersonIcon className={classes.customerIcon} />
              { state.selectedCustomer.name }
              <Typography className={classes.customerPhone}>
                { state.selectedCustomer.number }
              </Typography>
            </Typography>
            :
            null
          }
          <Divider style={{ width: '100%', marginTop: '15px' }} />
        </Grid>
      </main>
    </div>
  );
}