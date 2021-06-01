import express from 'express'
const router = express.Router()
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  addAdminUser
} from '../controllers/userController.js'
import { protect, superAdmin } from '../middleware/authMiddleware.js'

router.route('/').post(registerUser).get(protect, superAdmin, getUsers)
router.post('/login', authUser)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
router
  .route('/:id')
  .delete(protect, superAdmin, deleteUser)
  .get(protect, superAdmin, getUserById)
  .put(protect, superAdmin, updateUser)
router.route('/add-admin').post(protect, superAdmin, addAdminUser)

export default router
