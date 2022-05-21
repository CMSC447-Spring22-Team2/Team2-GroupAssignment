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

import {
	getOffenseTypeData,
	getOffenseGroupData,
	getDateData,
	getTimeData,
} from '../lib/FilterData'

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

import ParseHour from '../lib/ParseHour'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function time() {
	const {data, error} = useSWR(`/api/cluster/`, fetcher)

	const dateData = getDateData(data)
	const timeData = getTimeData(data)
	return (
		<main>
			<title>Time of Crimes</title>
			<div className={styles.title}>
				<h1>Distribution of Crimes by Time</h1>
			</div>
			<div className={styles.grid}>
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
