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
      files: [],
      naoModificada: [],
      _id: "",
    };
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

  receberDados = () => {
    if (this.props.location.tipo !== "adc") {
      if (this.props.location.componenteProps.dados) {
        var { titulo, resumo, thumbnail, materiaCompleta, _id } = this.props.location.componenteProps.dados;
        this.setState({ titulo, resumo, materiaCompleta, naoModificada: thumbnail, fotos: thumbnail, _id });
      }
    } else {
      this.setState({ titulo: "", resumo: "", materiaCompleta: "", naoModificada: [], fotos: [], _id: "" });
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
  enviarServidor = () => {

    if (this.state.fileURL !== null) {
      let data = new Date;
      var Form1 = new FormData();
      this.state.files.forEach(e => {
        Form1.append("thumbnail", e);
      })
      Form1.append("categoria", "Geral");
      Form1.append("titulo", this.state.titulo);
      Form1.append("data", data);
      Form1.append("resumo", this.state.resumo);
      Form1.append("materiaCompleta", this.state.materiaCompleta);
      if (this.props.location.tipo === "adc") {
        axios({
          method: 'post',
          url: `${auth.baseURL}/Postagem/create`,
          data: Form1,
          headers: {
            'content-type': `multipart/form-data; boundary=${Form1._boundary}`,
          },
        }).then(resp => console.log("RESP1 : ", resp)).catch(e => console.log("ERROR1 : ", e));
      } else {
        Form1.append("_id", this.props.location.componenteProps.dados._id);
        this.state.naoModificada.forEach(e => {
          if(e.split(":")[0] !== "blob")
          Form1.append("naoModificada", e);
          if(e.split(":")[0] !== "blob")
          console.log(e)
        })
        axios({
          method: 'put',
          url: `${auth.baseURL}/Postagem/update`,
          data: Form1,
          headers: {
            'content-type': `multipart/form-data; boundary=${Form1._boundary}`,
          },
        }).then(resp => console.log("RESP1 : ", resp)).catch(e => console.log("ERROR1 : ", e));
      }
      debugger;
      console.log(Form1);
    }


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

  componentDidMount() {
    this.receberDados();
  }


  handleChange = (e, index) => {
    e.preventDefault();
    let state = {...this.state};
    state.fotos[index] = URL.createObjectURL(e.target.files[0]);
    state.files[index] = e.target.files[0];
    this.setState({ fotos: state.fotos, files: state.files, naoModificada : state.naoModificada});
  }

  isBlob = (str) => {
    let aux = str.split(":")
    return (aux[0] === "blob");
  }
  
  returnSrcImg = (thumbnail) => {
    if (this.isBlob(thumbnail))
      return thumbnail;
    else return `${auth.baseURL}/Image/${thumbnail}`;

  }

  addNewImg = (e) => {
    try{

      e.preventDefault();
      let aux = this.state;
      aux.fotos.push(URL.createObjectURL(e.target.files[0]));
      aux.files.push(e.target.files[0]);
      this.setState({ fotos: aux.fotos, files: aux.files })
    }catch(e){
      console.log(e)
    }
  }

  removerFoto(index) {
    let aux = this.state;
    aux.fotos.splice(index, 1)
    this.setState({ fotos: aux.fotos })
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
                      if (index === this.state.fotos.length - 1) {
                        return (
                          <div key={index}>
                            <div className={classes.fotoAlign}>
                              <FontAwesomeIcon icon={faTrashAlt} size="lg" className="App-icon" onClick={() => this.removerFoto(index)} />
                              <>
                                <input type="file" name={`foto${thumbnail}`} accept="imagem/*" onChange={(e) => this.handleChange(e, index)} />
                                <img src={this.returnSrcImg(thumbnail)} className={classes.fotoSize} alt="" />
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
                              <img src={this.returnSrcImg(thumbnail)} className={classes.fotoSize} alt="" />
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
