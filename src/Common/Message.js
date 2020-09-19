import React from 'react';
import { Dialog, DialogContent, DialogTitle, Grid, Typography } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';

function Message(props) {
    return (
        <Dialog open={props.open} onClose={props.handleClose}>
            <DialogTitle>
                <Typography align="right">
                    <ClearIcon onClick={props.handleClose} />
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Grid container justify="center" alignItems="center">
                    <Typography>{props.message}</Typography>
                </Grid>
            </DialogContent>
        </Dialog>
    )
}

export default Message
