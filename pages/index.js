import dynamic from 'next/dynamic'
import styles from '../styles/Home.module.css'

const MapWithNoSSR = dynamic(() => import('../components/Map'), {
  ssr: false,
})

export default function Home() {
  return (
    <>
      <div>
        <h1>Washington D.C. Crime Statistics</h1>
        <MapWithNoSSR className={styles.map} />
      </div>
    </>
  )
}
