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
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import {auth} from "../auth";
import { NavLink } from "react-router-dom";
import axios from 'axios';

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


class TableLojas extends React.Component {
  constructor({ ativarModoEdicao }) {
    super({ ativarModoEdicao });
    this.state = {
      linhas: []
    };
  }

  pegarLojas(){
    try{
      axios.post('http://74.117.156.74:5012/Loja/get',{},auth.config).then(response => {
        this.setState({linhas:response.data})
      })
    }catch(err){
      console.log(err);
    }
  }

  componentWillMount(){
    this.pegarLojas();
  }

  async removerLoja(index) {
    var auxiliar = [...this.state.linhas];
    try{
      await axios.post('http://74.117.156.74:5012/Loja/delete', 
      { "id": index},auth.config)
      for (var i = auxiliar.length - 1; i >= 0; i--) {
        if (auxiliar[i].id === index) {
          auxiliar.splice(i, 1);
        }
      }
      this.setState({ linhas: auxiliar });
    }catch(err){
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
                  <CustomTableCell align="center">Loja</CustomTableCell>
                  <CustomTableCell align="center">Imagem</CustomTableCell>
                  <CustomTableCell align="center">Valor Min. Desconto</CustomTableCell>
                  <CustomTableCell align="center">Valor Max. Desconto</CustomTableCell>
                  <CustomTableCell align="center">Editar</CustomTableCell>
                  <CustomTableCell align="center">Remover</CustomTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.linhas.map(row => (
                  <TableRow className={classes.row} key={row.id}>
                    <CustomTableCell component="th" scope="row" align="center">
                      {row.nome}
                    </CustomTableCell>
                    <CustomTableCell align="center">{row.imagem}</CustomTableCell>
                    <CustomTableCell align="center">{row.desconto_min}</CustomTableCell>
                    <CustomTableCell align="center">{row.desconto_max}</CustomTableCell>
                    <CustomTableCell align="center">
                        <NavLink to={{
                                     pathname:"/lojas/editar", 
                                     lojaProps:{
                                        nome: "Edição de Loja", 
                                        descricao: "Altere os campos desejados e clique em concluir para finalizar.",
                                        edicao: true,
                                        id: row.id
                                    }}}>
                            <FontAwesomeIcon icon={faEdit} size="lg" className="App-icon" />
                        </NavLink>
                    </CustomTableCell>
                    <CustomTableCell onClick={() => this.removerLoja(row.id)} align="center">
                      <FontAwesomeIcon icon={faTrashAlt} size="lg" className="App-icon" />
                    </CustomTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

          }

        </Paper>
    );
  }
}

TableLojas.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TableLojas);