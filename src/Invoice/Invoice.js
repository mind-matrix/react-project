import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  withRouter
} from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import AppIcon from '../AppIcon';
import Wave from '../Wave';

import axios from 'axios';

import history from '../history';

const queryString = require('query-string');

const useStyles = makeStyles( (theme) => ({
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
  submitText: {
    fontSize: '16pt' // from specs
  },
  header: {
    fontSize: '26pt' // from specs
  }
}) );

function Invoice(props) {
  const classes = useStyles();

  const [mobileNumber, setMobile] = React.useState('');

  const handleChange = (e) => {
    setMobile(e.target.value);
  };

  const match = useRouteMatch();

  console.log(props.location.search);

  let params = queryString.parse(props.location.search);

  console.log(params);

  let { invoiceId } = params;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mobileNumber) {
        axios.post('https://api.getparchi.com/papi/receipt/scan/showrcpt', {
            invoiceId,
            mobileNumber
        }, {
            responseType: 'json',
            headers: {
                "Authorization": "Basic c2VydmljZXMtcGFyY2hpLWFwaTpwYXJjaGktc2VydmljZXMtYXBpMjAyMA=="
            }
        }).then((response) => {
            let { invoice_location } = response.data;
            console.log(invoice_location, response.data);
            props.history.push({
                pathname: '/pdf',
                state: {
                    url: invoice_location
                }
            })
        });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Wave />
      <CssBaseline />
      <div className={classes.paper}>
        <AppIcon width={116}/>
        <Typography className={classes.header} component="h6" variant="h6" style={{marginTop: 100}}>
          Enter Mobile Number
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="phone"
            value={mobileNumber}
            onChange={handleChange}
            color="secondary"
            label="Enter Phone Number"
            name="phone"
            autoComplete="phone"
            color="primary"
          />
          <Button
            type="submit"
            fullWidth
            disableElevation
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            <Box py={1} className={classes.submitText}>
              Submit
            </Box>
          </Button>
        </form>
      </div>
    </Container>
  );
}

export default withRouter(Invoice);