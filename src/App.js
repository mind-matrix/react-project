import React from 'react';
import './App.css';
import { createMuiTheme } from '@material-ui/core/styles';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Login from './Login/Login';
import VerifyOTP from './VerifyOTP/VerifyOTP';
import RegisterForm from './RegisterForm/RegisterForm';

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
        <RegisterForm />
      </ThemeProvider>
    </div>
  );
}

export default App;
