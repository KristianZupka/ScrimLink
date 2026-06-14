const Scrim = require("../models/Scrim");
const Team = require("../models/Team");

exports.getAllScrims = async (req, res) => {
const scrims = await Scrim.find()
.populate("creatorTeam")
.populate("opponentTeam")
.sort({ createdAt: -1 });

res.render("scrims/index", { scrims });
};exports.showCreateForm = async (req, res) => {
const teams = await Team.find();

res.render("scrims/create", { teams });
};exports.createScrim = async (req, res) => {
const { teamA, maps, time, notes } = req.body;

await Scrim.create({
creatorTeam: teamA,
maps,
time,
notes
});

res.redirect("/scrims");
};exports.joinScrim = async (req, res) => {
const scrim = await Scrim.findById(req.params.id);

if (!scrim) {
return res.send("Scrim neexistuje");
}

if (scrim.opponentTeam) {
return res.send("Scrim už má soupeře");
}

scrim.opponentTeam = req.body.opponentTeam;
scrim.status = "MATCHED";

await scrim.save();

res.redirect("/scrims");
};
exports.ready = async (req, res) => {
    const scrim = await Scrim.findById(req.params.id);

    if (!scrim) {
        return res.send("Scrim neexistuje");
    }

    const { team } = req.body; 
    // "creator" nebo "opponent"

    if (team === "creator") {
        scrim.team1Ready = true;
    }

    if (team === "opponent") {
        scrim.team2Ready = true;
    }

    if (scrim.team1Ready && scrim.team2Ready) {
        scrim.status = "LIVE";
        scrim.serverIP = "connect 185.XX.XX.XX:27015";
    }

    await scrim.save();

    res.redirect("/scrims");
};
exports.getScrimDetail = async (req, res) => {

    try {
        const scrim = await Scrim.findById(req.params.id)
            .populate("creatorTeam")
            .populate("opponentTeam");

        const teams = await Team.find();

        if (!scrim) {
            return res.send("Scrim neexistuje");
        }

        res.render("scrims/show", { scrim, teams });

    } catch (err) {
        console.log(err);
        res.send("CHYBA SERVERU");
    }
};