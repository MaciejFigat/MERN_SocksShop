import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { register } from '../actions/userActions'

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)

  const { loading, error, userInfo } = userRegister

  const redirect = location.search ? location.search.split('=')[1] : '/'

  //   in order to prevent showing login (so I need to redirect) when I'm already logged in,
  //   so if I check whether userInfo exists, or changes I can ascertain if I need to redirect from loggin in

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Hasło niepoprawne')
    } else {
      dispatch(register(name, email, password))
    }
  }

  return (
    <FormContainer>
      <h1>Zarejestruj się</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
          <Form.Label>Imię</Form.Label>
          <Form.Control
            type='name'
            placeholder='Wpisz imię'
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label>Adres email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Wpisz adres email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='password'>
          <Form.Label>Hasło</Form.Label>
          <Form.Control
            type='password'
            placeholder='Wpisz hasło'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='confirmPassword'>
          <Form.Label>Potwierdź hasło</Form.Label>
          <Form.Control
            type='password'
            placeholder='Potwierdź hasło'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Zarejestruj się
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          Jeśli już posiadasz konto{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Zaloguj się
          </Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen
