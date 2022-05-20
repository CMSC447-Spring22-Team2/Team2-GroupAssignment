import { useMap } from 'react-leaflet'
import { useEffect } from 'react'

import L from 'leaflet'

export default function Legend() {
  const map = useMap()
  console.log(map)

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
  // const legend = L.control({ position: 'bottomright' })

  useEffect(() => {
    if (map) {
      const legend = L.control({ position: 'bottomright' })

      legend.onAdd = () => {
        const div = L.DomUtil.create('div', 'info legend')
        const grades = [0, 100, 200, 500, 1000, 2000, 3000, 4000]
        let labels = []
        let from
        let to

        for (let i = 0; i < grades.length; i++) {
          from = grades[i]
          to = grades[i + 1]

          labels.push(
            '<i style="background:' +
              getColor(from + 1) +
              '"></i> ' +
              from +
              (to ? '&ndash;' + to : '+')
          )
        }

        div.innerHTML = labels.join('<br>')
        console.log(div)
        return div
      }

      legend.addTo(map)
    }
  }, [map]) //here add map
  return null

  legend.onAdd = () => {
    const div = L.DomUtil.create('div', 'info legend')
    const grades = [0, 10, 20, 50, 100, 200, 500, 1000]
    let labels = []
    let from
    let to

    for (let i = 0; i < grades.length; i++) {
      from = grades[i]
      to = grades[i + 1]

      labels.push(
        '<i style="background:' +
          getColor(from + 1) +
          '"></i> ' +
          from +
          (to ? '&ndash;' + to : '+')
      )
    }

    div.innerHTML = labels.join('<br>')
    return div
  }

  // const { map } = this.props.leaflet
  legend.addTo(map)
  return null
}
