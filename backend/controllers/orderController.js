import asyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'
import stripe from 'stripe'
import { round } from 'mathjs'

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
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

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email').populate('markedAsDeliveredBy', 'name email')

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc    Update order to paid
// @route   GET /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  const paymentGateway = stripe(process.env.STRIPE_SECRET_KEY);
  if (order) {
    const body = {
      source: req.body.token.id,
      amount: round(req.body.amount) * 100,
      currency: "pkr",
      metadata: { 'order_id': String(order._id), 'user_id': String(order.user) }
    };
    const charge = await paymentGateway.charges.create(body);
    if (charge && charge.status === 'succeeded') {
      order.isPaid = true
      order.paidAt = Date.now()
      order.paymentResult = {
        id: charge.id,
        receipt_url: charge.receipt_url,
      }
      const updatedOrder = await order.save()
      res.json(updatedOrder)
    }
    else {
      res.status(404)
      throw new Error('Payment Failed')
    }
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isDelivered = true
    order.deliveredAt = Date.now()
    if (order.paymentMethod === 'COD') {
      order.isPaid = true
      order.paidAt = Date.now()
    }
    order.markedAsDeliveredBy = req.user._id

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
  res.json(orders)
})

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name')
  res.json(orders)
})


export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
}
