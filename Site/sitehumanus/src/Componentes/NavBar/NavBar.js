import React, { useRef } from 'react';
import './style.css'
import { HashLink as HashLink } from 'react-router-hash-link';


export default class NavBar extends React.Component {
    render() {
        return (
            <div className="fundo">
                <ul className="menu">
                    <HashLink to={"/home#topo"}>
                        <li className="white">HOME</li>
                    </HashLink>
                    <HashLink to={"/home#QuemSomos"}>
                        <li className="white">EMPRESA</li>
                    </HashLink>
                    <HashLink to={"/home#ServicosProjetos"}>
                        <li className="white">SERVIÇOS E PROJETOS</li>
                    </HashLink>
                    <HashLink to={"/blog"}>
                        <li className="white">BLOG</li>
                    </HashLink>
                    <HashLink to={"/home#contato"}>
                        <li className="white">CONTATO</li>
                    </HashLink>
                </ul>
            </div>
        );
    }
}