import React, { useEffect, useState } from 'react';
import 'date-fns';
import { 
  TextField,
  Select,
  FormControl,
  InputLabel,
  Button,
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export function Simulador() {

  const [listaVeiculos, setListaVeiculos] = useState([])

  const [idVeiculo, setIdVeiculo] = useState(null)

  const [latitudePi, setLatitudePi] = useState('')
  const [longitudePi, setLongitudePi] = useState('')

  const [latitudePf, setLatitudePf] = useState('')
  const [longitudePf, setLongitudePf] = useState('')

  const [tempoViagem, setTempoViagem] = useState('')

  const [selectedDate, setSelectedDate] = useState(new Date('2014-08-18T21:11:54'));
  
    

  useEffect(function(){
    function buscarVeiculos(){
    // let listaVeiculosRecebidos = await api_soap.get('listVeiculos')
    
    const listaVeiculosRecebidos=[
        {
          nome: 'Carro 1',
          id: 1,
        },
        {
          nome: 'Carro 2',
          id: 2,
        },
        {
          nome: 'Carro 3',
          id: 3,
        },
        {
          nome: 'Carro 4',
          id: 4,
        },
        {
          nome: 'Carro 5',
          id: 5,
        },
      ]

      setListaVeiculos(listaVeiculosRecebidos)
    }

    buscarVeiculos()
    
  }, [])

  async function handleSubmit(event){
    event.preventDefault()

    const data= {
      latitudePi: latitudePi,
      longitudePi: longitudePi,
      latitudePf: latitudePf,
      longitudePf: longitudePf,
      tempoViagem: tempoViagem,
      idVeiculo: idVeiculo,
    }

    console.log(data)
    
    //await api_rest.post('/posicao/insert', data)
  }

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <InputLabel htmlFor="rastreamento-localizacao-veiculo">Veículo</InputLabel>
          <Select 
            native
            onChange={event => setIdVeiculo(Number(event.target.value))} 
            inputProps={
            {
              name: 'veiculo',
              id: 'rastreamento-localizacao-veiculo'
            }}
          >
            {listaVeiculos.map(function(veiculo){
              return(
                <option key={veiculo.id} value={veiculo.id}>
                  {veiculo.nome}
                </option>
              )
            })}
          </Select>
        </FormControl>
        <br/><br/>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            margin="normal"
            id="date-picker-dialog"
            label="Data Inicial"
            format="dd/MM/yyyy"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            style={{
              paddingRight: "16px"
            }}
          />
          <KeyboardTimePicker
            margin="normal"
            id="time-picker"
            label="Horário Inicial"
            value={selectedDate}
            onChange={handleDateChange}
            KeyboardButtonProps={{
              'aria-label': 'change time',
            }}
          />
        </MuiPickersUtilsProvider>
        <br/><br/>
        <p style={{
          fontSize: "150%"
        }}>Posição Inicial</p>
        <TextField 
          type="number"
          label="latitude" 
          onChange={event => setLatitudePi(event.target.value)}
          value={latitudePi}
          style={{paddingRight: "16px"}}
        />
        <TextField
          type="number"
          label="longitude"
          onChange={event => setLongitudePi(event.target.value)}
          value={longitudePi} 
        />
        <br/><br/>
        <p style={{
          fontSize: "150%"
        }}>Posição Final</p>
        <TextField 
          type="number"
          label="latitude" 
          onChange={event => setLatitudePf(event.target.value)}
          value={latitudePf}
          style={{paddingRight: "16px"}}
        />
        <TextField
          type="number"
          label="longitude"
          onChange={event => setLongitudePf(event.target.value)}
          value={longitudePf} 
        />
        <br/><br/>
        <TextField
          type="number"
          label="Tempo de Viagem (em segundos)"
          onChange={event => setTempoViagem(event.target.value)}
          value={tempoViagem} 
          style={{width: "19em"}}
        />
        <br/><br/>
        <Button 
          type="submit"
          variant="contained" 
          color="primary"
        >
          Enviar
        </Button>
        </form>
    </div>
  )
}