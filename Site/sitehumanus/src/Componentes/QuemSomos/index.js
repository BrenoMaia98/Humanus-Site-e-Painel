import React from 'react';
import imgGestao from '../../imagens/imgGestao.jpeg';
import './style.css';

const data = {
  imagem: imgGestao,
  texto: 'Lorem Ipsum is simply dummy text of theis simply dummy text of theis simply dummy text of theis simply dummy text of theis siis simply dummy text of themply dummy text of the printing and e specimen book. It has survived not only five centuries, e leap into electronic typesetting, emaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesettin',
}


export default function quemSomos(){
    return(
        <>
            
            
            
            <div className="Titulo">
            <p> QUEM SOMOS ?</p>
            </div>
            <img src={imgGestao} className="foto" />
            <div className="conteudo">
            <p>Lorem Ipsum is simply dummy text of theis simply dummy text of theis simply dummy text of theis simply dummy text of theis siis simply dummy text of themply dummy text of the printing and e specimen book. It has survived not only five centuries, e leap into electronic typesetting, emaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesettin </p>
            </div>
        </>
    );
}