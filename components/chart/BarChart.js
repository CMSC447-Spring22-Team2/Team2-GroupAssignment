import { Bar } from 'react-chartjs-2'
import faker from '@faker-js/faker'
import styles from '../../styles/Home.module.css'

export default function BarChart({ labels, data }) {
  const options = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Number of Crimes by Type',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
      x: {
        ticks: {
          align: 'center',
        },
      },
    },
    maintainAspectRation: false,
  }
  const dataBar = {
    labels,
    datasets: [
      {
        label: 'Offenses',
        data: data,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  }
  //   return <Bar className={styles.card} options={options} data={dataBar} />

  return <Bar options={options} data={dataBar} />
}
