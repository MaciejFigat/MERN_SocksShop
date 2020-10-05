import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container } from 'react-bootstrap'
const Header = () => {
  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>EWOKSY</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav' />
          <Nav className='ml-auto'>
            <LinkContainer to='/cart'>
              <Nav.Link>
                <i class='fas fa-socks'></i> Koszyk
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to='/cart'>
              <Nav.Link>
                <i class='fas fa-heart'></i> Lista życzeń
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to='/login'>
              <Nav.Link>
                <i class='fas fa-user-tie'></i> Zaloguj się
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
