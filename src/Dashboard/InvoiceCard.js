import React from 'react';
import { Card, CardContent, Grid, Typography, makeStyles, Box } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        display: 'block',
        margin: '5px auto',
        maxWidth: 420,
        width: '100%',
        backgroundColor: 'white'
    },
    header: {
        color: '#0A0A0A',
        opacity: 0.6,
        fontSize: '14px',
        textAlign: 'left',
        marginBottom: '20px'
    },
    item: {
        '&:nth-child(1)': {
            color: '#35332B',
            borderRight: '1pt solid rgba(53, 51, 43, 0.1)'
        },
        '&:nth-child(2)': {
            color: '#419945',
            borderRight: '1pt solid rgba(53, 51, 43, 0.1)'
        },
        '&:nth-child(3)': {
            color: '#E87716'
        }
    },
    title: {
        textAlign: 'center',
        fontSize: '18px',
        lineHeight: '24px',
        margin: '5px 8px'
    },
    number: {
        padding: 0,
        margin: 0,
        display: 'block',
        fontSize: '18px',
        fontWeight: 'bold',
        fontFamily: 'Open Sans'
    },
    name: {
        fontSize: '10px',
        fontWeight: 'bold',
        lineHeight: 1
    }
});

export default function InvoiceCard(props) {
    const classes = useStyles();

    return (
        <Card elevation={2} className={classes.root}>
            <CardContent>
                <Typography className={classes.header}>
                    {props.header}
                </Typography>
                <Grid container>
                    <Grid className={classes.item} item xs={4}>
                        <Box className={classes.title}>
                            <Typography className={classes.number}>
                                &#8377; {props.total}
                            </Typography>
                            <Typography className={classes.name}>
                                Total Amount
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid className={classes.item} item xs={4}>
                        <Box className={classes.title}>
                            <Typography className={classes.number}>
                                &#8377; {props.received}
                            </Typography>
                            <Typography className={classes.name}>
                                Amount Received
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid className={classes.item} item xs={4}>
                        <Box className={classes.title}>
                            <Typography className={classes.number}>
                                &#8377; {props.pending}
                            </Typography>
                            <Typography className={classes.name}>
                                Amount Pending
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
}