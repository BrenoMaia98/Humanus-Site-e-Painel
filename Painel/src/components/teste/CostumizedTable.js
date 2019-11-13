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


class CustomizedTable extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      linhas: []
    };
  }


  pegarPromocoes(){
    try{
      axios.post('http://74.117.156.74:5012/Promocao/get', {} ,auth.config).then(response => {
        this.setState({linhas:response.data})
      })
    }catch(err){
      console.log(err);
    }
  }

  componentWillMount(){
    this.pegarPromocoes();
  }

  async removerPromocao(index) {
    var auxiliar = [...this.state.linhas];
    try{
      await axios.post('http://74.117.156.74:5012/Promocao/delete', 
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

  mudarFormato(validade){
    validade = validade.split("-");
    [validade[0], validade[2]] = [validade[2], validade[0]];
    validade = validade[0] + "/" + validade[1] + "/" + validade[2];
    return validade;
  }

  render() {
    const { classes } = this.props;

    return (
        <Paper className={classes.root}>
          {
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <CustomTableCell align="center">Promoção</CustomTableCell>
                  <CustomTableCell align="center">Descrição</CustomTableCell>
                  <CustomTableCell align="center">Imagem</CustomTableCell>
                  <CustomTableCell align="center">Validade</CustomTableCell>
                  <CustomTableCell align="center">Desconto (%)</CustomTableCell>
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
                    <CustomTableCell align="center">{row.descricao}</CustomTableCell>
                    <CustomTableCell align="center">{row.imagem}</CustomTableCell>
                    <CustomTableCell align="center">{this.mudarFormato(row.validade)}</CustomTableCell>
                    <CustomTableCell align="center">{row.desconto}</CustomTableCell>
                    <CustomTableCell align="center">
                        <NavLink to={{
                                     pathname:"/promocoes/editar", 
                                     aboutProps:{
                                        nome: "Edição de Promoção", 
                                        descricao: "Altere os campos desejados e clique em concluir para finalizar.",
                                        edicao: true,
                                        id: row.id
                                    }}}>
                           <FontAwesomeIcon icon={faEdit} size="lg" className="App-icon" />
                        </NavLink>
                    </CustomTableCell>
                    <CustomTableCell onClick={() => this.removerPromocao(row.id)} align="center">
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

CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedTable);