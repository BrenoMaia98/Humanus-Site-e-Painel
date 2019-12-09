import React from "react";

import { Pagination } from "antd";

import "./blog.css";
import Picker from "../../Componentes/Picker/picker";
import Divisao from "../../Componentes/Divisao/divisao";
import Direita from "../../Componentes/Materia/direita";
import Esquerda from "../../Componentes/Materia/esquerda";
import SemFoto from "../../Componentes/Materia/semFoto";
import NavBar from "../../Componentes/NavBar/NavBar";
import Footer from "../../Componentes/Footer";
import { auth } from "../../auth";
import axios from "axios"
import Slider from '../../Componentes/Slider/slider';
import RenderPostagem from "../../Componentes/Materia/renderPostagem";

const Categorias = [
  { id: 0, categoria: "Projetos" },
  { id: 1, categoria: "Eventos" },
  { id: 2, categoria: "Dicas" },
  { id: 3, categoria: "Gestão de Pessoas" },
  { id: 4, categoria: "MEJ" },
  { id: 5, categoria: "Psicologia Organizacional" },
  { id: 6, categoria: "Pesquisa de Clima Organizacional" },
  { id: 7, categoria: "Recrutamento e Seleção" },
  { id: 8, categoria: "Treinamento" },
  { id: 9, categoria: "Análise e descrição de cargos" },
  { id: 10, categoria: "Orientação Profissional" },
  { id: 11, categoria: "Diagnóstico Organizacional" }
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      carregado: false,
      postagens: [],
      postagensAtuais: [],
      postagensPorPagina: 2,
      openSlider: false,
    };
  }

  recebeDados = async () => {
    const ArrayPostagens = await axios.get(`${auth.baseURL}/Postagem/all`);
    this.setState({
      postagens: ArrayPostagens.data,
      ladoFotoPostagem: "direita"
    });
  }

  getPostagens = (paginaAtual) => {
    console.log(paginaAtual);
    var { postagensPorPagina, postagens } = this.state;
    let indexDaUltimaPostagem = paginaAtual * postagensPorPagina;
    let indexDaPrimeiraPostagem = indexDaUltimaPostagem - postagensPorPagina;
    let postagensAtuais = postagens.slice(
      indexDaPrimeiraPostagem,
      indexDaUltimaPostagem
    );
    //console.log("Antes : ",this.state.postagensAtuais)
    //console.log("DPS : ",postagensAtuais)
    this.setState({
      postagensAtuais,
      carregado: true,
    });
  }

  handlePageChange = (page, pageSize) => {
    this.setState({
      paginaAtual: page
    });
    this.getPostagens(page);
    window.scrollTo(0, 25);
  }

  openModal = (arrayImg) => {
    let aux = [];
    if (arrayImg !== undefined) {
      arrayImg.forEach(element => {
        aux.push(`${auth.baseURL}/Image/${element}`);
      });
      this.setState({
        images: aux,
        openSlider: true
      });
    } else {
      this.setState({
        images: [],
      });
      alert("Sinto muito houve um erro ao carregar as imagens")
    }

  }

  closeModal = () => {
    this.setState({
      openSlider: false
    });
  }
  dataFormat = (data) => {
    let aux = new Date(data);
    return `${aux.getDate()}/${aux.getMonth()}/${aux.getFullYear()}`;
  }

  async componentWillMount() {
    await this.recebeDados();
    await this.getPostagens(1);
  }

  render() {
    return (
      <div>
        <div >
          <NavBar></NavBar>
          {/* <div className="BlogContainerPrincipal">
            <p className="tituloPicker">Filtro de Postagens</p>
            <Picker data={Categorias}></Picker>
          </div> */}
          <div className="containerPostagensBlog">
            <RenderPostagem
              openModal={this.openModal}
              postagensAtuais={this.state.postagensAtuais} />
          </div>
        </div>

        <br></br>
        <div className="botaoPostagem">
          {
            this.state.postagens !== undefined && this.state.postagens !== [] && this.state.carregado &&
            <Pagination
              onChange={this.handlePageChange}
              defaultCurrent={1}
              pageSize={this.state.postagensPorPagina}
              total={this.state.postagens.length}
              style={{ zIndex: 10 }}
            />
          }
        </div>

        {this.state.carregado &&
          <Footer></Footer>
        }
        <Slider
          closeModal={this.closeModal}
          isOpen={this.state.openSlider}
          images={this.state.images}
        ></Slider>


      </div>
    );
  }
}

export default App;
