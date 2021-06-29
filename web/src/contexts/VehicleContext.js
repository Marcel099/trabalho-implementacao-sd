import { useEffect, useState, createContext } from "react"
// import { api_soap } from "../services/api_soap"

const vehiclesReceived = [
  {
    codigo: 1,
    placa: 'BRA2E19',
    tipo: 1,
    descricao: 'Carro',
    visivelTodos: true,
    instituicao: 1,
  },
  {
    codigo: 2,
    placa: 'RIO2A18',
    tipo: 5,
    descricao: 'Caminhão',
    visivelTodos: false,
    instituicao: 2,
  },
  {
    codigo: 3,
    placa: 'BRA0S17',
    tipo: 2,
    descricao: 'Moto',
    visivelTodos: true,
    instituicao: 1,
  },
  {
    codigo: 4,
    placa: 'PLQ8F28',
    tipo: 4,
    descricao: 'Ambulância',
    visivelTodos: true,
    instituicao: 4,
  },
  {
    codigo: 5,
    placa: 'LSN4I49',
    tipo: 1,
    descricao: 'Carro',
    visivelTodos: false,
    instituicao: 2,
  },
]

export const VehicleContext = createContext({});

export function VehicleContextProvider({ children }) {
  const [ vehicles, setVehicles ] = useState([])

  useEffect(() => {
    async function buscarVeiculos() {
      //let vehiclesReceived = await api_soap.get('listVeiculos')

      setVehicles(vehiclesReceived)
    }

    buscarVeiculos()
  }, [])

  const vehiclesInstitutions = [
    { id: 1, nome: 'Carro' },
    { id: 2, nome: 'Moto' },
    { id: 3, nome: 'Bicicleta' },
    { id: 4, nome: 'Ambulância' },
    { id: 5, nome: 'Caminhão' },
    { id: 6, nome: 'Caminhonete' },
    { id: 7, nome: 'Quadriciclo' },
    { id: 8, nome: 'Outro' },
  ]

  const vehiclesTypes = [
    { id: 1, nome: 'Polícia Civil' },
    { id: 2, nome: 'Brigada Militar' },
    { id: 3, nome: 'Bombeiros' },
    { id: 4, nome: 'Samu' },
  ]

  return (
    <VehicleContext.Provider
      value={{
        vehicles,
        vehiclesInstitutions,
        vehiclesTypes
      }}
    >
      { children }
    </VehicleContext.Provider>
  )
  }





