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
import {auth} from "../auth";
import {ServicoProjetoTemp} from '../views/servicosProjetos/ServicoProjetoTemp';

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



class TableAtividades extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            linhas: this.props.rows,
            temporario: false
        };
        
    }

    pegarAtividades(){
      try{
         axios.post('http://74.117.156.74:5012/Atividade/get', {'modalidade_pacote_id': this.props.id},auth.config).then(response => {
          this.setState({linhas:response.data})
        })
      }catch(err){
        console.log(err);
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

    componentWillMount(){
      if(this.props.adicao === false) this.pegarAtividades();
      else this.setState({temporario:true})
    }

    async removerAtividade(index,nome,horario_inicio,dia,local) {
        var auxiliar = [...this.state.linhas];
        for (var i = auxiliar.length - 1; i >= 0; i--) {
            
            if (auxiliar[i].id === index) {
                auxiliar.splice(i, 1); break;
            }
        }
        if(ServicoProjetoTemp.modalidades.length > 0){
            ServicoProjetoTemp.removerAtividade(index, nome,horario_inicio,dia,local);
        }
        else{
            await axios.post('http://74.117.156.74:5012/Atividade/delete', 
                { "id": index},auth.config)
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
                                <CustomTableCell align="center">Nome</CustomTableCell>
                                <CustomTableCell align="center">Horário Inicial</CustomTableCell>
                                <CustomTableCell align="center">Dia da Semana</CustomTableCell>
                                <CustomTableCell align="center">Local</CustomTableCell>
                                <CustomTableCell align="center">Editar</CustomTableCell>
                                <CustomTableCell align="center">Remover</CustomTableCell>


                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.linhas.map((row,index) => (
                                <TableRow className={classes.row} key={index}>
                                    <CustomTableCell align="center">{row.nome}</CustomTableCell>
                                    <CustomTableCell align="center">{row.horario_inicio}</CustomTableCell>
                                    <CustomTableCell align="center">{row.dia}</CustomTableCell>
                                    <CustomTableCell align="center">{row.local}</CustomTableCell>
                                    <CustomTableCell align="center">
                                        <NavLink to={{
                                            pathname: "/pacotes/modalidade/atividade/editar",
                                            componenteProps: {
                                                nome: "Edição de Atividade",
                                                descricao: "Altere os campos desejados e clique em concluir para finalizar.",
                                                id: row.id,
                                                atividade: row,
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
                                    <CustomTableCell onClick={() => this.removerAtividade(row.id, row.nome, row.horario_inicio, row.dia, row.local)} align="center">
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

TableAtividades.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TableAtividades);