import React from 'react';
import './style.css'
import logo from '../../imagens/LogoCompleto.png'
    
export default function NavBar(){

    return(
        <div className="fundo">
            <img src={logo} className="logo"/>
            <ul className="menu">
                <li>HOME</li>
                <li>EMPRESA</li>
                <li>SERVIÇOS E PROJETOS</li>
                <li>BLOG</li>
                <li>CONTATO</li>
            </ul>
        </div>
    );
}