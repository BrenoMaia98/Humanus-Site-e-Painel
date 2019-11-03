import React from 'react'
import BotaoAdicionar from '../../components/BotaoAdicionar'
import TableModalidades from '../../components/TableModalidades';
import BotaoVoltar from '../../components/BotaoVoltar'
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from "react-router-dom";
import FormsPacotes from './FormsPacotes';
import {ServicoProjetoTemp} from './ServicoProjetoTemp';
import axios from 'axios';
import {auth} from "../../auth";

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


class AddEditServicosProjetos extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }

    validaCampo(){
        if(this.state.nome === "" || this.state.nome === null || this.state.nome === undefined ||
          this.state.imagem === "" || this.state.imagem === null || this.state.imagem === undefined ||
          this.state.condicoes_pagamento === "" || this.state.condicoes_pagamento === null || 
          this.state.condicoes_pagamento === undefined)
          return false;
        else return true;
      }

    async addPacote(){
        var data = new FormData();
            data.append("nome",ServicoProjetoTemp.nome)
            data.append("condicoes_pagamento",ServicoProjetoTemp.condicoes_pagamento)
            data.append("imagem",ServicoProjetoTemp.imagem,ServicoProjetoTemp.imagem.name);
        var url = 'http://74.117.156.74:5012/Pacote/create';
        try{
          const response = await axios.post(url,data,auth.config);
          return response.data.id;
        }catch(err){
          alert("Erro de conexão, tente novamente!");
          console.log(err);
        }
    }

    async addModalidades(idPacote){

        var idModalidades = [];
            for (var i = ServicoProjetoTemp.modalidades.length - 1; i >= 0; i--) {
                var url = 'http://74.117.156.74:5012/ModalidadePacote/create';
                try{
                  const response = await axios.post(url, {
                    "dia_inicio": ServicoProjetoTemp.modalidades[i].dia_inicio,
                    "dia_fim": ServicoProjetoTemp.modalidades[i].dia_fim,
                    "num_dias": ServicoProjetoTemp.modalidades[i].num_dias,
                    "pacote_id": idPacote
                  },auth.config);
                  idModalidades.push({"idBanco": response.data.id, "idTemporario": ServicoProjetoTemp.modalidades[i].id});
                }catch(err){
                  alert("Erro de conexão, tente novamente!");
                  console.log(err);
                }
            }
        return idModalidades;
    }

    buscarIdBanco(idModalidades,idTemporario){
        var result = idModalidades.filter(e => e.idTemporario === idTemporario);
        return result[0].idBanco;
    }

    addAtividades(idModalidades){
        ServicoProjetoTemp.modalidades.map(
            async (row1,index1) => {
                row1.cronograma.map(
                    async (row2,index2) => {
                        var url = 'http://74.117.156.74:5012/Atividade/create';
                        try{
                            var id = this.buscarIdBanco(idModalidades,index1);
                          await axios.post(url, {
                            "nome": row2.nome,
                            "horario_inicio": row2.horario_inicio,
                            "dia": row2.dia,
                            "local": row2.local,
                            "modalidade_pacote_id": id
                          },auth.config);

                        }catch(err){
                          alert("Erro de conexão, tente novamente!");
                          console.log(err);
                        }
                    }
                )
            }
        );
    }

    addValores(idModalidades){
        ServicoProjetoTemp.modalidades.map(
            async (row1,index1) => {
                row1.valores.map(
                    async (row2,index2) => {
                        var url = 'http://74.117.156.74:5012/ValoresPacote/create';
                        try{
                          var id = this.buscarIdBanco(idModalidades,index1);
                          await axios.post(url, {
                            "id_hotel": row2.id_hotel,
                            "acomodacao": row2.acomodacao,
                            "valor_pessoa": row2.valor_pessoa,
                            "modalidade_pacote_id": id
                          },auth.config);                            
                        }catch(err){
                          alert("Erro de conexão, tente novamente!");
                          console.log(err);
                        }
                    }
                )
            }
        );
    }      

    async adicionarPacote(){
        if(this.props.location.componenteProps.adicao){
            if(this.form.validaCampo()){
                if(this.table.tamanhoTabela() >= 1){
                    var idPacote = await this.addPacote();
                    var idModalidades = await this.addModalidades(idPacote);
                    await this.addAtividades(idModalidades);
                    await this.addValores(idModalidades);
                    ServicoProjetoTemp.resetarPacote();
                    this.botaoVoltar.clicar();
                }
                else{
                    alert("É preciso inserir ao menos uma modalidade!");
                }
            }
            else{
                alert("É preciso inserir os campos de nome, imagem e condições de pagamento do pacote!");
            }
        }else{
            var data = new FormData();
            data.append("id",this.props.location.componenteProps.id);
            data.append("nome",ServicoProjetoTemp.nome);
            data.append("condicoes_pagamento",ServicoProjetoTemp.condicoes_pagamento);
            if(ServicoProjetoTemp.imagem.name)data.append("imagem",ServicoProjetoTemp.imagem,ServicoProjetoTemp.imagem.name);
            var url = 'http://74.117.156.74:5012/Pacote/update';
            try{
                await axios.post(url,data,auth.config);
                this.botaoVoltar.clicar();
            }catch(err){
              alert("Erro de conexão, tente novamente!");
              console.log(err);
            }
        }
        
    }

    render() {
        console.log(this.props);
        const { classes } = this.props;
        return (
            <div>
                <div>
                <Typography variant="h5" component="h2" >
                    {this.props.nome}
                </Typography>
                <Divider />
                <Typography className={classes.pos} color="textSecondary">
                    {this.props.descricao}
                </Typography>
                <form className="App-forms">
                    <div>
                        <label>
                          Titulo:
                          <input type="text" name="nome" required onChange={(event) => this.setState({nome: event.target.value},() => this.setarNome())} defaultValue = {this.state.nome}/>
                        </label>
                        <label>
                          Descrição:
                          <input type="file" name="pic" accept="imagem/*" onChange={(event) => this.setState({imagem: "encontrado"},() => this.setarImagem())} />
                        </label>
                    </div>
                    <div>
                        <label>
                            Condições de Pagamento:<br />
                            <textarea rows="4" cols="50" onChange={(event) => this.setState({condicoes_pagamento: event.target.value},() => this.setarCondicoesPagamento())} value = {this.state.condicoes_pagamento} ></textarea>
                        </label>
                    </div>
                </form>                
            </div>
                <div align='center' style = {{display: "flex", justifyContent:"center"}}> 
                    <Button onClick = {() => this.adicionarPacote()} variant="contained" size="medium" className = "App-Button" style = {{color: 'white'}} >
                        <FontAwesomeIcon icon={faCheck} size = "lg" style = {{marginRight: '10px'}}/> Concluir
                    </Button>
                    <BotaoVoltar onRef={ref => (this.botaoVoltar = ref)}  link = "SERVIÇOS E PROJETOS" />
                </div>
            </div>
        )
    }
}

AddEditServicosProjetos.propTypes = {
    classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const AddEditServicosProjetosWrapped = withStyles(styles)(AddEditServicosProjetos);

export default AddEditServicosProjetosWrapped;