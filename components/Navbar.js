import Link from 'next/link'
import {
  AppBar,
  Button,
  Container,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material'

const pages = ['']

const Navbar = () => {
  return (
    <AppBar position="static">
      <Container>
        <Toolbar>
          <Link href="/">
            <MenuItem>Home</MenuItem>
          </Link>
          <Link href="/crimeDescription">
            <MenuItem>Crime Description</MenuItem>
          </Link>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar
