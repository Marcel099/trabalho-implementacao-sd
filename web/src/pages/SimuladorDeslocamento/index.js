import React, { useEffect } from 'react';
import api from '../../services/api_rest';

export function Simulador() {
  useEffect(() => {
    api.get('/posicao/select', {
      params: {
        vehicleID: 1
      }
    })
      .then(r => console.log(r))
      .catch(e => console.warn(e))
  }, [])

  return (
    <h1>Simulador de Deslocamento de um Veículo</h1>
  )
}