import { MapContainer, TileLayer, GeoJSON, Popup } from 'react-leaflet'
import L from 'leaflet'
import Base from '../data/Basemap_of_DC.json'
import Cluster from '../data/Neighborhood_Clusters.json'
import 'leaflet/dist/leaflet.css'
import { useRouter } from 'next/router'

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

  const clusterStyle = {
    fillColor: 'red',
    fillOpacity: 0.1,
    color: 'dimgray',
    weight: 3,
  }

  const position = [state.center.lng, state.center.lat]
  const geojson = L.geoJson(Cluster, {
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
      fillOpacity: 0.7,
    })

    layer.bringToFront()
  }

  const resetHighlight = (e) => {
    geojson.resetStyle(e.target)
  }

  const onEachFeature = (cluster, layer) => {
    const name = cluster.properties.NAME
    const nbhNames = cluster.properties.NBH_NAMES

    layer.bindPopup(name)
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
