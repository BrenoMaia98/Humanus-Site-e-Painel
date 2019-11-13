import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AlertDialogSlide from './AlertDialogSlide'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faCheck } from '@fortawesome/free-solid-svg-icons'
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import {auth} from "../auth";

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: '#5BAADC',
        color: theme.palette.common.white,
        fontSize: 16,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
});



class TableConfirmar extends React.Component {


    constructor({ ativarModoEdicao }) {
        super({ ativarModoEdicao });
        this.state = {
            linhas: [],
            carregando: false
        };
        this.Alert = React.createRef();
        this.abrirAlert = this.abrirAlert.bind(this);
    }

    componentWillMount(){
      this.pegarReservasNaoConfirmadas();
    }

    pegarReservasNaoConfirmadas(){
        try{
          axios.post('http://74.117.156.74:5012/Reserva/getNaoConfirmada',{},auth.config).then(response => {
            this.setState({linhas:response.data})
          })
        }catch(err){
          console.log(err);
        }
    }

    abrirAlert(){
      this.Alert.current.handleClickOpen("Validação - Reserva", "Reserva confirmada!");
    }

    async validar(index) {
    var auxiliar = [...this.state.linhas];
    try{
        this.setState({carregando:true});
        await axios.post('http://74.117.156.74:5012/Reserva/confirmarReserva', { "id": index}, auth.config).then( () => {
            for (var i = auxiliar.length - 1; i >= 0; i--) {
              if (auxiliar[i].id === index) {
                auxiliar.splice(i, 1);
              }
            }
            this.setState({ linhas: auxiliar, carregando:false });
            this.abrirAlert();
        }
        );
    }catch(err){
        console.log(err);
    }
    
  };


    async cancelarReserva(index) {
        try{
            await axios.post('http://74.117.156.74:5012/Reserva/cancelarReserva',{ "id":index },auth.config).then(response => {
                let auxiliar = [...this.state.linhas];
                for (let i = auxiliar.length - 1; i >= 0; i--) {
                    if (auxiliar[i].id === index) {
                        auxiliar.splice(i, 1);
                    }
                }
                this.setState({ linhas: auxiliar });
            });
        }catch(err){
          console.log(err);
        }
    };

    render() {
        const { classes } = this.props;
        if(this.state.carregando){
            return(
              <div style = {{display: "flex", flexDirection:"column", alignItems: "center"}} >
                <CircularProgress className={classes.progress} style = {{color: "#1db954"}}/>
                <label>Aguarde...</label>
              </div>
            );
        }
        else{  
            return (
                <Paper className={classes.root}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <CustomTableCell align="center">Nome</CustomTableCell>
                                    <CustomTableCell align="center">Sobrenome</CustomTableCell>
                                    <CustomTableCell align="center">CPF</CustomTableCell>
                                    <CustomTableCell align="center">Data check-in</CustomTableCell>
                                    <CustomTableCell align="center">Data check-out</CustomTableCell>
                                    <CustomTableCell align="center">Valor</CustomTableCell>
                                    <CustomTableCell align="center">Confirmar</CustomTableCell>
                                    <CustomTableCell align="center">Remover</CustomTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.linhas.map(row => (
                                    <TableRow className={classes.row} key={row.id}>
                                        <CustomTableCell align="center">{row.nome}</CustomTableCell>
                                        <CustomTableCell align="center">{row.sobrenome}</CustomTableCell>
                                        <CustomTableCell align="center">{row.cpf}</CustomTableCell>
                                        <CustomTableCell align="center">{row.data_checkin}</CustomTableCell>
                                        <CustomTableCell align="center">{row.data_checkout}</CustomTableCell>
                                        <CustomTableCell align="center">{row.preco_total}</CustomTableCell>
                                        <CustomTableCell align="center" onClick={() => this.validar(row.id)} >
                                           <FontAwesomeIcon icon={faCheck} size="lg" className="App-icon" />
                                        </CustomTableCell>
                                        <CustomTableCell onClick={() => this.cancelarReserva(row.id)} align="center">
                                           <FontAwesomeIcon icon={faTrashAlt} size="lg" className="App-icon" />
                                        </CustomTableCell>
                                    </TableRow>
                                ))
                                }
                            </TableBody>
                        </Table>
                    <AlertDialogSlide ref = {this.Alert}> </AlertDialogSlide>
                    
                </Paper>
            );
        }
    }
}

TableConfirmar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TableConfirmar);
