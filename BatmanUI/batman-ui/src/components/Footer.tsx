import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { TransitionProps } from "@material-ui/core/transitions";
import logo from '../assets/logo.svg';

const Transition = React.forwardRef<unknown, TransitionProps>(
  function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  }
);

export default function AlertDialogSlide() {
  const [open, setOpen] = React.useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <footer>
      <div className="tooltiptext" onClick={handleClickOpen}>
        Launch BatSignal
      </div>
      Batman
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"BatSignal Launched! Here comes BATMAN!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <div className="Batman">
              <img src={logo} className="BatmanLogo" alt="logo" />
              <p>
                Na, na, na, na, na, na, na, na, na, na, na, na, na... BATMAN !
              </p>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleClose} color="primary">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <div>Project - SpaceY - #hitw2019</div>
    </footer>
  );
}