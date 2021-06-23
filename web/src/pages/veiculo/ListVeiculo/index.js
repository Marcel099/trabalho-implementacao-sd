import React, { useEffect } from 'react';
import { xmls, api_soap, URI } from '../../../services/api_soap';

export function ListVeiculo() {
  useEffect(() => {
    api_soap.post(
      URI,
      xmls,
      {headers: {'Content-Type': 'text/xml'}}
      ).then(function(res){
        console.log(res)
      }).catch(function(err){
        console.log(err)
      });
  })

  return (
    <h1>Lista de Veículos</h1>
  )
}