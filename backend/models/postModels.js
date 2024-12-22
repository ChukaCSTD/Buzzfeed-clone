const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    descp: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        required: true,
    },
    category: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
    },
    post_cover: {
        type: String,
        required: true,
    },
}, {timestamps: true});

const postModel = mongoose.model("post", postSchema);
module.exports = postModel;