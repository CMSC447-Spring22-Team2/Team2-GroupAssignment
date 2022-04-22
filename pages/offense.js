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
import { Bar, Pie } from 'react-chartjs-2'
import faker from '@faker-js/faker'
import styles from '../styles/Home.module.css'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
)

export default function offense() {
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
      <div>
        <h1>Distribution of Crimes by Offense</h1>
        <p>Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum</p>
        <div className={styles.grid}>
          <Bar className={styles.card} options={options} data={dataBar} />
          <Pie className={styles.card} data={dataPie} />
        </div>
      </div>
    </main>
  )
}
