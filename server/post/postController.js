const { Post } = require("./postModel");

exports.callPosts = async (req, res) => {
  try {
    const DEFAULT_LIMIT = 6;
    const page = parseInt(req.query._page) || 1;
    const limit = parseInt(req.query._limit) || DEFAULT_LIMIT;

    const startIndex = (page - 1) * limit;

    const posts = await Post.find().limit(limit).skip(startIndex);

    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Server Error" });
  }
};
