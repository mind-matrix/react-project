import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { CssBaseline, Icon, Grid, TextField, InputLabel, Divider, Card, CardContent, NativeSelect, FormControl, FormLabel, RadioGroup, Radio, FormControlLabel, InputBase, withStyles } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { green } from '@material-ui/core/colors';
import { ArrowBack as ArrowBackIcon, Person as PersonIcon, Add as AddIcon } from '@material-ui/icons';
import Wave from '../Wave';
import CustomerSelectInput from './CustomerSelectInput';

import history from '../history';

const drawerWidth = 240;

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

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
    },
    productCard: {
      borderRadius: 16,
      width: '100%',
      margin: 10
    },
    elaboration: {
      marginBottom: 15
    }
}));

const GreenRadio = withStyles({
  root: {
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

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
    discountType: 'flat',
    selectedCustomer: null
  });

  const [paymentMode, setPaymentMode] = React.useState('bank');

  const handlePaymentModeChange = (e) => {
    setPaymentMode(e.target.value);
  };

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
          <Card className={classes.productCard}>
            <CardContent>
              <Grid container justify="space-between">
                <Grid item xs={6} style={{ textAlign: 'left', fontWeight: 'bolder' }}>
                  Product 1
                </Grid>
                <Grid item xs={6} style={{ textAlign: 'right', fontWeight: 'bolder' }}>
                  Rs. 5000
                </Grid>
              </Grid>
              <Grid container justify="space-between">
                <Grid item xs={6} style={{ textAlign: 'left' }}>
                  Item Subtotal
                </Grid>
                <Grid item xs={6} style={{ textAlign: 'right' }}>
                  5 X Rs. 10000
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Button variant="outlined" style={{ fontWeight: 'bold', textTransform: 'none', fontSize: 16, margin: '10px auto', paddingTop: '10px', paddingBottom: '10px' }}>
            <AddIcon />
            Add Item
          </Button>
          <Divider style={{ width: '100%', marginTop: '15px' }} />
          <Grid container justify="space-between" className={classes.elaboration}>
            <Grid item xs={6} style={{ textAlign: 'left', fontSize: 18 }}>
              Total Amount
            </Grid>
            <Grid item xs={6} style={{ textAlign: 'right', fontWeight: 'bolder', fontSize: 18 }}>
              Rs. 5000
            </Grid>
          </Grid>
          <Grid container justify="space-between" className={classes.elaboration}>
            <Grid item xs={6} style={{ textAlign: 'left', fontSize: 14 }}>
              Advance Paid
            </Grid>
            <Grid item xs={6} style={{ textAlign: 'right', fontSize: 14 }}>
              Rs. 10000
            </Grid>
          </Grid>
          <Grid container justify="space-between" className={classes.elaboration}>
            <Grid item xs={6} style={{ textAlign: 'left', fontSize: 14 }}>
              Discount
              <NativeSelect
                value={state.discountType}
                onChange={handleChange}
                input={<BootstrapInput />}
                style={{ marginLeft: 5 }}
              >
                <option value={'flat'}>Flat(Rs.)</option>
                <option value={'percent'}>Percent(%)</option>
              </NativeSelect>
            </Grid>
            <Grid item xs={6} style={{ textAlign: 'right', fontSize: 14 }}>
              Rs. 200
            </Grid>
          </Grid>
          <Grid container justify="space-between" className={classes.elaboration}>
            <Grid item xs={6} style={{ textAlign: 'left', fontSize: 14 }}>
              GST %9
            </Grid>
            <Grid item xs={6} style={{ textAlign: 'right', fontSize: 14 }}>
              Rs. 450
            </Grid>
          </Grid>
          <Divider style={{ width: '100%', marginTop: '15px' }} />
          <Grid container justify="space-between">
            <Grid item xs={6} style={{ textAlign: 'left', fontSize: 14 }}>
              Shipping
            </Grid>
            <Grid item xs={6} style={{ textAlign: 'right', fontSize: 14 }}>
              Rs. 0
            </Grid>
          </Grid>
          <Grid container justify="space-between">
            <Grid item xs={6} style={{ textAlign: 'left', fontSize: 18, fontWeight: 'bold' }}>
              Balance Amount
            </Grid>
            <Grid item xs={6} style={{ textAlign: 'right', fontSize: 18, color: '#419945' }}>
              Rs. 4250
            </Grid>
          </Grid>
          <Divider style={{ width: '100%', marginTop: '15px', marginBottom: '15px' }} />
          <TextField
            label="Payment terms/Notes, if any"
            multiline
            required
            fullWidth
            rows={4}
            variant="outlined"
          />
          <FormControl component="fieldset">
            <FormLabel style={{ textAlign: 'left' }} component="legend">Payment Mode</FormLabel>
            <RadioGroup aria-label="mode" name="mode" value={paymentMode} onChange={handlePaymentModeChange}>
              <Grid container>
                <Grid item xs='auto'>
                  <FormControlLabel value="bank" control={<GreenRadio />} label="Bank Transfer" />
                </Grid>
                <Grid item>
                  <FormControlLabel value="add" control={<GreenRadio />} label="Add payment" />
                </Grid>
              </Grid>
            </RadioGroup>
          </FormControl>
        </Grid>
      </main>
    </div>
  );
}