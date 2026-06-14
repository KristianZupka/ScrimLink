const express = require("express");
const router = express.Router();

const scrimController = require("../controllers/scrimController");
const requireLogin = require("../middlewares/authMiddleware");

// GET all scrims
router.get("/", scrimController.getAllScrims);

// CREATE form
router.get("/create", requireLogin, scrimController.showCreateForm);

// CREATE scrim
router.post("/", requireLogin, scrimController.createScrim);

// DETAIL
router.get("/:id", scrimController.getScrimDetail);

// JOIN
router.post("/:id/join", requireLogin, scrimController.joinScrim);

// READY
router.post("/:id/ready", requireLogin, scrimController.ready);



module.exports = router;