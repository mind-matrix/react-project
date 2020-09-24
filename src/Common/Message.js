import React from 'react';
import { Dialog, DialogContent, DialogTitle, Box, Typography, Button, Grid } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import SuccessIcon from '../Assets/success.svg';
import ErrorIcon from '../Assets/error.svg';

function Message(props) {
    return (
        <Dialog open={props.open} onClose={props.handleClose}>
            <DialogTitle>
                <Typography align="right">
                    <ClearIcon onClick={props.handleClose} />
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Grid container>
                    <Grid item xs={12}>
                        <Box display='flex' alignItems="center" flexDirection="column" style={{padding: '0px 20px'}}>
                            <img src={props.success ? SuccessIcon : ErrorIcon} style={{ width: 54, height: 54, marginBottom: 30 }} />
                            <Typography style={{ fontSize: 21, fontWeight: 600, marginBottom: 10 }} align="center">{props.success ? "Success" : "Error"}</Typography>
                            <Typography style={{ fontSize: 14, opacity: '70%', marginBottom: 50 }} align="center">{props.message}</Typography>
                            <Button variant="outlined" color="default" style={{ marginBottom: 20 }} fullWidth onClick={props.handleClose}>Ok</Button>
                        </Box>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    )
}

export default Message
