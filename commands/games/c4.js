const { Command } = require('discord.js-commando')
const { MessageEmbed } = require('discord.js')

var s = require('./Connect4.js')

module.exports = class AvatarCommand extends Command {
    constructor(client) {
        super(client, {
            name:"c4",
            aliases: ["connect4, connect"],
            group: 'games',
            memberName: 'c4',
            description: 'Play the Popular game connect 4 against your friends.',
            args: [
                {
                    type:"user",
                    prompt:"Who would you like to play against?",
                    key:"user",
                    default: msg => msg.author
                }
            ]
        })
    }
    run(msg, { user }) {
        var ss = new s.Connect4()
        ss.newGame(msg)
    }
}