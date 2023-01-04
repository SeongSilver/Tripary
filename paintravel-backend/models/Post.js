const mongoose = require("mongoose");

const formData = new FormData();

const postSchema = mongoose.Schema({
    writer: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "User",
    },
    country: {
        type: String,
        required: true,
    },
    nationCode: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    fromDate: {
        type: Date,
        required: true,
    },
    toDate: {
        type: Date,
        required: true,
    },
    writeDate: {
        type: Date,
        default: Date.now,
    },
    content: {
        type: String,
        required: true,
    },
    file: {
        type: [String],
        required: true,
    },
})



const Post = mongoose.model("Post", postSchema);

module.exports = { Post };