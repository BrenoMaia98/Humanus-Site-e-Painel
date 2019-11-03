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

class FormsModalidades extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dia_inicio: this.props.dia_inicio,
            dia_fim: this.props.dia_fim,
            num_dias: this.props.num_dias,
            cronograma: this.props.cronograma,
            valores: this.props.valores,
            btnModalidade: this.props.btnModalidade,
            textoBtn: this.props.textoBtn,
            id: this.props.id
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    async pegarDetalhesModalidade(){
      try{
        const response = await axios.post('http://74.117.156.74:5012/ModalidadePacote/get', 
        { "id": this.props.id},auth.config)
        this.setState({ dia_fim:response.data[0].dia_fim,
                        dia_inicio:response.data[0].dia_inicio,
                        num_dias:response.data[0].num_dias,
                     });
      }catch(err){
        console.log(err);
      }
    }

    async handleSubmit(e){
        e.preventDefault();
        if(this.state.btnModalidade){
            if(this.props.adicao) ServicoProjetoTemp.atualizarModalidade(this.props.id, this.state.dia_inicio,this.state.dia_fim,this.state.num_dias, this.state.cronograma, this.state.valores);
            else{
                try{
                    await axios.post('http://74.117.156.74:5012/ModalidadePacote/update', 
                    { "id": this.props.id,
                      "dia_fim":this.state.dia_fim,
                      "dia_inicio":this.state.dia_inicio,
                      "num_dias":this.state.num_dias},auth.config)
                }catch(err){
                    console.log(err);
                }
            }
            alert("Atualizado com sucesso!");
        }
        else{
           if(this.props.adicao) ServicoProjetoTemp.criarModalidade(this.state.dia_inicio,this.state.dia_fim,this.state.num_dias);
           else{
                try{
                    await axios.post('http://74.117.156.74:5012/ModalidadePacote/create', 
                    { 
                      "dia_fim":this.state.dia_fim,
                      "dia_inicio":this.state.dia_inicio,
                      "num_dias":this.state.num_dias,
                      "pacote_id": this.props.idPacote},auth.config).then(response => {this.setState({id:response.data.id},console.log(response.data.id))})
                }catch(err){
                    console.log(err);
                }
            }
            alert("Criado com sucesso!");
           await this.setState({btnModalidade:true, textoBtn:"Atualizar"});
        }
    }

    componentWillMount(){
        if(this.props.id !== -1 && this.props.adicao === false)
            this.pegarDetalhesModalidade();
    }

    componentDidMount() {
        this.props.onRef(this)
    }

    componentWillUnmount() {
      this.props.onRef(undefined)
    }

    verificarModalidadeCriada(){
        if(this.state.textoBtn === "Atualizar") return true;
        else return false;
    }

    verificarModalidadeID(){
        return this.state.id;
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
                <form className="App-forms" onSubmit = {this.handleSubmit}>
                    <div>
                        <label>
                            Dia da Semana Inicial:
                            <select  name="dia_inicio" onChange={(event) => this.setState({dia_inicio: event.target.value})} value = {this.state.dia_inicio}>
                                <option value="Segunda">Segunda</option>
                                <option value="Terça">Terça</option>
                                <option value="Quarta">Quarta</option>
                                <option value="Quinta">Quinta</option>
                                <option value="Sexta">Sexta</option>
                                <option value="Sábado">Sábado</option>
                                <option value="Domingo">Domingo</option>
                            </select>
                        </label>

                        <label>
                            Data da Semana Final:
                            <select  name="dia_fim" onChange={(event) => this.setState({dia_fim: event.target.value})} value = {this.state.dia_fim}>
                                <option value="Segunda">Segunda</option>
                                <option value="Terça">Terça</option>
                                <option value="Quarta">Quarta</option>
                                <option value="Quinta">Quinta</option>
                                <option value="Sexta">Sexta</option>
                                <option value="Sábado">Sábado</option>
                                <option value="Domingo">Domingo</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <label>
                            Total de diárias:
                            <input type="number" min="1" max="7" required name="totalDias" onChange={(event) => this.setState({num_dias: event.target.value})} defaultValue = {this.state.num_dias} />
                        </label>
                        <Button type = "submit" variant="contained" size="medium" className = "App-Button" style = {{color: 'white'}} >
                            <FontAwesomeIcon icon={faCheck} size = "lg" style = {{marginRight: '10px'}}/> {this.state.textoBtn}
                        </Button>
                    </div>
                </form>
                
            </div>
        );
    }
}

FormsModalidades.propTypes = {
    classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const FormsModalidadesWrapped = withStyles(styles)(FormsModalidades);

export default FormsModalidadesWrapped;

