import React, { Component, FunctionComponent, MouseEvent } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import logo from '../assets/logo.svg';

class Footer extends Component {

    open: boolean = false;

    handleClick = (event: MouseEvent) => {
      event.preventDefault();
      this.open = true;
      alert("test");
    }

    render() {
        return <footer className="AppFooterText">
            <div className="EasterEggText">
                <div className= "tooltiptext" onClick={this.handleClick}>Launch BatSignal</div>Batman
                <Dialog
                  open={this.open == true}
                  TransitionComponent={Transition}
                  keepMounted
                  aria-labelledby="alert-dialog-slide-title"
                  aria-describedby="alert-dialog-slide-description">
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
                    <Button onClick={() => this.open = false} color="primary">
                      Shut down BatSignal
                    </Button>
                  </DialogActions>
                </Dialog>
            </div> 
            Project - SpaceY - #hitw2019
        </footer>
        
    }

}

export default Footer;


const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AlertDialogSlide:FunctionComponent<{initial?:boolean}> = ({initial = false}) => {
  const [open, setOpen] = React.useState(initial);

  

  return (
    <div>
      
    </div>
  );
}