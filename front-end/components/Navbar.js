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

          <Link href="/district">
            <MenuItem>District</MenuItem>
          </Link>

          <Link href="/offense">
            <MenuItem>Offense</MenuItem>
          </Link>

          <Link href="/time">
            <MenuItem>Time</MenuItem>
          </Link>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar
