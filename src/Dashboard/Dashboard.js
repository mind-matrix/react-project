import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppIcon from '../AppIcon';
import { CssBaseline, Icon, Grid, Button, Box, Slide } from '@material-ui/core';
import { ArrowDropDown, Tune, ChevronLeft, ChevronRight } from '@material-ui/icons';
import FilterSelect from './FilterSelect';
import SortSelect from './SortSelect';
import FullScreenDialog from '../FullScreenDialog';
import InvoiceCard from './InvoiceCard';
import DetailedInvoiceCard from './DetailedInvoiceCard';

import FreechargeIcon from '../FreechargeIcon';

import history from '../history';

const drawerWidth = 240;

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
    height: '100vh',
    overflow: 'auto',
    paddingTop: '10px',
    marginLeft: '10px',
    marginRight: '10px',
    overflowX: 'hidden',
    paddingBottom: '100px',
    textAlign: 'center'
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Dashboard() {
  const [state, setState] = React.useState({
    invoices: [
      { header: 'YTD Issued invoice', total: 3001000, received: 2001000, pending: 1000000 },
      { header: 'MTD Issued invoice', total: 3001000, received: 2001000, pending: 1000000 }
    ],
    detailedList: [
      { number: 'INV/20-21/1', date: '12 Mar 2020', name: 'Rakesh Gupta', phone: '994635525', total: 10000, due: 2000 },
      { number: 'INV/20-21/2', date: '12 Mar 2020', name: 'Rakesh Gupta', phone: '994635525', total: 10000, due: false },
      ...Array(98).fill({ number: 'INV/20-21/2', date: '12 Mar 2020', name: 'Rakesh Gupta', phone: '994635525', total: 10000, due: 2000 })
    ],
    recordsPerPage: 10,
    page: 1,
    sortBy: null
  });

  const [filter, setFilterOpen] = React.useState(false);
  const [sort, setSortOpen] = React.useState(false);

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

  const handleSortOpen = () => {
    setSortOpen(true);
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
    if (state.page < state.detailedList.length / state.recordsPerPage) {
      setState({ ...state, page: state.page + 1 });
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar elevation={1} position="absolute" style={{ backgroundColor: 'white' }}>
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
            onClick={() => { history.push('/generateInvoice'); window.location.reload(); }}
            variant="contained"
            className={classes.invoiceButton}
          >Generate Invoice</Button>
        </Grid>
        <Grid container>
          {
            state.invoices.map((invoice, i) =>
              <Grid item style={{ padding: '2px' }} key={i} xs={12}>
                <InvoiceCard header={invoice.header} total={invoice.total} received={invoice.received} pending={invoice.pending}></InvoiceCard>
              </Grid>
            )
          }
        </Grid>
        <Box display="flex" flexDirection="row" justifyContent="space-between" style={{ marginTop: '20px' }}>
          <Typography className={classes.detailedInvoiceHeader} display="inline">Detailed Invoice List</Typography>
          <Box>
            <Button onClick={handleSortOpen} style={{ textTransform: 'none', fontSize: '10px', height: '24px', padding: '5px 5px', marginRight: '5px' }} variant="outlined">
              Sort by
                      <ArrowDropDown />
            </Button>
            <Button onClick={handleFilterOpen} style={{ textTransform: 'none', fontSize: '10px', height: '24px', padding: '5px 5px' }} variant="outlined">
              <Tune style={{ marginRight: '5px', height: '15px' }} />
                        Filter
                    </Button>
          </Box>
        </Box>
        <Typography className={classes.sub}>{state.detailedList.length} records found</Typography>
        <Grid container spacing={3}>
          {
            state.detailedList.map((invoice, index) => {
              if (index < (state.page - 1) * state.recordsPerPage) return;
              if (index > (state.page) * state.recordsPerPage - 1) return;
              return <Grid item style={{ padding: '10px 14px' }} key={index} xs={12}>
                <DetailedInvoiceCard date={invoice.date} name={invoice.name} phone={invoice.phone} total={invoice.total} due={invoice.due}></DetailedInvoiceCard>
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
                  {state.page}/{state.detailedList.length / state.recordsPerPage}
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
        <FilterSelect onApply={handleFilterApply} />
      </FullScreenDialog>
    </div>
  )
}