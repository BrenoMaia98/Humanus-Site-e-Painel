import React from 'react';
import imgGestao from '../../imagens/imgGestao.jpeg';
import './style.css';


import axios from 'axios';
import { auth } from '../../auth';



export default class quemSomos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            img: "http://www.bonfanti.ind.br/igc/uploadAr/FileProcessingScripts/PHP/UploadedFiles/thumbs/semImagem.png"
        }
    }
    async componentDidMount() {

        axios.get(`${auth.baseURL}/Gestao/index`, {}).then(
            (response1) => {
                this.setState({ img: `${auth.baseURL}/Image/${response1.data.fotoGestao.thumbnail}` })
            }).catch((e) => { console.log(e) })
    }

    render() {
        return (
            <>
                <div className="Titulo">
                    <p> QUEM SOMOS ?</p>
                </div>
                <img src={this.state.img} className="foto" />
                <div className="conteudo">
                    <p>Fundada em 23 de Maio de 1997, a Humanus Empresa Júnior é uma associação
                        civil sem fins lucrativos, constituída por alunos de graduação do curso de
                        Psicologia da Unesp-Assis. A empresa oferece assessoria e consultoria em
                        Psicologia.
                <br />
                        <br />
                        A iniciativa de criação e implantação da Empresa Júnior surgiu a partir do
                        interesse dos alunos em aplicar os conhecimentos adquiridos na Universidade.
                        Assim, com o apoio de professores especializados e altamente qualificados,
                        estamos prontos a atender um mercado cada vez mais exigente
                <br />
                        <br />
                        Atualmente, as relações interpessoais nas empresas são cada vez mais
                        valorizadas. Desenvolvimento de estratégias e projetos na área de Recursos
                        Humanos visam promover a melhoria das relações entre empresários e
                        colaboradores no ambiente de trabalho. Diante dessa realidade, a Humanus
                        oferece um serviço de planejamento de ações personalizado de acordo com as
                        singularidades de cada empresa, com custos abaixo dos praticados pelo
                mercado.</p>

                    <div className="containerWidth33">
                        <div className="width33">

                            <strong>Missão:</strong>
                            <ul className="none">
                                <li>Impactar e desenvolver pessoas, gerando oportunidades através de um empreendedorismo humanizado.</li>
                            </ul>
                            <ul className="none">
                            </ul>
                        </div>

                        <div className="width33">


                            <strong>Visão:</strong>
                            <ul className="none">
                                <li>Seremos referência estadual em gestão de pessoas até 2022.</li>
                            </ul>
                        </div>

                        <div className="width33">
                            <strong>Valores:</strong>
                            <ul className="none">

                                <li>Visão humanizada</li>
                                <li>Sinergia</li>
                                <li>Compromisso</li>
                                <li>Equidade</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

