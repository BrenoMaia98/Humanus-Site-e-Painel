import React from 'react';
import './style.css';
import CardSP from '../CardSP/index';

const cardInfo = [
  {
    title: 'titulo1',
    description: 'desc1',
  },
  {
    title: 'titulo2',
    description: 'desc2',
  },
  {
    title: 'titulo3',
    description: 'desc3',
  },
  {
    title: 'titulo4',
    description: 'desc4',
  },
];

export default function Servicos() {
  return (
    <>
      <h1 style={{ "text-align": "center", "marginBottom": "45px", "marginTop": "50px", "marginBottom": "5px", "font-family": "Bebas", "fontSize": "45px" }}>Serviços e Projetos</h1>
      <div className="containerServicos">
        {
          cardInfo.map(atual => (
            <CardSP titulo={atual.title} descricao={atual.description} />
          ))
        }
      </div>
    </>
  );

}