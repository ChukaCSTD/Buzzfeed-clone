const mongoose = require('mongoose')

const likeSchema = new mongoose.Schema({
    post: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
    },
    type: {
        type: Boolean,
    }    
}, {timestamps: true}
);

const likeModel = mongoose.model("like", likeSchema);
module.exports = likeModel;