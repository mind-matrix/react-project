import React from 'react';
import { Grid, FormControlLabel, Box, TextField, Checkbox } from '@material-ui/core';
import ImageUpload from '../ImageUpload/ImageUpload';

export default function InvoiceInput(props) {

    const [state, setState] = React.useState({
        logo: null,
        invoiceFrom: '',
        billTo: '',
        sameAsBillTo: false,
        shipTo: ''
    });

    const handleChecked = (e) => {
        setState({ sameAsBillTo: e.target.checked });
    };

    return (
        <div>
            <Grid container>
                <Grid item xs={4}>
                    <ImageUpload alt />
                </Grid>
                <Grid item xs={8}>
                    <Box pl={2} pb={2}>
                        <TextField fullWidth label="Invoice From" multiline rows={4} variant="outlined"></TextField>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box pr={1}>
                        <TextField fullWidth label="Bill To" multiline rows={4} variant="outlined"></TextField>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box pl={1}>
                        <Grid container>
                            <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                <Checkbox
                                    checked={state.sameAsBillTo}
                                    onChange={handleChecked}
                                    name="sameAsBill"
                                    color="primary"
                                />
                                }
                                label="Same as bill to"
                            />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth label="Ship To" multiline rows={2} variant="outlined"></TextField>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
};