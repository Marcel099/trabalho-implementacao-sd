import React, { useState } from 'react';
import { 
  TextField,
  Select,
  FormControl,
  InputLabel,
  Button,
} from '@material-ui/core';

import { useVehicle } from '../../../hooks/useVehicle';

import { api_rest } from '../../../services/api_rest';

export function NewLocalizacao() {
  const {
    vehicles: listaVeiculos,
  } = useVehicle()

  const [idVeiculo, setIdVeiculo] = useState(null)

  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  

  async function handleSubmit(event){
    event.preventDefault()

    try {
      const dateFormatted = String( new Date().getTime() ).slice(0, -3)

      await api_rest.post('/posicao/insert', {
        codigo: idVeiculo,
        datahora: dateFormatted,
        latitude: latitude,
        longitude: longitude,
      })

      alert('Nova localização cadastrada com sucesso')
    } catch(e) {
      console.erro(e)
      alert('Ocorreu um erro ao salvar')
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <InputLabel htmlFor="cadastro-localizacao-veiculo">Veículo</InputLabel>
          <Select 
            native
            onChange={event => setIdVeiculo(Number(event.target.value))} 
            inputProps={
            {
              name: 'veiculo',
              id: 'cadastro-localizacao-veiculo'
            }}
          >
            {listaVeiculos.map(function(veiculo){
              return(
                <option key={veiculo.codigo} value={veiculo.codigo}>
                  {veiculo.descricao}
                </option>
              )
            })}
          </Select>
        </FormControl>
        <br />
        <TextField 
          type="number"
          label="latitude" 
          onChange={event => setLatitude(event.target.value)}
          value={latitude}
          style={{paddingRight: "16px"}}
        />
        <TextField
          type="number"
          label="longitude"
          onChange={event => setLongitude(event.target.value)}
          value={longitude} 
        />
        <br/><br/>
        <Button 
          type="submit"
          variant="contained" 
          color="primary"
        >
          Cadastrar Localização
        </Button>
      </form>
    </div>
  )
}
