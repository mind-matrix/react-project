import React from 'react';
import { TextField, MenuList, MenuItem, Popper, Grow, Paper, ClickAwayListener, Typography } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';

export default function CustomerSelectInput(props) {

    const [state, setState] = React.useState({
        number: ''
    });

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const handleSelectClose = (number, event) => {
        setState({ number });
        props.onChange(number);
        handleClose(event);
    };

    const handleSearch = (event) => {
        setState({ number: event.target.value });
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
        event.preventDefault();
        setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
        anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <div style={{ position: 'relative', width: '100%' }}>
            <ClickAwayListener onClickAway={handleClose}>
                <TextField
                    ref={anchorRef}
                    onClick={handleOpen}
                    onChange={handleSearch}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    variant="outlined"
                    label="Customer Phone Number"
                    fullWidth
                    value={state.number}
                    required
                />
            </ClickAwayListener>
            <Popper open={open} anchorEl={anchorRef.current} style={{ width: '100%' }} role={undefined} transition disablePortal>
            {({ TransitionProps, placement }) => (
                <Grow
                {...TransitionProps}
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                >
                <Paper style={{ backgroundColor: '#ffffff' }}>
                    <MenuList autoFocusItem={false} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                        <MenuItem style={{ backgroundColor: 'rgba(41, 88, 193, 0.2)', padding: '15px 10px' }} onClick={handleClose}>
                            <AddIcon /> Add Customer
                        </MenuItem>
                        {
                            props.customers.filter((client) => {
                                let number = state.number.trim();
                                return !number.length || client.number.startsWith(state.number);
                            }).slice(0, 4).map((client) => {
                                return (
                                    <MenuItem onClick={(event) => handleSelectClose(client.number, event)}>
                                        <Typography>
                                            { client.name }
                                            <Typography style={{ fontSize: 'smaller', color: 'rgba(53, 51, 43, 0.7)' }}>
                                                { client.number }
                                            </Typography>
                                        </Typography>
                                    </MenuItem>
                                )
                            })
                        }
                    </MenuList>
                </Paper>
                </Grow>
            )}
            </Popper>
        </div>
    );
}
