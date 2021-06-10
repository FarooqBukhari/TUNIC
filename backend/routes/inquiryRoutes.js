import express from 'express'
const router = express.Router()
import {
    getInquiries,
} from '../controllers/inquiryController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(protect, admin, getInquiries)

export default router