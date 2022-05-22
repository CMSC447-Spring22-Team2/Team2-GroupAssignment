import styles from '../styles/Time.module.css'

import LineChart from '../components/chart/LineChart'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

import useSWR from 'swr'

import { getChartData, sortByDate } from '../lib/FilterData'

ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend
)
import Slider from '@mui/material/Slider'
import { useState } from 'react'

import Labels from '../data/Labels.json'

import ParseHour from '../lib/ParseHour'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function time({ data, filtered }) {
  const [chartData, setChartData] = useState(filtered)

  const months_range = Labels.months_range

  const marks = [
    {
      value: 0,
      label: months_range[0],
    },
    {
      value: 24,
      label: months_range[24],
    },
  ]

  const [value, setValue] = useState([0, 24])

  const handleChange = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return
    }

    setValue(newValue)

    const slice = filtered.slice(value[0], value[1] + 1)
    setChartData(slice)
  }

  const offenseTypeLabels = Labels.offense_types
  const offenseGroupLabels = Labels.offense_group

  const { dateData, timeData } = getChartData(
    chartData,
    offenseTypeLabels,
    offenseGroupLabels
  )
  return (
    <main>
      <title>Time of Crimes</title>
      <div className={styles.title}>
        <h1>Distribution of Crimes by Time</h1>
      </div>
      <div>
        <Slider
          value={value}
          onChange={handleChange}
          onChangeCommitted={handleChange}
          valueLabelDisplay="auto"
          valueLabelFormat={(v) => months_range[v]}
          marks={marks}
          min={0}
          max={24}
        />
        <LineChart
          title={'# of Crimes per Month'}
          data={dateData}
          unit={'month'}
        />
        <LineChart
          title={'# of Crimes per Hour'}
          data={timeData}
          unit={'hour'}
          minUnit={ParseHour(0)}
        />
      </div>
    </main>
  )
}

time.getInitialProps = async (ctx) => {
  // console.log('Initial props')
  const id = ctx.query.id
  const res = await fetch(`http://localhost:3000/api/cluster/`)
  const json = await res.json()

  const filtered = sortByDate(json, Labels.months_range)
  // console.log(filtered)

  return { data: json, filtered: filtered }
}
