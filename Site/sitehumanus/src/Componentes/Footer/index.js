import React from 'react';
import './style.css'
import WhatsApp2 from '../../imagens/Whatsapp.png'
import Twitter2 from '../../imagens/Twitter.png'
import Facebook2 from '../../imagens/Facebook.png'
import instagram2 from '../../imagens/Instagram.png'
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
            <div className="container body-content">
                <footer className="footer">
                    <div className="Icones">
                        <a href={`https://wa.me/${this.state.numWhats}?text=Olá, gostaria de entrar em contato com vocês!`} target="_blank"><img src={WhatsApp2} className="WhatsApp" /> </a>
                        <a href="https://www.instagram.com/humanus_ej/?hl=pt-br" target="_blank"><img src={instagram2} className="instagram" /> </a>
                        <a href="https://twitter.com/humanusjr" target="_blank"><img src={Twitter2} className="Twitter" /></a>
                        <a href="https://www.facebook.com/HumanusEJ/?__tn__=%2Cd%2CP-R&eid=ARBhe7mEjvAeXMNEZNds0zW-o9R92IWueMVWQh6s2-Ij2FVxYUR3x-GGQc8LlOmV-bDR3R7Q1okOFaF2" target="_blank"><img src={Facebook2} className="Facebook" /></a>
                    </div>
                    <div className="Texto">
                        <p>Tel:(18) 3302-5915 <br></br>
                        CEP: 19806-173  <br></br>
                        Av Dom Antonio, n°2100, Assis (CPPA)</p>
                    </div>
                    <div className="TextoBaixo">
                        <p>Desenvolvido por EJCOMP - © Empresa Junior de Computação</p>
                    </div>
                </footer>
            </div>
        );
    }
}

