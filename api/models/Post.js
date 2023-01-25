const mongoose = require('mongoose')

const { Schema, model } = mongoose

const postSchema = new Schema({

    title: String,
    summary: String,
    content: String,
    cover: String,
}, {
    timestamps: true,
})

const PostModel = model('Post', postSchema);

module.exports = PostModel;