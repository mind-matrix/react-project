import 'moment';
import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { createMuiTheme } from '@material-ui/core/styles';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import Login from './Login/Login';
import VerifyOTP from './VerifyOTP/VerifyOTP';
import RegisterForm from './RegisterForm/RegisterForm';
import Dashboard from './Dashboard/Dashboard';
import GenerateInvoice from './GenerateInvoice/GenerateInvoice';
import CancelInvoice from './GenerateInvoice/CancelInvoice';
import RefundNotice from './GenerateInvoice/RefundNotice';
import Invoice from './Invoice/Invoice';
import PDFViewer from './PDFViewer/PDFViewer';
import ReceiptView from './ReceiptView/ReceiptView';
import history from './history';
import PaymentHistory from './Dashboard/PaymentHistory';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#E2714D'
    },
    secondary: {
      main: '#DAD9D8'
    },
    background: '#ffffff'
  },
});

function App() {



  return (
    <MuiPickersUtilsProvider style={{ backgroundColor: 'white' }} utils={MomentUtils}>
      <div className="App">
        <ThemeProvider theme={theme}>
          <Router history={history}>
            <Switch>
              <Route path="/" exact component={Login} />
              <Route path="/verify" exact component={VerifyOTP} />
              <Route path="/register" exact component={RegisterForm} />
              <Route path="/dashboard" exact component={Dashboard} />
              <Route path="/generateInvoice" exact component={GenerateInvoice} />
              <Route path="/payment-history" exact component={PaymentHistory} />

              <Route path="/invoice" exact component={Invoice} />

              <Route path="/receipt-view" exact component={ReceiptView} />
              
              <Route path="/cancelInvoice" exact component={CancelInvoice} />
              <Route path="/refundNotice" exact component={RefundNotice} />

              <Route path="/pdf" exact component={PDFViewer} />
            </Switch>
          </Router>
        </ThemeProvider>
      </div>
    </MuiPickersUtilsProvider>
  );
}

export default App;
