import React, { useEffect, useState } from 'react';
import { 
  TextField,
  Select,
  FormControl,
  InputLabel,
  Button,
} from '@material-ui/core';

//import { api_rest } from '../../../services/api_rest';
//import { api_soap } from '../../../services/api_soap';

export function NewLocalizacao() {
  
  const [listaVeiculos, setListaVeiculos] = useState([])

  const [idVeiculo, setIdVeiculo] = useState(null)

  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')

  

  useEffect(function(){
    function buscarVeiculos(){
    //let listaVeiculosRecebidos = await api_soap.get('listVeiculos')
    
    const listaVeiculosRecebidos=[
        {
          nome: 'Ambulancia samu carro de policia',
          id: 1,
        },
        {
          nome: 'carro',
          id: 2,
        },
      ]

      setListaVeiculos(listaVeiculosRecebidos)
    }

    buscarVeiculos()
    
  }, [])
  

  async function handleSubmit(event){
    event.preventDefault()

    const data= {
      latitude: latitude,
      longitude: longitude,
      idVeiculo: idVeiculo,
    }

    console.log(data)
    
    //await api_rest.post('/posicao/insert', data)
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
                <option key={veiculo.id} value={veiculo.id}>
                  {veiculo.nome}
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
          Atualizar Localização
        </Button>
      </form>
    </div>
  )
}
