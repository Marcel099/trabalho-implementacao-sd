import React from 'react'

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { OperadorLogon } from './pages/OperadorLogon'

import { ListVeiculo } from './pages/veiculo/ListVeiculo'
import { NewVeiculo } from './pages/veiculo/NewVeiculo'
import { EditVeiculo } from './pages/veiculo/EditVeiculo'

import { NewLocalizacao } from './pages/localizacao/NewLocalizacao'

import { Movimentacao } from './pages/MonitoramentoVeiculos/Movimentacao'
import { UltimaLocalizacaoVeiculos } from './pages/MonitoramentoVeiculos/UltimaLocalizacaoVeiculos'

import { Simulador } from './pages/SimuladorDeslocamento'

export function Routes(){
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={OperadorLogon} />

        <Route path="/veiculo" component={ListVeiculo} />
        <Route path="/veiculo/new" component={NewVeiculo} />
        <Route path="/veiculo/:codigo_veiculo/edit" component={EditVeiculo} />

        <Route path="/localizacao/new" component={NewLocalizacao} />

        <Route path="/monitoramento-veiculos/ultima-localizacao-veiculos" component={UltimaLocalizacaoVeiculos} />
        <Route path="/monitoramento-veiculos/movimentacao" component={Movimentacao} />

        <Route path="/veiculo/:codigo_veiculo/simulador-deslocamento" component={Simulador} />
      </Switch>
    </BrowserRouter>
  )
}