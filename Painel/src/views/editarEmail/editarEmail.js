import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import Divider from '@material-ui/core/Divider';
import { withRouter } from 'react-router';
import axios from 'axios';
import { auth } from "../../auth";
import "./style.css"

import Modal from "../../components/modal/index"

const styles = {

    card: { minWidth: 275, },

    bullet: { display: 'inline-block', margin: '0 2px', transform: 'scale(0.8)', },

    title: { fontSize: 14, },

    pos: { marginBottom: 12, },

    imagem: { heigth: "50vh", width: "50vw", }
};

class editarEmail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            codigo: "",
            modal1: false,
            modal2: false,
            email: "",
            erroConexao: false
        }
    }

    handleChange = (event) => { this.setState({ email: event.target.value }) }

    receberDados = () => {
        axios.get(`${auth.baseURL}/Email/show`, {}).then(
            resp => {

                if (!resp.data.isError)
                    this.setState({ email: resp.data.email, });
                else
                    this.setState({ erroConexao: true })
            }
        ).catch(e =>
            this.setState({ erroConexao: true })
        )

    }

    open = (modal) => { this.setState({ [modal]: true }); }

    close = (modal) => { this.setState({ [modal]: false }); }

    validaCampo = () => {
        if (this.state.email === "" || this.state.email === null || this.state.email === undefined)
            return false;
        else return true;
    }


    enviarServidor = async () => {
        try{

            if (this.validaCampo()) {
                const resp = await axios.put(`${auth.baseURL}/Email/update`,
                { email: this.state.email }
                );
                if (!resp.data.isError) this.open("modal1")
                else this.open("modal2")
            } else
            this.open("modal2")
        }catch(e){
            this.open("modal2")
        }
    }

    componentDidMount() {
        this.receberDados();
    }
    render() {
        const { classes } = this.props;

        return (
            <div>
                <Typography variant="h5" component="h2" >
                    Editar Email de contato
                </Typography>
                <Divider />
                <Typography className={classes.pos} color="textSecondary">
                    Este email de contato sera utilizado para que o cliente possa se comunicar com a empresa por meio do formulário preenchido na página principal do site, presente na seção de "Contato".
                </Typography>

                <div className="App-validar">
                    <label style={{ marginRight: '10px' }}>
                        <p style={{ marginRight: '10px' }} >Email:</p>
                        <input type="text" onChange={this.handleChange} value={this.state.email} />
                    </label>
                    <Button type="submit" variant="contained" size="medium" className="App-Button-Validar" onClick={this.enviarServidor}>
                        <FontAwesomeIcon icon={faCheck} size="lg" style={{ color: 'white', marginRight: '5px' }} />
                        <p style={{ color: 'white', margin: 0 }}>Salvar</p>
                    </Button>
                </div>
                <Modal visible={this.state.modal1} effect="modal" onClickAway={() => this.close('modal1')}>
                    <div className="Modal">
                        <h1 className="Modal__title">Sucesso</h1>
                        <h4 className="Modal__data">Seus dados foram salvos e já estão disponiveis no site principal</h4>
                        <a onClick={() => this.close('modal1')}>Ok</a>
                    </div>
                </Modal>
                <Modal visible={this.state.modal2} effect="modal" onClickAway={() => this.close('modal2')}>
                    <div className="Modal">
                        <h1 className="Modal__title">Erro</h1>
                        <h4 className="Modal__data">Ocorreu um erro na conexão, por favor tente mais tarde, caso o erro persista, contate a empresa EJCOMP.</h4>
                        <a onClick={() => this.close('modal2')}>Ok</a>
                    </div>
                </Modal>
            </div>
        );
    }
}

editarEmail.propTypes = {
    classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const editarEmailWrapped = withStyles(styles)(editarEmail);

export default withRouter(editarEmailWrapped);
