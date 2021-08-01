const { Command, CommandoMessage } = require('discord.js-commando')
const { MessageEmbed } = require('discord.js')

function rollDice(){
    return Math.floor(Math.random() * 6)
}

module.exports = class eightball extends Command {
    constructor(client) {
        super(client, {
            name:"dice",
            aliases: ["roll", "die"],
            group: 'games',
            memberName: 'dice',
            description: 'rolls a 6 sided dice.',
        })
    }

    run(msg, { user }) {
        let embed = new MessageEmbed()
            .setTitle("you rolled a " + rollDice())
            .setColor("RANDOM")
        msg.embed(embed)
    
    }
}