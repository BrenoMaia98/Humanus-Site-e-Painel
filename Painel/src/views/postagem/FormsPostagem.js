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

class FormsPostagem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nome: "",
            carregando: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(e){
      e.preventDefault();
      try{
        this.setState({carregando:true},() => {document.getElementById("retornar").style.display = "none"});
        await axios.post("http://74.117.156.74:5012/Brinde/create",{"nome": this.state.nome},auth.config);
        this.botaoVoltar.clicar();
      }catch(err){
        alert("Erro de conexão, tente novamente!");
        console.log(err);
        this.botaoVoltar.clicar();
      }
    }

    render() {
        const { classes } = this.props;
         if(this.state.carregando){
          return(
            <div style = {{display: "flex", flexDirection:"column", alignItems: "center"}} >
              <CircularProgress className={classes.progress} style = {{color: "#1db954"}}/>
              <label>Aguarde...</label>
              <BotaoVoltar id = {"retornar"} onRef={ref => (this.botaoVoltar = ref)}  link = "BRINDES" />
            </div>
          );
        }
        else{
            return (
                <div>
                    <Typography variant="h5" component="h2" >
                    {this.props.nome}
                    </Typography>
                    <Divider />
                    <Typography className={classes.pos} color="textSecondary">
                        {this.props.descricao}

                    </Typography>
                    <form className="App-forms" onSubmit = {this.handleSubmit} >
                        <div>
                            <label>
                                Nome:
                                <input required type="text" name="nome" onChange={(event) => this.setState({nome: event.target.value})}/>
                            </label>

                        </div>
                        <Divider />

                        <div align='center'>
                           <Button type = "submit" variant="contained" size="medium" className = "App-Button" style = {{color: 'white'}} >
                                <FontAwesomeIcon icon={faCheck} size = "lg" style = {{marginRight: '10px'}}/> Concluir
                            </Button>
                            <BotaoVoltar onRef={ref => (this.botaoVoltar = ref)} link = "BRINDES" />
                        </div> 
                    </form>

                </div>
            );
        }
    }
}

FormsPostagem.propTypes = {
    classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const FormsBrindesWrapped = withStyles(styles)(FormsPostagem);

export default FormsBrindesWrapped;