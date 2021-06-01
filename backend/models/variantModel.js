import mongoose from 'mongoose'

const variantSchema = mongoose.Schema({
    variantName: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['Size'],
        default: 'Size',
    }
})

const Variant = mongoose.model('Variant', variantSchema)

export default Variant