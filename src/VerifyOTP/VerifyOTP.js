import React from 'react';
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
  otp: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& input': {
      width: '4rem !important',
      height: '3rem',
      fontSize: '2rem',
      border: '1px solid #DAD9D8',
    }
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function VerifyOTP() {
  const classes = useStyles();

  const [state, setState] = React.useState({
    otp: null
  });

  const handleChange = (otp) => {
    setState({ otp });
  };

  return (
    <Container component="main" maxWidth="xs">
        <Wave />
        <CssBaseline />
        <div className={classes.paper}>
            <AppIcon />
            <Typography component="h1" variant="h5">
              Verify OTP
            </Typography>
            <form className={classes.form} noValidate>
              <div className={classes.otp}>
                <OtpInput
                  onChange={handleChange}
                  numInputs={4}
                  isInputNum
                  value={state.otp}
                  separator={<span>&nbsp;</span>}
                />
              </div>
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
                  <Link href="#" variant="h6">
                    {"Resend OTP"}
                  </Link>
                </Grid>
              </Grid>
            </form>
        </div>
    </Container>
  );
}