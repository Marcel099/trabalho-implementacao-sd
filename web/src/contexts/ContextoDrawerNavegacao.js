import { createContext, useState } from "react";

export const ContextoDrawerNavegacao = createContext({})

export function DrawerNavegacaoProvider({children}) {
  const anchor = 'left'

  const [isActive, setIsActive] = useState(false);


  const toggleDrawer = (open) => (e) => {
    if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
      return
    }

    setIsActive(open)
  };

  return (
    <ContextoDrawerNavegacao.Provider value={{
      anchor,
      isActive,
      toggleDrawer,
    }}>
      {children}
    </ContextoDrawerNavegacao.Provider>
  )
}