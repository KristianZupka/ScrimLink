const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
    teamName: {
        type: String,
        required: true
    },

    logo: {
        type: String,
        default: ""
    },

    manager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    players: {
        type: [String],
        required: true
    },

    coach: {
        type: String,
        default: ""
    }
}, { timestamps: true });

module.exports = mongoose.model("Team", teamSchema);