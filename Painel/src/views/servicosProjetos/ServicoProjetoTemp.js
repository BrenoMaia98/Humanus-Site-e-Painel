export const ServicoProjetoTemp = {
	pacote: false,
	nome: null,
	imagem: null,
	condicoes_pagamento: null,
	modalidades: [],
	contModalidade: 0,

	criarPacote(nome, imagem, condicoes_pagamento){
		this.nome = nome;
		this.imagem = imagem;
		this.pacote = true;
		this.condicoes_pagamento = condicoes_pagamento;
	},
	
	criarModalidade(dia_inicio, dia_fim, num_dias){
		var modalidade = {
			id: this.contModalidade,
			dia_inicio: dia_inicio,
			dia_fim: dia_fim,
			num_dias: num_dias,
			cronograma: [],
			valores: []
		}
		this.contModalidade++;
		this.modalidades.push(modalidade);
	},

	atualizarModalidade(id,dia_inicio, dia_fim, num_dias, cronograma, valores){
		this.modalidades[id] = {
			id: id,
			dia_inicio: dia_inicio,
			dia_fim: dia_fim,
			num_dias: num_dias,
			cronograma: cronograma,
			valores: valores
		}
	},

	removerModalidade(id){
		var auxiliar = [...this.modalidades];
        for (var i = auxiliar.length - 1; i >= 0; i--) {
            if (i === id) {
                auxiliar.splice(i, 1);
                this.contModalidade--;
            }
        }
        this.modalidades = auxiliar;
	},

	criarAtividade(id, nome,horario_inicio,dia,local){
		var atividade = {
			id: id,
			nome: nome,
			horario_inicio: horario_inicio,
			dia: dia,
			local: local
		}
		this.modalidades[id].cronograma.push(atividade);
	},

	removerAtividade(id, nome,horario_inicio,dia,local){
		var auxiliar = [...this.modalidades[id].cronograma];
        for (var i = auxiliar.length - 1; i >= 0; i--) {
            if (auxiliar[i].nome === nome && auxiliar[i].horario_inicio === horario_inicio 
            	&& auxiliar[i].dia === dia && auxiliar[i].local === local) {
                auxiliar.splice(i, 1);
            }
        }
        this.modalidades[id].cronograma = auxiliar;
	},

	criarValor(id,id_hotel,acomodacao,valor_pessoa){
		var valor = {
			id: id,
			id_hotel: id_hotel,
			acomodacao: acomodacao,
			valor_pessoa: valor_pessoa
		}
		this.modalidades[id].valores.push(valor);
	},

	removerValor(id,id_hotel,acomodacao,valor_pessoa){
		var auxiliar = [...this.modalidades[id].valores];
        for (var i = auxiliar.length - 1; i >= 0; i--) {
            if (auxiliar[i].id_hotel === id_hotel && auxiliar[i].acomodacao === acomodacao 
            	&& auxiliar[i].valor_pessoa === valor_pessoa) {
                auxiliar.splice(i, 1);
            }
        }
        this.modalidades[id].valores = auxiliar;
	},

	resetarPacote(){
		this.pacote = false;
		this.nome = null;
		this.condicoes_pagamento = null;
		this.imagem = null;
		this.modalidades = [];
		this.contModalidade = 0;
	},

}
