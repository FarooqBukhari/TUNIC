import mongoose from 'mongoose'

const variantSchema = mongoose.Schema({
    name: {
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