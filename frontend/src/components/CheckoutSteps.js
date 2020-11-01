import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className='justify-content-center mb-4'>
      <Nav.Item>
        {step1 ? (
          <LinkContainer to='/login'>
            <Nav.Link>Zarejestruj się</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Zarejestruj się</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <LinkContainer to='/shipping'>
            <Nav.Link>Adres dostawy</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Adres dostawy</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <LinkContainer to='/login'>
            <Nav.Link>Płatność</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Płatność</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
          <LinkContainer to='/login'>
            <Nav.Link>Zamów</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Zamów</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  )
}

export default CheckoutSteps
