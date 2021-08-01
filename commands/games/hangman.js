const { Command } = require('discord.js-commando')
const { MessageEmbed } = require('discord.js')

var s = require('./HangmanGame.js')

module.exports = class AvatarCommand extends Command {
    constructor(client) {
        super(client, {
            name:"hangman",
            aliases: ["hang"],
            group: 'games',
            memberName: 'hangman',
            description: 'Play Hangman!',
        })
    }
    run(msg, { user }) {
        var ss = new s.HangmanGame()
        ss.newGame(msg)
    }
}