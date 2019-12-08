import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import Divider from '@material-ui/core/Divider';
import { withRouter } from 'react-router';
import Modal from "../../components/modal/index";
import axios from 'axios';
import { auth } from "../../auth";
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
  imagem: {
    heigth: "50vh",
    width: "50vw",
  }
};

class editarFotoGestao extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      codigo: "",
      file: null,
      original: null,
      modal1: false,
      modal2: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.enviarServidor = this.enviarServidor.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }


  async receberDados() {
    const resp = await axios.post(`${auth.baseURL}/Gestao/index`, {})
    this.setState({ original: resp.data.thumbnail })

    //this.setState({ original: imgPadrao, })
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
  enviarServidor() {
    let envio = true;
    if (envio) {
      this.open("modal1");
    } else
      this.open("modal2");

  }

  componentWillMount() {
    this.receberDados();
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

        <div className="App-validar">
          <form onSubmit={this.enviarServidor} enctype="multipart/form-data" >
            {this.state.file == null ?
              <img src={this.state.original} className="imgSize" />
              :
              <img src={this.state.file} className="imgSize" />}
            <label style={{ marginRight: '10px' }}>
              <p style={{ marginRight: '10px' }} >Foto da Gestão:</p>

              <input type="file" onChange={this.handleChange} />
            </label>
            <Button type="submit" variant="contained" size="medium" className="App-Button-Validar" >
              <FontAwesomeIcon icon={faCheck} size="lg" style={{ color: 'white', marginRight: '5px' }} />
              <p style={{ color: 'white', margin: 0 }}>Salvar</p>
            </Button>

          </form>
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

editarFotoGestao.propTypes = {
  classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const editarFotoGestaoWrapped = withStyles(styles)(editarFotoGestao);

export default withRouter(editarFotoGestaoWrapped);
