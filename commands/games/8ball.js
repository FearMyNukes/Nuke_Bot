const { Command } = require('discord.js-commando')
const { MessageEmbed } = require('discord.js')


function getAnswer(){
    var answers = ['As I see it, yes', 
    'Ask again later', 
    'Better not tell you now', 
    'Cannot predict now',
    'Concentrate and ask again',
    'Don’t count on it',
    'It is certain',
    'It is decidedly so',
    'Most likely',
    'My reply is no',
    'My sources say no',
    'Outlook good',
    'Outlook not so good',
    'Reply hazy try again',
    'Signs point to yes',
    'Very doubtful',
    'Without a doubt',
    'Yes',
    'Yes, definitely',
    'You may rely on it',
    'Cock & Ball Torture',
    'Definately',
    'Can pigs fly?']

    return answers[Math.floor(Math.random() * 22)];
}

module.exports = class eightball extends Command {
    constructor(client) {
        super(client, {
            name:"8ball",
            aliases: ["8 ball"],
            group: 'games',
            memberName: '8ball',
            description: 'Gives random answers to questions asked.',
        })
    }

    run(msg, { user }) {
        let embed = new MessageEmbed()
            .setTitle(getAnswer())
            .setColor("RANDOM")
        msg.embed(embed)
    
    }
}

