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
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Database Connected"))
  .catch((error) => console.log(error));

// User Schema
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

// Product Schema

const productSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    category: String,
    price: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    image: String,
  },
  { timestamps: true }
);

const Product = mongoose.model("product", productSchema);

app
  .route("/products")
  .post(async (req, res) => {
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
    if (newProduct) {
      return res
        .status(201)
        .json({ message: "New Product Added", product: newProduct });
    } else {
      res.status(400).json({ message: err.message });
    }
  })
  .get(async (req, res) => {
    const products = await Product.find();
    res.json(products);
  });

app.delete("/products/:id", async (req, res) => {
    const deleted = await Product.findOneAndDelete({ id: req.params.id });
    if(deleted){
      return res.json({ message: "Product deleted"});
    }
  
  
});

// User Rutes
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
      return res.status(200).json({
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
