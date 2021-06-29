import React from 'react'

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { VehicleContextProvider } from './contexts/VehicleContext'

import { LayoutBase } from './components/LayoutBase'

import { OperadorLogon } from './pages/OperadorLogon'

import { ListVeiculo } from './pages/veiculo/ListVeiculo'
import { NewVeiculo } from './pages/veiculo/NewVeiculo'
import { EditVeiculo } from './pages/veiculo/EditVeiculo'

import { NewLocalizacao } from './pages/localizacao/NewLocalizacao'

import { MonitoramentoVeiculos } from './pages/MonitoramentoVeiculos'

import { Simulador } from './pages/SimuladorDeslocamento'

import { TesteCorsRest } from './pages/testes/CORS/REST'
import { TesteCorsSoap } from './pages/testes/CORS/SOAP'

export function Routes(){

  const renderInsideBaseLayout = PageComponent => (<LayoutBase><PageComponent /></LayoutBase>)

  return (
    <BrowserRouter>
      <VehicleContextProvider>
        <Switch>
          <Route path="/" exact render={() => renderInsideBaseLayout(OperadorLogon)} />

          <Route path="/veiculo" exact render={() => renderInsideBaseLayout(ListVeiculo)} />
          <Route path="/veiculo/new" render={() => renderInsideBaseLayout(NewVeiculo)} />
          <Route path="/veiculo/:codigo_veiculo/edit" render={() => renderInsideBaseLayout(EditVeiculo)} />

          <Route path="/localizacao/new" render={() => renderInsideBaseLayout(NewLocalizacao)} />

          <Route path="/monitoramento-veiculos" render={() => renderInsideBaseLayout(MonitoramentoVeiculos)} />

          <Route path="/veiculo/simulador-deslocamento" render={() => renderInsideBaseLayout(Simulador)} />
          
          <Route path="/teste-cors-rest" render={() => renderInsideBaseLayout(TesteCorsRest)} />
          <Route path="/teste-cors-soap" render={() => renderInsideBaseLayout(TesteCorsSoap)} />
        </Switch>
      </VehicleContextProvider>
    </BrowserRouter>
  )
}