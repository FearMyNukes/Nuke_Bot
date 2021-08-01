const { Command, CommandoMessage } = require('discord.js-commando')
const { MessageEmbed, TextChannel, Channel } = require('discord.js')

module.exports = class eightball extends Command {
    constructor(client) {
        super(client, {
            name:"sabotage",
            aliases: ["sab", "imp"],
            group: 'imposter',
            memberName: 'sabotage',
            description: 'Become the mischievous imposter and cause mayhem on the channel you use this in.',
        })
    }

    run(msg, { user }) {
        let selection = Math.floor(Math.random() * 6);
        msg.delete()



        switch(selection){
            case 0:
                
                break;
            case 1:

                break;
            case 2:

                break;
            case 3:

                break;

        }
    
        // let embed = new MessageEmbed()
        //     .setTitle("you rolled a " + rollDice())
        //     .setColor("RANDOM")
        // msg.embed(embed)
    
    }
}