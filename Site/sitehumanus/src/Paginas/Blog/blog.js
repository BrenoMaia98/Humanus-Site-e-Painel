import React from 'react';
import './blog.css';
import Picker from '../../Componentes/Picker/picker'
import Divisao from '../../Componentes/Divisao/divisao'
import Direita from '../../Componentes/Materia/direita'
import Esquerda from '../../Componentes/Materia/esquerda'
import SemFoto from '../../Componentes/Materia/semFoto'

const Categorias = [
  {
      id: 0,
      categoria: 'Projetos',
    }, 
    {
      id: 1,
      categoria: 'Eventos',
    }, 
    {
      id: 2,
      categoria: 'Dicas',
    }, 
    {
      id: 3,
      categoria: 'Gestão de Pessoas',
    }, 
    {
      id: 4,
      categoria: 'MEJ',
    }, 
    {
      id: 5,
      categoria: 'Psicologia Organizacional',
    }, 
    {
      id: 6,
      categoria: 'Pesquisa de Clima Organizacional',
    }, 
    {
      id: 7,
      categoria: 'Recrutamento e Seleção',
    }, 
    {
      id: 8,
      categoria: 'Treinamento',
    }, 
    {
      id: 9,
      categoria: 'Análise e descrição de cargos',
    }, 
    {
      id: 10,
      categoria: 'Orientação Profissional',
    },
    {
      id: 11,
      categoria: 'Diagnóstico Organizacional',
    }, 
]




class App extends React.Component {
  
render(){
  return (
    <div >
    <div className="Box">
      <Picker data = {Categorias}></Picker>
    </div>
    <Divisao></Divisao>
      <Direita></Direita>
      <Divisao></Divisao>
      <Esquerda></Esquerda>
      <Divisao></Divisao>
      <SemFoto></SemFoto>
      <Divisao></Divisao>
    </div>
  );
}
}

export default App;
