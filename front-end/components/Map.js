import { MapContainer, TileLayer, GeoJSON, Popup } from 'react-leaflet'
import { useState } from 'react'
import L from 'leaflet'
import Cluster from '../data/Neighborhood_Clusters.json'
import { useRouter } from 'next/router'

import 'leaflet/dist/leaflet.css'

export default function Map() {
  const [cluster, setCluster] = useState(null)
  const router = useRouter()

  const state = {
    center: {
      lng: 38.9072,
      lat: -77.0369,
    },
    zoom: 13,
    scroll: false,
  }

  const clusterStyle = {
    fillColor: 'red',
    fillOpacity: 0.1,
    color: 'black',
    weight: 3,
  }

  const position = [state.center.lng, state.center.lat]
  const geojson = L.geoJson(Cluster, {
    style: clusterStyle,
    onEachFeature: onEachFeature,
  })

  const openCluster = (e) => {
    const id = e.target.feature.properties.NAME.replace(/\D/g, '')
    router.push(`/cluster/${id}`)
  }

  const highlightFeature = (e) => {
    const layer = e.target

    layer.setStyle({
      weight: 5,
      color: '#666',
      dashArray: '',
      fillOpacity: 0.7,
    })
    layer.bringToFront()
    // setCluster(layer.feature.properties.NAME)
  }

  const resetHighlight = (e) => {
    const layer = e.target
    setCluster('Cluster')
    layer.closePopup()
    geojson.resetStyle(e.target)
  }

  const onEachFeature = (cluster, layer) => {
    const name = cluster.properties.NAME
    const nbhNames = cluster.properties.NBH_NAMES

    layer.bindPopup(name)
    layer.on({
      click: openCluster,
      mouseover: highlightFeature,
      mouseout: resetHighlight,
    })
  }

  return (
    <>
      <p>{cluster}</p>
      <MapContainer
        center={position}
        zoom={state.zoom}
        scrollWheelZoom={state.scroll}
        style={{ height: '750px' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <GeoJSON data={Base} /> */}
        <GeoJSON
          data={Cluster}
          style={clusterStyle}
          onEachFeature={onEachFeature}
        />
      </MapContainer>
    </>
  )
}
