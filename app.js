require("dotenv").config();

const session = require("express-session");
const express = require("express");
const path = require("path");
const teamRoutes = require("./routes/teamRoutes");
const methodOverride = require("method-override");

const authRoutes = require("./routes/authRoutes");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use((req, res, next) => {
    
    res.locals.user = req.session.user || null;
    
    next();
    
});

app.use("/", authRoutes);
app.use("/teams", teamRoutes);

app.get("/teams", (req, res) => {

    res.send("Dashboard Team Managera");

});
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("CS2 Scrim Finder běží");
});

app.listen(PORT, () => {
    console.log(`Server běží na http://localhost:${PORT}`);
});




