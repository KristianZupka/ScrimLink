const express = require("express");
const router = express.Router();

const teamController = require("../controllers/teamController");

const requireLogin =
require("../middlewares/authMiddleware");

router.get("/", teamController.getAllTeams);

router.get("/create",
    requireLogin,
    teamController.showCreateForm);

router.post("/",
    requireLogin,
    teamController.createTeam);

router.get("/:id",
    teamController.getTeamDetail);

router.get("/:id/edit",
    requireLogin,
    teamController.showEditForm);

router.put("/:id",
    requireLogin,
    teamController.updateTeam);

router.delete("/:id",
    requireLogin,
    teamController.deleteTeam);

module.exports = router;