import React from "react";
import BotaoAdicionar from "../../components/BotaoAdicionar";
import BotaoVoltar from "../../components/BotaoVoltar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { ServicoProjetoTemp } from "./ServicoProjetoTemp";
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
    padding:"20px",
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
      dados: { titulo: "", resumo: "", materiaCompleta: "", fotos:[] }
    };
    this.handleChange = this.handleChange.bind(this);
  }

  validaCampo() {
    if (
      this.state.nome === "" ||
      this.state.nome === null ||
      this.state.nome === undefined ||
      this.state.imagem === "" ||
      this.state.imagem === null ||
      this.state.imagem === undefined ||
      this.state.condicoes_pagamento === "" ||
      this.state.condicoes_pagamento === null ||
      this.state.condicoes_pagamento === undefined
    )
      return false;
    else return true;
  }

  getInfo() {
    /*await axios.post('http://74.117.156.74:5012/ServicosProjetos/delete', {'id': index},auth.config).then(
           (resp) =>  this.setState(dados:resp.data)
        )*/
    const dados = {
      titulo: "",
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
    this.setState({ dados });
  }
  handleChange(e,index){
      e.preventDefault();
      let aux = this.state.dados;
      aux.fotos[index] = URL.createObjectURL(e.target.files[0]);
      this.setState({dados:aux},console.log("State dps de editar: ",this.state))
  }
  addNewImg(e){
    e.preventDefault();
    let aux = this.state.dados;
    aux.fotos.push(URL.createObjectURL(e.target.files[0]));
    this.setState({dados:aux},() => console.log("State dps de add: ",this.state))
  }
  removerFoto(index){
    let aux = this.state.dados;
    aux.fotos.splice(index,1)
    this.setState({dados:aux},console.log("State dps de remover: ",this.state))
  }
  componentWillMount(){
    this.getInfo();
}
  render() {
    console.log(this.props);
    const { classes } = this.props;
    return (
      <div>
        <div>
          <Typography variant="h5" component="h2">
            {this.props.nome}
          </Typography>
          <Divider />
          <Typography className={classes.pos} color="textSecondary">
            {this.props.descricao}
          </Typography>
          <form className="App-forms">
            <div>
              <label>
                Titulo da matéria:
                <input
                  type="text"
                  name="nome"
                  required
                  defaultValue={this.state.nome}
                />
              </label>
            </div>
            <div>
              <label>
                Resumo:
                <br />
                <textarea
                  rows="8"
                  cols="60"
                  value={this.state.condicoes_pagamento}
                ></textarea>
              </label>
              <label>
                Matéria Completa:
                <br />
                <textarea
                  rows="12"
                  cols="60"
                  value={this.state.condicoes_pagamento}
                  ></textarea>
              </label>
            </div>
            <div>
                Fotos:
                  <div>

                {
                this.state.dados.fotos.length == 0 ?
                <div className={classes.fotoAlign}>
                      <label >
                            Adicionar nova foto:
                      <input
                        type="file"
                        name={`novoInput`}
                        accept="imagem/*"
                        onChange={(e) => this.addNewImg(e)}
                        />
                        </label>
                    </div>
                :

                this.state.dados.fotos.map((resp, index) => {
                    if(index == this.state.dados.fotos.length-1){
                        return(
                            <>
                           
                    <div className={classes.fotoAlign}>
                        
<FontAwesomeIcon icon={faTrashAlt} size="lg" className="App-icon" onClick={() => this.removerFoto(index)}/>
<>
                    <input
                      type="file"
                      name={`foto${resp}`}
                      accept="imagem/*"
                      onChange={(e) => this.handleChange(e,index)}
                      />
                    <img src={resp} className={classes.fotoSize} alt="" />
                    </>
                  </div>
                  <div className={classes.fotoAlign}>
                      <label >
                            Adicionar nova foto:
                      <input
                        type="file"
                        name={`novoInput`}
                        accept="imagem/*"
                        onChange={(e) => this.addNewImg(e,index)}
                        />
                        </label>
                    </div>
                  </>
                        );
                    }else{
                        
                        return (
                            <div className={classes.fotoAlign}>

<FontAwesomeIcon icon={faTrashAlt} size="lg" className="App-icon" onClick={() => this.removerFoto(index)}/>
<>
                      <input
                        type="file"
                        name={`foto${resp}`}
                        accept="imagem/*"
                        onChange={(e) => this.handleChange(e,index)}
                        />
                      <img src={resp} className={classes.fotoSize} alt="" />
                    </>
                    </div>
                  );
                }
            })}
        </div>
            </div>
          </form>
        </div>
        <div
          align="center"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Button
            onClick={() => this.adicionarPacote()}
            variant="contained"
            size="medium"
            className="App-Button"
            style={{ color: "white" }}
          >
            <FontAwesomeIcon
              icon={faCheck}
              size="lg"
              style={{ marginRight: "10px" }}
            />{" "}
            Concluir
          </Button>
          <BotaoVoltar
            onRef={ref => (this.botaoVoltar = ref)}
            link="SERVIÇOS E PROJETOS"
          />
        </div>
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
