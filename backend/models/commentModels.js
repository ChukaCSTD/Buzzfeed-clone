const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    post: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "user"
    },
    content: {
        type: String,
        required: true,
    },
    parent_comment: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "comment",
        default: null
    },
    replies: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "comment"
    }]
}, {timestamps: true});

const commentModel = mongoose.model("comment", commentSchema);
module.exports = commentModel;