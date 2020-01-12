import React from 'react';
import './style.css';
import CardSP from '../CardSP/index';
import axios from 'axios';
import { auth } from '../../auth';



export default class Servicos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardInfo: [],
      erro: false,
    }
  }
  async componentDidMount() {
    try {
      let response = await axios.get(`${auth.baseURL}/ServicosProjetos/list`, {})
      this.setState({ cardInfo: response.data });
    } catch (erro) {
      this.setState({ erro: true })
    }
  }

  render() {
    return (
      <>
        <h1 style={{ "color": "#212b56", "textAlign": "center", "marginBottom": "45px", "marginTop": "50px", "marginBottom": "5px", "fontFamily": "Bebas", "fontSize": "45px" }}>Serviços e Projetos</h1>
        <div className="containerServicos">
          {!this.state.erro ?
            this.state.cardInfo.map((atual, index) => (
              <CardSP key={index} titulo={atual.titulo} descricao={atual.descricao} />
            ))
            :
            <>
              <h3 style={{ fontFamily: "Bebas", fontSize: "1.7em", textAlign: "center", color: "red" }}>Ocorreu um erro com de conexão com o servidor.</h3>
              <br />
              <h3 style={{ fontFamily: "Bebas", fontSize: "1.7em", textAlign: "center", color: "red" }}>Por favor contate a empresa para mais detalhes.</h3>
            </>
          }
        </div>
      </>
    );
  }
}

