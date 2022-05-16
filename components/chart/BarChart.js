import { Bar } from 'react-chartjs-2'
import faker from '@faker-js/faker'
import styles from '../../styles/Home.module.css'

export default function BarChart({ labels, data }) {
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
    maintainAspectRation: false,
  }
  const dataBar = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: data,
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
    ],
  }
  //   return <Bar className={styles.card} options={options} data={dataBar} />

  return <Bar options={options} data={dataBar} />
}
