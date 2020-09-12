import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    backgroundColor: '#ffffff'
  },
  title: {
    marginLeft: '5px',
    flex: 1,
    color: '#E2714D'
  },
  content: {
    backgroundColor: '#ffffff'
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
  const classes = useStyles();
  return (
    <div>
      <Dialog fullScreen open={props.value} onClose={props.onClose} TransitionComponent={Transition}>
        <AppBar elevation={props.header ? 1 : 0} className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              {props.title}
            </Typography>
            <IconButton edge="start" onClick={props.onClose} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent className={classes.content}>
          {props.children}
        </DialogContent>
      </Dialog>
    </div>
  );
}