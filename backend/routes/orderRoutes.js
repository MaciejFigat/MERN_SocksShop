import express from 'express'
const router = express.Router()
import { addOrderItems, getOrderById } from '../controllers/orderController.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/').post(protect, addOrderItems)
// route with :id param has to be last, otherwise it will look at anything /whatever as an /:id
router.route('/:id').get(protect, getOrderById)
export default router
