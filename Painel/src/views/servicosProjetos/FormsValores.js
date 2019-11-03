import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import Divider from '@material-ui/core/Divider';
import axios from 'axios';
import {auth} from "../../auth";
import { NavLink } from "react-router-dom";
import { faUndo } from '@fortawesome/free-solid-svg-icons';
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

class FormsValores extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id_hotel:"1",
            acomodacao:"SUÍTE SUPERIOR",
            valor_pessoa:null,
            dia_inicio: null,
            dia_fim:  null,
            num_dias: null,
            rowsAtividades: [],
            rowsValores: [],
            edicao: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async pegarDetalhesValor(){
      try{
        const response = await axios.post('http://74.117.156.74:5012/ValoresPacote/get', 
        { "id": this.props.id},auth.config)
        this.setState({ id_hotel:response.data[0].id_hotel,
                        acomodacao:response.data[0].acomodacao,
                        valor_pessoa:response.data[0].valor_pessoa,
                        edicao:true
                     });
      }catch(err){
        console.log(err);
      }
    }

    async handleSubmit(e){
        e.preventDefault();
        if(this.props.location.componenteProps.adicao){
            var id = ServicoProjetoTemp.contModalidade-1;
           
            if(this.state.edicao){   
                id = this.props.location.componenteProps.id;
                ServicoProjetoTemp.modalidades[id].valores[this.props.location.componenteProps.indice].id_hotel = this.state.id_hotel;
                ServicoProjetoTemp.modalidades[id].valores[this.props.location.componenteProps.indice].acomodacao = this.state.acomodacao;
                ServicoProjetoTemp.modalidades[id].valores[this.props.location.componenteProps.indice].valor_pessoa = this.state.valor_pessoa;
            }
            else{
                ServicoProjetoTemp.criarValor(ServicoProjetoTemp.contModalidade-1,
                    this.state.id_hotel, this.state.acomodacao, this.state.valor_pessoa);
            }
            await this.setState({ dia_inicio: ServicoProjetoTemp.modalidades[id].dia_inicio,
                            dia_fim:  ServicoProjetoTemp.modalidades[id].dia_fim,
                            num_dias: ServicoProjetoTemp.modalidades[id].num_dias,
                            rowsAtividades: ServicoProjetoTemp.modalidades[id].cronograma,
                            rowsValores: ServicoProjetoTemp.modalidades[id].valores
                          });
        }
        else{
            if(this.state.edicao){
               try{
                    await axios.post('http://74.117.156.74:5012/ValoresPacote/update', 
                    { "id": this.props.location.componenteProps.id,
                    "id_hotel":this.state.id_hotel,
                    "acomodacao":this.state.acomodacao,
                    "valor_pessoa":this.state.valor_pessoa},auth.config)
                }catch(err){
                    console.log(err);
                  }
            }
            else{
                try{
                    await axios.post('http://74.117.156.74:5012/ValoresPacote/create', 
                    { 
                    "id_hotel":this.state.id_hotel,
                    "acomodacao":this.state.acomodacao,
                    "valor_pessoa":this.state.valor_pessoa,
                    "modalidade_pacote_id": this.props.location.componenteProps.idVolta},auth.config)
                }catch(err){
                    console.log(err);
                  }
            }
        }
        document.getElementById("retornar").click();
    }

    async setarStatesTemporarios(id){
        await this.setState({id_hotel:this.props.location.componenteProps.valor.id_hotel,
                        acomodacao:this.props.location.componenteProps.valor.acomodacao,
                        valor_pessoa:this.props.location.componenteProps.valor.valor_pessoa,
                        dia_inicio: ServicoProjetoTemp.modalidades[id].dia_inicio,
                        dia_fim:  ServicoProjetoTemp.modalidades[id].dia_fim,
                        num_dias: ServicoProjetoTemp.modalidades[id].num_dias,
                        rowsAtividades: ServicoProjetoTemp.modalidades[id].cronograma,
                        rowsValores: ServicoProjetoTemp.modalidades[id].valores,
                        edicao: true
                      });
    }

     async primeiroSetarStatesTemporarios(){
        await this.setState({
                        dia_inicio: ServicoProjetoTemp.modalidades[ServicoProjetoTemp.contModalidade-1].dia_inicio,
                        dia_fim:  ServicoProjetoTemp.modalidades[ServicoProjetoTemp.contModalidade-1].dia_fim,
                        num_dias: ServicoProjetoTemp.modalidades[ServicoProjetoTemp.contModalidade-1].num_dias,
                        rowsAtividades: ServicoProjetoTemp.modalidades[ServicoProjetoTemp.contModalidade-1].cronograma,
                        rowsValores: ServicoProjetoTemp.modalidades[ServicoProjetoTemp.contModalidade-1].valores,
                        edicao: false
                      });
    }

    componentWillMount(){
        if(this.props.location.componenteProps.id !== -1 && this.props.location.componenteProps.temporario === false)
            this.pegarDetalhesValor();
        else{
              if(this.props.location.componenteProps.id !== -1 && this.props.location.componenteProps.temporario === true){
                this.setarStatesTemporarios(this.props.location.componenteProps.id)
            }
             else{
                 if(this.props.location.componenteProps.id === -1 && this.props.location.componenteProps.temporario === true)
                    this.primeiroSetarStatesTemporarios()
            }
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Typography variant="h5" component="h2" >
                    {this.props.location.componenteProps.nome}
                </Typography>
                <Divider />
                <Typography className={classes.pos} color="textSecondary">
                    {this.props.location.componenteProps.descricao}
                </Typography>
                <form className="App-forms" onSubmit = {this.handleSubmit}>
                    <div>
                        <label>
                             Hotel especifico:
                            <select  onChange={(event) => this.setState({id_hotel: event.target.value})} value = {this.state.id_hotel}>
                                <option value="1">Villa Verde</option>
                                <option value="2">Casa Amarela</option>
                                <option value="4">La Dolce Villa</option>
                                <option value="5">Apart Hotel</option>
                            </select>
                        </label>

                        <label>
                             Acomodações:
                            <select  onChange={(event) => this.setState({acomodacao: event.target.value})} value = {this.state.acomodacao} >
                                <option value="SUÍTE SUPERIOR">SUÍTE SUPERIOR</option>
                                <option value="APARTAMENTO STANDARD">APARTAMENTO STANDARD</option>
                                <option value="LUXO SUPERIOR">LUXO SUPERIOR</option>
                                <option value="SUÍTE MASTER">SUÍTE MASTER</option>
                            </select>
                        </label>
                        
                    </div>

                    <label>
                        Valor:
                        <input required type="text" required name="valor"  onChange={(event) => this.setState({valor_pessoa: event.target.value})} defaultValue = {this.state.valor_pessoa} />
                    </label>

                    <div align='center' style = {{display: "flex", justifyContent:"center"}}> 
                        <Button type = "submit" variant="contained" size="medium" className = "App-Button" style = {{color: 'white'}} >
                            <FontAwesomeIcon icon={faCheck} size = "lg" style = {{marginRight: '10px'}}/> Concluir
                        </Button>
                        <NavLink className ="linkDash" to={{
                            pathname: this.props.location.componenteProps.caminhoDeVolta,
                            componenteProps:{
                                nome: this.props.location.componenteProps.nomeVolta,
                                descricao: this.props.location.componenteProps.descricaoVolta,
                                id: this.props.location.componenteProps.idVolta,
                                adicao: this.props.location.componenteProps.adicao,
                                caminhoDeVolta: this.props.location.componenteProps.caminhoDeVoltaPacote,
                                nomeVolta: this.props.location.componenteProps.nomePacote,
                                descricaoVolta: this.props.location.componenteProps.descricaoPacote,
                                idPacote:  this.props.location.componenteProps.idPacote, 
                                dia_inicio: this.state.dia_inicio,
                                dia_fim:  this.state.dia_fim,
                                num_dias: this.state.num_dias,
                                rowsAtividades: this.state.rowsAtividades,
                                rowsValores: this.state.rowsValores,
                                textoBtn: "Atualizar",

                        }}}>
                            <Button id = {"retornar"} variant="contained" size="medium" className = "App-Button" style = {{color: 'white'}} >
                                <FontAwesomeIcon icon={faUndo} size = "lg" style = {{marginRight: '10px'}}/> Retornar
                            </Button>
                        </NavLink>
                    </div>
                </form>

            </div>

        );
    }
}

FormsValores.propTypes = {
    classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const FormsValoresWrapped = withStyles(styles)(FormsValores);

export default FormsValoresWrapped;