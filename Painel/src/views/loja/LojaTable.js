import React from 'react';
import BotaoAdicionar from '../../components/BotaoAdicionar'
import TableLojas from '../../components/TableLojas';

import { NavLink } from "react-router-dom";

class LojaTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div>
                <TableLojas textAlign="center" style={{ margin: "0 auto;" }} />
                <NavLink to={{
                             pathname:"/lojas/adc", 
                             lojaProps:{
                                nome: "Adicionar Loja", 
                                descricao: "Inisira os dados e clique em concluir para finalizar.",
                                edicao: false
                            }}} >
                    <BotaoAdicionar nome="Lojas" />
                </NavLink>
            </div>

        );
    }

}

export default LojaTable;