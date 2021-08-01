const { Command, CommandoMessage } = require('discord.js-commando')
const { MessageEmbed } = require('discord.js')

module.exports = class eightball extends Command {
    constructor(client) {
        super(client, {
            name:"crabrave",
            aliases: ["cr", "crab"],
            group: 'fun',
            memberName: 'crabrave',
            description: 'Sends a dancing crab gif.',
        })
    }

    run(msg, { user }) {
        msg.say("https://tenor.com/view/crab-rave-dancing-dancing-crab-gif-16543314")
        // let embed = new MessageEmbed()
        //     .setTitle("Crab Rave!")
        //     .setImage("https://tenor.com/view/crab-rave-dancing-dancing-crab-gif-16543314")
        //     .setColor("RANDOM")
        // msg.embed(embed)
    
    }
}