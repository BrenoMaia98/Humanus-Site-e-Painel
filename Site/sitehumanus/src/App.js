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
    </div>
  );
}

export default App;

/*
      
*/