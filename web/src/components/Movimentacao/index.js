import React, { useState, useEffect } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

import { api_rest } from '../../services/api_rest'
import { api_soap } from '../../services/api_soap'

import './styles.css'

export function Movimentacao() {
  const [ listaPosicoesVeiculos, setListaPosicoesVeiculos ] = useState([])
  const [ initialPosition, setInitialPosition ] = useState([
    -28.25346343191986,
    -52.39588558673859
  ])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;

      setInitialPosition([latitude, longitude])
    })
  }, [])


  
  useEffect(() => {
    // async function requestPosition(vehicle) {
    //   return await api_rest.get('/posicao/select', {
    //     params: {
    //       vehicleID: vehicle.codigo
    //     }
    //   })
    // }

    async function handleBuscaPosicoes() {
      const lista_posicoes_falsas = [
        [ -28.2954466, -52.4465927 ],
        [ -28.2385866, -52.456597 ],
        [ -28.2277466, -52.3468827 ],
        [ -28.2900466, -52.4065576 ],
        [ -28.2923466, -52.4425617 ],
      ]

      setListaPosicoesVeiculos(lista_posicoes_falsas)

      // const lista_veiculos = await api_soap.get('lista-veiculo')

      // const lista_codigo_veiculo = lista_veiculos.map(veiculo => veiculo.codigo)

      // const lista_posicoes = await Promise.all(lista_codigo_veiculo.map(requestPosition))
      //   .map(posicao => [posicao.Posicao.Latitude, posicao.Posicao.Longitude])
      
      // setListaPosicoesVeiculos(lista_posicoes)
    }

    handleBuscaPosicoes()
  }, [])

  return (
    <div id="container-movimentacao">
      <h2>Movimentação de um veículo em um período</h2>
      <Map center={initialPosition} zoom={15}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <Marker position={selectedPosition}/> */}
        {/* <Marker position={initialPosition}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker> */}
        { listaPosicoesVeiculos.map((position, idx) => (
          <Marker position={position} key={idx} />
        )) }
      </Map>
    </div>
  )
}