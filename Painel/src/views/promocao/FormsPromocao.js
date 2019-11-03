import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import BotaoVoltar from '../../components/BotaoVoltar'
import Divider from '@material-ui/core/Divider';
import {withRouter} from 'react-router';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import {auth} from "../../auth";

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

class FormsPromocao extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          nome: null,
          validade: null,
          pic: null,
          descricao: null,
          numAdultos: null,
          numCriancas: null,
          numQuartos: null,
          dataCheckIn: null,
          dataCheckOut: null,
          hotel:null,
          acomodacao: null,
          carregando: false,
          desconto:null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async pegarDetalhesPromocao(){
      try{
        const response = await axios.post('http://74.117.156.74:5012/Promocao/get', 
        { "id": this.props.location.aboutProps.id},auth.config)
        this.setState({ pic:response.data[0].imagem,
                        nome:response.data[0].nome,
                        descricao:response.data[0].descricao,
                        numAdultos:response.data[0].num_adultos,
                        numCriancas:response.data[0].num_criancas,
                        dataCheckIn:response.data[0].data_checkin,
                        dataCheckOut:response.data[0].data_checkout,
                        numQuartos:response.data[0].num_quartos,
                        hotel:response.data[0].hotel,
                        acomodacao:response.data[0].acomodação,
                        validade:response.data[0].validade,
                        desconto:response.data[0].desconto
                       });
        
      }catch(err){
        console.log(err);
      }
    }

    async handleSubmit(e){
      e.preventDefault();
      var data = new FormData();
      var url = 'http://74.117.156.74:5012/Promocao/create';
      var imagedata = document.querySelector('input[type="file"]').files[0];
      if(imagedata || this.props.location.aboutProps.edicao){
        if(imagedata)data.append("imagem", imagedata, imagedata.name);
        data.append("nome", this.state.nome);
        data.append("descricao", this.state.descricao);
        data.append("num_adultos", this.state.numAdultos);
        data.append("num_criancas", this.state.numCriancas);
        data.append("data_checkin", this.state.dataCheckIn);
        data.append("data_checkout", this.state.dataCheckOut);
        data.append("num_quartos", this.state.numQuartos);
        data.append("hotel", this.state.hotel);
        data.append("acomodacao", this.state.acomodacao);  
        data.append("validade", this.state.validade);
        data.append("desconto", this.state.desconto);
        if(this.props.location.aboutProps.edicao){
          url = 'http://74.117.156.74:5012/Promocao/update';
          data.append("id", this.props.location.aboutProps.id);
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
      if(this.props.location.aboutProps.edicao)
        this.pegarDetalhesPromocao();
    }


    render() {
        const { classes } = this.props;
        
        if(this.state.carregando){
          return(
            <div style = {{display: "flex", flexDirection:"column", alignItems: "center"}} >
              <CircularProgress className={classes.progress} style = {{color: "#1db954"}}/>
              <label>Aguarde...</label>
              <BotaoVoltar id = {"retornar"} onRef={ref => (this.botaoVoltar = ref)}  link = "PROMOÇÕES" />
            </div>
          );
        }
        else{
          return(
            <div>
                <Typography variant="h5" component="h2" >
                    {this.props.location.aboutProps.nome}
                </Typography>
                <Divider />
                <Typography className={classes.pos} color="textSecondary">
                    {this.props.location.aboutProps.descricao}
                </Typography>
                <form className = "App-forms" encType='multipart/form-data' onSubmit = {this.handleSubmit}>
                    <div>
                        <label>
                          Nome:
                          <input required type="text" name="nome" onChange={(event) => this.setState({nome: event.target.value})} defaultValue = {this.state.nome}/>
                        </label>
                        <label>
                          Data de validade:
                          <input required type="date" name="validade" onChange={(event) => this.setState({validade: event.target.value})} defaultValue = {this.state.validade}/>
                        </label>
                    </div>
                    <div>
                        <label>
                          Imagem promocional:
                          <input type="file" name="imagem" accept="imagem/*" onChange={(event) => this.setState({pic: event.target.files[0]})} /><br/>
                          
                        </label>
                        <label>
                            Descrição:<br />
                            <input required style = {{width: '30vw'}}  onChange={(event) => this.setState({descricao: event.target.value})} defaultValue = {this.state.descricao}></input>
                        </label>
                    </div>
                    <div>
                        <label>
                            Desconto:
                            <input required type="text" name="desconto" onChange={(event) => this.setState({desconto: event.target.value})} defaultValue = {this.state.desconto}/>%
                        </label>
                    </div>
                    <Divider />
                    <Typography className={classes.pos} color="textSecondary">
                        A seguir temos as caracteristicas de validação da promoção. Nenhum dos campos são obrigatórios.
                    </Typography>
                    <div>
                        <label>
                          Número de adultos:
                          <input type="number" name="num_adultos"  onChange={(event) => this.setState({numAdultos: event.target.value})} defaultValue = {this.state.numAdultos}/>
                        </label>
                        <label>
                          Número de crianças:
                          <input type="number" name="num_criancas"  onChange={(event) => this.setState({numCriancas: event.target.value})} defaultValue = {this.state.numCriancas}/>
                        </label>
                    </div>
                    <div>
                        <label>
                          Data especifica de check-in:
                          <input type="date" name="data_checkin"  onChange={(event) => this.setState({dataCheckIn: event.target.value})} defaultValue = {this.state.dataCheckIn}/>
                        </label>
                        <label>
                          Data especifica de check-out:
                          <input type="date" name="data_checkout"  onChange={(event) => this.setState({dataCheckOut: event.target.value})} defaultValue = {this.state.dataCheckOut}/>
                        </label>
                    </div>
                    <div>
                        <label>
                          Número de quartos reservados:
                          <input type="number" name="num_quartos"  onChange={(event) => this.setState({numQuartos: event.target.value})} defaultValue = {this.state.numQuartos}/>
                        </label>
                        <label>
                             Hotel especifico:
                            <select  onChange={(event) => this.setState({hotel: event.target.value})} value = {this.state.hotel} name = "hotel">
                              <option value="nenhum">Nenhum</option>
                              <option value="villaVerde">Villa Verde</option>
                              <option value="casaAmarela">Casa Amarela</option>
                              <option value="dolceVilla">Dolce Villa</option>
                              <option value="apartHotel">Apart Hotel</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <label>
                            Tipo de acomodação:
                            <select  onChange={(event) => this.setState({acomodacao: event.target.value})} value = {this.state.acomodacao} name = "acomodação">
                              <option value="nenhum">Nenhum</option>
                              <option value="SUÍTE SUPERIOR">SUÍTE SUPERIOR</option>
                              <option value="APARTAMENTO STANDARD">APARTAMENTO STANDARD</option>
                              <option value="LUXO SUPERIOR">LUXO SUPERIOR</option>
                              <option value="SUÍTE MASTER">SUÍTE MASTER</option>
                            </select>
                        </label>
                        
                    </div>
                    <div align = 'center'>
                        <Button type = "submit" variant="contained" size="medium" className = "App-Button" style = {{color: 'white'}} >
                            <FontAwesomeIcon icon={faCheck} size = "lg" style = {{marginRight: '10px'}}/> Concluir
                        </Button>
                        <BotaoVoltar onRef={ref => (this.botaoVoltar = ref)} link = "PROMOÇÕES" />
                    </div>
                </form>
                
            </div>
          );
        }
    }
}

FormsPromocao.propTypes = {
    classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const FormsPromocaoWrapped = withStyles(styles)(FormsPromocao);

export default withRouter(FormsPromocaoWrapped);
