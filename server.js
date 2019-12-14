const express = require("express");
const connectDB = require("./config/db");
const app = express();

// connect DB
connectDB();

app.get("/", (req, res) => res.send("API Running"));

const PORT = process.env.port || 5000;

app.listen(PORT, () => console.log(`Server is Running on ${PORT}`));
