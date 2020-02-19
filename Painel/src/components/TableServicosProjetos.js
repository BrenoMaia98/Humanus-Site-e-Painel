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
import LinearProgress from '@material-ui/core/LinearProgress';
import axios from 'axios';
import { auth } from "../auth";
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



class TableServicosProjetos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            linhas: [],
            carregou:false,
        };
    }

    async pegarServicosProjetos() {
        try {
            await axios.get(`${auth.baseURL}/ServicosProjetos/list`, {}).then(response => {
                this.setState({ linhas: response.data, carregou:true })
            })
        } catch (err) {
            console.log(err);
        }
    }

    componentDidMount() {
        this.pegarServicosProjetos();
        //this.setState({linhas:data});
    }


    async removerPacote(id,index) {
        try {
            if (window.confirm('Tem certeza que deseja deletar este item de forma PERMANENTE?')) {
                var auxiliar = this.state.linhas;
                const resp = await axios.post(`${auth.baseURL}/ServicosProjetos/delete`,
                { _id: id }
                ).catch((e) =>   console.log(e))
                auxiliar.splice(index, 1);
                this.setState({ linhas: auxiliar });
            }
        } catch (err) {
            console.log(err);
        }
    };

    render() {
        const { classes } = this.props;

        return (

            <Paper className={classes.root}>
                {
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <CustomTableCell align="center">titulo</CustomTableCell>
                                <CustomTableCell align="center">Descrição</CustomTableCell>
                                <CustomTableCell align="center">Editar</CustomTableCell>
                                <CustomTableCell align="center">Remover</CustomTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {this.state.linhas.length > 0 &&
                            this.state.linhas.map((row,index) => (
                                <TableRow className={classes.row} key={row._id}>
                                    <CustomTableCell align="center">{row.titulo}</CustomTableCell>
                                    <CustomTableCell align="center">{row.descricao}</CustomTableCell>
                                    <CustomTableCell align="center">
                                        <NavLink to={{
                                            pathname: "SERVIÇOS E PROJETOS/edit",

                                            titulo: row.titulo,
                                            descricaoItem: row.descricao,
                                            descricao: "Altere os campos desejados e clique em concluir para finalizar.",
                                            _id: row._id,
                                            tipo: "edit"
                                        }}>
                                            <FontAwesomeIcon icon={faEdit} size="lg" className="App-icon" />
                                        </NavLink>
                                    </CustomTableCell>
                                    <CustomTableCell onClick={() => this.removerPacote(row._id , index)} align="center">
                                        <FontAwesomeIcon icon={faTrashAlt} size="lg" className="App-icon" />
                                    </CustomTableCell>
                                </TableRow>
                            ))
                        }
                        {this.state.carregou && this.state.linhas.length === 0&&
                    <h1 style={{ fontSize: "2em", color:"#ccc" , textAlign:"center"}}> Não existem serviços cadastrados</h1>
                }
                {!this.state.carregou && <LinearProgress />}
                        </TableBody>
                    </Table>

                }

            </Paper>
        );
    }
}

TableServicosProjetos.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TableServicosProjetos);