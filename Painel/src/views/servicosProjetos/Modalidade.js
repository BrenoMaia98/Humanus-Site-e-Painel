import React from 'react'
import { NavLink } from "react-router-dom";
import TableAtividades from '../../components/TableAtividades';
import FormsModalidades from './FormsModalidades';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUndo } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import TableValores from '../../components/TableValores';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';



class Modalidade extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            caminho: "/pacotes/modalidade/adc",
            modalidadeProps: {
                                nome: this.props.location.componenteProps.nome,
                                descricao: this.props.location.componenteProps.descricao,
                                id: this.props.location.componenteProps.id,
                                caminhoDeVolta: this.props.location.componenteProps.caminhoDeVolta,
                                nomeVolta: this.props.location.componenteProps.nomeVolta,
                                descricaoVolta: this.props.location.componenteProps.descricaoVolta,
                                idPacote:  this.props.location.componenteProps.idPacote,
                                dia_inicio: this.props.location.componenteProps.dia_inicio,
                                dia_fim: this.props.location.componenteProps.dia_fim,
                                num_dias:this.props.location.componenteProps.num_dias,
                                textoBtn: this.props.location.componenteProps.textoBtn,
                                adicao: this.props.location.componenteProps.adicao,
                                btnModalidade: this.props.location.componenteProps.btnModalidade,
                                rowsAtividades: this.props.location.componenteProps.rowsAtividades,
                                rowsValores: this.props.location.componenteProps.rowsValores,
                            },
            atividadeProps: {
                                nome: "Adição de Atividade",
                                descricao: "Inisira os dados e clique em concluir para finalizar.",
                                id: -1,
                                caminhoDeVoltaPacote: this.props.location.componenteProps.caminhoDeVolta,
                                nomePacote: this.props.location.componenteProps.nomeVolta,
                                descricaoPacote: this.props.location.componenteProps.descricaoVolta,
                                idPacote: this.props.location.componenteProps.idPacote,
                                adicao: this.props.location.componenteProps.adicao,
                                caminhoDeVolta: this.props.location.componenteProps.adicao?"/pacotes/modalidade/adc":"/pacotes/modalidade/editar",
                                nomeVolta: this.props.location.componenteProps.nome,
                                descricaoVolta: this.props.location.componenteProps.descricao,
                                idVolta:  this.props.location.componenteProps.id,
                                temporario: this.props.location.componenteProps.adicao,
                            },
             valoresProps:{
                           nome: "Adicionar Valor",
                           descricao: "Inisira os dados e clique em concluir para finalizar.",
                           id: -1,
                           caminhoDeVoltaPacote: this.props.location.componenteProps.caminhoDeVolta,
                           nomePacote: this.props.location.componenteProps.nomeVolta,
                           descricaoPacote: this.props.location.componenteProps.descricaoVolta,
                           idPacote: this.props.location.componenteProps.idPacote,
                           adicao: this.props.location.componenteProps.adicao,
                           caminhoDeVolta: this.props.location.componenteProps.adicao?"/pacotes/modalidade/adc":"/pacotes/modalidade/editar",
                           nomeVolta: this.props.location.componenteProps.nome,
                           descricaoVolta: this.props.location.componenteProps.descricao,
                           idVolta:  this.props.location.componenteProps.id,
                           temporario: this.props.location.componenteProps.adicao,
                         },
            pacoteProps:{
                        nome: this.props.location.componenteProps.nomeVolta,
                        descricao: this.props.location.componenteProps.descricaoVolta,
                        id: this.props.location.componenteProps.idPacote,
                        adicao:this.props.location.componenteProps.adicao
                    },
            modalidadeAdicionada: false,
            id: this.props.location.componenteProps.id
        }
    }

    verificarModalidade(tipo){
        if(this.form.verificarModalidadeCriada()){
            if(tipo === "atividade"){
                this.setState({caminho:"/pacotes/modalidade/atividade/adc",modalidadeAdicionada: true},
                               () => document.getElementById("btnAtividade").click());
            } 
            if(tipo === "valores"){
                this.setState({caminho:"/pacotes/modalidade/valores/adc",modalidadeAdicionada: true},
                               () => document.getElementById("btnValor").click());
            } 
            var id = this.form.verificarModalidadeID();
            if(id !== this.state.id){

             this.setState({id:id, 
                atividadeProps: {
                    nome: "Adição de Atividade",
                                descricao: "Inisira os dados e clique em concluir para finalizar.",
                                id: id,
                                caminhoDeVoltaPacote: this.props.location.componenteProps.caminhoDeVolta,
                                nomePacote: this.props.location.componenteProps.nomeVolta,
                                descricaoPacote: this.props.location.componenteProps.descricaoVolta,
                                idPacote: this.props.location.componenteProps.idPacote,
                                adicao: this.props.location.componenteProps.adicao,
                                caminhoDeVolta: this.props.location.componenteProps.adicao?"/pacotes/modalidade/adc":"/pacotes/modalidade/editar",
                                nomeVolta: this.props.location.componenteProps.nome,
                                descricaoVolta: this.props.location.componenteProps.descricao,
                                idVolta: id,
                                temporario: this.props.location.componenteProps.adicao,
                },
                valoresProps: {
                   nome: "Adicionar Valor",
                    descricao: "Inisira os dados e clique em concluir para finalizar.",
                    id: id,
                    caminhoDeVoltaPacote: this.props.location.componenteProps.caminhoDeVolta,
                    nomePacote: this.props.location.componenteProps.nomeVolta,
                    descricaoPacote: this.props.location.componenteProps.descricaoVolta,
                    idPacote: this.props.location.componenteProps.idPacote,
                    adicao: this.props.location.componenteProps.adicao,
                    caminhoDeVolta: this.props.location.componenteProps.adicao?"/pacotes/modalidade/adc":"/pacotes/modalidade/editar",
                    nomeVolta: this.props.location.componenteProps.nome,
                    descricaoVolta: this.props.location.componenteProps.descricao,
                    idVolta:  id,
                    temporario: this.props.location.componenteProps.adicao,
                }})
            }
        }
        else{
            
            alert("Crie uma modalidade primeiro!");
        }
    }

    verificarDados(){
        if(this.tableAtividades.tamanhoTabela() >= 1 && this.tableValores.tamanhoTabela() >= 1){ 
            this.setState({caminho:this.props.location.componenteProps.caminhoDeVolta,modalidadeAdicionada: true},
                           () => document.getElementById("btnRetornar").click());
        }
        else{
            
            alert("Crie ao menos uma atividade e um valor!");
        }
    }

    render() {
        return (
            <div>
                <FormsModalidades onRef={ref => (this.form = ref)}  nome = {this.props.location.componenteProps.nome} descricao = {this.props.location.componenteProps.descricao} id = {this.state.id}
                                     dia_inicio = {this.props.location.componenteProps.dia_inicio} dia_fim = {this.props.location.componenteProps.dia_fim} 
                                     num_dias = {this.props.location.componenteProps.num_dias} textoBtn = {this.props.location.componenteProps.textoBtn} 
                                     btnModalidade = {this.props.location.componenteProps.btnModalidade} adicao = {this.props.location.componenteProps.adicao} 
                                     idPacote = {this.props.location.componenteProps.idPacote} cronograma = {this.props.location.componenteProps.rowsAtividades} 
                                     valores = {this.props.location.componenteProps.rowsValores}/>
                <Typography variant="h5" style = {{marginTop:"10px"}} component="h2" >
                    Cronograma
                </Typography>
                <Divider />
                <Typography style = {{marginBottom: 12}} color="textSecondary">
                    Aqui está o cronograma desta modalidade do pacote.
                </Typography>
                <TableAtividades onRef={ref => (this.tableAtividades = ref)} nome = {this.props.location.componenteProps.nome} descricao = {this.props.location.componenteProps.descricao} id = {this.state.id} adicao = {this.props.location.componenteProps.adicao}
                nomePacote =  {this.props.location.componenteProps.nomeVolta} descricaoPacote =  {this.props.location.componenteProps.descricaoVolta} idPacote =  {this.props.location.componenteProps.idPacote}
                caminhoDeVoltaPacote = {this.props.location.componenteProps.caminhoDeVolta} rows = {this.props.location.componenteProps.rowsAtividades}/>
                <NavLink to={{
                                pathname: this.state.caminho,
                                componenteProps: this.state.modalidadeAdicionada?this.state.atividadeProps:this.state.modalidadeProps
                            }}>
                    <Button id = "btnAtividade" onClick = {async () => await this.verificarModalidade("atividade")} variant="contained" size="medium" className = "App-Button" >
                        <FontAwesomeIcon icon={faPlus} size = "lg" style = {{color:'white', marginRight: '10px'}}/> <p style = {{color:'white', margin:0}}>Adicionar Atividade</p>
                    </Button>
                </NavLink>
                <Typography variant="h5"  style = {{marginTop:"10px"}} component="h2" >
                    Valores
                </Typography>
                <Divider />
                <Typography style = {{marginBottom: 12}} color="textSecondary">
                    Aqui estão os valores por pessoa para essa modalidade.
                </Typography>
                <TableValores onRef={ref => (this.tableValores = ref)} nome = {this.props.location.componenteProps.nome} descricao = {this.props.location.componenteProps.descricao} id = {this.state.id} adicao = {this.props.location.componenteProps.adicao}
                nomePacote =  {this.props.location.componenteProps.nomeVolta} descricaoPacote =  {this.props.location.componenteProps.descricaoVolta} idPacote =  {this.props.location.componenteProps.idPacote}
                caminhoDeVoltaPacote = {this.props.location.componenteProps.caminhoDeVolta} rows = {this.props.location.componenteProps.rowsValores}/>
                <NavLink className ="linkDash" to={{
                                                    pathname: this.state.caminho,
                                                    componenteProps: this.state.modalidadeAdicionada?this.state.valoresProps:this.state.modalidadeProps                
                                                }}>
                     <Button id = "btnValor" onClick = {async () => await this.verificarModalidade("valores")} variant="contained" size="medium" className = "App-Button" >
                        <FontAwesomeIcon icon={faPlus} size = "lg" style = {{color:'white', marginRight: '10px'}}/> <p style = {{color:'white', margin:0}}>Adicionar Valor</p>
                    </Button>
                </NavLink>
                <div align='center' style = {{display: "flex", justifyContent:"center"}}> 
                    <NavLink className ="linkDash" to={{
                        pathname: this.state.caminho,
                        componenteProps: this.state.modalidadeAdicionada?this.state.pacoteProps:this.state.modalidadeProps
                        }}>
                    <Button id = "btnRetornar" onClick = {() => this.verificarDados()} variant="contained" size="medium" className = "App-Button" style = {{color: 'white'}} >
                        <FontAwesomeIcon icon={faUndo} size = "lg" style = {{marginRight: '10px'}}/> Retornar
                    </Button>
                </NavLink>
                </div>
            </div>
        )
    }
}

export default Modalidade;