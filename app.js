require("dotenv").config();

const session = require("express-session");
const express = require("express");
const path = require("path");
const methodOverride = require("method-override");

const teamRoutes = require("./routes/teamRoutes");
const scrimRoutes = require("./routes/scrimRoutes");
const authRoutes = require("./routes/authRoutes");

const connectDB = require("./config/db");

const app = express();

connectDB();

// view
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// body + static
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

// 🔥 SESSION MUSÍ BÝT ÚPLNĚ NAHOŘE PO BODY PARSINGU
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

// user global
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

// routes
app.use("/", authRoutes);
app.use("/teams", teamRoutes);
app.use("/scrims", scrimRoutes);

app.get("/", (req, res) => {
    res.send("CS2 Scrim Finder běží");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server běží na http://localhost:${PORT}`);
});