import { Line } from 'react-chartjs-2'
import moment from 'moment'

import 'chartjs-adapter-moment'

export default function LineChart({ data, unit, minUnit }) {
  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Number of Crimes Over Time',
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: unit,
        },
        min: minUnit,
      },
      y: {
        min: 0,
      },
    },
  }

  const lineData = {
    datasets: [
      {
        label: '# of Crimes',
        data: data,
        borderWidth: 3,
        fill: true,
        borderColor: 'rgba(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.3)',
        tension: 0.4,
      },
    ],
  }

  return <Line options={options} data={lineData} />
}
