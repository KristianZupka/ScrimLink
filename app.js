require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");

const app = express();

connectDB();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("CS2 Scrim Finder běží");
});

app.listen(PORT, () => {
    console.log(`Server běží na http://localhost:${PORT}`);
});