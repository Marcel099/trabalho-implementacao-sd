import React, { useState, useEffect } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
// import { api_rest } from '../../services/api_rest'

import './styles.css'

export function Movimentacao() {

  const [initialPosition, setInitialPosition] = useState([
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
    api_rest
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
        <Marker position={initialPosition}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </Map>
    </div>
  )
}