import express from 'express'
const router = express.Router()
import {
  getVariants,
  getVariantById,
  deleteVariant,
  createVariant,
  updateVariant,
} from '../controllers/variantController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getVariants).post(protect, admin, createVariant)
router
  .route('/:id')
  .get(getVariantById)
  .delete(protect, admin, deleteVariant)
  .put(protect, admin, updateVariant)

export default router
