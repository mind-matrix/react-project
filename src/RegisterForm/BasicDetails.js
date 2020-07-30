import React from 'react';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';

export default function BasicDetails() {
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
                autoFocus
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
                autoFocus
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
                rows={4}
                multiline
                autoFocus
            />
        </Container>
    );
}