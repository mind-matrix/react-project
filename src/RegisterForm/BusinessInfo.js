import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import ImageUpload from '../ImageUpload/ImageUpload';
import Box from '@material-ui/core/Box';
import grey from '@material-ui/core/colors/grey';

export default function BusinessInfo() {

    const [state, setState] = React.useState({
        name: null,
        sameAddress: false,
        address: null,
        pan: null,
        gst: null,
        tnc: null
    });

    const handleChange = (event) => {
        setState({value: event.target.value});
    }
    
    const handleCheckboxChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    return (
        <Container>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                color="primary"
                label="Business Name"
                name="name"
                value={state.name}
                onChange={handleChange}
                autoFocus
            />
            <FormControlLabel
                style={{ float: 'left' }}
                control={
                <Checkbox
                    checked={state.sameAddress}
                    onChange={handleCheckboxChange}
                    name="sameAddress"
                    color="primary"
                />
                }
                label="Business address same as personal"
            />
            <TextField
                variant="outlined"
                margin="normal"
                style={{ display: state.sameAddress ? 'none' : 'inline-flex' }}
                required
                fullWidth
                id="address"
                color="primary"
                label="Address"
                name="address"
                value={state.address}
                onChange={handleChange}
                rows={4}
                multiline
                autoFocus
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="pan"
                color="primary"
                label="PAN Number"
                name="pan"
                value={state.pan}
                onChange={handleChange}
                autoFocus
            />
            <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="gst"
                color="primary"
                label="GST Number"
                name="gst"
                value={state.gst}
                onChange={handleChange}
                autoFocus
            />
            <Box fontSize={12} style={{textAlign: 'left', color: grey[400]}}>Business Logo</Box>
            <ImageUpload />
            <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="tnc"
                color="primary"
                label="Terms &amp; Conditions (To be added to Invoice)"
                name="tnc"
                value={state.tnc}
                onChange={handleChange}
                multiline
                rows={10}
                autoFocus
            />
        </Container>
    );
}
