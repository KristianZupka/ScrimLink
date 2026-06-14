const Team = require("../models/Team");

exports.getAllTeams = async (req, res) => {
    const teams = await Team.find().sort({ createdAt: -1 });
    res.render("teams/index", { teams });
};

exports.showCreateForm = (req, res) => {
    res.render("teams/create");
};

exports.createTeam = async (req, res) => {

    const {
        teamName,
        player1,
        player2,
        player3,
        player4,
        player5,
        coach
    } = req.body;

    await Team.create({
        teamName,
        manager: req.session.user.id,
        players: [
            player1,
            player2,
            player3,
            player4,
            player5
        ],
        coach
    });

    res.redirect("/teams");
};

exports.getTeamDetail = async (req, res) => {

    const team = await Team.findById(req.params.id);

    res.render("teams/show", { team });

};

exports.showEditForm = async (req, res) => {

    const team = await Team.findById(req.params.id);

    res.render("teams/edit", { team });

};

exports.updateTeam = async (req, res) => {

    const {
        teamName,
        player1,
        player2,
        player3,
        player4,
        player5,
        coach
    } = req.body;

    await Team.findByIdAndUpdate(req.params.id, {
        teamName,
        players: [
            player1,
            player2,
            player3,
            player4,
            player5
        ],
        coach
    });

    res.redirect(`/teams/${req.params.id}`);
};

exports.deleteTeam = async (req, res) => {

    await Team.findByIdAndDelete(req.params.id);

    res.redirect("/teams");

};