// index.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Fundraising dApp backend!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
