import React from 'react';
import './style.css';



export default function Card(props){
    return(
        <div className="containerCardExterno">
            <div className="containerCardInterno">
                <div className="titulo">
                    {props.titulo}
                </div>
                <div className="descricao">
                    {props.descricao}
                </div>
            </div>
        </div>
         );
}
/* horizontal/Width : vw ao inves de % ou px
   vertical: vh ao inves de % ou px
*/