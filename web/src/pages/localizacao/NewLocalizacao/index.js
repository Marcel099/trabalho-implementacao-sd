import React from 'react';
import { 
  TextField,
  Select,
  FormControl,
  InputLabel,
  Button,
} from '@material-ui/core';

//import { api_rest } from '../../../services/api_rest';

export function NewLocalizacao() {
  //const data = {
    //veiculo,
    //latitude, 
    //longitude 
  //}
  // console.log('data', data)
  //const response = api_rest.post('points', data)
  const listaVeiculos=[
    {
      nome: 'Ambulancia samu carro de policia',
      id: 1,
    },
    {
      nome: 'carro',
      id: 2,
    },
  ]

  function handleSubmit(event){
    event.preventDefault()
    console.log("Enviou!")
    
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <InputLabel htmlFor="cadastro-localizacao-veiculo">Veículo</InputLabel>
          <Select native inputProps={{
            name: 'veiculo',
            id: 'cadastro-localizacao-veiculo'
          }}>
            {listaVeiculos.map(function(veiculo){
              return(<option key={veiculo.id}>{veiculo.nome}</option>)
            })}
          </Select>
        </FormControl>
        <br />
        <TextField label="latitude" />
        <TextField label="longitude" />
        <br/><br/>
        <Button variant="contained" color="primary">
          Atualizar Localização
        </Button>
      </form>
    </div>
  )
}
