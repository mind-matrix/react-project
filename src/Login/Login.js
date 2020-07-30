import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import AppIcon from '../AppIcon';
import WaveSVG from '../wave.svg';
import '../Wave.css';

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

export default function Login() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
        <Wave />
        <CssBaseline />
        <div className={classes.paper}>
            <AppIcon />
            <Typography component="h1" variant="h5">
            Invoice Generation
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
                autoFocus
            />
            <Button
                type="submit"
                fullWidth
                disableElevation
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                <Box py={1}>
                    Login
                </Box>
            </Button>
            </form>
        </div>
    </Container>
  );
}