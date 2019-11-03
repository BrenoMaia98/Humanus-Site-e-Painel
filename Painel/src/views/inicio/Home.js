import React from 'react';

import { } from "react-router-dom";

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div>
                <h1>Bem vindo ao Painel de Administrador do site Humanus</h1>
                <h1>Clique em umas das guias ao lado para alterar informações do site.</h1>
            </div>
        );
    }

}

export default Home;