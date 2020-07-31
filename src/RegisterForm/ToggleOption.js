import React from 'react';
import { Container, Button, Box, withStyles, ThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 'fit-content',
        margin: '0 auto',
        borderRadius: 8,
        border: '1px solid',
        borderColor: '#DAD9D8',
        backgroundColor: '#F8F5E8',
        padding: '4px'
    }
}));

const ToggleButton = withStyles((theme) => ({
    root: {
        color: '#DAD9D8',
        padding: '4px 12px',
        '&.active': {
            color: theme.palette.getContrastText('#419945'),
            backgroundColor: '#419945'
        }
    }
}))(Button);

const theme = createMuiTheme({
    palette: {
        primary: green
    }
});

export default function ToggleOption(props) {

    const classes = useStyles(theme);

    const onToggle = (state) => {
        props.onToggle(state);
    };

    return (
        <Container>
            <ThemeProvider theme={theme}>
                <div className={classes.root}>
                    <ToggleButton onClick={() => onToggle(0)} className={props.value === 0 ? 'active':''}>
                        <Box py={1}>
                            Fund Transfer
                        </Box>
                    </ToggleButton>
                    <ToggleButton onClick={() => onToggle(1)} className={props.value === 1 ? 'active':''}>
                        <Box py={1}>
                            Payment Link
                        </Box>
                    </ToggleButton>
                </div>
            </ThemeProvider>
        </Container>
    );
}