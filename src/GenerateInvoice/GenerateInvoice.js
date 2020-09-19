import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { CssBaseline, Checkbox, Box, Menu, MenuItem, Grid, TextField, Paper, Divider, Card, CardContent, NativeSelect, FormControl, FormLabel, RadioGroup, Radio, FormControlLabel, InputBase, withStyles } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { green } from '@material-ui/core/colors';
import { ArrowBack as ArrowBackIcon, Person as PersonIcon, Add as AddIcon, ArrowDropDown } from '@material-ui/icons';
import CustomerSelectInput from './CustomerSelectInput';
import InvoiceInput from './InvoiceInput';
import FullScreenDialog from '../FullScreenDialog';
import AddItem from './AddItem';
import AddCustomer from './AddCustomer';
import { checkCustomerPhone, createInvoice, getCustomerDetail, getInvoiceNo, getMer, saveMerchant, uploadFile } from '../shared/dataService';
import CreditNote from '../CreditNote/CreditNote';
import ImageUpload from '../ImageUpload/ImageUpload';
import { ASSETS, INVOICE_TYPE, MERCHANT_ID } from '../shared/constant';
import { useHistory } from 'react-router-dom';

const drawerWidth = 240;

const GreenRadio = withStyles({
  root: {
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const GenerateInvoice = () => {
  const classes = useStyles();
  const history = useHistory();
  const [state, setState] = useState({
    inv: "",
    merchantName: "",
    merchantCode: "",
    date: new Date(),
    customerId: null,
    customerPhone: null,
    customerName: "",
    customerCity: "",
    discountType: 'flat',
    discountValue: 0,
    totalDiscount: 0,
    selectedCustomer: null,
    total: 0,
    gstPercent: 9,
    gstTotal: 0,
    logo: null,
    invoiceFrom: '',
    billTo: '',
    sameAsBillTo: false,
    shipTo: '',
    advance: 0,
    otherBill: 'Shipping',
    otherBillAmount: 0,
    pan: '',
    gst: '',
    notes: ''
  });
  const [logoChanged, setLogoChanged] = useState(false);
  const [balance, setBalance] = useState(0);
  const [product, setProduct] = useState([]);
  const [logo, setLogo] = useState(null);
  const handleChecked = (e) => {
    setState({
      ...state,
      sameAsBillTo: e.target.checked,
      shipTo: e.target.checked ? state.customerName + ' ' + state.billTo : state.shipTo
    });
  };
  const [changes, setChanges] = useState({
    merchantId: sessionStorage.getItem(MERCHANT_ID)
  });
  const [paymentMode, setPaymentMode] = useState('bank');
  const [paymentLink, setPaymentLink] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [filter, setFilter] = useState('flat');
  const [disabledButton, setDisabledButton] = useState(false);

  const handlePaymentLink = (e) => {
    setPaymentLink(e.target.checked);
  };

  const handleSortOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const [addItem, setAddItemOpen] = useState(false);

  const handleAddItemOpen = () => {
    setAddItemOpen(true);
  };

  const handleAddItemClose = () => {
    setAddItemOpen(false);
  };

  const handleAddItemApply = (item) => {
    setProduct([...product, item]);
    setAddItemOpen(false);
    setState({
      ...state,
      total: state.total + item.productQty * item.unitPrice,
      gstTotal: (state.total + item.productQty * item.unitPrice - state.totalDiscount) * state.gstPercent / 100
    });
    setBalance(state.total + item.productQty * item.unitPrice + (state.total + item.productQty * item.unitPrice - state.totalDiscount) * state.gstPercent / 100 - state.totalDiscount - state.advance + state.otherBillAmount);
  };

  const [addCustomer, setAddCustomerOpen] = useState(false);
  const [invoicePreview, setInvoicePreview] = useState(false);

  const handleAddCustomerOpen = () => {
    setAddCustomerOpen(true);
  };

  const invoicePreviewHandler = () => {
    setInvoicePreview(true);
  }

  const invoicePreviewClose = () => {
    setInvoicePreview(false);
  }

  const handleAddCustomerClose = () => {
    setAddCustomerOpen(false);
  };

  const handleAddCustomerApply = (customer, id) => {
    setState({ ...state, customerId: id, customerName: customer.customerName, customerCity: customer.city, billTo: state.billTo + ' ' + customer.city });
    setAddCustomerOpen(false);
  };

  const handlePaymentModeChange = (e) => {
    setPaymentMode(e.target.value);
  };

  const handleDateChange = (val) => {
    setState({ date: val });
  };

  const handleCustomerChange = (number) => {
    let customer = state.customers.find(v => v.number === number);
    setState({ ...state, selectedCustomer: customer });
  };

  useEffect(() => {
    getMer(sessionStorage.getItem(MERCHANT_ID))
      .then(res => res.json())
      .then(data => {
        if (data.merchantId) {
          setLogo(data.merchantLogo);
          console.log(data.merchantLogo)
          getInvoiceNo(data.merchantId, INVOICE_TYPE.INVOICE)
            .then(response => response.json())
            .then(collection => {
              if (collection.nextInvoiceNumber) {
                setState({
                  ...state,
                  inv: collection.nextInvoiceNumber,
                  merchantCode: collection.merchantCode,
                  merchantName: data.merchantName,
                  pan: data.merchantPan,
                  gst: data.merchantGstn,
                  invoiceFrom: `${data.merchantAddress1 ? data.merchantAddress1 : ''} ${data.merchantAddress2 ? data.merchantAddress2 : ''} ${data.merchantCity ? data.merchantCity : ''}`
                })
              }
            })
        }
      })
  }, [])

  const checkPhoneNumber = (event) => {
    if (event.target.value.length === 10) {
      setState({
        ...state,
        customerPhone: event.target.value
      })
      checkCustomerPhone(event.target.value)
        .then(res => res.json())
        .then(data => {
          if (Object.keys(data).length === 0) {
            setAddCustomerOpen(true);
          } else {
            setState({ ...state, customerId: data.customerId });
            getCustomerDetail(data.customerId)
              .then(res => res.json())
              .then(data => {
                if (data.customerId) {
                  setState({ ...state, customerName: data.firstName + (data.lastName ? ' '+ data.lastName : ''), customerCity: data.city, billTo: state.billTo + ' ' + data.city, customerId: data.customerId });
                }
              })
          }
        })
    }
  }

  const updateAdvance = (event) => {
    setState({ ...state, advance: event.target.value });
    setBalance(state.total - event.target.value - state.totalDiscount + state.gstTotal + state.otherBillAmount);
  }

  const updateDiscount = (event) => {
    if (filter === 'flat') {
      setState({ ...state, totalDiscount: event.target.value, discountValue: event.target.value, gstTotal: (state.total - event.target.value) * state.gstPercent / 100 });
      setBalance(state.total - state.advance - event.target.value + (state.total - event.target.value) * state.gstPercent / 100 + state.otherBillAmount)
    } else if (filter === 'percent') {
      setState({ ...state, totalDiscount: (state.total * event.target.value / 100), discountValue: event.target.value, gstTotal: (state.total - (state.total * event.target.value / 100)) * state.gstPercent / 100 });
      setBalance(state.total - state.advance - (state.total * event.target.value / 100) + (state.total - (state.total * event.target.value / 100)) * state.gstPercent / 100 + state.otherBillAmount)
    }
  }

  const filterCloseHandler = (name) => {
    if (typeof name === 'string') {
      setFilter(name);
      setState({ ...state, discountType: name });
      if (name === 'flat') {
        setState({ ...state, totalDiscount: state.discountValue, gstTotal: (state.total - state.discountValue) * state.gstPercent / 100 });
        setBalance(state.total - state.advance - state.discountValue + (state.total - state.discountValue) * state.gstPercent / 100 + state.otherBillAmount)
      } else if (name === 'percent') {
        setState({ ...state, totalDiscount: state.total * state.discountValue / 100, gstTotal: (state.total - (state.total * state.discountValue / 100)) * state.gstPercent / 100 });
        setBalance(state.total - state.advance - state.total * state.discountValue / 100 + (state.total - (state.total * state.discountValue / 100)) * state.gstPercent / 100 + state.otherBillAmount)
      }
    }
    setAnchorEl(null);
  };

  const onGSTChange = (event) => {
    setState({ ...state, gstPercent: event.target.value, gstTotal: (state.total - state.totalDiscount) * event.target.value / 100 });
    setBalance(state.total - state.advance - state.totalDiscount + (state.total - state.totalDiscount) * event.target.value / 100 + state.otherBillAmount)
  }

  const otherBillChange = (event) => {
    setState({ ...state, otherBillAmount: parseInt(event.target.value) });
    setBalance(state.total - state.advance - state.totalDiscount + state.gstTotal + parseInt(event.target.value))
  }

  const submit = () => {
    setDisabledButton(true);
    let data = {
      merchantCode: state.merchantCode,
      shippingDetails: state.customerName + ' ' + state.shipTo,
      invoiceNumber: state.inv,
      customerId: state.customerId,
      balanceAmount: balance,
      discountAmount: state.totalDiscount,
      discountPercentage: state.discountType === 'percent' ? state.discountValue : "0",
      advanceAmount: state.advance,
      gstPercentage: state.gstPercent,
      gstAmount: state.gstTotal,
      roundoffAmount: state.total,
      otherAmount: state.otherAmount,
      otherAmtDesc: state.otherAmtDesc,
      totalAmount: state.total,
      productList: product
    }

    if (Object.keys(changes).length > 1) {
      saveMerchant(changes)
        .then(res => res.json())
        .then(data => console.log(data))
    }

    if(logoChanged) {
      uploadFile(sessionStorage.getItem(MERCHANT_ID), 'logos/testdata', logo)
        .then(res => res.json())
        .then(data => {
          if(data.locationUrl) {
            saveMerchant({
              merchantId: sessionStorage.getItem(MERCHANT_ID),
              merchantLogo: data.locationUrl
            })
              .then(res => res.json())
              .then(data => data)
          }
        })
    }

    if (state.inv) {
      createInvoice(data)
        .then(res => res.json())
        .then(data => {
          if (data.invoiceRefId) {
            window.alert('Invoice Generated succesfully');
            history.push('/dashboard');
          } else {
            setDisabledButton(false);
          }
        })
    }
  }

  return (
    <div>
      <CssBaseline />
      <AppBar elevation={1} position="fixed" style={{ backgroundColor: 'white' }}>
        <Toolbar>
          <IconButton edge="start" onClick={() => window.history.back()} aria-label="close">
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Generate Invoice
            </Typography>
          <div style={{ width: 60 }}></div>
        </Toolbar>
      </AppBar>
      <div className={classes.appBarSpacer} />
      <Grid style={{ padding: '10px', backgroundColor: '#F8F5E8' }} container spacing={2}>
        <Grid item xs={6}>
          <Typography style={{ display: 'inline', marginRight: '10px' }}>
            Inv No.
            </Typography>
          <TextField value={state.inv} style={{ verticalAlign: 'middle', backgroundColor: '#ffffff' }} variant="outlined" size="small" disabled />
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
            maxDate={new Date()}
            onChange={handleDateChange}
            className={classes.picker}
            style={{ verticalAlign: 'middle', backgroundColor: '#ffffff' }}
            inputVariant="outlined"
            size="small"
          />
        </Grid>
      </Grid>
      <main className={classes.content}>
        <div className={classes.spacer} />
        <Grid container style={{ maxWidth: 480, margin: '0 auto' }}>
          {/* <CustomerSelectInput customers={state.customers} onAddCustomer={handleAddCustomerOpen} onChange={handleCustomerChange} />
          {
            state.selectedCustomer ?
              <Typography className={classes.customer}>
                <PersonIcon className={classes.customerIcon} />
                {state.selectedCustomer.name}
                <Typography className={classes.customerPhone}>
                  {state.selectedCustomer.number}
                </Typography>
              </Typography>
            :
            null
          } */}
          <TextField
            variant="outlined"
            fullWidth
            label="Customer Mobile Number"
            style={{ marginBottom: 10 }}
            onBlur={checkPhoneNumber}
          />
          {/* {state.customerName ?
            <Box className={classes.customer}>
              <PersonIcon className={classes.customerIcon} />
              {state.customerName}
              <Typography className={classes.customerPhone}>
                {state.customerCity}
              </Typography>
            </Box> : null
          } */}
          <Grid container>
            <Grid item xs={4}>
              <ImageUpload alt logo={(file) => { setLogo(file); setLogoChanged(true) }} image={logo} />
            </Grid>
            <Grid item xs={8}>
              <Box pl={2} pb={2}>
                <TextField fullWidth label="Invoice From - Name" value={state.merchantName} variant="outlined" style={{ marginBottom: 10 }} onChange={e => { setState({ ...state, merchantName: e.target.value }); setChanges({ ...changes, merchantName: e.target.value }) }} />
                <TextField fullWidth label="Invoice From - Address" multiline rows={2} variant="outlined" value={state.invoiceFrom} onChange={e => { setState({ ...state, invoiceFrom: e.target.value }); setChanges({ ...changes, merchantAddress1: e.target.value }) }}></TextField>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box pr={1}>
                <TextField fullWidth label="Customer Name" value={state.customerName} variant="outlined" style={{ margin: '10px 0px' }} />
                <TextField fullWidth label="Customer Address" multiline rows={2} variant="outlined" value={state.billTo} onChange={e => setState({ ...state, billTo: e.target.value, shipTo: state.sameAsBillTo ? e.target.value : state.shipTo })}></TextField>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box pl={1}>
                <Grid container>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={state.sameAsBillTo}
                          onChange={handleChecked}
                          name="sameAsBill"
                          color="primary"
                        />
                      }
                      label="Same as bill to"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth label="Ship To" multiline rows={3} variant="outlined" value={state.shipTo} onChange={e => setState({ ...state, shipTo: e.target.value })} disabled={state.sameAsBillTo}></TextField>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
          <Divider style={{ width: '100%', marginTop: '15px' }} />
          <Card className={classes.productCard}>
            {product.length ?
              <CardContent>
                {product.map((prod, i) => (
                  <Box key={i} style={{ marginBottom: 10 }}>
                    <Grid container justify="space-between">
                      <Grid item xs={6} style={{ textAlign: 'left', fontWeight: 'bolder', fontSize: 12 }}>
                        {prod.productDescription}
                      </Grid>
                      <Grid item xs={6} style={{ textAlign: 'right', fontWeight: 'bolder', fontSize: 12 }}>
                        ₹{prod.unitPrice * prod.productQty}
                      </Grid>
                    </Grid>
                    <Grid container justify="space-between">
                      <Grid item xs={6} style={{ textAlign: 'left', opacity: '50%', fontSize: 10 }}>
                        Item Subtotal
                      </Grid>
                      <Grid item xs={6} style={{ textAlign: 'right', opacity: '50%', fontSize: 10 }}>
                        {prod.productQty} X ₹{prod.unitPrice}
                      </Grid>
                    </Grid>
                  </Box>
                ))}
              </CardContent> : null
            }
          </Card>
          <Button onClick={handleAddItemOpen} variant="outlined" style={{ fontWeight: 'bold', textTransform: 'none', fontSize: 16, margin: '10px auto', paddingTop: '10px', paddingBottom: '10px' }}>
            <AddIcon />
            Add Item
          </Button>
          <Divider style={{ width: '100%', marginTop: '15px' }} />
          <Grid container justify="space-between" className={classes.elaboration}>
            <Grid item xs={6} style={{ textAlign: 'left', fontSize: '16px' }}>
              Total Amount
            </Grid>
            <Grid item xs={6} style={{ textAlign: 'right', fontWeight: 'bolder', fontSize: '16px' }}>
              ₹{state.total}
            </Grid>
          </Grid>
          <Grid container justify="space-between" alignItems="center" className={classes.elaboration}>
            <Grid item xs={9} style={{ textAlign: 'left', fontSize: 14 }}>
              Advance Paid
            </Grid>
            <Grid item xs={3} style={{ textAlign: 'right', fontSize: 14 }}>
              <TextField
                color="secondary"
                required
                fullWidth
                type="number"
                className={classes.amountBox}
                variant="outlined"
                value={state.advance}
                onChange={updateAdvance}
                size="small"
              />
            </Grid>
          </Grid>
          <Grid container justify="space-between" alignItems="center" className={classes.elaboration}>
            <Grid item xs={9} style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', textAlign: 'left', fontSize: 14 }}>
              Discount
              <Box aria-controls="simple-menu" aria-haspopup="true" onClick={handleSortOpen} className={classes.extraButton} style={{marginLeft: 10}}>
                {filter}
                <ArrowDropDown />
              </Box>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={filterCloseHandler}
              >
                <MenuItem onClick={() => filterCloseHandler("flat")}>Flat(₹)</MenuItem>
                <MenuItem onClick={() => filterCloseHandler("percent")}>Percent(%)</MenuItem>
              </Menu>
            </Grid>
            <Grid item xs={3} style={{ textAlign: 'right', fontSize: 14 }}>
              <TextField
                color="secondary"
                required
                fullWidth
                type="number"
                className={classes.amountBox}
                variant="outlined"
                value={state.discountValue}
                onChange={updateDiscount}
                size="small"
              />
            </Grid>
          </Grid>
          <Grid container justify="space-between" alignItems="center" className={classes.elaboration}>
            <Grid item xs={6} style={{ textAlign: 'left', fontSize: '14px', display: 'flex', alignItems: 'center' }}>
              GST (%)
              <TextField name="gstPercent" className={classes.gstPercent} value={state.gstPercent} onChange={onGSTChange} variant="outlined"></TextField>
            </Grid>
            <Grid item xs={6} style={{ textAlign: 'right', fontSize: '16px' }}>
              ₹{state.gstTotal}
            </Grid>
          </Grid>
          <Divider style={{ width: '100%', marginTop: '15px' }} />
          <Grid container justify="space-between" alignItems="center">
            <Grid item xs={4} style={{ textAlign: 'left', fontSize: '14px', paddingTop: '10px' }}>
              <TextField
                color="secondary"
                required
                fullWidth
                variant="outlined"
                value={state.otherBill}
                onChange={e => setState({ ...state, otherBill: e.target.value })}
                size="small"
              />
            </Grid>
            <Grid item xs={5}></Grid>
            <Grid item xs={3} style={{ textAlign: 'right', fontSize: 14, paddingTop: '10px' }}>
              <TextField
                color="secondary"
                required
                fullWidth
                type="number"
                variant="outlined"
                className={classes.amountBox}
                value={state.otherBillAmount}
                onChange={otherBillChange}
                size="small"
              />
            </Grid>
          </Grid>
          <Grid container justify="space-between">
            <Grid item xs={6} style={{ textAlign: 'left', fontSize: '16px', fontWeight: 'bold', paddingTop: '10px' }}>
              Balance Amount
            </Grid>
            <Grid item xs={6} style={{ textAlign: 'right', fontSize: '16px', color: '#419945', fontWeight: 'bold', paddingTop: '10px' }}>
              ₹{balance}
            </Grid>
          </Grid>
          <Divider style={{ width: '100%', marginTop: '15px', marginBottom: '15px' }} />
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <TextField
                label="PAN Number"
                color="secondary"
                required
                fullWidth
                value={state.pan}
                onChange={(e) => { setState({ ...state, pan: e.target.value }); setChanges({ ...changes, merchantPan: e.target.value }) }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="GST Number"
                color="secondary"
                required
                fullWidth
                value={state.gst}
                onChange={(e) => { setState({ ...state, gst: e.target.value }); setChanges({ ...changes, merchantGstn: e.target.value }) }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                style={{ paddingTop: '10px' }}
                label="Payment terms/Notes, if any"
                color="secondary"
                multiline
                required
                fullWidth
                rows={4}
                value={state.notes}
                onChange={(e) => setState({ ...state, notes: e.target.value })}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel style={{ textAlign: 'left', marginTop: '30px' }} component="legend">Payment Mode</FormLabel>
                <RadioGroup aria-label="mode" name="mode" value={paymentMode} onChange={handlePaymentModeChange}>
                  <Grid container>
                    <Grid item xs='auto'>
                      <FormControlLabel value="bank" control={<GreenRadio />} label="Payment Link" />
                    </Grid>
                  </Grid>
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <Button className={classes.button} onClick={invoicePreviewHandler} variant="contained" variant="contained" fullWidth>
                Preview
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button className={classes.button} variant="contained" color="primary" variant="contained" fullWidth onClick={submit} disabled={disabledButton}>
                Save &amp; Issue
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </main>
      <FullScreenDialog title="Add Item" value={addItem} onClick={handleAddItemOpen} onClose={handleAddItemClose}>
        <AddItem onApply={handleAddItemApply} />
      </FullScreenDialog>
      <FullScreenDialog title="Add Customer" value={addCustomer} onClick={handleAddCustomerOpen} onClose={handleAddCustomerClose}>
        <AddCustomer onApply={handleAddCustomerApply} phone={state.customerPhone} />
      </FullScreenDialog>
      <FullScreenDialog title="Invoice Preview" header value={invoicePreview} onClick={invoicePreviewHandler} onClose={invoicePreviewClose}>
        <CreditNote product={product} data={state} balance={balance} product={product} logo={logo} />
      </FullScreenDialog>
    </div>
  );
}

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
    color: '#E2714D',
    textAlign: 'center'
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
    overflow: 'auto',
    paddingBottom: '100px',
    paddingLeft: '15px',
    paddingRight: '15px'
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
    fontSize: '16px',
    margin: '0px 0px 15px'
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
    fontSize: '10px'
  },
  productCard: {
    borderRadius: 10,
    width: '100%',
    margin: 10
  },
  elaboration: {
    margin: '5px'
  },
  button: {
    height: '56px',
    textTransform: 'none',
    fontSize: '16px'
  },
  amountBox: {
    '& input': {
      paddingTop: '10px',
      paddingBottom: '8px',
      paddingRight: '12px',
      textAlign: 'right',
      fontSize: '12pt'
    }
  },
  gstPercent: {
    width: '67px',
    marginLeft: '5px',
    '& input': {
      padding: '5px'
    }
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
}));

export default GenerateInvoice;