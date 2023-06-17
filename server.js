const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const axios = require("axios");
const app = express();

const corsOptions = {
  origin: "http://localhost:3000", 
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose
  .connect("mongodb+srv://swapnika:123@cluster0.lgqhk6d.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error", err);
  });

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  organization: { 
    
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the application." });
});

app.post("/api/auth/signup", async (req, res) => {
  const { username, email, password, organization } = req.body;
//   console.log(email)
//   console.log(password)

  try {
    const user = await User.findOne({ email: email });
    console.log(username)
    console.log(email)
    
    console.log(organization)
    if (user) {
      return res.status(409).json({ message: "User already exists." });
    }
      res.status(201).json({ message: "User created successfully." });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }


// Call blockchain network API - /users endpoint
    const response = await axios.post("http://localhost:4000/users", {
      username: username,
      orgName: organization,
    });


    if (response.status === 201) {
        const newUser = new User({
          username: username,
          email: email,
          password: password,
          organization: organization,
        });
  
        await newUser.save();
        res.status(201).json({ message: "User created successfully." });
      } else {
        res.status(500).json({ message: "Failed to create user in the blockchain network." });
      } 
   // console.log(newUser)
  
});


app.post("/api/auth/login", async (req, res) => {
   
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email: email });
      console.log(user)
      if (!user) {
        return res.status(401).json({ message: "Email not found." });
      }
  
      if (user.password !== password) {
        return res.status(401).json({ message: "Incorrect password." });
      }

      // Call blockchain network API - /users/login endpoint
      const response = await axios.post("http://localhost:4000/users/login", {
      username: user.username,
    //   email: email,
    //   password: password,
      orgName: user.organization,
    });

    

    console.log(response)

    if (response.status === 200) {
        res.status(200).json({ message: "Login successful." });
      } else {
        res.status(500).json({ message: "Failed to authenticate user with the blockchain network." });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  
  });  
  

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});