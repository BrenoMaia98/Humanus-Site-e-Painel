import React from 'react'
import BotaoAdicionar from '../../components/BotaoAdicionar'
import BotaoCarregarMais from '../../components/BotaoCarregarMais'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import LinearProgress from '@material-ui/core/LinearProgress';
import { NavLink } from "react-router-dom";
import { withRouter } from 'react-router';
import { auth } from "../../auth";
import axios from 'axios';
import TablePostagemBlog from '../../components/TablePostagemBlog';

const styles = {
    pos: {
        marginBottom: 12,
    },
};

class PostagemBlog extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pg: 0,
            data: [],
            carregou: false,
        }
        this.pegarDados = this.pegarDados.bind(this);
    }

    async pegarDados() {
        try {

            const req = await axios.get(`${auth.baseURL}/Postagem/list/${this.state.pg + 1}/-`).catch(e => console.log(e));
            var aux = this.state.data;
            aux = aux.concat(req.data);
            this.setState({ pg: this.state.pg + 1, data: aux, carregou: true });
        } catch (e) {
            alert("Houve um problema com a conexão");
        }
    }

    componentWillMount() {
        this.pegarDados();
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <div>
                    <Typography variant="h5" component="h2" >
                        Edição Postagem Blog
                </Typography>
                    <Divider />
                    <Typography className={classes.pos} color="textSecondary">
                        Nesta seção é possivel, editar, remover ou adicionar novas postagens do Blog.
                </Typography>
                </div>
                <TablePostagemBlog data={this.state.data} />
                {this.state.carregou && this.state.data.length === 0&&
                    <h1 style={{ fontSize: "2em", color:"#ccc",textAlign:"center" }}> Não existem postagens</h1>
                }
                {!this.state.carregou && <LinearProgress />}

                <BotaoCarregarMais onClick={this.pegarDados} nome="Carregar Mais" />
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

PostagemBlog.propTypes = {
    classes: PropTypes.object.isRequired,
};

const PostagemBlogWrapped = withStyles(styles)(PostagemBlog);

export default withRouter(PostagemBlogWrapped);