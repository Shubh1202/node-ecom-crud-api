const mongoose = require("mongoose")
const Schema = mongoose.Schema

const orderSchema = new Schema({
    orderItemIds: [{
        type: Schema.Types.ObjectId,
        ref: 'orderItems',
        required: true,
    }],
    shippingAddress1: {
        type: String,
        required: true,
    },
    shippingAddress2: {
        type: String,
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true,
    },
    zip: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    stauts: {
        type: String,
        required: true,
        default: 'pending'
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'users',
        required: true,
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    status_id:{
        type: Number,
        required: true,
        default: 1
    }
})

orderSchema.set('toJSON', {virtuals: true})

module.exports = mongoose.model('orders', orderSchema)