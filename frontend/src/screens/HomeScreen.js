import React from 'react'
import products from '../products'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
const HomeScreen = () => {
  return (
    <>
      <h1>
        <h1>Only socks in the world. </h1>
        <h4>Gluten free & vegan.</h4>
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      </h1>
    </>
  )
}

export default HomeScreen
