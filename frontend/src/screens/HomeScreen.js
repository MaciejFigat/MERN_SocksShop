import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'

const HomeScreen = () => {
  const [products, setProducts] = useState([])
  // useEffect - I can't make is asynchronous so i put the axios request inside another function
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get('/api/products')
    }
  })

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
