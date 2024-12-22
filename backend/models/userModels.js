const mongoose = require("mongoose")

const userSchema =  new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum:  ["male", "female", "others"],
        required: true,
    },
    avatar: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ["admin", "user"],
        default: "user",
    }
}, {timestamps: true}
);

const userModel = mongoose.model('user', userSchema)
module.exports = userModel;