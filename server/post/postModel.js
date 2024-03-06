const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
  title: { type: String, required: true },
  userId: { type: Number },
  body: { type: String, required: true },
});

exports.Post = mongoose.model("Post", postSchema);
