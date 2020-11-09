import React, { useEffect } from 'react'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import { getOrderDetails } from '../actions/orderActions'

const OrderScreen = ({ match }) => {
  const orderId = match.params.id

  const dispatch = useDispatch()

  const orderDetails = useSelector((state) => state.orderDetails)
  const { order, loading, error } = orderDetails

  if (!loading) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2)
    }
    // Prices calculation
    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
  }

  // here I dispatch the action, also I check for the order and ensure that orderID  is the same as the ID in the URL, if it's not matched then I dispatch getOrderDetails to get newest order

  useEffect(() => {
    if (!order || order._id !== orderId) {
      dispatch(getOrderDetails(orderId))
    }
  }, [dispatch, order, orderId])

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <h1>Zamówienie {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Złożone zamówienie</h2>
              <p>
                <strong>Imię zamawiającego: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email zamawiającego: </strong>
                <a href={`mailto:${order.user.email}`}> {order.user.email}</a>
              </p>
              <p>
                <strong> Adres: </strong>
                {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
                {order.shippingAddress.postalCode},{' '}
                {order.shippingAddress.country}{' '}
              </p>
              {order.isDelivered ? (
                <Message variant='success'>
                  Zamówienie dostarczone {order.deliveredAt}
                </Message>
              ) : (
                <Message variant='danger'>
                  Zamówienie jeszcze nie dostarczone
                </Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Metoda płatności:</h2>
              <p>
                <strong>{order.paymentMethod}</strong>
              </p>

              {order.isPaid ? (
                <Message variant='success'>
                  Należność uiszczona {order.paidAt}
                </Message>
              ) : (
                <Message variant='danger'>Należność nie uiszczona</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Zamówiony towar</h2>
              {order.orderItems.length === 0 ? (
                <Message>Zamówienie nie zawiera żadnej pozycji </Message>
              ) : (
                <ListGroup variant='flush'>
                  {order.orderItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x $ {item.price} = ${' '}
                          {item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Podsumowanie zakupów</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Przedmioty zamówienia</Col>
                  <Col>{order.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Koszt wysyłki</Col>
                  <Col>{order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Podatek</Col>
                  <Col>{order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Należność ogółem</Col>
                  <Col>{order.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default OrderScreen
