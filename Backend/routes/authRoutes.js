const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/Users");
const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, password, action } = req.body;

  try {
    if (action === "Sign Up") {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const newUser = await User.create({ name, email, password });

      const token = jwt.sign(
        { id: newUser._id, email },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      return res.status(201).json({
        message: "User created successfully",
        token,
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        },
      });
    }

    if (action === "Login") {
      const loginUser = await User.findOne({ email });
      if (!loginUser || loginUser.password !== password) {
        return res
          .status(400)
          .json({ message: "Invalid email or password" });
      }

      const token = jwt.sign(
        { id: loginUser._id, email },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      return res.status(200).json({
        message: "Login successful",
        token,
        user: {
          _id: loginUser._id,
          name: loginUser.name,
          email: loginUser.email,
        },
      });
    }

    return res.status(400).json({ message: "Invalid action" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
