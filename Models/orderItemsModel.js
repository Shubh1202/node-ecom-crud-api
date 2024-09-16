const mongoose = require("mongoose")
const Schema = mongoose.Schema

const orderItemsSchema = new Schema({
    qty: {
        type: Number,
        rquired: true,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        required: true
    },
    addedOn: {
        type: Date,
        default: Date.now
    }
})

orderItemsSchema.virtual("id").get(function(){
    return this._id.toHexString()
})

orderItemsSchema.set("toJSON", {virtuals: true})

module.exports = mongoose.model('orderItems', orderItemsSchema)