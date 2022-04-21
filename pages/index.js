import dynamic from 'next/dynamic'
import styles from '../styles/Home.module.css'

const MapWithNoSSR = dynamic(() => import('../components/Map'), {
  ssr: false,
})

export default function Home() {
  return (
    <>
      <title>Washington D.C. Crime Statistics</title>
      <div class="Title">
        <h1>Washington D.C. Crime Statistics</h1>
      </div>
      <div class="Map">
        <MapWithNoSSR className={styles.map} />
      </div>
    </>
  )
}
