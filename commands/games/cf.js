const { Command } = require('discord.js-commando')
const { MessageEmbed } = require('discord.js')

function flipCoin(){
    rand = Math.floor(Math.random() * 2)
    if (rand === 0){
        return "Tails"
    } else {
        return "Heads"
    }
}

module.exports = class eightball extends Command {
    constructor(client) {
        super(client, {
            name:"cf",
            aliases: ["coinflip"],
            group: 'games',
            memberName: 'cf',
            description: 'flips a coin.',
        })
    }

    run(msg, { user }) {
        let embed = new MessageEmbed()
            .setTitle(flipCoin())
            .setColor("RANDOM")
        msg.embed(embed)
    
    }
}