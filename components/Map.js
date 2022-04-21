import { MapContainer, TileLayer, GeoJSON, Popup } from 'react-leaflet'
import L from 'leaflet'
import Base from '../data/Basemap_of_DC.json'
import Cluster from '../data/Neighborhood_Clusters.json'
import 'leaflet/dist/leaflet.css'

export default function Map() {
  const state = {
    center: {
      lng: 38.9072,
      lat: -77.0369,
    },
    zoom: 13,
    scroll: true,
  }

  const clusterStyle = {
    fillColor: 'red',
    fillOpacity: 0.1,
    color: 'black',
    weight: 2,
  }

  const position = [state.center.lng, state.center.lat]

  const onClusterClick = (e) => {
    console.log(e)
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
  }

  const resetHighlight = (e) => {
    geojson.resetStyle(e.target)
  }

  const onEachCluster = (cluster, layer) => {
    const name = cluster.properties.NAME
    const nbhNames = cluster.properties.NBH_NAMES

    layer.bindPopup(name)
    layer.on({
      click: onClusterClick,
      mouseover: highlightFeature,
      mouseout: resetHighlight,

      // console.log(name)
      // console.log(nbhNames)
    })
  }

  const geojson = L.geoJson(Cluster, {
    style: clusterStyle,
    onEachFeature: onEachCluster,
  })

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
          onEachFeature={onEachCluster}
        />
      </MapContainer>
    </>
  )
}
