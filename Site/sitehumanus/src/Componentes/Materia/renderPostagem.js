import React from "react";


import Divisao from "../../Componentes/Divisao/divisao";
import Direita from "../../Componentes/Materia/direita";
import Esquerda from "../../Componentes/Materia/esquerda";
import SemFoto from "../../Componentes/Materia/semFoto";

import { auth } from "../../auth";
import Slider from '../../Componentes/Slider/slider';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imagens: [],
        };
    }


    dataFormat = (data) => {
        let aux = new Date(data);
        return `${aux.getDate()}/${aux.getMonth()}/${aux.getFullYear()}`;
    }


    render() {
        var ladoFotoPostagem = "direita";

        return (
            <div>
                <div className="containerPostagensBlog">
                    {
                        this.props.postagensAtuais.map((atual, index) => {
                            if (atual.img === null) {
                                return (
                                    <div>
                                        <SemFoto
                                            titulo={atual.titulo}
                                            data={`${atual.data.getDate()}/${atual.data.getMonth()}/${atual.data.getFullYear()}`}
                                            resumo={atual.resumo.split("\n")}
                                            completo={atual.materiaCompleta.split("\n")}
                                        ></SemFoto>
                                        <Divisao></Divisao>
                                    </div>
                                );
                            } else {
                                if (ladoFotoPostagem === "direita") {
                                    ladoFotoPostagem = "esquerda";
                                    return (
                                        <div>
                                            <Direita
                                                titulo={atual.titulo}
                                                data={this.dataFormat(atual.data)}
                                                img={`${auth.baseURL}/Image/${atual.thumbnail[0]}`}
                                                resumo={atual.resumo.split("\n")}
                                                completo={atual.materiaCompleta.split("\n")}
                                                showModal={() => this.props.openModal(atual.thumbnail)}
                                            ></Direita>
                                            <Divisao></Divisao>
                                        </div>
                                    );
                                } else {
                                    ladoFotoPostagem = "direita";
                                    return (
                                        <div>
                                            <Esquerda
                                                titulo={atual.titulo}
                                                data={this.dataFormat(atual.data)}
                                                img={`${auth.baseURL}/Image/${atual.thumbnail[0]}`}
                                                resumo={atual.resumo.split("\n")}
                                                completo={atual.materiaCompleta.split("\n")}
                                                showModal={() => this.openModal(atual.thumbnail)}
                                            ></Esquerda>
                                            <Divisao></Divisao>
                                        </div>
                                    );
                                }
                            }
                        })}
                </div>
            </div>
        );
    }
}

export default App;
