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
      file: "https://semantic-ui.com/images/wireframe/image.png",
      file2: "https://semantic-ui.com/images/wireframe/image.png",
      fileURL: null,
      file2URL: null,
      Completo: null,
      Resumido: null,
      original: "",
      modal1: false,
      modal2: false,
    };
    this.enviarServidor = this.enviarServidor.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
  }

  async receberDados() {
    try {
      const Resumido = await axios.get(`${auth.baseURL}/Logo/index/Resumido`)
      const Completo = await axios.get(`${auth.baseURL}/Logo/index/Completo`)

      this.setState({
        file:  Completo.data.isError ? this.state.file : `${auth.baseURL}/Image/${Completo.data.logo.thumbnail}` ,
        file2:  Resumido.data.isError ? this.state.file2 : `${auth.baseURL}/Image/${Resumido.data.logo.thumbnail}` 
      }
      );
    } catch (e) {
      console.log(e);
    }
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
  async enviarServidor() {
    if (this.state.fileURL !== null) {

      var Form1 = new FormData();
      Form1.append("thumbnail", this.state.file);
      Form1.append("tipo", "Completo");
      const response1 = await axios({
        method: 'put',
        url: `${auth.baseURL}/Logo/update`,
        data: Form1,
        headers: {
          'content-type': `multipart/form-data; boundary=${Form1._boundary}`,
        },
      }).then(resp => console.log("RESP1 : ", resp)).catch(e => console.log("ERROR1 : ", e));
    }

    if (this.state.file2URL !== null) {

      var Form2 = new FormData();
      Form2.append("thumbnail", this.state.file2);
      Form2.append("tipo", "Resumido");
      const response2 = await axios({
        method: 'put',
        url: `${auth.baseURL}/Logo/update`,
        data: Form2,
        headers: {
          'content-type': `multipart/form-data; boundary=${Form2._boundary}`,
        },
      }).then(resp => console.log("RESP2 : ", resp)).catch(e => console.log("ERROR2 : ", e));
    }

    let envio = true;
    if (envio) {
      this.open("modal1");
    } else
      this.open("modal2");
  }

  handleChange(event) {
    try{
      this.setState({
      fileURL: URL.createObjectURL(event.target.files[0]),
      file: event.target.files[0]
    });}catch(e){
      console.log("Catch ao atualizar img1: ",e)
    }
  }

  handleChange2(event) {
    try{
      this.setState({
      file2URL: URL.createObjectURL(event.target.files[0]),
      file2: event.target.files[0]
    });}catch(e){
      console.log("Catch ao atualizar img2: ",e)
    }
  }


  componentDidMount() {
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
              <div>
                <p style={{ marginRight: "10px" }}>Editar Logo principal:</p>
                <img src={this.state.fileURL ? this.state.fileURL : this.state.file} className="logoPrincipal" />
                <input type="file" onChange={this.handleChange} />
              </div>
              <div>
                <p style={{ marginRight: "10px" }}>Editar Logo Resumido:</p>
                <img src={this.state.file2URL ? this.state.file2URL : this.state.file2} className="logoPrincipal" />
                <input type="file" onChange={this.handleChange2} />
              </div>
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
