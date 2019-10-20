import React from 'react';
import './style.css'

    
export default function NavBar(){

    return(
        <div className="fundo">
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