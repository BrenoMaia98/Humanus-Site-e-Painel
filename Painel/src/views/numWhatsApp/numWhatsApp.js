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
    imagem: {
        heigth: "50vh",
        width: "50vw",
    }
};

class numWhatsApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            codigo: "",
            modal1: false,
            modal2: false,
            num: "",
            _id:"",
        }
        this.handleChange = this.handleChange.bind(this);
        this.enviarServidor = this.enviarServidor.bind(this);
    }

    handleChange(event) {
        this.setState({
            num: event.target.value
        })
    }

    async receberDados() {
        const resp = await axios.post(`${auth.baseURL}/WhatsApp/show`, {});
        this.setState({ num: resp.data.numero, _id:resp.data._id });
    }
    
    open(modal) {
        this.setState({
            [modal]: true
        });
    }
    
    close(modal) {
        this.setState({
            [modal]: false
        });
    }
    validaCampo() {
        if (
            this.state.num === "" ||
            this.state.num === null ||
            this.state.num === undefined
            )
            return false;
        else return true;
    }
    
    async enviarServidor() {
        if (this.validaCampo()) {
            const resp = await axios.post(`${auth.baseURL}/WhatsApp/update`, {
                numero: this.state.num,
                _id:this.state._id,
            });
            console.log("RES WHATS: ",resp.data);
            if (!resp.data.isError) {
                this.open("modal1")
            } else
                this.open("modal2")
            } else
            this.open("modal2")
    }

    componentDidMount() {
        this.receberDados();
    }
    render() {
        const { classes } = this.props;

        return (
            <div>
                <Typography variant="h5" component="h2" >
                    Editar Numero WhatsApp
                </Typography>
                <Divider />
                <Typography className={classes.pos} color="textSecondary">
                    Este numero de contato sera utilizado para que o cliente possa se comunicar com a empresa por meio do contato direto via WhatsApp.
                </Typography>

                <div className="App-validar">
                    <label style={{ marginRight: '10px' }}>
                        <p style={{ marginRight: '10px' }} >Numero WhatsApp:</p>
                        <input type="text" onChange={this.handleChange} value={this.state.num} />
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

numWhatsApp.propTypes = {
    classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const numWhatsAppWrapped = withStyles(styles)(numWhatsApp);

export default withRouter(numWhatsAppWrapped);
