import React, { useEffect } from 'react';
import { api_soap, xmls, URI } from '../../../../services/api_soap';

export function TesteCorsSoap() {
  useEffect(() => {
    api_soap.post(
      URI,
      xmls,
      {headers: {'Content-Type': 'text/xml'}}
    )
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  })

  return (
    <h1>Teste do CORS da API SOAP</h1>
  )
}