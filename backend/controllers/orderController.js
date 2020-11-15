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
  const order = await Order.findById(req.params.id).populate(
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

// @description update order to paid
// @route GET /api/orders/:id/pay
// @access private

const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @description get logged in user orders
// @route GET /api/orders/myorders
// @access private

const getMyOrders = asyncHandler(async (req, res) => {
  //only want to find orders that user is equal req.user_id, so only logged in user
  const orders = await Order.find({ user: req.user._id })
  res.json(orders)
})

export { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders }
