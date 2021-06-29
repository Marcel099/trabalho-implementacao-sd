import React, { useEffect, useState } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';

import { 
  // TextField,
  FormControl,
  Select,
  InputLabel,
  Button,
} from '@material-ui/core';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';

import { useVehicle } from '../../hooks/useVehicle';

import { api_rest } from '../../services/api_rest'

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

export function Movimentacao() {
  const classes = useStyles();

  const {
    vehicles,
  } = useVehicle()

  const now = new Date()
  const oneDayBefore = new Date( now.getTime() - 24 * 60 * 60 * 1000 )

  const [ idVehicle, setIdVehicle ] = useState(0)
  const [ initialDate, setInitialDate ] = useState(oneDayBefore);
  const [ finalDate, setFinalDate ] = useState(now);

  const [ initialPosition, setInitialPosition ] = useState([
    -28.25346343191986,
    -52.39588558673859
  ])
  const [ positions, setPositions ] = useState([])

  // const [ choosenVehicle, setChoosenVehicle ] = useState(null)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;

      setInitialPosition([latitude, longitude])
    })
  }, [])

  const handleInitialDateChange = (date) => {
    setInitialDate(date);
  };

  const handleFinalDateChange = (date) => {
    setFinalDate(date);
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    
    async function handleBuscaPosicoes() {
      const initialDateFormatted = String( initialDate.getTime() ).slice(0, -3)
      const finalDateFormatted = String( finalDate.getTime() ).slice(0, -3)

      const positionsReceived = await api_rest.get('/posicao/select-list', {
        params: {
          vehicleID: idVehicle,
          firstTime: initialDateFormatted,
          secTime: finalDateFormatted,
        }
      })

      // setChoosenVehicle(vehicles.find(({ codigo }) => idVehicle.codigo === codigo))
      setPositions(positionsReceived.data)
    } 

    handleBuscaPosicoes()
  }

  return (
    <div id="container-movimentacao">
      {/* <h2>Última Localização dos Veículos de uma Instituição</h2> */}
      <form onSubmit={handleSubmit}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="movimentacao-idveiculo">Veículo</InputLabel>
          <Select
            native
            value={idVehicle}
            onChange={event => setIdVehicle( Number(event.target.value) )}
            inputProps={{
              name: 'idveiculo',
              id: 'movimentacao-idveiculo',
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

        <br/>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            margin="normal"
            id="movimentacao-data-inicial"
            label="Data Inicial"
            format="dd/MM/yyyy"
            value={initialDate}
            onChange={handleInitialDateChange}
            KeyboardButtonProps={{
              'aria-label': 'Alterar a data inicial',
            }}
            style={{
              paddingRight: "16px"
            }}
          />
          <KeyboardTimePicker
            margin="normal"
            id="movimentacao-horario-inicial"
            label="Horário Inicial"
            value={initialDate}
            onChange={handleInitialDateChange}
            KeyboardButtonProps={{
              'aria-label': 'Alterar o horário inicial',
            }}
          />
        </MuiPickersUtilsProvider>    
        <br/>

        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            margin="normal"
            id="movimentacao-data-final"
            label="Data Final"
            format="dd/MM/yyyy"
            value={finalDate}
            onChange={handleFinalDateChange}
            KeyboardButtonProps={{
              'aria-label': 'Alterar a data final',
            }}
            style={{
              paddingRight: "16px"
            }}
          />
          <KeyboardTimePicker
            margin="normal"
            id="movimentacao-horario-final"
            label="Horário Final"
            value={finalDate}
            onChange={handleFinalDateChange}
            KeyboardButtonProps={{
              'aria-label': 'Alterar o horário final',
            }}
          />
          <br/>

          <Button
            type="submit"
            variant="contained" 
            color="primary"
          >
            Buscar
          </Button>
        </MuiPickersUtilsProvider> 
      </form>

      <Map center={initialPosition} zoom={15}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        { positions.map(({
          seq,
          Latitude,
          Longitude,
          DataHora,
        }) => (
          <Marker position={[Latitude, Longitude]} key={seq}>
            <Popup>
              {
                Intl.DateTimeFormat('pt-BR', {
                  year: 'numeric', month: 'numeric', day: 'numeric',
                  hour: 'numeric', minute: 'numeric', second: 'numeric',
                  hour12: false,
                }).format(new Date(DataHora))
              }
            </Popup>
          </Marker>
        )) }
      </Map>
    </div>
  )
}
