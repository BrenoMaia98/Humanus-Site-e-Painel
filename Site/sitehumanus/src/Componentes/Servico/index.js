import React from 'react';
import './style.css';
import CardSP from '../CardSP/index';
import axios from 'axios';
import { auth } from '../../auth';



export default class Servicos extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardInfo: []
    }
  }
  async componentDidMount() {
    axios.get(`${auth.baseURL}/ServicosProjetos/list`, {}).then(
      (response) => {
        try {
          this.setState({ cardInfo: response.data });
        } catch (e) {
          console.log(e);
        }
      }
    )
  }

  render() {
    return (
      <>
        <h1 style={{ "text-align": "center", "marginBottom": "45px", "marginTop": "50px", "marginBottom": "5px", "font-family": "Bebas", "fontSize": "45px" }}>Serviços e Projetos</h1>
        <div className="containerServicos">
          {
            this.state.cardInfo.map((atual, index) => (
              <CardSP key={index} titulo={atual.titulo} descricao={atual.descricao} />
            ))
          }
        </div>
      </>
    );
  }
}

