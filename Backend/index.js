const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({
  origin: "https://e-commerce-jade-tau-24.vercel.app/",
  methods:["POST", "GET"],
  credentials: true,
}));

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
        return res.status(400).json({ error: "Email already exists" });
      }

      const data = await User.create({ name, email, password });
      return res
        .status(201)
        .json({ message: "User created successfully", data });
    }

    if (action === "Login") {
      const user = await User.findOne({ email });
      if (!user || user.password !== password) {
        return res.status(400).json({ error: "Invalid email or password" });
      }
      return res.status(200).json({ message: "Login successful", user });
    }

    return res.status(400).json({ error: "Invalid action" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(5000, () => console.log("Server Start"));
