const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'categorires'
    },
    name: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    mrp: {
        type: String,
        required: true
    },
    sale_price: {
        type: String,
        required: true
    },
    short_desc: {
        type: String,
    },
    long_desc: {
        type: String
    },
    status: {
        type: Boolean,
        required: true,
        default: 1
    },
    is_featured: {
        type: Boolean,
        required: true,
        default: false
    }
})

productSchema.virtual("id").get(function(){
    return this._id.toHexString()
})

productSchema.set('toJSON', {virtuals: true})

module.exports = mongoose.model("products", productSchema)