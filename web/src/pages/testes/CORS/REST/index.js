import React, { useEffect } from 'react';
import { api_rest } from '../../../../services/api_rest';

export function TesteCorsRest() {
  useEffect(() => {
    api_rest.get('/posicao/select', {
      params: {
        vehicleID: 1
      }
    })
      .then(r => console.log(r))
      .catch(e => console.warn(e))
  }, [])

  return (
    <h1>Teste do CORS da API REST</h1>
  )
}