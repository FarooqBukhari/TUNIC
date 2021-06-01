import asyncHandler from 'express-async-handler'
import Variant from '../models/variantModel.js'

// @desc    Fetch all variants
// @route   GET /api/variants
// @access  Public
const getVariants = asyncHandler(async (req, res) => {
  const pageSize = 12
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  const count = await Variant.countDocuments({ ...keyword })
  const variants = await Variant.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ variants, page, pages: Math.ceil(count / pageSize) })
})

// @desc    Fetch single variant
// @route   GET /api/variants/:id
// @access  Public
const getVariantById = asyncHandler(async (req, res) => {
  const variant = await Variant.findById(req.params.id)

  if (variant) {
    res.json(variant)
  } else {
    res.status(404)
    throw new Error('Variant not found')
  }
})

// @desc    Delete a variant
// @route   DELETE /api/variants/:id
// @access  Private/Admin
const deleteVariant = asyncHandler(async (req, res) => {
  const variant = await Variant.findById(req.params.id)

  if (variant) {
    await variant.remove()
    res.json({ message: 'Variant removed' })
  } else {
    res.status(404)
    throw new Error('Variant not found')
  }
})

// @desc    Create a variant
// @route   POST /api/variants
// @access  Private/Admin
const createVariant = asyncHandler(async (req, res) => {
  const variant = new Variant({
    name: 'Sample name',
    type: 'Size'
  })

  const createdVariant = await variant.save()
  res.status(201).json(createdVariant)
})

// @desc    Update a variant
// @route   PUT /api/variants/:id
// @access  Private/Admin
const updateVariant = asyncHandler(async (req, res) => {
  const {
    name,
    type,
  } = req.body

  const variant = await Variant.findById(req.params.id)

  if (variant) {
    variant.name = name
    variant.type = type

    const updatedVariant = await variant.save()
    res.json(updatedVariant)
  } else {
    res.status(404)
    throw new Error('Variant not found')
  }
})

export {
  getVariants,
  getVariantById,
  deleteVariant,
  createVariant,
  updateVariant,
}
