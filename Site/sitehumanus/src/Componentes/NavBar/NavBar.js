import React from 'react';
import './style.css'
import logo from '../../imagens/LogoCompleto.png'

export  default function NavBar(){

    return(
    <div className="fundo">
        <img src={logo} className="logo"/>
        <ul className="menu">
            <li><strong>HOME</strong></li>
            <li><strong>EMPRESA</strong></li>
            <li><strong>SERVIÇOS E PROJETOS</strong></li>
            <li><strong>BLOG</strong></li>
            <li><strong>CONTATO</strong></li>
        </ul>

       
    </div>
    )
}