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

import BarChart from '../../components/chart/BarChart'
import LineChart from '../../components/chart/LineChart'
import DoughnutChart from '../../components/chart/DoughnutChart'

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

const fetcher = (url) => fetch(url).then((res) => res.json())
const parseHour = (hour) => {
  return moment(hour, 'HH')
}

export default function Cluster() {
  const router = useRouter()
  const id = router.query.id

  const { data, error } = useSWR(`/api/cluster/${id}`, fetcher)

  const offenseTypeLabels = Labels.offense_types
  const offenseGroupLabels = Labels.offense_group

  const offenseTypeData = offenseTypeLabels.map(() => 0)
  const offenseGroupData = offenseGroupLabels.map(() => 0)
  const dateData = []
  // const timeData = Array(24).fill(0)
  const timeData = []

  for (let i in data) {
    offenseTypeData[offenseTypeLabels.indexOf(data[i].offense)]++
    offenseGroupData[offenseGroupLabels.indexOf(data[i].offense_group)]++

    if (data[i].start_date != '') {
      const split = data[i].start_date.split(',')
      const date = split[0]
      const time = split[1]

      const formatDate = moment(new Date(date)).format('YYYY-MM')
      const formatTime = moment(time, ['h:mm A']).format('HH')

      const dateIndex = dateData.findIndex(
        (element) => element.x === formatDate
      )
      if (dateIndex != -1) {
        dateData[dateIndex].y++
      } else {
        dateData.push({ x: formatDate, y: 1 })
      }

      const index = timeData.findIndex((element) => element.x._i === formatTime)
      if (index !== -1) {
        timeData[index].y++
      } else {
        timeData.push({ x: parseHour(formatTime), y: 1 })
      }
    }
  }
  timeData.sort((a, b) => (a.x._i > b.x._i ? 1 : -1))
  dateData.sort((a, b) => (moment(a.x).isAfter(b.x) ? 1 : -1))

  return (
    <main>
      <title>Cluster {id}</title>
      <div className={style.title}>
        <h1>Cluster {id}</h1>
      </div>
      <div className={styles.grid}>
        <BarChart labels={offenseTypeLabels} data={offenseTypeData} />
        <DoughnutChart labels={offenseGroupLabels} data={offenseGroupData} />
        <LineChart data={dateData} unit={'month'} minUnit={'2020-01-01'} />
        <LineChart data={timeData} unit={'hour'} minUnit={moment('0', 'HH')} />
      </div>
    </main>
  )
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
