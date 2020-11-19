import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @description Fetch all products
// @route GET /api/products
// @access Public

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  // find method when passed {} - empty object -> gives everything

  res.json(products)
})

// @description Fetch single product
// @route GET /api/products/:_id
// @access Public

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  // this will give me (req.params.id) whichever id that is in url

  //   const product = products.find((p) => p._id === req.params.id)
  // for each product find _id that is equal to :id (from route ) (request object.params.id - the last thing in the route)
  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

// @description delete a product
// @route DELETE /api/products/:_id
// @access private/admin

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

export { getProductById, getProducts, deleteProduct }
