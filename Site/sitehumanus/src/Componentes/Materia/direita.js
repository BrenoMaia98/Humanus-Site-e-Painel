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
      imgs: this.props.imgs,
      show: false,
    }
  }


  render() {

    return (
      <div className="containerMateria">
        <br />

        <div className="containerTituloDireita">
          <p className="textBlogStyle tituloDireita">{this.state.titulo}</p>
          <p className="textBlogStyle dataDireita">{this.state.data}</p>
        </div>
        <div>
          <div className="flexImage">
            <img src={this.state.img} className="imgDireita"></img>
            <br></br>
            <div className="botaoPostagem">
              <button onClick={(evento) => { evento.preventDefault(); }}>
                Ver mais fotos
              </button>
            </div>
          </div>
          <p className="textBlogStyle" id="show" className="resumo">{this.state.show ? this.state.completo : this.state.resumo}</p>
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