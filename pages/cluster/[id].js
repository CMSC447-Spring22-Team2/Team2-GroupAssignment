import { useRouter } from 'next/router'
import style from '../../styles/Offense.module.css'

import BarChart from '../../components/chart/BarChart'
import DoughnutChart from '../../components/chart/DoughnutChart'

import styles from '../../styles/Home.module.css'
import useSWR from 'swr'

import OffenseTypes from '../../data/Offense_Types.json'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Cluster() {
  const router = useRouter()
  const id = router.query.id

  const { data, error } = useSWR(`/api/cluster/${id}`, fetcher)

  const labels = OffenseTypes.offenses
  const offenseData = labels.map(() => 0)

  for (let i in data) {
    offenseData[labels.indexOf(data[i].offense)]++
  }

  console.log(offenseData)
  return (
    <main>
      <title>Cluster {id}</title>
      <div className={style.title}>
        <h1>Cluster {id}</h1>
      </div>
      <div className={styles.grid}>
        <BarChart labels={labels} data={offenseData} />
        {/* <DoughnutChart /> */}
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
