import { Slider } from '@mui/material'
import dynamic from 'next/dynamic'
import styles from '../styles/Home.module.css'
import { useState } from 'react'

const MapWithNoSSR = dynamic(() => import('../components/map/Map'), {
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
          <h2>
            <a href="/district">Distribution of Crimes by District</a>
          </h2>
          <p>
            Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum Lorem
            ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum Lorem ipsumLorem
            ipsumLorem ipsumLorem ipsumLorem ipsum Lorem ipsumLorem ipsumLorem
            ipsumLorem ipsumLorem ipsum
          </p>
        </article>

        <article>
          <h2>
            <a href="/offense">Distribution of Crimes by Offense</a>
          </h2>
          <p>
            Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum Lorem
            ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum Lorem ipsumLorem
            ipsumLorem ipsumLorem ipsumLorem ipsum Lorem ipsumLorem ipsumLorem
            ipsumLorem ipsumLorem ipsum
          </p>
        </article>

        <article>
          <h2>
            <a href="/time">Distribution of Crimes by Time</a>
          </h2>
          <p>
            Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum Lorem
            ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum Lorem ipsumLorem
            ipsumLorem ipsumLorem ipsumLorem ipsum Lorem ipsumLorem ipsumLorem
            ipsumLorem ipsumLorem ipsum Test
          </p>
        </article>
      </main>
    </>
  )
}
