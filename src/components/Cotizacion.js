import React from 'react';
import styled from '@emotion/styled';

const ResultadoDiv = styled.div`

    color: #FFF;
    font-family:Arial, Helvetica, sans-serif;
`;


const Info = styled.p`
    font-size:18px;
    span{
        font-weight:bold;
    }

`;

const Precio = styled.p`

    font-size:30px;

`;

const Cotizacion = ({resultado}) => {
    if(Object.keys(resultado).length === 0)return null;

    return ( 
        <ResultadoDiv>
            <Precio>EL precio es : <span>{resultado.PRICE}</span></Precio>
            <Info>EL precio mas alto del dia : <span>{resultado.HIGHDAY}</span></Info>
            <Info>EL precio mas bajo del dia : <span>{resultado.LOWDAY}</span></Info>
            <Info>Variación ultimas 24 horas: <span>{resultado.CHANGEPCT24HOUR}</span></Info>
            <Info>Ultima actualización : <span>{resultado.LASTUPDATE}</span></Info>
        </ResultadoDiv>
     );
}
 
export default Cotizacion;