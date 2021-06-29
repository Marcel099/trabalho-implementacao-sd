import React, { useState, useEffect } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

import {
  FormControl,
  InputLabel,
  Select,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { useVehicle } from '../../hooks/useVehicle';

import { api_rest } from '../../services/api_rest'
// import { api_soap } from '../../services/api_soap'

import './styles.css'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export function UltimaLocalizacaoVeiculos() {
  const classes = useStyles();

  const {
    vehicles,
    vehiclesInstitutions,
    vehiclesTypes,
  } = useVehicle()

  const [ idInstitution, setIdInstitution ] = useState(0)
  const [ vehicleType, setVehicleType ] = useState(0)
  const [ idVehicle, setIdVehicle ] = useState(0)

  const [ initialPosition, setInitialPosition ] = useState([
    -28.25346343191986,
    -52.39588558673859
  ])
  const [ initialVehiclesWithPositions, setInitialVehiclesWithPositions ] = useState([])
  const [ vehiclesWithPositions, setVehiclesWithPositions ] = useState([])

  function filterVehicles(vehicles) {
    return vehicles
      .filter(({instituicao}) => idInstitution === 0 || idInstitution === instituicao)
      .filter(({tipo}) => vehicleType === 0 || vehicleType === tipo)
      .filter(({codigo}) => idVehicle === 0 || idVehicle === codigo)
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;

      setInitialPosition([latitude, longitude])
    })
  }, [])
  
  useEffect(() => {
    async function requestPosition(vehicle) {
      const response = await api_rest.get('/posicao/select', {
        params: {
          vehicleID: vehicle.codigo
        }
      })

      if (response.status === 200)
        return response.data
      else
        throw `Error with status code ${response.status}`
    }

    async function handleBuscaPosicoes() {
      const vehiclesFiltered = filterVehicles(vehicles)
      
      Promise.all(
        vehiclesFiltered.map( requestPosition )
      )
        .then((positionsReceived) => {
          const vehiclesWithPositions = positionsReceived.map((position, idx) => ({
            position: [position.Latitude, position.Longitude],
            ...vehicles[idx]
          }))
          
          setInitialVehiclesWithPositions(vehiclesWithPositions)
          setVehiclesWithPositions(vehiclesWithPositions)
        })
        .catch(e => console.log(e))
    }

    handleBuscaPosicoes()
  }, [ vehicles, vehiclesInstitutions, vehiclesTypes ])

  useEffect(() => {
    const vehiclesWithPositions = filterVehicles(initialVehiclesWithPositions)

    setVehiclesWithPositions(vehiclesWithPositions)
  }, [ idInstitution, vehicleType, idVehicle ])

  return (
    <div id="container-localizacao-veiculos">
      <h2>Movimentação de um veículo em um período</h2>
      <form onSubmit={e => e.preventDefault()}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="localizacao-idintituicao">Instituição</InputLabel>
          <Select
            native
            value={idInstitution}
            onChange={event => setIdInstitution( Number(event.target.value) )}
            inputProps={{
              name: 'instituicao',
              id: 'localizacao-idintituicao',
            }}
          >
            <option aria-label="Nada" value="" />
            {vehiclesInstitutions.map((vehicleInstitution) => (
              <option value={vehicleInstitution.id} key={vehicleInstitution.id}>
                {vehicleInstitution.nome}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="localizacao-tipo-veiculo">Tipo</InputLabel>
          <Select
            native
            value={vehicleType}
            onChange={event => setVehicleType( Number(event.target.value) )}
            inputProps={{
              name: 'tipo',
              id: 'localizacao-tipo-veiculo',
            }}
          >
            <option aria-label="Nada" value="" />
            {vehiclesTypes.map((vehicleType) => (
              <option value={vehicleType.id} key={vehicleType.id}>
                {vehicleType.nome}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="localizacao-idveiculo">Veículo</InputLabel>
          <Select
            native
            value={idVehicle}
            onChange={event => setIdVehicle( Number(event.target.value) )}
            inputProps={{
              name: 'idveiculo',
              id: 'localizacao-idveiculo',
            }}
          >
            <option aria-label="Nada" value="" />
            {vehicles.map((vehicle) => (
              <option value={vehicle.codigo} key={vehicle.codigo}>
                {vehicle.descricao}
              </option>
            ))}
          </Select>
        </FormControl>
      </form>
      
      <Map center={initialPosition} zoom={15}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        { vehiclesWithPositions.map(({
          codigo,
          descricao,
          position,
        }, idx) => (
          <Marker position={position} key={codigo}>
            <Popup>
              { descricao }
            </Popup>
          </Marker>
        )) }
      </Map>
    </div>
  )
}