import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import axios from 'axios';
import {auth} from "../../auth";
import {ServicoProjetoTemp} from './ServicoProjetoTemp';
// precisa corrigir o forms

const styles = {
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
};

class FormsPacotes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nome: ServicoProjetoTemp.nome,
            imagem: ServicoProjetoTemp.imagem,
            condicoes_pagamento: ServicoProjetoTemp.condicoes_pagamento,
        }
    }

    async pegarDetalhesPacote(){
      try{
        const response = await axios.post('http://74.117.156.74:5012/Pacote/get', 
        { "id": this.props.id},auth.config)
        this.setState({ imagem:response.data[0].imagem,
                        nome:response.data[0].nome,
                        condicoes_pagamento: response.data[0].condicoes_pagamento
                     },() => {this.setarNome();this.setarImagem();this.setarCondicoesPagamento()});
      }catch(err){
        console.log(err);
      }
    }

    setarNome(){
        ServicoProjetoTemp.nome = this.state.nome;
    }

    setarImagem(){
        if(document.querySelector('input[type="file"]').files[0])ServicoProjetoTemp.imagem = document.querySelector('input[type="file"]').files[0];
        else ServicoProjetoTemp.imagem = this.state.imagem;
    }

    setarCondicoesPagamento(){
        ServicoProjetoTemp.condicoes_pagamento = this.state.condicoes_pagamento;
    }

    componentWillMount(){
        if(this.props.id !== -1)
            this.pegarDetalhesPacote();
    }

    validaCampo(){
      if(this.state.nome === "" || this.state.nome === null || this.state.nome === undefined ||
        this.state.imagem === "" || this.state.imagem === null || this.state.imagem === undefined ||
        this.state.condicoes_pagamento === "" || this.state.condicoes_pagamento === null || 
        this.state.condicoes_pagamento === undefined)
        return false;
      else return true;
    }

    componentDidMount() {
        this.props.onRef(this)
    }

    componentWillUnmount() {
      this.props.onRef(undefined)
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Typography variant="h5" component="h2" >
                    {this.props.nome}
                </Typography>
                <Divider />
                <Typography className={classes.pos} color="textSecondary">
                    {this.props.descricao}
                </Typography>
                <form className="App-forms">
                    <div>
                        <label>
                          Nome:
                          <input type="text" name="nome" required onChange={(event) => this.setState({nome: event.target.value},() => this.setarNome())} defaultValue = {this.state.nome}/>
                        </label>
                        <label>
                          Imagem Promocional:
                          <input type="file" name="pic" accept="imagem/*" onChange={(event) => this.setState({imagem: "encontrado"},() => this.setarImagem())} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Condições de Pagamento:<br />
                            <textarea rows="4" cols="50" onChange={(event) => this.setState({condicoes_pagamento: event.target.value},() => this.setarCondicoesPagamento())} value = {this.state.condicoes_pagamento} ></textarea>
                        </label>
                    </div>
                </form>                

            </div>

        );
    }
}

FormsPacotes.propTypes = {
    classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const FormsPacotesWrapped = withStyles(styles)(FormsPacotes);

export default FormsPacotesWrapped;