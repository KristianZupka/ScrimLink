const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const teamController = require("../controllers/teamController");

const requireLogin =
require("../middlewares/authMiddleware");

const storage = multer.diskStorage({

    destination: (req, file, cb) => {
        cb(null, "public/uploads/");
    },

    filename: (req, file, cb) => {
        cb(
            null,
            Date.now() +
            path.extname(file.originalname)
        );
    }

});

const upload = multer({ storage });

router.get("/", teamController.getAllTeams);

router.get("/create",
    requireLogin,
    teamController.showCreateForm);

router.post("/",
    requireLogin,
     upload.single("logo"),
    teamController.createTeam);

router.get("/:id",
    teamController.getTeamDetail);

router.get("/:id/edit",
    requireLogin,
    upload.single("logo"),
    teamController.showEditForm);

router.put("/:id",
    requireLogin,
    upload.single("logo"),
    teamController.updateTeam);

router.delete("/:id",
    requireLogin,
    teamController.deleteTeam);

module.exports = router;