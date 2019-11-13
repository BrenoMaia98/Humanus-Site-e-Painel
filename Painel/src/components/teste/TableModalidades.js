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


class TableModalidades extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            linhas: ServicoProjetoTemp.modalidades,
            temporario: false,
        };
    }

    async pegarModalidades(){
      try{
          await axios.post('http://74.117.156.74:5012/ModalidadePacote/get', {'pacote_id': this.props.id},auth.config).then(response => {
          this.setState({linhas:response.data})
        })
        
      }catch(err){
        console.log(err);
      }
    }

    componentWillMount(){
      if(this.props.adicao === false) this.pegarModalidades();
      else{
        this.setState({temporario:true})
      } 
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

    async removerModalidade(index) {
        if(ServicoProjetoTemp.modalidades.length > 0){
            ServicoProjetoTemp.removerModalidade(index);

        }
        else{
            await axios.post('http://74.117.156.74:5012/ModalidadePacote/delete', {'id': index},auth.config)
        }
        var auxiliar = [...this.state.linhas];
        for (var i = auxiliar.length - 1; i >= 0; i--) {
            if (auxiliar[i].id === index) {
                auxiliar.splice(i, 1);
            }
        }
        this.setState({ linhas: auxiliar });
    };

    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.root}>
                {
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <CustomTableCell align="center">Dia da Semana de Ínicio</CustomTableCell>
                                <CustomTableCell align="center">Dia da Semana Final</CustomTableCell>
                                <CustomTableCell align="center">Número Total de Dias</CustomTableCell>
                                <CustomTableCell align="center">Editar</CustomTableCell>
                                <CustomTableCell align="center">Remover</CustomTableCell>


                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.linhas.map((row,index) => (
                                <TableRow className={classes.row} key={row.id}>
                                    <CustomTableCell align="center">{row.dia_inicio}</CustomTableCell>
                                    <CustomTableCell align="center">{row.dia_fim}</CustomTableCell>
                                    <CustomTableCell align="center">{row.num_dias}</CustomTableCell>
                                    <CustomTableCell align="center">
                                        <NavLink to={{
                                            pathname: "/pacotes/modalidade/editar",
                                            componenteProps: {
                                                nome: "Edição de Modalidade",
                                                descricao: "Altere os campos desejados e clique em concluir para finalizar.",
                                                id: row.id,
                                                adicao: this.props.adicao,
                                                caminhoDeVolta: this.props.adicao?"/pacotes/adc":"/pacotes/editar",
                                                nomeVolta: this.props.nome,
                                                descricaoVolta: this.props.descricao,
                                                idPacote:  this.props.id, 
                                                dia_inicio: row.dia_inicio,
                                                dia_fim: row.dia_fim,
                                                num_dias: row.num_dias,
                                                textoBtn: "Atualizar",
                                                btnModalidade: true,
                                                rowsAtividades: this.state.temporario?row.cronograma:[],
                                                rowsValores: this.state.temporario?row.valores:[],
                                            }
                                        }}>
                                            <FontAwesomeIcon icon={faEdit} size="lg" className="App-icon" />
                                        </NavLink>
                                    </CustomTableCell>
                                    <CustomTableCell onClick={() => this.removerModalidade(row.id)} align="center">
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

TableModalidades.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TableModalidades);