import asyncHandler from 'express-async-handler'
import OrderModel from '../models/orderModel.js'

export const addOrderItems = asyncHandler(async (req, res) => {
  const orderItems = req.body.inputFields

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
  } else {
    const order = new OrderModel({
      orderItems,
      user: req.user._id,
    })

    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
  }
})

export const updateOrderItems = asyncHandler(async (req, res) => {
  const orderItems = req.body.inputFields
  const status = req.body.status

  console.log(status)

  const order = await OrderModel.findById(req.params.id)
  if (!order) {
    res.status(404)
    throw new Error('Order not found')
  }

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
  } else {
    order.orderItems = orderItems
    order.status = status
    // order.user = req.user._id

    const updatedOrder = await order.save()
    res.status(201).json(updatedOrder)
  }
})

export const getOrderById = asyncHandler(async (req, res) => {
  const order = await OrderModel.find({ user: req.params.id }).sort({
    createdAt: -1,
  })
  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

export const getOrders = asyncHandler(async (req, res) => {
  const orders = await OrderModel.find({}).sort({ createdAt: -1 })
  res.json(orders)
})

export const deleteOrder = asyncHandler(async (req, res) => {
  const order = await OrderModel.findById(req.params.id)
  if (order) {
    await order.remove()
    res.json({ message: 'Order removed' })
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})
