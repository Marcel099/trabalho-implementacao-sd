import { useContext } from 'react'
import { VehicleContext } from '../contexts/VehicleContext'

export function useVehicle() {
  const value = useContext(VehicleContext)

  return value
}