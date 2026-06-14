const mongoose = require("mongoose");

const scrimSchema = new mongoose.Schema({

    creatorTeam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team"
    },

    opponentTeam: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
        default: null
    },

    maps: {
        type: String,
        required: true
    },

    time: {
        type: String,
        required: true
    },

    notes: {
        type: String,
        default: ""
    },

    status: {
        type: String,
        enum: ["OPEN", "MATCHED", "LIVE"],
        default: "OPEN"
    },

    team1Ready: {
        type: Boolean,
        default: false
    },

    team2Ready: {
        type: Boolean,
        default: false
    },

    serverIP: {
        type: String,
        default: ""
    }

}, { timestamps: true });

module.exports = mongoose.model("Scrim", scrimSchema);