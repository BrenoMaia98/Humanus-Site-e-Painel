import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";

import PostagemBlog from '../../views/postagem/PostagemBlog';
import FormsPostagem from '../../views/postagem/FormsPostagem';

import ServicosProjetos from '../../views/servicosProjetos/ServicosProjetos';

import AddEditServicosProjetos from '../../views/servicosProjetos/AddEditServicosProjetos';
import AddEditPostagem from '../../views/postagem/AddEditPostagem';

import NumWhatsApp from '../../views/numWhatsApp/numWhatsApp';

import editarEmail from '../../views/editarEmail/editarEmail';

import editarFotoGestao from '../../views/editarFoto/editarFotoGestao';
import editarLogo from '../../views/editarLogo/editarLogo';

import Home from '../../views/inicio/Home';

// Classe para adc as rotas

class DashboardRouter extends Component {
    render() {
        return (
            <div>
                <Switch>
                    {/* rotas principais */}
                    <Route exact path="/INICIO" component={Home} />
                    <Route exact path="/EDITAR FOTO GESTÃO" component={editarFotoGestao} />
                    <Route exact path="/SERVIÇOS E PROJETOS" component={ServicosProjetos} />
                    <Route exact path="/POSTAGEM BLOG" component={PostagemBlog} />
                    <Route exact path="/WHATSAPP" component={NumWhatsApp} />
                    <Route exact path="/EMAIL" component={editarEmail} />
                    <Route exact path="/ALTERAR LOGO" component={editarLogo} />

                
                    {/* rotas de formularios */}
                    <Route  path="/SERVIÇOS E PROJETOS/adc" component={AddEditServicosProjetos} />
                    <Route  path="/SERVIÇOS E PROJETOS/edit" component={AddEditServicosProjetos} />
                    <Route exact path="/POSTAGEM BLOG/adc" component={AddEditPostagem} />
                    <Route exact path="/POSTAGEM BLOG/edit" component={AddEditPostagem} />
                </Switch>
            </div>
        );
    }
}

export default DashboardRouter;