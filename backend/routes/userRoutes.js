import express from 'express'
const router = express.Router()
import { authUser, getUserProfile } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

router.post('/login', authUser)
// to implement middleware protect - put it as 1st argument
router.route('/profile').get(protect, getUserProfile)

export default router
