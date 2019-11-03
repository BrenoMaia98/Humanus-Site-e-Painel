import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import BotaoVoltar from '../../components/BotaoVoltar'
import Divider from '@material-ui/core/Divider';
import axios from 'axios';
import {auth} from "../../auth";
import CircularProgress from '@material-ui/core/CircularProgress';

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

class FormsLojas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nome: null,
            pic: null,
            desconto_min: 0,
            desconto_max: 0,
            carregando: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    async pegarDetalhesLojas(){
      try{
        const response = await axios.post('http://74.117.156.74:5012/Loja/get', 
        { "id": this.props.location.lojaProps.id},auth.config)
        this.setState({ pic:response.data[0].imagem,
                        nome:response.data[0].nome,
                        desconto_min: response.data[0].desconto_min,
                        desconto_max: response.data[0].desconto_max,
                     });
      }catch(err){
        console.log(err);
      }
    }

    async handleSubmit(e){
      e.preventDefault();
      var data = new FormData();
      var url = 'http://74.117.156.74:5012/Loja/create';
      var imagedata = document.querySelector('input[type="file"]').files[0];
      if(imagedata || this.props.location.lojaProps.edicao){
        if(imagedata) data.append("imagem", imagedata, imagedata.name);
        data.append("nome", this.state.nome);
        data.append("desconto_min", this.state.desconto_min);
        data.append("desconto_max", this.state.desconto_max);
        if(this.props.location.lojaProps.edicao){
          url = 'http://74.117.156.74:5012/Loja/update';
          data.append("id", this.props.location.lojaProps.id);
        } 
        try{
          this.setState({carregando:true},() => {document.getElementById("retornar").style.display = "none"});
          await axios.post(url,data, auth.config);
          this.botaoVoltar.clicar();
        }catch(err){
          alert("Erro de conexão, tente novamente!");
          console.log(err);
          this.botaoVoltar.clicar();
        }
      }
      else
        alert("Insira uma imagem!");
    }

    componentWillMount(){
        if(this.props.location.lojaProps.edicao)
            this.pegarDetalhesLojas();
    }

    render() {
        const { classes } = this.props;
        if(this.state.carregando){
            return(
              <div style = {{display: "flex", flexDirection:"column", alignItems: "center"}} >
                <CircularProgress className={classes.progress} style = {{color: "#1db954"}}/>
                <label>Aguarde...</label>
                <BotaoVoltar id = {"retornar"} onRef={ref => (this.botaoVoltar = ref)} link = "LOJAS"/>
              </div>
            );
        }
        else{     
            return (
                <div>
                    <Typography variant="h5" component="h2" >
                        {this.props.location.lojaProps.nome}
                    </Typography>
                    <Divider />
                    <Typography className={classes.pos} color="textSecondary">
                        {this.props.location.lojaProps.descricao}
                    </Typography>
                    <form className = "App-forms" encType='multipart/form-data' onSubmit = {this.handleSubmit}>
                        <div>
                            <label>
                              Nome:
                              <input required type="text" name="nome" onChange={(event) => this.setState({nome: event.target.value})} defaultValue = {this.state.nome}/>
                            </label>
                            <label>
                              Imagem:
                              <input type="file" name="pic" accept="imagem/*" onChange={(event) => this.setState({pic: event.target.value})} defaultValue = {this.state.pic}/>
                            </label>
                        </div>
                        <div>
                            <label>
                              Valor mínimo de desconto(%):
                              <input type="number" name="desconto_min" onChange={(event) => this.setState({desconto_min: event.target.value})} value = {this.state.desconto_min}/>
                            </label>
                            <label>
                              Valor máximo de desconto(%):
                              <input type="number" name="desconto_max"  onChange={(event) => this.setState({desconto_max: event.target.value})} value = {this.state.desconto_max}/>
                            </label>
                        </div>
                        <div align = 'center'>
                            <Button type = "submit" variant="contained" size="medium" className = "App-Button" style = {{color: 'white'}} >
                                <FontAwesomeIcon icon={faCheck} size = "lg" style = {{marginRight: '10px'}}/> Concluir
                            </Button>
                            <BotaoVoltar onRef={ref => (this.botaoVoltar = ref)} link = "LOJAS"/>
                        </div>
                    </form>
                    
                </div>
            );
        }
    }
}

FormsLojas.propTypes = {
    classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const FormsLojasWrapped = withStyles(styles)(FormsLojas);

export default FormsLojasWrapped;