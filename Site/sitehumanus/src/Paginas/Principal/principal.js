import React from 'react';
import "./principal.css";
import NavBar from "../../Componentes/NavBar/NavBar";
import FundoLogo from "../../imagens/FundoLogoCompleto.png";
import QuemSomos from "../../Componentes/QuemSomos/index";
import Servicos from "../../Componentes/Servico/index";
import Footer from "../../Componentes/Footer/index";

function Principal() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <div>
        <img src={FundoLogo} className="fundoLogo"/>
      </div>
      <QuemSomos></QuemSomos>
      <div style={{"background-color":"#212b56", "height":"5px","marginTop":"70px"}}></div>
      <Servicos></Servicos>
      <div style={{"background-color":"#212b56", "height":"5px", "marginTop":"70px"}}></div>
      <div className="container">
           <div className="formContainer"> 
              <p>CONTATO</p>
                <form> 
                  <div className="lineontato"><label htmlfor="name">Nome: </label>
                  <input type="name" id="name" placeholder="Nome completo"/></div>
                  <div className="lineontato"><label htmlfor="Email">E-mail: </label>
                  <input type="Email" id="Email" placeholder="Seu melhor Email"/></div>
                  <div className="lineontato"><label htmlfor="Comentario">Assunto: </label>
                  <textarea  id="Comentario" className="Comentario" rows="5" cols="50" placeholder="Faça seu comentario">
                  </textarea></div>
                  <button className="btn" type="submit"><strong>Enviar</strong></button>
                </form>
            </div>
      </div>
      
      <div className="TextoMapa">
      

        <div className="Textos">
          <p className="localizaçao" >Localização:</p>
          <p className="endereço2"> Av Dom Antonio, n°2100, Assis CPPA </p>
            <p className="cep"> CEP: 19806-173</p>
            <p className="telefone2">Tel: (18) 3302-5915</p>
          
        </div>
        <iframe className="mapa"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3682.152824389586!2d-50.43616008549995!3d-22.64808998514402!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9495397733797ebf%3A0xa09bb8fb9160d747!2sAv.%20Dom%20Ant%C3%B4nio%20-%20Jardim%20Parana%2C%20Assis%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1571864835766!5m2!1spt-BR!2sbr"
          
          allowfullscreen=""
        ></iframe>
            </div>
      <Footer></Footer>

    </div>
  );
}

export default Principal;

/*

*/
