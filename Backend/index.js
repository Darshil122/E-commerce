const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://e-commerce-jade-tau-24.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true, // only if you're using cookies or sessions
  })
);

// app.options("*", cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log("MongoDB error", err));


const userSchema = mongoose.Schema(
  {
    name: { type: String},
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
