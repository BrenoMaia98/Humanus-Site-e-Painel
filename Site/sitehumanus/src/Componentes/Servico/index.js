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

<<<<<<< HEAD
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
=======

export default function Servicos(){
    return(
        <>
        <h1 style={{ "text-align": "center", "marginBottom":"45px","color":"#212b56", "marginTop":"50px","marginBottom":"5px", "font-family": "Bebas", "fontSize":"45px"}}>Serviços e Projetos</h1>   
        <div className="containerServicos">
        <CardSP
        titulo="Diagnóstico Organizacional" 
        descricao="Maecenas ipsum velit, consectetuer eu, lobortis ut, dictum at, dui. In rutrum. Sed ac dolor sit amet purus malesuada congue. In laoreet, magna id viverra tincidunt, sem odio bibendum justo, vel imperdiet sapien wisi sed libero. Suspendisse sagittis ultrices augue. Mauris metus. Nunc dapibus tortor vel mi dapibus sollicitudin. Etiam posuere lacus quis dolor. " ></CardSP>
        <CardSP 
        titulo = "Pesquisa de Clima Organizacional" 
        descricao="Maecenas ipsum velit, consectetuer eu, lobortis ut, dictum at, dui. In rutrum. Sed ac dolor sit amet purus malesuada congue. In laoreet, magna id viverra tincidunt, sem odio bibendum justo, vel imperdiet sapien wisi sed libero. Suspendisse sagittis ultrices augue. Mauris metus. Nunc dapibus tortor vel mi dapibus sollicitudin. Etiam posuere lacus quis dolor. " ></CardSP>
        <CardSP
        titulo="Treinamento" 
        descricao="Maecenas ipsum velit, consectetuer eu, lobortis ut, dictum at, dui. In rutrum. Sed ac dolor sit amet purus malesuada congue. In laoreet, magna id viverra tincidunt, sem odio bibendum justo, vel imperdiet sapien wisi sed libero. Suspendisse sagittis ultrices augue. Mauris metus. Nunc dapibus tortor vel mi dapibus sollicitudin. Etiam posuere lacus quis dolor. " ></CardSP>
        <CardSP
        titulo="Recrutamento e Seleção" 
        descricao="Maecenas ipsum velit, consectetuer eu, lobortis ut, dictum at, dui. In rutrum. Sed ac dolor sit amet purus malesuada congue. In laoreet, magna id viverra tincidunt, sem odio bibendum justo, vel imperdiet sapien wisi sed libero. Suspendisse sagittis ultrices augue. Mauris metus. Nunc dapibus tortor vel mi dapibus sollicitudin. Etiam posuere lacus quis dolor. " ></CardSP>
        <CardSP
        titulo="Análise e Descrição de Cargos" 
        descricao="Maecenas ipsum velit, consectetuer eu, lobortis ut, dictum at, dui. In rutrum. Sed ac dolor sit amet purus malesuada congue. In laoreet, magna id viverra tincidunt, sem odio bibendum justo, vel imperdiet sapien wisi sed libero. Suspendisse sagittis ultrices augue. Mauris metus. Nunc dapibus tortor vel mi dapibus sollicitudin. Etiam posuere lacus quis dolor. " ></CardSP>
        <CardSP
        titulo="Orientação Profissional" 
        descricao="Maecenas ipsum velit, consectetuer eu, lobortis ut, dictum at, dui. In rutrum. Sed ac dolor sit amet purus malesuada congue. In laoreet, magna id viverra tincidunt, sem odio bibendum justo, vel imperdiet sapien wisi sed libero. Suspendisse sagittis ultrices augue. Mauris metus. Nunc dapibus tortor vel mi dapibus sollicitudin. Etiam posuere lacus quis dolor. " ></CardSP>
        </div>
        </>
         );
>>>>>>> origin/site/feature/cssMobile
}