
import React from 'react';

import { Movimentacao } from '../../components/Movimentacao'
import { UltimaLocalizacaoVeiculos } from '../../components/UltimaLocalizacaoVeiculos'

export function MonitoramentoVeiculos() {
  return (
    <>
      <h1>Monitoramento de Veículos</h1>
      <Movimentacao />
      <UltimaLocalizacaoVeiculos />
    </>
  )
}