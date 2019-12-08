import React from "react";
import BotaoVoltar from "../../components/BotaoVoltar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../components/modal/index"
import axios from "axios";
import { auth } from "../../auth";

const styles = {
  card: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  fotoAlign: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  fotoSize: {
    marginLeft: "50px",
    width: "300px"
  }
};

class AddEditPostagem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titulo: "",
      resumo: "",
      materiaCompleta: "",
      fotos: [],
      _id: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.enviarServidor = this.enviarServidor.bind(this);
    this.receberDados = this.receberDados.bind(this);

  }
  validaCampo() {
    if (
      this.state.titulo === "" ||
      this.state.titulo === null ||
      this.state.titulo === undefined ||
      this.state.resumo === "" ||
      this.state.resumo === null ||
      this.state.resumo === undefined
    )
      return false;
    else return true;
  }

  receberDados() {
    /*await axios.post('http://74.117.156.74:5012/ServicosProjetos/delete', {'id': index},auth.config).then(
           (resp) =>  this.setState(dados:resp.data)
        )*/

    if (this.props.location.tipo !== "adc") {
      const dados = {
        titulo: "Um titulo qualquer",
        resumo:
          " Maecenas ipsum velit, consectetuer eu, lobortis ut, dictum at, dui. In rutrum. Sed ac dolor sit amet purus malesuada congue. In laoreet, magna id viverra tincidunt, sem odio bibendum justo, vel imperdiet sapien wisi sed libero. Suspendisse sagittis ultrices augue. Mauris metus. Nunc dapibus tortor vel mi dapibus sollicitudin. Etiam posuere lacus quis dolor. Praesent id justo in neque elementum ultrices. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. In convallis. Fusce suscipit libero eget elit. Praesent vitae arcu tempor neque lacinia pretium. Morbi imperdiet, mauris ac auctor dictum, nisl ligula egestas nulla, et sollicitudin sem purus in lacus.",
        materiaCompleta:
          "Maecenas ipsum velit, consectetuer eu, lobortis ut, dictum at, dui. In rutrum. Sed ac dolor sit amet purus malesuada congue. In laoreet, magna id viverra tincidunt, sem odio bibendum justo, vel imperdiet sapien wisi sed libero. Suspendisse sagittis ultrices augue. Mauris metus. Nunc dapibus tortor vel mi dapibus sollicitudin. Etiam posuere lacus quis dolor. Praesent id justo in neque elementum ultrices. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. In convallis. Fusce suscipit libero eget elit. Praesent vitae arcu tempor neque lacinia pretium. Morbi imperdiet, mauris ac auctor dictum, nisl ligula egestas nulla, et sollicitudin sem purus in lacus.Maecenas ipsum velit, consectetuer eu, lobortis ut, dictum at, dui. In rutrum. Sed ac dolor sit amet purus malesuada congue. In laoreet, magna id viverra tincidunt, sem odio bibendum justo, vel imperdiet sapien wisi sed libero. Suspendisse sagittis ultrices augue. Mauris metus. Nunc dapibus tortor vel mi dapibus sollicitudin. Etiam posuere lacus quis dolor. Praesent id justo in neque elementum ultrices. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. In convallis. Fusce suscipit libero eget elit. Praesent vitae arcu tempor neque lacinia pretium. Morbi imperdiet, mauris ac auctor dictum, nisl ligula egestas nulla, et sollicitudin sem purus in lacus.Maecenas ipsum velit, consectetuer eu, lobortis ut, dictum at, dui. In rutrum. Sed ac dolor sit amet purus malesuada congue. In laoreet, magna id viverra tincidunt, sem odio bibendum justo, vel imperdiet sapien wisi sed libero. Suspendisse sagittis ultrices augue. Mauris metus. Nunc dapibus tortor vel mi dapibus sollicitudin. Etiam posuere lacus quis dolor. Praesent id justo in neque elementum ultrices. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. In convallis. Fusce suscipit libero eget elit. Praesent vitae arcu tempor neque lacinia pretium. Morbi imperdiet, mauris ac auctor dictum, nisl ligula egestas nulla, et sollicitudin sem purus in lacus.Maecenas ipsum velit, consectetuer eu, lobortis ut, dictum at, dui. In rutrum. Sed ac dolor sit amet purus malesuada congue. In laoreet, magna id viverra tincidunt, sem odio bibendum justo, vel imperdiet sapien wisi sed libero. Suspendisse sagittis ultrices augue. Mauris metus. Nunc dapibus tortor vel mi dapibus sollicitudin. Etiam posuere lacus quis dolor. Praesent id justo in neque elementum ultrices. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. In convallis. Fusce suscipit libero eget elit. Praesent vitae arcu tempor neque lacinia pretium. Morbi imperdiet, mauris ac auctor dictum, nisl ligula egestas nulla, et sollicitudin sem purus in lacus.Maecenas ipsum velit, consectetuer eu, lobortis ut, dictum at, dui. In rutrum. Sed ac dolor sit amet purus malesuada congue. In laoreet, magna id viverra tincidunt, sem odio bibendum justo, vel imperdiet sapien wisi sed libero. Suspendisse sagittis ultrices augue. Mauris metus. Nunc dapibus tortor vel mi dapibus sollicitudin. Etiam posuere lacus quis dolor. Praesent id justo in neque elementum ultrices. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. In convallis. Fusce suscipit libero eget elit. Praesent vitae arcu tempor neque lacinia pretium. Morbi imperdiet, mauris ac auctor dictum, nisl ligula egestas nulla, et sollicitudin sem purus in lacus.",
        fotos: [
          "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRGN29TOR6DHBM9eO-a-ST7_moemdvpRWMJehgraNI9a6qvGHvX",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ8xnHHVxLRnXmaUCJKmANZZWL2sHVo9d5yW3Yu_j5y2G17Sap4",
          "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQU50c9Hw7jfLsaPgPt17yrCFyKidS5V5cefYmvsADw9_B3LNK2"
        ]
      };
      this.setState({ titulo: dados.titulo, materiaCompleta: dados.materiaCompleta, resumo: dados.resumo, fotos: dados.fotos });
    } else {
      var { titulo, resumo, thumbnail, num, numC, materiaCompleta, _id } = this.props.data;
      this.setState({ titulo, resumo, materiaCompleta, fotos: thumbnail, _id });
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
  enviarServidor() {
    let envio = true;
    if (!this.validaCampo()) {
      this.open("modal3")
    } else {

      if (envio) {
        this.open("modal1");
      } else
        this.open("modal2");
    }
  }

  componentWillMount() {
    this.receberDados();
  }


  handleChange(e, index) {
    e.preventDefault();
    let aux = this.state;
    aux.fotos[index] = URL.createObjectURL(e.target.files[0]);
    this.setState({ dados: aux }, console.log("State dps de editar: ", this.state))
  }

  addNewImg(e) {
    e.preventDefault();
    let aux = this.state;
    aux.fotos.push(URL.createObjectURL(e.target.files[0]));
    this.setState({ dados: aux }, () => console.log("State dps de add: ", this.state))
  }

  removerFoto(index) {
    let aux = this.state;
    aux.fotos.splice(index, 1)
    this.setState({ dados: aux }, console.log("State dps de remover: ", this.state))
  }


  render() {
    const { classes } = this.props;
    return (
      <div>
        <div>
          <Typography variant="h5" component="h2">
            {this.props.location.nome}
          </Typography>
          <Divider />
          <Typography className={classes.pos} color="textSecondary">
            {this.props.location.descricao}
          </Typography>
          <form className="App-forms">
            <div>
              <label>
                Titulo da matéria:
                <input type="text" name="nome" required value={this.state.titulo} onChange={(e) => {
                  e.preventDefault();
                  this.setState({ titulo: e.target.value })
                }} />
              </label>
            </div>
            <div>
              <label>
                Resumo:
                <br />
                <textarea required rows="8" cols="60" value={this.state.resumo} onChange={(e) => {
                  e.preventDefault();
                  this.setState({ resumo: e.target.value })
                }}></textarea>
              </label>
              <label>
                Matéria Completa:
                <br />
                <textarea required rows="12" cols="60" value={this.state.materiaCompleta} onChange={(e) => {
                  e.preventDefault();
                  this.setState({ materiaCompleta: e.target.value })
                }}></textarea>
              </label>
            </div>
            <div>
              Fotos:
                  <div>
                {
                  this.state.fotos.length == 0 ?
                    <div className={classes.fotoAlign}>
                      <label >
                        Adicionar nova foto:
                      <input type="file" name={`novoInput`} accept="imagem/*" onChange={(e) => this.addNewImg(e)} />
                      </label>
                    </div>
                    :
                    this.state.fotos.map((thumbnail, index) => {
                      if (index == this.state.fotos.length - 1) {
                        return (
                          <div key={index}>
                            <div className={classes.fotoAlign}>
                              <FontAwesomeIcon icon={faTrashAlt} size="lg" className="App-icon" onClick={() => this.removerFoto(index)} />
                              <>
                                <input type="file" name={`foto${thumbnail}`} accept="imagem/*" onChange={(e) => this.handleChange(e, index)} />
                                <img src={`${auth.baseURL}/Image/${thumbnail}`} className={classes.fotoSize} alt="" />
                              </>
                            </div>
                            <div className={classes.fotoAlign}>
                              <label >
                                Adicionar nova foto:
                      <input type="file" name={`novoInput`} accept="imagem/*" onChange={(e) => this.addNewImg(e, index)} />
                              </label>
                            </div>
                          </div>
                        );
                      } else {
                        return (
                          <div className={classes.fotoAlign} key={index}>
                            <FontAwesomeIcon icon={faTrashAlt} size="lg" className="App-icon" onClick={() => this.removerFoto(index)} />
                            <>
                              <input type="file" name={`foto${thumbnail}`} accept="imagem/*" onChange={(e) => this.handleChange(e, index)} />
                              <img src={`${auth.baseURL}/Image/${thumbnail}`} className={classes.fotoSize} alt="" />
                            </>
                          </div>
                        );
                      }
                    })}
              </div>
            </div>
          </form>
        </div>
        <div align="center" style={{ display: "flex", justifyContent: "center" }}        >
          <Button onClick={() => this.enviarServidor()} variant="contained" size="medium" className="App-Button" style={{ color: "white" }}          >
            <FontAwesomeIcon icon={faCheck} size="lg" style={{ marginRight: "10px" }} />{" "}
            Concluir
          </Button>
          <BotaoVoltar onRef={ref => (this.botaoVoltar = ref)} link="POSTAGEM BLOG" />
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
        <Modal visible={this.state.modal3} effect="modal" onClickAway={() => this.close('modal3')}>
          <div className="Modal">
            <h1 className="Modal__title">Erro</h1>
            <h4 className="Modal__data">Você deve preencher todos os campos para concluir esta ação.</h4>
            <a onClick={() => this.close('modal3')}>Ok</a>
          </div>
        </Modal>
      </div>
    );
  }
}

AddEditPostagem.propTypes = {
  classes: PropTypes.object.isRequired
};

// We need an intermediary variable for handling the recursive nesting.
const AddEditPostagemWrapped = withStyles(styles)(
  AddEditPostagem
);

export default AddEditPostagemWrapped;
