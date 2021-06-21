import React from 'react'

import { BrowserRouter, Route, Switch } from 'react-router-dom'


import { DrawerNavegacaoProvider } from './contexts/ContextoDrawerNavegacao';

import { DrawerNavegacaoApp } from './components/DrawerNavegacaoApp'
import { CabecalhoApp } from './components/CabecalhoApp'


import { OperadorLogon } from './pages/OperadorLogon'

import { ListVeiculo } from './pages/veiculo/ListVeiculo'
import { NewVeiculo } from './pages/veiculo/NewVeiculo'
import { EditVeiculo } from './pages/veiculo/EditVeiculo'

import { NewLocalizacao } from './pages/localizacao/NewLocalizacao'

import { MonitoramentoVeiculos } from './pages/MonitoramentoVeiculos'

import { Simulador } from './pages/SimuladorDeslocamento'

export function Routes(){
  return (
    <BrowserRouter>
      <Switch>
        <DrawerNavegacaoProvider>
          <CabecalhoApp />
          <DrawerNavegacaoApp />
        </DrawerNavegacaoProvider>
      </Switch>
      <Switch>
        <Route path="/" exact component={OperadorLogon} />

        <Route path="/veiculo" component={ListVeiculo} />
        <Route path="/veiculo/new" component={NewVeiculo} />
        <Route path="/veiculo/:codigo_veiculo/edit" component={EditVeiculo} />

        <Route path="/localizacao/new" component={NewLocalizacao} />

        <Route path="/monitoramento-veiculos" component={MonitoramentoVeiculos} />

        <Route path="/veiculo/simulador-deslocamento" component={Simulador} />
      </Switch>
    </BrowserRouter>
  )
}