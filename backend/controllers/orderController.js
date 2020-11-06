import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

// @description create new order
// @route POST /api/orders
// @access private

const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
    return
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    })

    const createdOrder = await order.save()

    res.status(201).json(createdOrder)
  }
})

// @description get order by id
// @route GET /api/orders/:id
// @access private

const getOrderById = asyncHandler(async (req, res) => {
  // the following will find order by its id and add to that associated user and email
  const order = await (await Order.findById(req.params.id)).populate(
    'user',
    'name email'
  )
  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})
export { addOrderItems, getOrderById }
