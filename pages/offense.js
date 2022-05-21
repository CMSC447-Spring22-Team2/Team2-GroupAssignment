import style from '../styles/Offense.module.css'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'
import { Bar, Doughnut } from 'react-chartjs-2'
import faker from '@faker-js/faker'
import styles from '../styles/Home.module.css'
import useSWR from 'swr'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function offense() {
  const { data, error } = useSWR(`/api/cluster/`, fetcher)

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Bar Chart',
      },
    },
  }

  const labels = [
    'Offense 1',
    'Offense 2',
    'Offense 3',
    'Offense 4',
    'Offense 5',
    'Offense 6',
  ]

  const tmpDataBar = labels.map(() =>
    faker.datatype.number({ min: 0, max: 977 })
  )
  const tmpDataPie = labels.map(() =>
    faker.datatype.number({ min: 0, max: 10000 })
  )
  console.log(tmpDataBar)

  const dataBar = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: tmpDataBar,
        backgroundColor: 'gray',
      },
    ],
  }

  const dataPie = {
    labels,
    datasets: [
      {
        label: '# of crimes',
        data: tmpDataPie,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  }

  return (
    <main>
      <title>Offense Type</title>
      <div className={style.title}>
        <h1>Distribution of Crimes by Offense</h1>
        {/* <p>{data[0].offense_key}</p> */}
      </div>
      <div className={styles.grid}>
        <Bar options={options} data={dataBar} />
        <Doughnut data={dataPie} />
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
