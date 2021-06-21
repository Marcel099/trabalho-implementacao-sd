import React from 'react'

import { DrawerNavegacaoProvider } from '../../contexts/ContextoDrawerNavegacao';

import { DrawerNavegacaoApp } from '../DrawerNavegacaoApp'
import { CabecalhoApp } from '../CabecalhoApp'

import { ContainerApp } from '../ContainerApp'

export function LayoutBase({ children }) {
  return (
    <DrawerNavegacaoProvider>
      <CabecalhoApp />
      <DrawerNavegacaoApp />
      <ContainerApp>
        {children}
      </ContainerApp>
    </DrawerNavegacaoProvider>
  )
}