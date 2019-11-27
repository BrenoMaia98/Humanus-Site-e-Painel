import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Divider from "@material-ui/core/Divider";
import { withRouter } from "react-router";
import axios from "axios";
import { auth } from "../../auth";
import Modal from "../../components/modal/index";
import "./style.css";
const styles = {
  pos: {
    marginBottom: 12
  },
  logoPrincipal: {
    width: "70vw",
  }
};

class editarFotoGestao extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      codigo: "",
      file: null,
      original: "",
      modal1:false,
      modal2:false,
    };
    this.enviarServidor = this.enviarServidor.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  receberDados() {
    let data = "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ8xnHHVxLRnXmaUCJKmANZZWL2sHVo9d5yW3Yu_j5y2G17Sap4";
    this.setState({ original: data });
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
    let envio = false;
    if (envio) {
      this.open("modal1");
    } else
      this.open("modal2");
  }

  handleChange(event) {
    this.setState({
      file: URL.createObjectURL(event.target.files[0])
    });
  }

  componentWillMount() {
    this.receberDados();
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Typography variant="h5" component="h2">
          Editar Logo
        </Typography>
        <Divider />
        <Typography className={classes.pos} color="textSecondary">
          Insira o logo e clique em salvar para alterar e concluir a operação.
        </Typography>

        <div className="App-validar">
          <div className="a">
            <label style={{ marginRight: "10px" }}>
              <p style={{ marginRight: "10px" }}>Editar Logo principal:</p>
              {this.state.file == null ? (
                <img src={this.state.original} className="logoPrincipal" />
              ) : (
                  <img src={this.state.file} className="logoPrincipal" />
                )}
              <input type="file" onChange={this.handleChange} />
            </label>
          </div>
          <Button
            type="submit" variant="contained" size="medium" className="App-Button-Validar"
            onClick={() => this.enviarServidor()}
          >
            <FontAwesomeIcon icon={faCheck} size="lg" style={{ color: "white", marginRight: "5px" }} />
            <p style={{ color: "white", margin: 0 }}>Salvar</p>
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

editarFotoGestao.propTypes = {
  classes: PropTypes.object.isRequired
};

// We need an intermediary variable for handling the recursive nesting.
const editarFotoGestaoWrapped = withStyles(styles)(editarFotoGestao);

export default withRouter(editarFotoGestaoWrapped);
