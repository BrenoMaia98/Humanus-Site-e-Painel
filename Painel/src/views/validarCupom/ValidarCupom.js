import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import AlertDialogSlide from '../../components/AlertDialogSlide'
import Divider from '@material-ui/core/Divider';
import {withRouter} from 'react-router';
import axios from 'axios';
import {auth} from "../../auth";
import "./style.css"
import imgPadrao from "../../images/teste.jpg"
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
    imagem:{
        heigth:"50vh",
        width:"50vw",
    }
};

class ValidarCupom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            codigo: "",
            file:null,
            original:imgPadrao,
        }
        this.Alert = React.createRef();
        this.handleChange = this.handleChange.bind(this);
    }

    async validar(){
        var codigo = this.state.codigo;
        try{
          const response = await axios.post('http://74.117.156.74:5012/Cupom/validar', 
          { "codigo": codigo},auth.config);
          if(response.data.msg) return response.data.msg;
          else return "Cupom válidado com sucesso!";
        }
        catch(err){
          return "Houve um erro, tente novamente!";
        }

    }

    handleChange(event) {
        this.setState({
          file: URL.createObjectURL(event.target.files[0])
        })
      }

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Typography variant="h5" component="h2" >
                    Editar Foto Gestão
                </Typography>
                <Divider />
                <Typography className={classes.pos} color="textSecondary">
                    Insira a foto da gestão e clique em salvar para alterar e concluir a operação.
                </Typography>
                
                <div className = "App-validar">
                {this.state.file == null? 
                        <img src={this.state.original} className="imgSize"/> 
                :
                <img src={this.state.file} className="imgSize"/>}
                        <label style = {{marginRight:'10px'}}>
                          <p style = {{marginRight:'10px'}} >Foto da Gestão:</p>
                          <input type="file" onChange={this.handleChange}/>
                        </label>
                        <Button type = "submit" variant="contained" size="medium" className = "App-Button-Validar" onClick = {this.abrirAlert}>
                            <FontAwesomeIcon icon={faCheck} size = "lg" style = {{color:'white', marginRight:'5px'}}/> 
                            <p style = {{color:'white', margin:0}}>Salvar</p>
                        </Button>

               </div>
               <AlertDialogSlide ref = {this.Alert}> </AlertDialogSlide>
            </div>
        );
    }
}

ValidarCupom.propTypes = {
    classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const ValidarCupomWrapped = withStyles(styles)(ValidarCupom);

export default withRouter(ValidarCupomWrapped);
