import React from 'react';
import './App.css';
import NavBar from './Componentes/NavBar/NavBar';
import FundoLogo from './imagens/FundoLogo.png';
import Triangulo from './imagens/triangulo.png';

import QuemSomos from './Componentes/QuemSomos/index'
import Servicos from './Componentes/Servico/index'

function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <div>
        <img src={FundoLogo} className="fundoLogo"/>
        <img src={Triangulo} className="triangulo"/>
      </div>
      <QuemSomos></QuemSomos>
      <Servicos></Servicos>
    </div>
  );
}

export default App;

/*
      
*/