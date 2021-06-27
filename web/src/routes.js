import React from 'react'

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { LayoutBase } from './components/LayoutBase'

import { OperadorLogon } from './pages/OperadorLogon'

import { ListVeiculo } from './pages/veiculo/ListVeiculo'
import { NewVeiculo } from './pages/veiculo/NewVeiculo'
import { EditVeiculo } from './pages/veiculo/EditVeiculo'

import { NewLocalizacao } from './pages/localizacao/NewLocalizacao'

import { MonitoramentoVeiculos } from './pages/MonitoramentoVeiculos'

import { Simulador } from './pages/SimuladorDeslocamento'

export function Routes(){

  const renderInsideBaseLayout = PageComponent => (<LayoutBase><PageComponent /></LayoutBase>)

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact render={() => renderInsideBaseLayout(OperadorLogon)} />

        <Route path="/veiculo" render={() => renderInsideBaseLayout(ListVeiculo)} />
        <Route path="/veiculo/new" render={() => renderInsideBaseLayout(NewVeiculo)} />
        <Route path="/veiculo/:codigo_veiculo/edit" render={() => renderInsideBaseLayout(EditVeiculo)} />

        <Route path="/localizacao/new" render={() => renderInsideBaseLayout(NewLocalizacao)} />

        <Route path="/monitoramento-veiculos" render={() => renderInsideBaseLayout(MonitoramentoVeiculos)} />

        <Route path="/veiculo/simulador-deslocamento" render={() => renderInsideBaseLayout(Simulador)} />\
      </Switch>
    </BrowserRouter>
  )
}