const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true, unique: true },
  profile: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  termsAgreed: { type: Boolean, default: false },
});

exports.User = mongoose.model("User", userSchema);
