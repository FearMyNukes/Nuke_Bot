const mongoose = require("mongoose");
const currencySchema = mongoose.Schema({
    userID: {type: String, require: true},
    guildID: {type: String, require: true},
    username: String,
    bankSize: Number,
    workerSize: Number,
    bank: {type: Number, default: 0},
    wallet: {type: Number, default: 100},
    workerCount: Number,
    deathCount: Number
});

module.exports = mongoose.model("Currency", currencySchema);