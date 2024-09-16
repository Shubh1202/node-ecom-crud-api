const Mongose = require("mongoose")
const Schema = Mongose.Schema

const categorieSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true,
    },
    icon:{
        type: String,
        required: true,
        default: 'dummy-icon.png'
    },
    color:{
        type: String,
        required: true,
        default:'#aaa'
    },

    status:{
        type: Boolean,
        required: true,
        default:1
    },
})

categorieSchema.virtual("id").get(function(){
    return this._id.toHexString()
})
categorieSchema.set('toJSON', {virtuals: true})

module.exports = Mongose.model("categorires", categorieSchema)