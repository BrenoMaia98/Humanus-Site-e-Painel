import React from "react";
import BotaoAdicionar from "../../components/BotaoAdicionar";
import BotaoVoltar from "../../components/BotaoVoltar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../components/modal/index";
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

class AddEditServicosProjetos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titulo: "",
      descricao: "",
      descricaoItem: "",
      modal1: false,
      modal2: false,
      modal3: false,
      isErrormsg:"Ocorreu um erro na conexão, por favor tente mais tarde, caso o erro persista, contate a empresa EJCOMP.",
    };
    this.enviarServidor = this.enviarServidor.bind(this);
    this.validaCampo = this.validaCampo.bind(this);
  }

  validaCampo() {
    if (
      this.state.titulo === "" ||
      this.state.titulo === null ||
      this.state.titulo === undefined ||
      this.state.descricaoItem === "" ||
      this.state.descricaoItem === null ||
      this.state.descricaoItem === undefined
    )
      return false;
    else return true;
  }

  receberDados() {
    if (this.props.location.tipo === "add") {
      const dados = {
        titulo: "",
        descricao:"",
      };
      this.setState({
        titulo: dados.titulo,
        descricaoItem: dados.descricao,
      });
    }else{
      this.setState({
        titulo: this.props.location.titulo,
        descricaoItem: this.props.location.descricaoItem,
      });
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
    
    let resp = null;
    if (!this.validaCampo()) {
      this.open("modal3")
    } else {
      if(this.props.location.tipo !== "edit"){
         resp = await axios.post(`${auth.baseURL}/ServicosProjetos/create`,        {
          titulo: this.state.titulo,
          descricao: this.state.descricaoItem,
        }
        )
      }else{
         resp = await axios.put(`${auth.baseURL}/ServicosProjetos/update`,        {
          titulo: this.state.titulo,
          descricao: this.state.descricaoItem,
          _id:this.props.location._id,
        }
        )
      }
      if (!resp.data.isError) {
        this.open("modal1");
      } else{
        this.setState({isErrorMsg:resp.data.message})
        this.open("modal2");
      }
    }
  }

  componentDidMount() {
    this.receberDados();
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
                Titulo do serviço:
                <input
                  type="text" name="nome" required defaultValue={this.state.titulo} onChange={(e) => { e.preventDefault(); this.setState({ titulo: e.target.value }) }} />
              </label>
            </div>
            <div>
              <label>
                descricao:
                <br />
                <textarea rows="8" cols="60" required value={this.state.descricaoItem} onChange={(e) => { e.preventDefault(); this.setState({ descricaoItem: e.target.value }) }}></textarea>
              </label>
            </div>
          </form>
        </div>
        <div align="center" style={{ display: "flex", justifyContent: "center" }}        >
          <Button onClick={() => this.enviarServidor()} variant="contained" size="medium" className="App-Button" style={{ color: "white" }}          >
            <FontAwesomeIcon icon={faCheck} size="lg" style={{ marginRight: "10px" }} />{" "}
            Concluir
          </Button>
          <BotaoVoltar onRef={ref => (this.botaoVoltar = ref)} link="SERVIÇOS E PROJETOS" />
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
            <h4 className="Modal__data">{this.state.isErrorMsg}</h4>
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

AddEditServicosProjetos.propTypes = {
  classes: PropTypes.object.isRequired
};

// We need an intermediary variable for handling the recursive nesting.
const AddEditServicosProjetosWrapped = withStyles(styles)(
  AddEditServicosProjetos
);

export default AddEditServicosProjetosWrapped;
