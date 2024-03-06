const bcrypt = require("bcrypt");
const { User } = require("./authModel");
const jwt = require("jsonwebtoken");
const JWT_KEY = "JWT_SECRET_KEY";

exports.createUser = async (req, res) => {
  const { password, name, email } = req.body;
  try {
    // Hash the password
    const salt = await bcrypt.genSalt(16);
    const hashedPassword = await bcrypt.hash(password, salt);

    const existingUser = await User.findOne({ $or: [{ name }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Username or email already exists" });
    }

    // Create new user
    const newUser = new User({ ...req.body, password: hashedPassword }); // Store the hashed password
    await newUser.save();
    // Generate JWT token
    const token = jwt.sign({ userId: newUser._id }, JWT_KEY, {
      expiresIn: "1h",
    });

    res.json({ message: "User created successfully", token });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
