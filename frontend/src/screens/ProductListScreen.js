import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listProducts, deleteProduct } from '../actions/productActions'

const ProductListScreen = ({ history, match }) => {
  const dispatch = useDispatch()

  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productDelete = useSelector((state) => state.productDelete)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete
  // above should the name be better as productDelete ?

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts())
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo, successDelete])

  const createProductHandler = (product) => {
    // create new product
    console.log('create product')
  }
  // naming of the action and reducer, or productDelete const, might be slightly misleading, hence deleteProduct is an action I call here, not the
  const deleteHandler = (id) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteProduct(id))
    }
  }

  return (
    <>
      <Row classname='align-items-center'>
        <Col>
          <h1>Produkty</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa=plus'></i> Dodaj nowe produkty do bazy danych
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table stripped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Imię </th>
              <th>Cena</th>
              <th>Kategoria</th>
              <th>Marka produktu</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant='dark' className='btn-small'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(product._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default ProductListScreen
