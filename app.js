const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const User = require("./models/User");
const app = express();

const corsOptions = {
  origin: "http://localhost:3000", 
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the application." });
});

app.post("/api/auth/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (user) {
      return res.status(409).json({ message: "User already exists." });
    }

    const newUser = new User({
      email: email,
      password: password,
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(401).json({ message: "Email not found." });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Incorrect password." });
    }

    res.status(200).json({ message: "Login successful." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = app;
