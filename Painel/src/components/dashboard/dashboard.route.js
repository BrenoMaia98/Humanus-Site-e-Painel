import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";

import PostagemBlog from '../../views/postagem/PostagemBlog';
import FormsPostagem from '../../views/postagem/FormsPostagem';

import ServicosProjetos from '../../views/servicosProjetos/ServicosProjetos'

import AddEditServicosProjetos from '../../views/servicosProjetos/AddEditServicosProjetos'

import Modalidade from '../../views/servicosProjetos/Modalidade'
import FormsAtividades from '../../views/servicosProjetos/FormsAtividades'

import FormsValores from '../../views/servicosProjetos/FormsValores'


import editarFotoGestao from '../../views/editarFoto/editarFotoGestao'

import Home from '../../views/inicio/Home'

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

                
                    {/* rotas de formularios */}
                    <Route  path="/SERVIÇOS E PROJETOS/adc" component={AddEditServicosProjetos} />
                    <Route  path="/SERVIÇOS E PROJETOS/edit" component={AddEditServicosProjetos} />
                    <Route exact path="/POSTAGEM BLOG/adc" component={FormsPostagem} />
                    <Route exact path="/POSTAGEM BLOG/edit" component={FormsPostagem} />
                    <Route  path="/SERVIÇOS E PROJETOS/modalidade/adc" component={Modalidade} />
                    <Route  path="/SERVIÇOS E PROJETOS/modalidade/editar" component={Modalidade} />
                    <Route  path="/SERVIÇOS E PROJETOS/modalidade/atividade/adc" component={FormsAtividades} />
                    <Route  path="/SERVIÇOS E PROJETOS/modalidade/atividade/editar" component={FormsAtividades} />
                    <Route  path="/SERVIÇOS E PROJETOS/modalidade/valores/adc" component={FormsValores} />
                    <Route  path="/SERVIÇOS E PROJETOS/modalidade/valores/editar" component={FormsValores} />

                </Switch>
            </div>
        );
    }
}

export default DashboardRouter;