import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
const Header = () => {
  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <Navbar.Brand href='/'>EWOKSY</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav' />
          <Nav className='ml-auto'>
            <Nav.Link href='/cart'>
              <i class='fas fa-socks'></i> Koszyk
            </Nav.Link>
            <Nav.Link href='/cart'>
              <i class='fas fa-heart'></i> Lista życzeń
            </Nav.Link>
            <Nav.Link href='/login'>
              <i class='fas fa-user-tie'></i> Zaloguj się
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
