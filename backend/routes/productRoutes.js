import express from 'express'
import asyncHandler from 'express-async-handler'
const router = express.Router()
import Product from '../models/productModel.js'

// @description Fetch all products
// @route GET /api/products
// @access Public

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find({})
    // find method when passed {} - empty object -> gives everything
    res.json(products)
  })
)
// @description Fetch single product
// @route GET /api/products/:_id
// @access Public

// single product by its _id
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    // this will give me (req.params.id) whichever id that is in url

    //   const product = products.find((p) => p._id === req.params.id)
    // for each product find _id that is equal to :id (from route ) (request object.params.id - the last thing in the route)
    if (product) {
      res.json(product)
    } else {
      res.status(404).json({ message: 'Product not found' })
    }
  })
)

export default router
