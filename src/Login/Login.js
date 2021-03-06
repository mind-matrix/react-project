import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
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
import AppIcon from '../Common/AppIcon';

import history from '../Common/history';

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

export default function Login() {
  const classes = useStyles();

  const match = useRouteMatch();

  return (
    <Container component="main" maxWidth="xs">
      
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
            onClick={() => history.push('/verify')}
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