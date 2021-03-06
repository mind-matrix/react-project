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
import PaymentHistory from './Dashboard/PaymentHistory';
import CreditNote from './CreditNote/CreditNote';
import moment from 'moment';
import PaymentDetails from './Dashboard/PaymentDetails';

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
  moment.locale('in');
  return (
    <div style={{ margin: "0 auto", maxWidth: 480 }}>
      <MuiPickersUtilsProvider style={{ backgroundColor: 'white' }} utils={MomentUtils}>
        <div className="App">
          <ThemeProvider theme={theme}>
            <Router>
              <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/verify" exact component={VerifyOTP} />
                <Route path="/register" exact component={RegisterForm} />
                <Route path="/dashboard" exact component={Dashboard} />
                <Route path="/generateInvoice" exact component={GenerateInvoice} />
                <Route path="/payment-history" exact component={PaymentHistory} />                
                <Route path="/payment-details" exact component={PaymentDetails} />
                <Route path="/invoice" exact component={Invoice} />
                <Route path="/credit-note" exact component={CreditNote} />
                <Route path="/receipt-view" exact component={ReceiptView} />
                <Route path="/cancelInvoice" exact component={CancelInvoice} />
                <Route path="/refundNotice" exact component={RefundNotice} />
                <Route path="/pdf" exact component={PDFViewer} />
                <Route path="/inv" exact component={PDFViewer} />
              </Switch>
            </Router>
          </ThemeProvider>
        </div>
      </MuiPickersUtilsProvider>
    </div >
  );
}

export default App;
