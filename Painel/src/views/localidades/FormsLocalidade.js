import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import BotaoVoltar from '../../components/BotaoVoltar'
import Divider from '@material-ui/core/Divider';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import {auth} from "../../auth";
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

class FormsLocalidade extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imagem: null,
            nome: null,
            descricao: null,
            tipo: null,
            latitude: null,
            longitude: null,
            status: null,
            horario_funcionamento: null,
            carregando: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async pegarDetalhesLocalidades(){
      try{
        const response = await axios.post('http://74.117.156.74:5012/Localidade/get', 
        { "id": this.props.location.localidadesProps.id},auth.config)
        this.setState({ imagem:response.data[0].imagem,
                        nome: response.data[0].nome,
                        descricao: response.data[0].descricao,
                        tipo: response.data[0].tipo,
                        latitude: response.data[0].latitude,
                        longitude: response.data[0].longitude,
                        status: response.data[0].status,
                        horario_funcionamento: response.data[0].horario_funcionamento 
                     });
      }catch(err){
        console.log(err);
      }
    }

    async handleSubmit(e){
      e.preventDefault();
      var data = new FormData();
      var url = 'http://74.117.156.74:5012/Localidade/update';
      var imagedata = document.querySelector('input[type="file"]').files[0];
      if(imagedata) data.append("imagem", imagedata, imagedata.name);
      data.append("nome", this.state.nome);
      data.append("descricao", this.state.descricao);
      data.append("tipo", this.state.tipo);
      data.append("latitude", this.state.latitude);
      data.append("longitude", this.state.longitude);
      data.append("status", this.state.status);
      data.append("horario_funcionamento", this.state.horario_funcionamento);
      data.append("id", this.props.location.localidadesProps.id); 
      try{
        this.setState({carregando:true},() => {document.getElementById("retornar").style.display = "none"});
        const response = await axios.post(url,data,auth.config);
        console.log(response);
        this.botaoVoltar.clicar();
      }catch(err){
        alert("Erro de conexão, tente novamente!");
        console.log(err);
        this.botaoVoltar.clicar();
      }
    }

    componentWillMount(){
        this.pegarDetalhesLocalidades();
    }


    render() {
        const { classes } = this.props;
        if(this.state.carregando){
            return(
              <div style = {{display: "flex", flexDirection:"column", alignItems: "center"}} >
                <CircularProgress className={classes.progress} style = {{color: "#1db954"}}/>
                <label>Aguarde...</label>
                <BotaoVoltar id = {"retornar"} onRef={ref => (this.botaoVoltar = ref)}  link = "LOCALIDADES" />
              </div>
            );
        }
        else{     
            return (
                <div>
                <Typography variant="h5" component="h2" >
                    {this.props.location.localidadesProps.nome}
                </Typography>
                <Divider />
                <Typography className={classes.pos} color="textSecondary">
                    {this.props.location.localidadesProps.descricao}
                </Typography>
                <form className="App-forms" encType='multipart/form-data' onSubmit = {this.handleSubmit} >
                    <div>
                        <label>
                            Nome:
                            <input required type="text" name="nome" onChange={(event) => this.setState({nome: event.target.value})} defaultValue = {this.state.nome}/>
                        </label>
                        <label>
                            Descrição:
                            <input required type="text" name="descricao" style = {{width: '30vw'}} onChange={(event) => this.setState({descricao: event.target.value})} defaultValue = {this.state.descricao}/>
                        </label>
                    </div>
                    <div>
                        <label>
                            Imagem Local:
                            <input type="file" name="imagem" accept="imagem/*" />
                        </label>
                        <label>
                            Tipo:
                            <select  onChange={(event) => this.setState({tipo: event.target.value})} value = {this.state.tipo} name = "tipo">
                              <option value="lazer">Lazer</option>
                              <option value="atividade">Atividade</option>
                              <option value="outros">Outros</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <label>
                            Horário de funcionamento:
                            <input required type="text" name="horario_funcionamento" onChange={(event) => this.setState({horario_funcionamento: event.target.value})} defaultValue = {this.state.horario_funcionamento}/>
                        </label>
                        <label>
                            Status:
                            <input required type="text" name="status"  onChange={(event) => this.setState({status: event.target.value})} defaultValue = {this.state.status}/>
                        </label>
                    </div>
                    <div align='center'> 
                    {/* Precisa arrumar rotas aqui */}
                        <Button type = "submit" variant="contained" size="medium" className = "App-Button" style = {{color: 'white'}} >
                            <FontAwesomeIcon icon={faCheck} size = "lg" style = {{marginRight: '10px'}}/> Concluir
                        </Button>
                        <BotaoVoltar onRef={ref => (this.botaoVoltar = ref)} link = "LOCALIDADES" />
                    </div>
                </form>
            </div>
            );
        }
    }
}

FormsLocalidade.propTypes = {
    classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const FormsLocalidadeWrapped = withStyles(styles)(FormsLocalidade);

export default FormsLocalidadeWrapped;