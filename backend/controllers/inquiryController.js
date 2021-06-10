import asyncHandler from 'express-async-handler'
import Message from '../models/messageModel.js'
import User from '../models/userModel.js'

// @desc    Fetch all variants
// @route   GET /api/variants
// @access  Private
const getInquiries = asyncHandler(async (req, res) => {
    const chatWiths = await Message.find({}).distinct('chatWith')
    const users = await User.find({ _id: { "$in": chatWiths } })
    const inquiries = []
    for (let i = 0; i < chatWiths.length; i++) {
        inquiries.push({ 'chatWith': chatWiths[i], 'name': users[i].name })
    }

    res.json({ inquiries })
})

export { getInquiries }