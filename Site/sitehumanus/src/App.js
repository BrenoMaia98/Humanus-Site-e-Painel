import React from 'react';
import './App.css';
import NavBar from './Componentes/NavBar/NavBar';
import FundoLogo from './imagens/FundoLogoCompleto.png';

import QuemSomos from './Componentes/QuemSomos/index'
import Servicos from './Componentes/Servico/index'
import Footer from "./Componentes/Footer/index";


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
              <p>CONTATO</p>
                <form> 
                  <p><label htmlfor="nome">Nome: </label>
                  <input type="nome" id="nome" placeholder="Nome completo"/></p>
                  <p><label htmlfor="email">E-mail: </label>
                  <input type="email" id="email" placeholder="Seu melhor email"/></p>
                  <p><label htmlfor="comentario">Assunto: </label>
                  <input type="comentario" id="comentario" placeholder="Faça seu comentário"/></p>
                  <button className="btn" type="submit"><strong>Enviar</strong></button>
                </form>
            </div>
      </div>
      <div style={{"display":"flex"}}>
        <div style={{ "width": "20%", "marginLeft":"auto" }}>
          <p style={{"textAlign":"center","marginBottom":"10px","color":"#212b56" ,"fontSize":"25px","marginRight":"40%","font-family": "Bebas"}}>Localização:</p>
          <p style={{"marginBottom":"7px","color":"#212b56","font-family": "CapitalAlegreya","font-weight":"normal","font-style":"normal"}}> Av Dom Antonio, n°2100, Assis CPPA </p>
            <p style={{"marginBottom":"7px","color":"#212b56","font-family": "CapitalAlegreya","font-weight":"normal","font-style":"normal"}}> CEP: 19806-173</p>
            <p style={{"marginBottom":"7px","color":"#212b56","font-family": "CapitalAlegreya","font-weight":"normal","font-style":"normal"}}>Tel: (18) 3302-5915</p>
          
        </div>

      <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3682.152824389586!2d-50.43616008549995!3d-22.64808998514402!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9495397733797ebf%3A0xa09bb8fb9160d747!2sAv.%20Dom%20Ant%C3%B4nio%20-%20Jardim%20Parana%2C%20Assis%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1571864835766!5m2!1spt-BR!2sbr"
          style={{
            "border": "0px",
            "width": "50%",
            "height":"50%",
            
            "marginRight":"auto",
            "marginBottom":"10px"
          }}
          allowfullscreen=""
        ></iframe>
      </div>
      <Footer></Footer>










    </div>
  );
}

export default App;

/*
      
*/