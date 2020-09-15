import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppIcon from '../AppIcon';
import { CssBaseline, AppBar, Toolbar, Icon, Typography, Grid, Button, Box, Slide, Menu, MenuItem } from '@material-ui/core';
import { ArrowDropDown, Tune, ChevronLeft, ChevronRight } from '@material-ui/icons';
import FilterSelect from './FilterSelect';
import SortSelect from './SortSelect';
import FullScreenDialog from '../FullScreenDialog';
import InvoiceCard from './InvoiceCard';
import DetailedInvoiceCard from './DetailedInvoiceCard';
import FreechargeIcon from '../FreechargeIcon';
import { getAllCustomerLedger, getFilteredCustomerLedger, getLedgerBalance, getMerchant } from '../shared/dataService';
import { useHistory } from 'react-router-dom';
import { MERCHANT_LOGO, FREECHARGE_ID, MERCHANT_ID } from '../shared/constant';
import moment from 'moment';
const queryString = require('query-string');

const drawerWidth = 240;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Dashboard(props) {
  moment.locale('in');
  const [ledger, setLedger] = useState({
    merchantId: 0,
    merchantCode: "NA",
    freechargeId: "NA",
    ytdTotalAmount: "0",
    ytdAmountReceived: "0",
    ytdAmountPending: "0",
    mtdTotalAmount: "0",
    mtdAmountReceived: "0",
    mtdAmountPending: "0"
  });

  const [customerLedger, setCustomerLedger] = useState([])
  const [state, setState] = React.useState({
    recordsPerPage: 10,
    page: 1,
    totalPage: 1,
    sortBy: null
  });
  const [filter, setFilterOpen] = React.useState(false);
  const [sort, setSortOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  let params = queryString.parse(props.location.search);
  let { id, name } = params;
  if (id) {
    sessionStorage.setItem(FREECHARGE_ID, id);
  }
  let history = useHistory();

  useEffect(() => {
    getMerchant(sessionStorage.getItem(FREECHARGE_ID))
      .then(res => res.json())
      .then(data => {
        if (data.merchantId != null) {
          sessionStorage.setItem(MERCHANT_ID, data.merchantId);
          sessionStorage.setItem(MERCHANT_LOGO, data.merchantLogo);
          getLedgerBalance(data.merchantId)
            .then(res => res.json())
            .then(data => {
              if (data.merchantId) {
                setLedger(data);
              }
            })
          getAllCustomerLedger(data.merchantId)
            .then(res => res.json())
            .then(data => {
              if (data.customerLedgerDetails) {
                setCustomerLedger(data.customerLedgerDetails);
                setState({ ...state, totalPage: Math.ceil(data.customerLedgerDetails.length / state.recordsPerPage) })
              }
            })
        } else {

        }
      })
  }, [])

  const handleFilterOpen = () => {
    setFilterOpen(true);
  };

  const handleFilterClose = () => {
    setFilterOpen(false);
  };

  const handleFilterApply = (options) => {
    setFilterOpen(false);
    console.log(options)
    getFilteredCustomerLedger(
      sessionStorage.getItem(MERCHANT_ID),
      options.phone,
      options.date.start,
      options.date.end,
      options.amount[0],
      options.amount[1],
      options.status
    )
      .then(res => res.json())
      .then(data => {
        if (data.customerLedgerDetails) {
          setCustomerLedger(data.customerLedgerDetails);
          setState({ ...state, totalPage: Math.ceil(data.customerLedgerDetails.length / state.recordsPerPage) })
        }
      })
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSortOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSortClose = () => {
    setSortOpen(false);
  };

  const handleSortApply = (options) => {
    // apply sort
    setSortOpen(false);
  };

  const classes = useStyles();

  const prevPage = () => {
    if (state.page > 1) {
      setState({ ...state, page: state.page - 1 });
    }
  };

  const nextPage = () => {
    if (state.page < state.totalPage) {
      setState({ ...state, page: state.page + 1 });
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar elevation={1} position="fixed" style={{ backgroundColor: 'white' }}>
        <Toolbar>
          <AppIcon width={60} />
          <Typography variant="h6" className={classes.title} align="center">Dashboard</Typography>
          <FreechargeIcon width={80} />
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Grid container align="center">
          <Button
            fullWidth
            onClick={() => { history.push('/generateInvoice'); }}
            variant="contained"
            className={classes.invoiceButton}
          >Generate Invoice</Button>
        </Grid>
        <Grid container>
          <Grid item style={{ padding: '2px' }} xs={12}>
            <InvoiceCard header="YTD Issued invoice" total={ledger.ytdTotalAmount} received={ledger.ytdAmountReceived} pending={ledger.ytdAmountPending}></InvoiceCard>
          </Grid>
          <Grid item style={{ padding: '2px' }} xs={12}>
            <InvoiceCard header="MTD Issued invoice" total={ledger.mtdTotalAmount} received={ledger.mtdAmountReceived} pending={ledger.mtdAmountPending}></InvoiceCard>
          </Grid>
        </Grid>
        <Box display="flex" flexDirection="row" justifyContent="space-between" style={{ maxWidth: 420, margin: '20px auto 0px' }}>
          <Typography className={classes.detailedInvoiceHeader} display="inline">Detailed Invoice List</Typography>
          <Box>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleSortOpen} style={{ textTransform: 'none', fontSize: '10px', height: '24px', padding: '5px 5px', marginRight: '5px' }} variant="outlined">
              Sort by
              <ArrowDropDown />
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Low to High</MenuItem>
              <MenuItem onClick={handleClose}>High to Low</MenuItem>
              <MenuItem onClick={handleClose}>Time</MenuItem>
            </Menu>
            <Button onClick={handleFilterOpen} style={{ textTransform: 'none', fontSize: '10px', height: '24px', padding: '5px 5px' }} variant="outlined">
              <Tune style={{ marginRight: '5px', height: '15px' }} />
                        Filter
            </Button>
          </Box>
        </Box>
        <Box style={{ maxWidth: 420, margin: '0px auto' }}>
          <Typography className={classes.sub}>{customerLedger ? customerLedger.length : 0} records found</Typography>
        </Box>
        <Grid container spacing={3}>
          {
            customerLedger.map((invoice, index) => {
              if (index < (state.page - 1) * state.recordsPerPage) return;
              if (index > (state.page) * state.recordsPerPage - 1) return;
              return <Grid item style={{ padding: '10px 14px' }} key={index} xs={12}>
                <DetailedInvoiceCard date={moment().format('ll')} name={invoice.customerName} phone={invoice.mobileNumber} total={invoice.totalAmount} due={invoice.dueAmount}></DetailedInvoiceCard>
              </Grid>
            })
          }
          <Grid item xs={12}>
            <Box maxWidth={200} style={{ width: 'fit-content', margin: '0 auto' }}>
              <Typography>
                <Button onClick={prevPage} style={{ padding: '5px 5px', minWidth: 0 }} variant="outlined">
                  <ChevronLeft style={{ verticalAlign: 'middle', fontSize: '10pt' }} />
                </Button>
                <span style={{ padding: '5px 10px', fontSize: '10pt' }}>
                  {state.page}/{state.totalPage}
                </span>
                <Button onClick={nextPage} style={{ padding: '5px 5px', minWidth: 0 }} variant="outlined">
                  <ChevronRight style={{ verticalAlign: 'middle', fontSize: '10pt' }} />
                </Button>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </main>
      <FullScreenDialog title="Filter" value={filter} onClick={handleFilterOpen} onClose={handleFilterClose}>
        <FilterSelect onApply={handleFilterApply} dashboard />
      </FullScreenDialog>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
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
  invoiceButton: {
    height: '44px',
    fontSize: '16px',
    textTransform: 'none',
    backgroundColor: '#E2714D',
    color: '#FFFFFF',
    maxWidth: '360px',
    margin: '0 auto',
    marginBottom: '30px',
    '&:hover': {
      backgroundColor: '#E2714E'
    }
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
    fontSize: '20px'
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
  content: {
    flexGrow: 1,
    overflow: 'auto',
    paddingTop: '10px',
    marginLeft: '10px',
    marginRight: '10px',
    overflowX: 'hidden',
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
  detailedInvoiceHeader: {
    maxWidth: 420,
    textAlign: 'left',
    fontSize: '16px',
    fontWeight: 'bolder',
    color: '#35332B',
  },
  sub: {
    fontSize: '12px',
    color: '#35332B',
    opacity: 0.6,
    margin: '10px 0px 20px'
  },
  dialogTitle: {
    color: '#ffffff'
  }
}));

export default Dashboard;