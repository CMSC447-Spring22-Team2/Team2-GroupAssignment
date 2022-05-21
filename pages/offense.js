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
import useSWR from 'swr'

import {getOffenseTypeData, getOffenseGroupData} from '../lib/FilterData'

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

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function offense() {
	const {data, error} = useSWR(`/api/cluster/`, fetcher)

	const offenseTypeLabels = Labels.offense_types
	const offenseGroupLabels = Labels.offense_group

	const offenseTypeData = getOffenseTypeData(data, offenseTypeLabels)
	const offenseGroupData = getOffenseGroupData(data, offenseGroupLabels)

	return (
		<main>
			<title>Offense Type</title>
			<div className={style.title}>
				<h1>Distribution of Crimes by Offense</h1>
				{/* <p>{data[0].offense_key}</p> */}
			</div>
			<div className={styles.grid}>
				<BarChart labels={offenseTypeLabels} data={offenseTypeData} />
				<DoughnutChart
					labels={offenseGroupLabels}
					data={offenseGroupData}
				/>
			</div>
		</main>
	)
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
