import React, { Component } from 'react';
import './materia.css';

export default class Direita extends Component {
  constructor(props) {
    super(props)
    this.state = {
      titulo: this.props.titulo,
      data: this.props.data,
      resumo: this.props.resumo,
      completo: this.props.completo,
      img: this.props.img,
      show: false,
    }
  }
  componentWillReceiveProps(props) {
    var { titulo, data, resumo, completo, img, imgs } = props;
    this.setState({ titulo, data, resumo, completo, img, imgs });
  }


  render() {

    return (
      <div className="containerMateria">
        <br />

        <div className="containerTituloDireita">
          <p className="textBlogStyle tituloDireita">{this.state.titulo}</p>
          <p className="textBlogStyle dataDireita">Criado em: {this.state.data}</p>
        </div>
        <div>
          <div className="flexImage">
            <img src={this.state.img} className="imgDireita"></img>
            <br></br>
            <div className="botaoPostagem">
              <button className="btnVerMaisFotosDireita" onClick={(evento) => { evento.preventDefault(); this.props.showModal() }}>
                Ver mais fotos
              </button>
            </div>
          </div>
          <div id="show" className="resumo">
            {this.state.show ?
              this.state.completo.map((e, index) => {
                return <p key={index} className="textBlogStyle">{e}</p>
              }) :
              this.state.resumo.map((e,index) => {
                return <p key={index} className="textBlogStyle">{e}</p>
              })
            }
          </div>
        </div>
        <p className="btnShowMore" onClick={
          () => {
            var element = document.getElementById("show");
            if (!this.state.show) {
              element.classList.remove("resumo");
              element.classList.add("completo");
            } else {
              element.classList.remove("completo");
              element.classList.add("resumo");
            }
            this.setState({
              show: !this.state.show
            }
            )
          }} >{this.state.show ? "Mostrar Menos" : "Mostrar Mais"}</p>

      </div>

    )
  }
}