import express from 'express'
import dotenv from 'dotenv'
import products from './data/products.js'

dotenv.config()

const app = express()

app.get('/', (req, res) => {
  res.send('API is running')
})

app.get('/api/products', (req, res) => {
  res.json(products)
})
// single product by its _id
app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p._id === req.params.id)
  // for each product find _id that is equal to :id (from route ) (request object.params.id - the last thing in the route)
  res.json(product)
})

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
)
