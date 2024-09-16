const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        email: true,
        unique: true,
        lowercase: true,
    },
    phone:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    otp:{
        type: Number,
        required: true,
        default: 452585,
        minlength:6,
        maxlength:6
    },
    otp_status:{
        type: Boolean,
        required: true,
        default: false
    },
    status:{
        type: Boolean,
        required: true,
        default: false,
    },
    isAdmin:{
        type: Boolean,
        required: true,
        default: false
    }
})

userSchema.virtual("id").get(function(){
    return this._id.toHexString()
})

userSchema.set('toJSON', {virtuals: true})

module.exports = mongoose.model('users', userSchema)