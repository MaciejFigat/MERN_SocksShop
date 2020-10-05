const express = require('express')
const products = require('./data/products')
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

app.listen(5000, console.log('Server is running on port 5000'))
