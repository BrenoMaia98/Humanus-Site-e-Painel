import React from 'react';
import './style.css'
import WhatsApp2 from '../../imagens/WhatsApp2.png'
import Twitter2 from '../../imagens/Twitter2.png'
import Facebook2 from '../../imagens/Facebook2.png'
import instagram2 from '../../imagens/instagram2.png'
import axios from 'axios';
import { auth } from '../../auth';



export default class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numWhats: "99 99 99999-9999"
        }
    }
    async componentDidMount() {
        var numWhats;
        axios.post(`${auth.baseURL}/WhatsApp/show`, {}).then(
            (response) => {
                try {

                    numWhats = response.data.numero

                    //refatorar para uma limpeza melhor da string...
                    numWhats = numWhats.split("+").join("").split(" ").join("").split("(").join("").split(")").join("").split("-").join("")
                    this.setState({ numWhats });
                } catch (e) {
                    console.log(e);
                }
            }
        )

    }

    render() {
        return (
            <div class="container body-content">
                <footer class="footer">
                    <div>
                        <ul className="Icones">
                            <li><a href={`https://wa.me/${this.state.numWhats}?text=Olá, gostaria de entrar em contato com vocês!`} target="_blank"><img src={WhatsApp2} className="WhatsApp" /> </a></li>
                            <li><a href="https://www.instagram.com/humanus_ej/?hl=pt-br" target="_blank"><img src={instagram2} className="instagram" /> </a></li>
                            <li><a href="https://twitter.com/humanusjr" target="_blank"><img src={Twitter2} className="Twitter" /></a> </li>
                            <li><a href="https://www.facebook.com/HumanusEJ/?__tn__=%2Cd%2CP-R&eid=ARBhe7mEjvAeXMNEZNds0zW-o9R92IWueMVWQh6s2-Ij2FVxYUR3x-GGQc8LlOmV-bDR3R7Q1okOFaF2" target="_blank"><img src={Facebook2} className="Facebook" /></a></li>
                        </ul>
                    </div>
                    <div className="Texto">

                        <p className="telefone">Tel:(18) 3302-5915</p>
                        <p className="CEP">CEP: 19806-173</p>
                        <p className="endereço">Av Dom Antonio, n°2100, Assis (CPPA)</p>

                        <div className="Texto2">
                            <p>Desenvolvido por EJCOMP- © Empresa Junior de Computação</p>
                        </div>
                    </div>

                </footer>
            </div>
        );
    }
}

