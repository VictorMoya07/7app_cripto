import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import useMoneda from '../hooks/useMoneda'; 
import useCriptomoneda from '../hooks/useCriptomoneda';
import Error from './Error';
import axios from 'axios';



const Boton = styled.input`
    margin-top:20px;
    font-weight:bold;
    font-size:20px;
    padding:10px;
    background-color:#66a2fe;
    border:none;
    width:100%;
    border-radius:10px;
    color:#FFF;
    transition: background-color .3s ease;

    &:hover{
        background-color:#326AC0;
        cursor:pointer;
    }
`;



const Formulario = (guardarCriptomoneda, guardarMoneda) => {

    //state del listado de criptomonedas
     const [listacripto, guardarCriptomonedas] = useState([]);

     const [error, guardarError] = useState();


    const MONEDAS = [
        {codigo: 'USD', nombre: 'Dolar de Estados Unidos'},
        {codigo: 'MXN', nombre: 'Peso Mexicano'},
        {codigo: 'EUR', nombre: 'Euro'},
        {codigo: 'ARS', nombre: 'Peso argentino'},
        {codigo: 'VEB', nombre: 'Bolivar Venezolano'},
    ]

    //Utilizar useMoneda
    const [moneda, SelectMonedas]= useMoneda('Elige tu Moneda', '', MONEDAS);

    //utilizar useCriptomoneda
    const [criptomoneda, SelectCripto] = useCriptomoneda('Elige tu Criptomoneda', '', listacripto);

    useEffect(()=>{
        
        const consultarAPI = async () =>{
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
            const resultado = await axios.get(url);
            guardarCriptomonedas(resultado.data.Data);
        }

        consultarAPI();
    
    }, []);

    const cotizarMoneda = e=>{
        e.preventDefault();

        //Validar si ambos campos estan llenos 

        if (moneda === '' || criptomoneda === ''){
            guardarError(true);
            return;
        }

        //Pasar los datos al componente principal
        guardarError(false);
        guardarMoneda(moneda);
        guardarCriptomoneda(criptomoneda);

        

    }

    return ( 
        <div>
            <form
                onSubmit={cotizarMoneda}
            >
                {error ? <Error
                    mensaje='Existe un error'
                />:null}
                <SelectMonedas/>

                <SelectCripto/>
                <Boton
                    type="submit"
                    value="Calcular"
                />
            </form>
        </div>

     );
}
 
export default Formulario;