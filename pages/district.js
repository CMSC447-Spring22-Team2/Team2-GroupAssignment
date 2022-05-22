import styles from '../styles/District.module.css'
import { Slider } from '@mui/material'
import { useState } from 'react'

export default function district() {
  const [value, setValue] = useState([0, 36])

  const handleChange1 = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <main>
      <title>Crimes by District</title>
      <div className={styles.title}>
        <h1>Distribution of Crimes by District</h1>
      </div>
      <Slider value={value} onChange={handleChange1} valueLabelDisplay="auto" />
    </main>
  )
}
