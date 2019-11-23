import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


export default class AlertDialogSlide extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      msg: "Resultado"
    }
  }

  handleClickOpen(titulo,mensagem) {
    this.setState({open: true,titulo: titulo, msg: mensagem});
  }

  handleClose() {
    this.setState({open: false});
  }

  render() {
  return (
    <div>
      <Dialog
        open={this.state.open}
        keepMounted
        onClose={() => this.handleClose()}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{this.state.titulo}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
           {this.state.msg}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.handleClose()} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
}