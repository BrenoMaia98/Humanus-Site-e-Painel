import React from 'react';
import './App.css';
import NavBar from './Componentes/NavBar/NavBar';
import FundoLogo from './imagens/FundoLogoCompleto.png';

import QuemSomos from './Componentes/QuemSomos/index'
import Servicos from './Componentes/Servico/index'

function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <div>
        <img src={FundoLogo} className="fundoLogo"/>
      </div>
      <QuemSomos></QuemSomos>
      <Servicos></Servicos>
      <div className="container">
           <div className="content"> 
              <p><strong>Contato</strong></p>
                <form> 
                  <p><label htmlfor="nome">Nome: </label>
                  <input type="nome" id="nome" placeholder="Nome completo"/></p>
                  <p><label htmlfor="email">E-mail: </label>
                  <input type="email" id="email" placeholder="Seu melhor email"/></p>
                  <p><label htmlfor="comentario">Assunto: </label>
                  <input type="comentario" id="comentario" placeholder="Faça seu comentário"/></p>
                  <button className="btn" type="submit">Enviar</button>
                </form>
            </div>
      </div>












    </div>
  );
}

export default App;

/*
      
*/