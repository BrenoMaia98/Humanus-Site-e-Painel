import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from "react-router-dom";
import axios from 'axios';
import {ServicoProjetoTemp} from '../views/servicosProjetos/ServicoProjetoTemp';
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


class TableValores extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            linhas: this.props.rows,
            temporario: false
        };
    }

    pegarValores(){
      try{
        axios.post('http://74.117.156.74:5012/ValoresPacote/get', {'modalidade_pacote_id': this.props.id},auth.config).then(response => {
          this.setState({linhas:response.data})
        })
      }catch(err){
        console.log(err);
      }
    }

    componentWillMount(){
       if(this.props.adicao === false) this.pegarValores();
       else this.setState({temporario:true})
    }

    componentDidMount() {
        this.props.onRef(this)
    }

    componentWillUnmount() {
      this.props.onRef(undefined)
    }

    tamanhoTabela(){
        return this.state.linhas.length;
    }

    async removerValores(index,id_hotel,acomodacao,valor_pessoa) {
        var auxiliar = [...this.state.linhas];
        for (var i = auxiliar.length - 1; i >= 0; i--) {
            
            if (auxiliar[i].id === index) {
                auxiliar.splice(i, 1); break;
            }
        }
        if(ServicoProjetoTemp.modalidades.length > 0){
            ServicoProjetoTemp.removerValor(index,id_hotel,acomodacao,valor_pessoa);
        }
        else{
            await axios.post('http://74.117.156.74:5012/ValoresPacote/delete', 
                { "id": index},auth.config)
        }
        this.setState({ linhas: auxiliar });
    };

    pegarNomeHotel(id_hotel){
        switch (id_hotel) {
            case "1":
                return "Villa Verde";
                break;
            case "2":
                return "Casa Amarela";
                break;           
            case "4":
                return "La Dolce Villa"; 
                break;          
            case "5":
                return "Apart Hotel";
                break;
            default:
                break;
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.root}>
                {
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <CustomTableCell align="center">Hotel</CustomTableCell>
                                <CustomTableCell align="center">Acomodação</CustomTableCell>
                                <CustomTableCell align="center">Valor</CustomTableCell>
                                <CustomTableCell align="center">Editar</CustomTableCell>
                                <CustomTableCell align="center">Remover</CustomTableCell>


                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.linhas.map((row,index) => (
                                <TableRow className={classes.row} key={index}>
                                    <CustomTableCell align="center">{this.pegarNomeHotel(row.id_hotel.toString())}</CustomTableCell>
                                    <CustomTableCell align="center">{row.acomodacao}</CustomTableCell>
                                    <CustomTableCell align="center">{row.valor_pessoa}</CustomTableCell>
                                    <CustomTableCell align="center">
                                        <NavLink to={{
                                            pathname: "/pacotes/modalidade/valores/editar",
                                            componenteProps: {
                                                nome: "Edição de Valor",
                                                descricao: "Altere os campos desejados e clique em concluir para finalizar.",
                                                id: row.id,
                                                valor: row,
                                                indice: index,
                                                temporario: this.state.temporario,
                                                caminhoDeVoltaPacote: this.props.caminhoDeVoltaPacote,
                                                nomePacote: this.props.nomePacote,
                                                descricaoPacote: this.props.descricaoPacote,
                                                idPacote: this.props.idPacote,
                                                adicao: this.props.adicao,
                                                caminhoDeVolta: this.props.adicao?"/pacotes/modalidade/adc":"/pacotes/modalidade/editar",
                                                nomeVolta: this.props.nome,
                                                descricaoVolta: this.props.descricao,
                                                idVolta:  this.props.id,
                                            }
                                        }}>
                                            <FontAwesomeIcon icon={faEdit} size="lg" className="App-icon" />
                                        </NavLink>
                                    </CustomTableCell>
                                    <CustomTableCell onClick={() => this.removerValores(row.id,row.id_hotel,row.acomodacao,row.valor_pessoa)} align="center">
                                            <FontAwesomeIcon icon={faTrashAlt} size="lg" className="App-icon" />
                                    </CustomTableCell>
                                </TableRow>
                            ))
                            }
                        </TableBody>
                    </Table>

                }
            </Paper>

        );
    }
}

TableValores.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TableValores);