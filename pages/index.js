import dynamic from 'next/dynamic'
import styles from '../styles/Home.module.css'

const MapWithNoSSR = dynamic(() => import('../components/Map'), {
  ssr: false,
})

export default function Home() {
  return (
    <>
      <title>Washington D.C. Crime Statistics</title>
      <main>
        <div className="Title">
          <h1>Washington D.C. Crime Statistics</h1>
        </div>
        <div className="Map">
          <MapWithNoSSR className={styles.map} />
        </div>
        
        <article>
          <h2>Distribution of Crimes by District</h2>
          <p>Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum
          Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum
          Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum
          Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum
          </p>
        </article>

        <article>
            <h2>Distribution of Crimes by Offense</h2>
            <p>Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum
          Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum
          Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum
          Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum
            </p>
        </article>

        <article>
          <h2>Distribution of Crimes by Time</h2>
          <p>Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum
          Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum
          Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum
          Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum
          </p>
        </article>

      </main>
    </>
  )
}
