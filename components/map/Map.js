import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet'
import { useRouter } from 'next/router'
import L from 'leaflet'

import Cluster from '../../data/Neighborhood_Clusters.json'
import Legend from './Legend'

import 'leaflet/dist/leaflet.css'

import useSWR from 'swr'
import Labels from '../../data/Labels.json'

const fetcher = async (url) => await fetch(url).then((res) => res.json())

export default function Map() {
  const router = useRouter()
  const state = {
    center: {
      lng: 38.9072,
      lat: -77.0369,
    },
    zoom: 13,
    scroll: false,
  }

  const totalCrimes = Labels.total_crimes

  const getColor = (d) => {
    return d > 4000
      ? '#800026'
      : d > 3000
      ? '#BD0026'
      : d > 2000
      ? '#E31A1C'
      : d > 1000
      ? '#FC4E2A'
      : d > 500
      ? '#FD8D3C'
      : d > 200
      ? '#FEB24C'
      : d > 100
      ? '#FED976'
      : '#FFEDA0'
  }

  // const { data, error } = useSWR(`/api/cluster/`, fetcher)
  // console.log(Object.keys(data ?? []).length)

  const clusterStyle = (feature) => {
    const id = feature.properties.NAME.replace(/\D/g, '')
    return {
      // fillColor: 'red',
      fillColor: getColor(totalCrimes[`cluster ${id}`]),
      fillOpacity: 0.5,
      color: 'dimgray',
      weight: 3,
    }
  }

  const position = [state.center.lng, state.center.lat]
  const geojson = L.geoJSON(Cluster, {
    style: clusterStyle,
    onEachFeature: onEachFeature,
  })

  const onClusterClick = (e) => {
    const id = e.target.feature.properties.NAME.replace(/\D/g, '')
    router.push(`/cluster/${id}`)
  }

  const highlightFeature = (e) => {
    const layer = e.target

    layer.setStyle({
      weight: 5,
      color: 'black',
      fillOpacity: 0.8,
    })
    // layer.bindPopup(layer.feature.properties.NAME).openPopup()
    layer.bringToFront()
  }

  const resetHighlight = (e) => {
    geojson.resetStyle(e.target)
  }

  const onEachFeature = (cluster, layer) => {
    const name = cluster.properties.NAME
    const nbhNames = cluster.properties.NBH_NAMES

    layer.on({
      click: onClusterClick,
      mouseover: highlightFeature,
      mouseout: resetHighlight,
    })
  }

  return (
    <>
      <MapContainer
        center={position}
        zoom={state.zoom}
        scrollWheelZoom={state.scroll}
        style={{ height: '700px' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSON
          data={Cluster}
          style={clusterStyle}
          onEachFeature={onEachFeature}
        />
        <Legend />
      </MapContainer>
    </>
  )
}
