const { Command } = require('discord.js-commando')
const { MessageEmbed } = require('discord.js')

module.exports = class AvatarCommand extends Command {
    constructor(client) {
        super(client, {
            name:"avatar",
            aliases: ["profilepicture"],
            group: 'misc',
            memberName: 'avatar',
            description: 'Sends the avatar of a user.',
            args: [
                {
                    type:"user",
                    prompt:"Which user would you like to get the avatar of?",
                    key:"user",
                    default: msg => msg.author
                }
            ]
        })
    }
    run(msg, { user }) {

        let embed = new MessageEmbed()
            .setTitle(`${user.tag}s profile picture!`)
            .setImage(user.displayAvatarURL(['gif', true, 128]))
            .setColor("RANDOM")
        msg.embed(embed)
    
    }
}