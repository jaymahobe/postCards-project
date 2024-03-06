const express = require("express");
const mongoose = require("mongoose");
const { createUser } = require("./auth/authController");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const { callPosts } = require("./post/postController");

const database = async () => {
  await mongoose.connect(
    "mongodb+srv://jaymahobe3312:nWXoSOjbqvum9hnh@cluster0.rr1kthu.mongodb.net/"
  );
  // await mongoose.connect("mongodb://localhost:27017/test");
  console.log("database is connected");
};
database().catch((err) => {
  console.log(err);
});
app.use(cors());
app.use(bodyParser.json()); // For JSON payloads
app.use(bodyParser.urlencoded({ extended: true })); // For form data
app.post("/signup", createUser);
app.get("/posts", callPosts);
app.get("/", (req, res) => {
  res.send("<h1></h1>");
});

app.listen(8080, () => {
  console.log("Server is listening at 8080");
});
