import express from 'express'
import {
  addOrderItems,
  deleteOrder,
  getOrderById,
  getOrders,
  updateOrderItems,
} from '../controllers/orderController.js'
import { admin, protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').post(protect, addOrderItems).get(protect, getOrders)
router
  .route('/:id')
  .get(protect, getOrderById)
  .delete(protect, deleteOrder)
  .put(protect, updateOrderItems)

export default router
