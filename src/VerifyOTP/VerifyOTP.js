import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import OtpInput from 'react-otp-input';
import AppIcon from '../AppIcon';
import WaveSVG from '../wave.svg';
import '../Wave.css';

import history from '../history';

function Wave() {
  return (
    <div className="Wave-icon">
      <img src={WaveSVG} alt="Wave" />
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function VerifyOTP() {
  const classes = useStyles();
  const [otp, setOtp] = useState();

  const otpChange = otp => setOtp(otp);

  return (
    <Container component="main" maxWidth="xs">
      <Wave />
      <CssBaseline />
      <div className={classes.paper}>
        <AppIcon width={116} />
        <Typography component="h6" variant="h6" style={{ marginTop: 100 }}>
          Verify OTP
            </Typography>
        <form className={classes.form} noValidate>
          <OtpInput
            containerStyle={{display: 'flex', justifyContent: 'space-around', color: 'black'}}
            inputStyle={{height: 50, width: 50, fontSize: '1.2rem'}}
            numInputs={4}
            value={otp}
            onChange={otpChange}
            isInputNum={true}
          />
          <Button
            type="submit"
            fullWidth
            disableElevation
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => history.push('/register')}
          >
            <Box py={1}>
              Verify &amp; Login
                </Box>
          </Button>
          <Grid container>
            <Grid item xs={12}>
              Didn't get OTP?
              </Grid>
            <Grid item xs={12}>
              <Link href="#" variant="h6" component="h6" style={{ textDecoration: 'underline', marginTop: 10 }}>
                {"Resend OTP"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}