import React from 'react'
import BotaoAdicionar from '../../components/BotaoAdicionar'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TableServicosProjetos from '../../components/TableServicosProjetos';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {ServicoProjetoTemp} from './ServicoProjetoTemp';
import {withRouter} from 'react-router';
import { NavLink } from "react-router-dom";


const styles = {
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
};

class ServicosProjetos extends React.Component{
    constructor(props){
        super(props)
        this.state = {}
    }

    componentWillMount(){
        ServicoProjetoTemp.resetarPacote();
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <div>
                <Typography variant="h5" component="h2" >
                    Edição de Serviços e Projetos
                </Typography>
                <Divider />
                <Typography className={classes.pos} color="textSecondary">
                   Nesta seção é possivel, editar, remover ou adicionar novos Serviços e Projetos ao site.
                </Typography>
                </div>
                <TableServicosProjetos/>
                <NavLink to={{
                                pathname: "/SERVIÇOS E PROJETOS/adc",
                                    nome: "Adição de Serviços e Projetos",
                                    descricao: "Inisira os dados e clique em concluir para finalizar.",
                                    tipo:"add",
                            }} >
                    <BotaoAdicionar nome="Serviço / Projeto" />
                </NavLink>
            </div>
        )
    }
}

ServicosProjetos.propTypes = {
    classes: PropTypes.object.isRequired,
};

const ServicosProjetosWrapped = withStyles(styles)(ServicosProjetos);

export default withRouter(ServicosProjetosWrapped);