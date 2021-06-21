import React from 'react'

import { DrawerNavegacaoProvider } from '../../contexts/ContextoDrawerNavegacao';

import { CabecalhoApp } from '../CabecalhoApp'
import { DrawerNavegacaoApp } from '../DrawerNavegacaoApp'

import { ContainerApp } from '../ContainerApp'

export function LayoutBase({ children }) {
  return (
    <>
      <DrawerNavegacaoProvider>
        <CabecalhoApp />
        <DrawerNavegacaoApp />
      </DrawerNavegacaoProvider>
      <ContainerApp>
        {children}
      </ContainerApp>
    </>
  )
}