import React from 'react';
import BotaoAdicionar from '../../components/BotaoAdicionar'
import CostumizedTable from '../../components/CostumizedTable';

import { NavLink } from "react-router-dom";

class PromoTable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div>
                <CostumizedTable textAlign="center" style={{ margin: "0 auto;" }} />
                <NavLink to={{
                             pathname:"/promocoes/adc", 
                             aboutProps:{
                                nome: "Adicionar Promoção", 
                                descricao: "Inisira os dados necessários e clique em concluir para finalizar.",
                                edicao: false
                            }}} >
                    <BotaoAdicionar nome="Promoções" />
                </NavLink>
                
            </div>

        );
    }

}

export default PromoTable;