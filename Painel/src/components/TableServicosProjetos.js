import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from "react-router-dom";
import LinearProgress from '@material-ui/core/LinearProgress';
import axios from 'axios';
import { auth } from "../auth";
const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: '#5BAADC',
        color: theme.palette.common.white,
        fontSize: 16,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
});



class TableServicosProjetos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            linhas: [],
            carregou:false,
        };
    }

    async pegarServicosProjetos() {
        try {
            await axios.get(`${auth.baseURL}/ServicosProjetos/list`, {}).then(response => {
                this.setState({ linhas:[], carregou:true })
            })
        } catch (err) {
            console.log(err);
        }
    }

    componentDidMount() {
        const data = [
            { id: 1, titulo: "Diagnóstico Organizacional", descricao: " Maecenas ipsum velit, consectetuer eu, lobortis ut, dictum at, dui. In rutrum. Sed ac dolor sit amet purus malesuada congue. In laoreet, magna id viverra tincidunt, sem odio bibendum justo, vel imperdiet sapien wisi sed libero. Suspendisse sagittis ultrices augue. Mauris metus. Nunc dapibus tortor vel mi dapibus sollicitudin. Etiam posuere lacus quis dolor. Praesent id justo in neque elementum ultrices. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. In convallis. Fusce suscipit libero eget elit. Praesent vitae arcu tempor neque lacinia pretium. Morbi imperdiet, mauris ac auctor dictum, nisl ligula egestas nulla, et sollicitudin sem purus in lacus." },
            { id: 2, titulo: "Pesquisa de Clima Organizacional", descricao: " Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nullam feugiat, turpis at pulvinar vulputate, erat libero tristique tellus, nec bibendum odio risus sit amet ante. Aliquam erat volutpat. Nunc auctor. Mauris pretium quam et urna. Fusce nibh. Duis risus. Curabitur sagittis hendrerit ante. Aliquam erat volutpat. Vestibulum erat nulla, ullamcorper nec, rutrum non, nonummy ac, erat. Duis condimentum augue id magna semper rutrum. Nullam justo enim, consectetuer nec, ullamcorper ac, vestibulum in, elit. Proin pede metus, vulputate nec, fermentum fringilla, vehicula vitae, justo. Fusce consectetuer risus a nunc. Aliquam ornare wisi eu metus. Integer pellentesque quam vel velit. Duis pulvinar." },
            { id: 3, titulo: "Treinamento", descricao: " Praesent in mauris eu tortor porttitor accumsan. Mauris suscipit, ligula sit amet pharetra semper, nibh ante cursus purus, vel sagittis velit mauris vel metus. Aenean fermentum risus id tortor. Integer imperdiet lectus quis justo. Integer tempor. Vivamus ac urna vel leo pretium faucibus. Mauris elementum mauris vitae tortor. In dapibus augue non sapien. Aliquam ante. Curabitur bibendum justo non orci. Praesent in mauris eu tortor porttitor accumsan. Mauris suscipit, ligula sit amet pharetra semper, nibh ante cursus purus, vel sagittis velit mauris vel metus. Aenean fermentum risus id tortor. Integer imperdiet lectus quis justo. Integer tempor. Vivamus ac urna vel leo pretium faucibus. Mauris elementum mauris vitae tortor. In dapibus augue non sapien. Aliquam ante. Curabitur bibendum justo non orci." },
            { id: 4, titulo: "Recrutamento e Seleção", descricao: " Etiam posuere quam ac quam. Maecenas aliquet accumsan leo. Nullam dapibus fermentum ipsum. Etiam quis quam. Integer lacinia. Nulla est. Nulla turpis magna, cursus sit amet, suscipit a, interdum id, felis. Integer vulputate sem a nibh rutrum consequat. Maecenas lorem. Pellentesque pretium lectus id turpis. Etiam sapien elit, consequat eget, tristique non, venenatis quis, ante. Fusce wisi. Phasellus faucibus molestie nisl. Fusce eget urna. Curabitur vitae diam non enim vestibulum interdum. Nulla quis diam. Ut tempus purus at lorem." },
            { id: 5, titulo: "Análise e Descrição de Cargos", descricao: " Morbi leo mi, nonummy eget, tristique non, rhoncus non, leo. Nullam faucibus mi quis velit. Integer in sapien. Fusce tellus odio, dapibus id, fermentum quis, suscipit id, erat. Fusce aliquam vestibulum ipsum. Aliquam erat volutpat. Pellentesque sapien. Cras elementum. Nulla pulvinar eleifend sem. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque porta. Vivamus porttitor turpis ac leo." },
            { id: 6, titulo: "Orientação Profissional", descricao: " Aenean placerat. In vulputate urna eu arcu. Aliquam erat volutpat. Suspendisse potenti. Morbi mattis felis at nunc. Duis viverra diam non justo. In nisl. Nullam sit amet magna in magna gravida vehicula. Mauris tincidunt sem sed arcu. Nunc posuere. Nullam lectus justo, vulputate eget, mollis sed, tempor sed, magna. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam neque. Curabitur ligula sapien, pulvinar a, vestibulum quis, facilisis vel, sapien. Nullam eget nisl. Donec vitae arcu." },
        ]
        this.pegarServicosProjetos();
        //this.setState({linhas:data});
    }


    async removerPacote(id,index) {
        try {
            if (window.confirm('Tem certeza que deseja deletar este item de forma PERMANENTE?')) {
                var auxiliar = this.state.linhas;
                const resp = await axios.post(`${auth.baseURL}/ServicosProjetos/delete`,
                { _id: id }
                ).catch((e) =>   console.log(e))
                auxiliar.splice(index, 1);
                this.setState({ linhas: auxiliar });
            }
        } catch (err) {
            console.log(err);
        }
    };

    render() {
        const { classes } = this.props;

        return (

            <Paper className={classes.root}>
                {
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <CustomTableCell align="center">titulo</CustomTableCell>
                                <CustomTableCell align="center">Descrição</CustomTableCell>
                                <CustomTableCell align="center">Editar</CustomTableCell>
                                <CustomTableCell align="center">Remover</CustomTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {this.state.linhas.length > 0 &&
                            this.state.linhas.map((row,index) => (
                                <TableRow className={classes.row} key={row._id}>
                                    <CustomTableCell align="center">{row.titulo}</CustomTableCell>
                                    <CustomTableCell align="center">{row.descricao}</CustomTableCell>
                                    <CustomTableCell align="center">
                                        <NavLink to={{
                                            pathname: "SERVIÇOS E PROJETOS/edit",

                                            titulo: row.titulo,
                                            descricaoItem: row.descricao,
                                            descricao: "Altere os campos desejados e clique em concluir para finalizar.",
                                            _id: row._id,
                                            tipo: "edit"
                                        }}>
                                            <FontAwesomeIcon icon={faEdit} size="lg" className="App-icon" />
                                        </NavLink>
                                    </CustomTableCell>
                                    <CustomTableCell onClick={() => this.removerPacote(row._id , index)} align="center">
                                        <FontAwesomeIcon icon={faTrashAlt} size="lg" className="App-icon" />
                                    </CustomTableCell>
                                </TableRow>
                            ))
                        }
                        {this.state.carregou && this.state.linhas.length === 0&&
                    <h1 style={{ fontSize: "2em", color:"#ccc" , textAlign:"center"}}> Não existem serviços cadastrados</h1>
                }
                {!this.state.carregou && <LinearProgress />}
                        </TableBody>
                    </Table>

                }

            </Paper>
        );
    }
}

TableServicosProjetos.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TableServicosProjetos);