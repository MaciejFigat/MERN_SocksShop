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

// @description create a product
// @route POST /api/products/
// @access private/admin

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Przykładowy produkt',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'marka przykładowa',
    category: 'kategoria nijaka',
    countInStock: 0,
    numReviews: 0,
    description: 'opis przykładowy',
  })
  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

// @description update a product
// @route PUT /api/products/:id
// @access private/admin

const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body
  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name
    product.price = price
    product.description = description
    product.image = image
    product.brand = brand
    product.category = category
    product.countInStock = countInStock

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})
export {
  getProductById,
  getProducts,
  deleteProduct,
  createProduct,
  updateProduct,
}
