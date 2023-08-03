const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;

const app = express();
const port = process.env.PORT || 5000;
const url =
  "mongodb+srv://joshbaum101:460Tlz9w@cluster0.s3f1r.mongodb.net/?retryWrites=true&w=majority";
const dbName = "cryptoRaiser";

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Fundraising dApp backend!");
});

app.post("/register", async (req, res) => {
  const userData = req.body;

  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);

    const existingUser = await db
      .collection("Users")
      .findOne({ userName: userData.userName });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }

    const result = await db.collection("Users").insertOne(userData);

    res.status(201).json({
      message: "User registered successfully",
      userId: result.insertedId,
    });

    client.close();
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ error: "An error occurred during registration" });
  }
});

app.post("/login", async (req, res) => {
  const { userName, password } = req.body;
  console.log(userName, password);
  try {
    // Connect to the MongoDB database
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);

    // Find the user in the 'users' collection based on the email
    const user = await db.collection("Users").findOne({ userName });
    console.log("user: " + user);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the provided password matches the user's stored password
    // You should use a secure password hashing library here (e.g., bcrypt)
    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Return a success response to the client
    res.status(200).json({ message: "Login successful" });

    // Close the MongoDB connection
    client.close();
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "An error occurred during login" });
  }
});

app.get("/getID/:username", async (req, res) => {
  const userName = req.params.username;
  try {
    // Connect to the MongoDB database
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);

    // Find the user in the 'users' collection based on the email
    const user = await db.collection("Users").findOne({ userName: userName });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return the user's unique ID to the client
    console.log(user._id);
    res.status(200).json({ userId: user._id });

    // Close the MongoDB connection
    client.close();
  } catch (error) {
    console.error("Error while fetching user ID:", error);
    res.status(500).json({ error: "An error occurred while fetching user ID" });
  }
});

app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error during logout:", err);
      return res.status(500).json({ error: "An error occurred during logout" });
    }

    // Return a success response to the client
    res.status(200).json({ message: "Logout successful" });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
