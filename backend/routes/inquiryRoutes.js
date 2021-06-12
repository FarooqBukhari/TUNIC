import express from 'express'
const router = express.Router()
import {
    getInquiries,
} from '../controllers/inquiryController.js'
import { protect, helpDeskAdmin } from '../middleware/authMiddleware.js'

router.route('/').get(protect, helpDeskAdmin, getInquiries)

export default router
