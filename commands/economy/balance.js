const { Command, CommandoMessage } = require('discord.js-commando')
const { MessageEmbed } = require('discord.js')
const mongoCurrency = require('discord-mongo-currency')



module.exports = class giveCoins extends Command {
    constructor(client) {
        super(client, {
            name:"balance",
            aliases: ["bal"],
            group: 'economy',
            memberName: 'balance',
            description: 'Check your balance. ',
            args: [
                {
                    type:"user",
                    prompt:"Which user would you like to give coins to?",
                    key:"user",
                    default: msg => msg.author
                }
                // {
                //     type:"integer",
                //     prompt:"how many coins would you like to give?",
                //     key:"amount",
                // }
            ]
        })
    }

    run(msg, { user }) {

        var person = mongoCurrency.findUser(user.id,user.id); // Get the user from the database.

        let embed = new MessageEmbed()
            .setTitle(msg.author.tag.slice(0, -5) + '\'s Balance')
            .setDescription(`Wallet: ${person.coinsInWallet}
            Bank: ${person.coinsInBank}/${person.bankSpace}
            Total: ${person.coinsInBank + person.coinsInWallet}`)
            .setColor("RANDOM")
        msg.embed(embed)
        

    
    }
}