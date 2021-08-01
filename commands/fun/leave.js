// Command used for stopping music playback
const { Command, CommandoMessage } = require('discord.js-commando')
const { MessageEmbed } = require('discord.js')

module.exports = class eightball extends Command {
    constructor(client) {
        super(client, {
            name:"leave",
            aliases: ["leave", "l", "stfu"],
            group: 'fun',
            memberName: 'leave',
            description: 'Leaves The channel and stops music Playback.',
        })
    }

    run(msg, { user }) {
        
    }
}