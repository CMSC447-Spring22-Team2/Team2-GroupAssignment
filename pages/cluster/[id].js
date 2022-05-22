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

import { useRouter } from 'next/router'
import useSWR from 'swr'
import moment from 'moment'

import style from '../../styles/Offense.module.css'
import styles from '../../styles/Home.module.css'

import Labels from '../../data/Labels.json'
import ParseHour from '../../lib/ParseHour'

import BarChart from '../../components/chart/BarChart'
import LineChart from '../../components/chart/LineChart'
import DoughnutChart from '../../components/chart/DoughnutChart'

import { getChartData, sortByDate } from '../../lib/FilterData'

import Slider from '@mui/material/Slider'
import Box from '@mui/material/Box'
import { useState } from 'react'

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

// const fetcher = async (url) => await fetch(url).then((res) => res.json())

export default function Cluster({ data, filtered }) {
  const router = useRouter()
  const id = router.query.id

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

  const { offenseTypeData, offenseGroupData, dateData, timeData } =
    getChartData(chartData, offenseTypeLabels, offenseGroupLabels)

  return (
    <main>
      <title>Cluster {id}</title>
      <div className={style.title}>
        <h1>Cluster {id}</h1>
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
        {/* <BarChart
          labels={offenseTypeLabels}
          data={offenseTypeData}
          // maxUnit={1100}
        />

        <DoughnutChart labels={offenseGroupLabels} data={offenseGroupData} /> */}
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

Cluster.getInitialProps = async (ctx) => {
  // console.log('Initial props')
  const id = ctx.query.id
  const res = await fetch(`http://localhost:3000/api/cluster/${id}`)
  const json = await res.json()

  const filtered = sortByDate(json, Labels.months_range)
  // console.log(filtered)

  return { data: json, filtered: filtered }
}
// export async function getStaticPaths() {
//   const paths = []
//   for (var i = 1; i <= 46; i++) {
//     paths.push({
//       params: {
//         id: i.toString(),
//       },
//     })
//   }
//   // console.log(paths)
//   return { paths, fallback: false }
// }

// // async function getData(path) {
// //   const res = await fetch(path)

// //   return res
// // }

// export async function getStaticProps({ params }) {
//   const path = `/api/cluster/${params.id}`
//   const res = await fetch(path)
//   const data = await res.json()

//   return {
//     props: {
//       data,
//     },
//   }
// }
