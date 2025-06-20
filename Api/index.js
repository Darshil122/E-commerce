import  express from "express";
import mongoose from "mongoose";
import cors from "cors";
// import { bodyparser } from "body-parser";

const app = express();

//Middlewear
app.use(cors());
app.use(express.json());
// app.use(bodyparser.json());

//Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo connected"))
  .catch((err) => console.log(err));

//Create Schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//Model
const User = mongoose.model("user", UserSchema);

//signup or login Route
app.post("/login", async (req, res) => {
    console.log("req body", req.body);
  const { name, email, password, action } = req.body;
  if (action === "Sign Up") {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    // const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password, action });
    res.status(201).json({ message: "User created" });
  } 
 if(action === "Login") {
    const user = await User.findOne({ email });

    if (!user){return res.status(400).json({ message: "User not found" });}else{
        res.status(200).json({message: "Login successfully"})
    } 
    // const isMatch = await compare();
    if (password !== user.password) return res.status(400).json({ message: "Invalid password" });
  }
});

// app.post("/login", async (req, res) =>{
//     const {email, password} = req.body;

// });

app.listen(5000, () => console.log("Server Start"));
