const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected"))
  .catch((error) => console.log(error));

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    action: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

app.post("/login", async (req, res) => {
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
          name: newUser.name,
          email: newUser.email,
        },
      });
    }

    if (action === "Login") {
      const loginUser = await User.findOne({ email });
      if (!loginUser || loginUser.password !== password) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
      const token = jwt.sign(
        { id: loginUser._id, email },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );
      return res
        .status(200)
        .json({
          message: "Login successful",
          token,
          user: { name: loginUser.name, email: loginUser.email },
        });
    }

    return res.status(400).json({ message: "Invalid action" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(5000, () => console.log("Server Start"));
