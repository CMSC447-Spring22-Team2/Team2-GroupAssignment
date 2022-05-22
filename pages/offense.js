import style from '../styles/Offense.module.css'

import BarChart from '../components/chart/BarChart'
import DoughnutChart from '../components/chart/DoughnutChart'

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

import styles from '../styles/Home.module.css'
import Slider from '@mui/material/Slider'

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

import Labels from '../data/Labels.json'
import { useState } from 'react'
export default function offense({ data, filtered }) {
  const offenseTypeLabels = Labels.offense_types
  const offenseGroupLabels = Labels.offense_group

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

  const { offenseTypeData, offenseGroupData, dateData, timeData } =
    getChartData(chartData, offenseTypeLabels, offenseGroupLabels)

  return (
    <main>
      <title>Offense Type</title>
      <div className={style.title}>
        <h1>Distribution of Crimes by Offense</h1>
        {/* <p>{data[0].offense_key}</p> */}
      </div>
      <div>
        <Slider
          getAriaLabel={() => 'Select Range of Dates'}
          value={value}
          onChange={handleChange}
          onChangeCommitted={handleChange}
          valueLabelDisplay="auto"
          valueLabelFormat={(v) => months_range[v]}
          marks={marks}
          min={0}
          max={24}
        />
        <BarChart
          labels={offenseTypeLabels}
          data={offenseTypeData}
          // maxUnit={22000}
        />
        <DoughnutChart labels={offenseGroupLabels} data={offenseGroupData} />
      </div>
    </main>
  )
}

offense.getInitialProps = async (ctx) => {
  // console.log('Initial props')
  const id = ctx.query.id
  const res = await fetch(`http://localhost:3000/api/cluster/`)
  const json = await res.json()

  const filtered = sortByDate(json, Labels.months_range)
  // console.log(filtered)

  return { data: json, filtered: filtered }
}

// export async function getStaticProps() {
//   const res = await fetch('/api/cluster')
//   const data = await res.json()

//   return {
//     props: {
//       data,
//     },
//   }
// }
