import { useMap } from 'react-leaflet'
import { useEffect } from 'react'

import GetColor from '../../util/GetColor'

import L from 'leaflet'

export default function Legend() {
  const map = useMap()
  console.log(map)

  useEffect(() => {
    if (map) {
      const legend = L.control({ position: 'bottomright' })

      legend.onAdd = () => {
        const div = L.DomUtil.create('div', 'info legend')
        const grades = [0, 100, 200, 500, 1000, 2000, 3000, 4000]
        let labels = []
        let from
        let to
        div.innerHTML += '<h4># of Crimes</h4>'
        for (let i = 0; i < grades.length; i++) {
          from = grades[i]
          to = grades[i + 1]

          labels.push(
            '<i style="background:' +
              GetColor(from + 1) +
              '"></i> ' +
              from +
              (to ? '&ndash;' + to : '+')
          )
        }

        div.innerHTML += labels.join('<br>')
        console.log(div)
        return div
      }

      legend.addTo(map)
    }
  }, [map])

  return null
}
