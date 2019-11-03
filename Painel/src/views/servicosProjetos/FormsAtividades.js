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

class FormsAtividades extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nome:null,
            horario_inicio:null,
            dia:"Segunda",
            local:null,
            dia_inicio: null,
            dia_fim:  null,
            num_dias: null,
            rowsAtividades: [],
            rowsValores: [],
            edicao:false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async pegarDetalhesAtividade(){
      try{
        const response = await axios.post('http://74.117.156.74:5012/Atividade/get', 
        { "id": this.props.location.componenteProps.id},auth.config)
        this.setState({ nome:response.data[0].nome,
                        horario_inicio:response.data[0].horario_inicio,
                        dia:response.data[0].dia,
                        local:response.data[0].local,
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
                ServicoProjetoTemp.modalidades[id].cronograma[this.props.location.componenteProps.indice].nome = this.state.nome;
                ServicoProjetoTemp.modalidades[id].cronograma[this.props.location.componenteProps.indice].horario_inicio = this.state.horario_inicio;
                ServicoProjetoTemp.modalidades[id].cronograma[this.props.location.componenteProps.indice].dia = this.state.dia;
                ServicoProjetoTemp.modalidades[id].cronograma[this.props.location.componenteProps.indice].local = this.state.local;
            }
            else{

                ServicoProjetoTemp.criarAtividade(ServicoProjetoTemp.contModalidade-1,
                    this.state.nome, this.state.horario_inicio, this.state.dia, this.state.local);
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
                    await axios.post('http://74.117.156.74:5012/Atividade/update', 
                    { "id": this.props.location.componenteProps.id,
                     "nome": this.state.nome,
                     "horario_inicio": this.state.horario_inicio,
                     "dia": this.state.dia,
                     "local": this.state.local },auth.config)
                        
                }catch(err){
                  console.log(err);
                }
            }
            else{
                try{
                    await axios.post('http://74.117.156.74:5012/Atividade/create', 
                    {
                     "nome": this.state.nome,
                     "horario_inicio": this.state.horario_inicio,
                     "dia": this.state.dia,
                     "local": this.state.local,
                     "modalidade_pacote_id": this.props.location.componenteProps.idVolta },auth.config)
                        
                }catch(err){
                  console.log(err);
                }
            }
            
        }
        document.getElementById("retornar").click();
    }

    async setarStatesTemporarios(id){
        await this.setState({nome: this.props.location.componenteProps.atividade.nome,
                        horario_inicio:this.props.location.componenteProps.atividade.horario_inicio,
                        dia:this.props.location.componenteProps.atividade.dia,
                        local:this.props.location.componenteProps.atividade.local, 
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
            this.pegarDetalhesAtividade();
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
                <form className="App-forms" onSubmit = {this.handleSubmit} >
                    <div>
                        <label>
                            Nome:
                            <input required type="text" name="nome" required onChange={(event) => this.setState({nome: event.target.value})} defaultValue = {this.state.nome} />
                        </label>

                        <label>
                            Horário Inicial:
                            <input required type="time" name="horario" required onChange={(event) => this.setState({horario_inicio: event.target.value})} defaultValue = {this.state.horario_inicio}/>
                        </label>
                    </div>

                    <div>
                        <label>
                             Dia da Semana:
                            <select onChange={(event) => this.setState({dia: event.target.value})} defaultValue = {this.state.dia}>
                                <option value="Segunda">Segunda-feira</option>
                                <option value="Terça">Terça-feira</option>
                                <option value="Quarta">Quarta-feira</option>
                                <option value="Quinta">Quinta-feira</option>
                                <option value="Sexta">Sexta-feira</option>
                                <option value="Sábado">Sábado</option>
                                <option value="Domingo">Domingo</option>

                            </select>
                        </label>

                        <label>
                             Local:
                            <input required type="text" name="nome" required onChange={(event) => this.setState({local: event.target.value})} defaultValue = {this.state.local} />
                        </label>
                    </div>
                    
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
                 <div align='center' style = {{display: "flex", justifyContent:"center"}}> 
                    
                    
                </div>
            </div>
        );
    }
}

FormsAtividades.propTypes = {
    classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const FormsAtividadesWrapped = withStyles(styles)(FormsAtividades);

export default FormsAtividadesWrapped;