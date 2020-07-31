import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import grey from '@material-ui/core/colors/grey';
import ToggleOption from './ToggleOption';

export default function PaymentInfo() {
    
    const [state, setState] = React.useState({
        type: 0,
        bank: null,
        account: null,
        accountType: null,
        ifsc: null,
        upi: null
    });

    const banks = [
        'ICICI Bank',
        'SBI Bank',
        'Gramin Bank'
    ];

    const accountTypes = [
        'Current Account'
    ];

    const handleChange = (event) => {
        setState({value: event.target.value});
    }

    const handleToggle = (toggleState) => {
        setState({ type: toggleState });
    }

    return (
        <Container>
            <ToggleOption onToggle={handleToggle} value={state.type} />
            <Box fontSize={12} mb={2} style={{textAlign: 'left', color: grey[400]}}>Add Bank Details</Box>
            <FormControl required fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-age-native-simple">Bank Name</InputLabel>
                <Select
                    native
                    value={state.bank}
                    onChange={handleChange}
                    label="Bank Name"
                    color="primary"
                    inputProps={{
                        name: 'bank',
                        id: 'outlined-age-native-simple',
                    }}
                >
                    <option aria-label="None" value="" />
                    {
                        banks.map((bank) => {
                            return <option value={bank}>{bank}</option>;
                        })
                    }
                </Select>
            </FormControl>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="account"
                color="primary"
                label="Account Number"
                name="account"
                value={state.account}
                onChange={handleChange}
                autoFocus
            />
            <FormControl required fullWidth variant="outlined">
                <InputLabel htmlFor="outlined-age-native-simple">Account Type</InputLabel>
                <Select
                    native
                    value={state.accountType}
                    onChange={handleChange}
                    color="primary"
                    label="Account Type"
                    inputProps={{
                        name: 'accountType',
                        id: 'outlined-age-native-simple',
                    }}
                >
                    <option aria-label="None" value="" />
                    {
                        accountTypes.map((accountType) => {
                            return <option value={accountType}>{accountType}</option>;
                        })
                    }
                </Select>
            </FormControl>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="ifsc"
                color="primary"
                label="IFSC Code"
                name="ifsc"
                value={state.ifsc}
                onChange={handleChange}
                autoFocus
            />
            <Box fontSize={12} style={{textAlign: 'left', color: grey[400]}}>UPI Details</Box>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="upi"
                color="primary"
                label="UPI Address"
                name="upi"
                value={state.upi}
                onChange={handleChange}
                autoFocus
            />
        </Container>
    );
}
