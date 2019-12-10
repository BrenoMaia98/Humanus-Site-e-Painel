import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from "react-router-dom"; import axios from 'axios';
import {auth} from "../auth"

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
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
        overflowY: 'auto',
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




class TablePostagemBlog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            linhas: this.props.data,
        };
    }

  
    componentDidMount(){
        this.setState({linhas:this.props.data})
    }
    
    componentWillUpdate(nextProps, nextState){
        nextState.linhas = nextProps.data;
    }

    getCurrentDate(separator = '') {
        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        return `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date}`
    }


    async removerPostagem(id,index) {
        try {
            if (window.confirm('Tem certeza que deseja deletar este item de forma PERMANENTE?')) {
                var auxiliar = this.state.linhas;
                await axios.delete(`${auth.baseURL}/Postagem/delete/${id}`);
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
                                <CustomTableCell align="center">Título</CustomTableCell>
                                <CustomTableCell align="center">Data</CustomTableCell>
                                <CustomTableCell align="center">Resumo</CustomTableCell>
                                <CustomTableCell align="center">Editar</CustomTableCell>
                                <CustomTableCell align="center">Remover</CustomTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.linhas.map((row,index) => (
                                <TableRow className={classes.row} key={row._id}>
                                    <CustomTableCell align="center">{row.titulo}</CustomTableCell>
                                    <CustomTableCell align="center">{row.data}</CustomTableCell>
                                    <CustomTableCell align="center">{row.resumo}</CustomTableCell>
                                    <CustomTableCell align="center">
                                        <NavLink to={{
                                            pathname: "/POSTAGEM BLOG/edit",
                                            componenteProps: {
                                                nome: "Edição da Postagem do Blog",
                                                descricao: "Altere os campos desejados e clique em concluir para finalizar.",
                                                dados: row,
                                                tipo: "edit"
                                            }
                                        }}>
                                            <FontAwesomeIcon icon={faEdit} size="lg" className="App-icon" />
                                        </NavLink>
                                    </CustomTableCell>
                                    <CustomTableCell onClick={() => this.removerPostagem(row._id , index)} align="center">
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

TablePostagemBlog.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TablePostagemBlog);