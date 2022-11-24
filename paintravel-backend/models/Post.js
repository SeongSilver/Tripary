const mongoose = require("mongoose");

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
    file_1: {
        type: String,
        required: true,
    },
    file_2: {
        type: String,
    },
    file_3: {
        type: String,
    },
    file_4: {
        type: String,
    }
})



const Post = mongoose.model("Post", postSchema);

module.exports = { Post };