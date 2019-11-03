import React from 'react'
import BotaoAdicionar from '../../components/BotaoAdicionar'

import { NavLink } from "react-router-dom";
import TableBrindes from '../../components/TableBrindes';
class Brindes extends React.Component{
    constructor(props){
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div>
                <TableBrindes/>
                <NavLink to={{
                             pathname:"/POSTAGEM BLOG/adc", 
                             brindesProps:{
                                nome: "Adicionar Brinde", 
                                descricao: "Inisira os dados necessários e clique em concluir para finalizar."
                            }}} >
                    <BotaoAdicionar nome="Postagem" />
                </NavLink>
            </div>
        )
    }
}

export default Brindes;