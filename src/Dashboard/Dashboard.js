import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AppIcon from '../AppIcon';
import { CssBaseline, Icon, Grid, Button, Box } from '@material-ui/core';
import { ArrowDropDown, Tune, ChevronLeft, ChevronRight } from '@material-ui/icons';
import InvoiceCard from './InvoiceCard';
import DetailedInvoiceCard from './DetailedInvoiceCard';

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
    invoiceButton: {
      maxWidth: '420px',
      margin: '10px 10px 30px 20px'
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
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
      paddingTop: '10px',
      marginLeft: '10px',
      marginRight: '10px',
      overflowX: 'hidden'
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
      margin: '15px auto',
      fontSize: '16pt',
      fontWeight: 'bolder',
      color: '#35332B',
      '& > .sub': {
        fontSize: '10pt',
        opacity: 0.6
      }
    }
}));

export default function Dashboard() {
    const [state, setState] = React.useState({
        invoices: [
          { header: 'YTD Issued invoice', total: 3001000, received: 2001000, pending: 1000000 },
          { header: 'MTD Issued invoice', total: 3001000, received: 2001000, pending: 1000000 }
        ],
        detailedList: [
          { date: '12 Mar 2020', name: 'Rakesh Gupta', phone: '994635525', total: 10000, due: 2000 },
          { date: '12 Mar 2020', name: 'Rakesh Gupta', phone: '994635525', total: 10000, due: false },
          ...Array(98).fill({ date: '12 Mar 2020', name: 'Rakesh Gupta', phone: '994635525', total: 10000, due: 2000 })
        ],
        recordsPerPage: 10,
        page: 1,
        sortBy: null
    });

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
            <AppBar elevation={1} position="absolute" style={{backgroundColor: 'white'}}>
                <Toolbar>
                    <AppIcon width={60} />
                    <Typography variant="h6" className={classes.title}>
                    Dashboard
                    </Typography>
                    <Icon style={{width: 60, color: 'white'}}>save</Icon>
                </Toolbar>
            </AppBar>
            <main className={classes.content}>
              <div className={classes.appBarSpacer} />
              <Button
                fullWidth
                disableElevation
                variant="contained"
                color="primary"
                className={classes.invoiceButton}
              >
                <Box py={1}>
                    Generate Invoice
                </Box>
              </Button>
              <Grid container spacing={3}>
                    {
                      state.invoices.map((invoice) => {
                        return <Grid item xs={12}>
                          <InvoiceCard header={invoice.header} total={invoice.total} received={invoice.received} pending={invoice.pending}></InvoiceCard>
                        </Grid>
                      })
                    }
                </Grid>
                <Typography className={classes.detailedInvoiceHeader}>
                  Detailed Invoice List
                  <Typography style={{ float: 'right' }}>
                    <Button style={{ textTransform: 'none', padding: '5px 5px', marginRight: '5px' }} variant="outlined">
                      Sort by
                      <ArrowDropDown />
                    </Button>
                    <Button style={{ textTransform: 'none', padding: '5px 5px' }} variant="outlined">
                      <Tune style={{ marginRight: '5px' }} />
                      Filter
                    </Button>
                  </Typography>
                  <Typography className={`sub`}>
                    {state.detailedList.length} records found
                  </Typography>
                </Typography>
                <Grid container spacing={3}>
                  {
                    state.detailedList.map((invoice, index) => {
                      if (index < (state.page-1)*state.recordsPerPage) return;
                      if (index > (state.page)*state.recordsPerPage-1) return;
                      return <Grid item xs={12}>
                        <DetailedInvoiceCard date={invoice.date} name={invoice.name} phone={invoice.phone} total={invoice.total} due={invoice.due}></DetailedInvoiceCard>
                      </Grid>
                    })
                  }
                  <Grid item xs={12}>
                    <Box maxWidth={200} style={{width:'fit-content', margin:'0 auto'}}>
                      <Typography>
                        <Button onClick={prevPage} style={{ padding: '5px 5px', minWidth: 0}} variant="outlined">
                          <ChevronLeft style={{verticalAlign: 'middle', fontSize: '10pt'}} />
                        </Button>
                        <span style={{ padding: '5px 10px', fontSize: '10pt' }}>
                          {state.page}/{state.detailedList.length/state.recordsPerPage}
                        </span>
                        <Button style={{ padding: '5px 5px', minWidth: 0}} variant="outlined">
                          <ChevronRight onClick={nextPage} style={{verticalAlign: 'middle', fontSize: '10pt'}} />
                        </Button>
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
            </main>
        </div>
    )
}