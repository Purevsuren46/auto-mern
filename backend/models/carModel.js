import mongoose from 'mongoose'

const carSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: false,
    },
    year: {
        type: Number,
        required: true,
        default: 0
    },
    mYear: {
        type: Number,
        required: true,
        default: 0
    },
    grade: {
        type: String,
        required: true,
    },
    mile: {
        type: Number,
        required: true,
        default: 0
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    picture: {
        type: String,
        required: false,
    },
}, {
    timestamp: true,
})

const Car = mongoose.model('Car', carSchema)

export default Car