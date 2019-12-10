import React, { Component } from 'react';
import './materia.css';

export default class SemFoto extends Component {
  constructor(props) {
    super(props)
    this.state = {
      titulo: this.props.titulo,
      data: this.props.data,
      resumo: this.props.resumo,
      completo: this.props.completo,
      img: this.props.img,
      imgs: this.props.imgs,
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
        <div className="containerTituloCentro">
          <p className=" textBlogStyle tituloCentro">{this.state.titulo}</p>
          <p className=" textBlogStyle dataCentro">{this.state.data}</p>
        </div>
        <div>
          {this.state.show ?
            this.state.completo.map((e, index) => {
              return <p key={index} className="textBlogStyle">{e}</p>
            }) :
            this.state.resumo.map((e, index) => {
              return <p key={index} className="textBlogStyle">{e}</p>
            })
          }
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