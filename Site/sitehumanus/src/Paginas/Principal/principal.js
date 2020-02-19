import React, { useState, useEffect } from 'react';
import "./principal.css";
import NavBar from "../../Componentes/NavBar/NavBar";
import FundoLogo from "../../imagens/FundoLogoCompleto.png";
import LogoCompleto from "../../imagens/LogoCompleto.png";
import FundoSemLogo from "../../imagens/FundoSemLogo.png";
import QuemSomos from "../../Componentes/QuemSomos/index";
import Servicos from "../../Componentes/Servico/index";
import Footer from "../../Componentes/Footer/index";
import Divisao from '../../Componentes/Divisao/divisao';
import SemImagem from '../../imagens/semImagem.png'

import { auth } from "../../auth";
import axios from 'axios';

function Principal() {
  const imgNotFound = SemImagem;
  const [Logo, setLogo] = useState(imgNotFound);
  const [Email, setEmail] = useState("teste123@gmail.com.br");
  const [Carregado, setCarregado] = useState(false);
  const [Erro, setErro] = useState(false);

  useEffect(() => {
    axios.get(`${auth.baseURL}/Logo/index/Completo`)
      .then(

        Completo => setLogo(`${auth.baseURL}/Image/${Completo.data.logo.thumbnail}`))

      .catch(e => { setErro(true); console.log("Erro de conexão: ", e); })
      .finally(

        axios.get(`${auth.baseURL}/Email/show`, {})
          .then(

            resp => {
              if (!resp.data.isError) setEmail(resp.data.email)
              else setErro(true)
            }

          ).catch(e => { setErro(true); console.log("Erro de conexão: ", e); })
          .finally(setCarregado(true))
      )
  }, []);

  return (
    <div className="App">
      <NavBar></NavBar>

      <div className="divLogo" id="topo">
        <img src={FundoSemLogo} className="fundoLogo" />
        <div className="fundoLogo2">
          <div className="box top"></div>

          <img src={Logo} className="img2" />

          <div className="box bottom"></div>
        </div>
      </div>

      <div className="primeiraBarra" id="QuemSomos"></div>

      <div >
        <QuemSomos></QuemSomos>
      </div>

      <Divisao type="NMargin"></Divisao>

      <div id="ServicosProjetos">
        <Servicos></Servicos>
      </div>

      <Divisao type="2"></Divisao>


      <div className="container" id="contato">
        <div className="formContainer">
          <p>CONTATO</p>
          <form method="POST" action={`https://formspree.io/${Email}`}>
            <div className="lineontato"><label htmlFor="name">Nome: </label>
              <input name="name" type="name" id="name" placeholder="Nome completo" /></div>
            <div className="lineontato"><label htmlFor="Email">E-mail: </label>
              <input name="_cc" type="Email" id="Email" placeholder="Seu melhor Email" /></div>
            <div className="lineontato"><label htmlFor="Email">Assunto: </label>
              <input name="_subject" id="Email" placeholder="Assunto do email" /></div>
            <div className="lineontato"><label htmlFor="Comentario">Comentário: </label>
              <textarea name="message" id="Comentario" className="Comentario" rows="5" cols="50" placeholder="Faça seu comentario">
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
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3682.170600858988!2d-50.44049668425479!3d-22.64742703436298!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDM4JzUwLjgiUyA1MMKwMjYnMTcuOSJX!5e0!3m2!1spt-PT!2sbr!4v1575923822428!5m2!1spt-PT!2sbr"
        ></iframe>
      </div>
      <Footer></Footer>

    </div>
  );
}

export default Principal;

/*

*/
