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

import {useRouter} from 'next/router'
import useSWR from 'swr'
import moment from 'moment'

import style from '../../styles/Offense.module.css'
import styles from '../../styles/Home.module.css'

import Labels from '../../data/Labels.json'
import ParseHour from '../../lib/ParseHour'

import BarChart from '../../components/chart/BarChart'
import LineChart from '../../components/chart/LineChart'
import DoughnutChart from '../../components/chart/DoughnutChart'

import {
	getOffenseTypeData,
	getOffenseGroupData,
	getDateData,
	getTimeData,
} from '../../lib/FilterData'

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

export default function Cluster() {
	const router = useRouter()
	const id = router.query.id

	const {data, error} = useSWR(`/api/cluster/${id}`, fetcher)

	const offenseTypeLabels = Labels.offense_types
	const offenseGroupLabels = Labels.offense_group

	const offenseTypeData = getOffenseTypeData(data, offenseTypeLabels)
	const offenseGroupData = getOffenseGroupData(data, offenseGroupLabels)
	const dateData = getDateData(data)
	const timeData = getTimeData(data)

	return (
		<main>
			<title>Cluster {id}</title>
			<div className={style.title}>
				<h1>Cluster {id}</h1>
			</div>
			<div className={styles.grid}>
				<BarChart labels={offenseTypeLabels} data={offenseTypeData} />
				<DoughnutChart
					labels={offenseGroupLabels}
					data={offenseGroupData}
				/>
				<LineChart
					title={'# of Crimes per Month'}
					data={dateData}
					unit={'month'}
					minUnit={'2020-02-01'}
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
