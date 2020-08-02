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
import Login from './Login/Login';
import VerifyOTP from './VerifyOTP/VerifyOTP';
import RegisterForm from './RegisterForm/RegisterForm';
import Dashboard from './Dashboard/Dashboard';

import history from './history';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#419945'
    },
    secondary: {
        main: '#DAD9D8'
    },
    background: '#ffffff'
  },
});

function App() {
  


  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router history={history}>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/verify" exact component={VerifyOTP} />
            <Route path="/register" exact component={RegisterForm} />
            <Route path="/dashboard" exact component={Dashboard} />
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
