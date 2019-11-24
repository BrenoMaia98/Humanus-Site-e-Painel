import React from 'react'
import BotaoAdicionar from '../../components/BotaoAdicionar'
import BotaoCarregarMais from '../../components/BotaoCarregarMais'

import { NavLink } from "react-router-dom";
import TablePostagemBlog from '../../components/TablePostagemBlog';
class Brindes extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div>
                <TablePostagemBlog />
                <BotaoCarregarMais nome="Carregar Mais" />
                <NavLink to={{
                    pathname: "/POSTAGEM BLOG/adc",
                    nome: "Adição de uma Postagem para o Blog",
                    tipo: "adc",
                    descricao: "Inisira os dados necessários e clique em concluir para finalizar."
                }} >
                    <BotaoAdicionar nome="Postagem" />
                </NavLink>
            </div >
        )
    }
}

export default Brindes;