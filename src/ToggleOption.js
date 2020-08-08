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
                    {
                        props.buttons.map((button, index) => {
                            return (<ToggleButton onClick={() => onToggle(index)} className={props.value === index ? 'active':''}>
                                <Box py={1}>
                                    {button}
                                </Box>
                            </ToggleButton>);
                        })
                    }
                </div>
            </ThemeProvider>
        </Container>
    );
}