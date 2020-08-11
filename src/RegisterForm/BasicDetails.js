import React from 'react';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';

export default function BasicDetails() {

    const [state, setState] = React.useState({
        name: '',
        email: '',
        address: ''
    });

    const handleChange = (event) => {
        setState({value: event.target.value});
    }

    return (
        <Container>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="name"
                color="secondary"
                label="Name"
                name="name"
                color="primary"
                value={state.name}
                onChange={handleChange}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                color="secondary"
                label="Email"
                name="email"
                color="primary"
                value={state.email}
                onChange={handleChange}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="address"
                color="secondary"
                label="Address"
                name="address"
                color="primary"
                value={state.address}
                onChange={handleChange}
                rows={4}
                multiline
            />
        </Container>
    );
}
