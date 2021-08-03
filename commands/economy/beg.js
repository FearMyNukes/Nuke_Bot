const { Command, CommandoMessage } = require('discord.js-commando')
const { MessageEmbed } = require('discord.js')
const mongoCurrency = require('discord-mongo-currency')

const talkedRecently = new Set();

const randomCoins = Math.floor(Math.random() * 99) + 1; // Random amount of coins


module.exports = class balance extends Command {
    constructor(client) {
        super(client, {
            name:"beg",
            aliases: ["beg", "pls"],
            group: 'economy',
            memberName: 'beg',
            description: 'Beg for coins. ',

            args: [
                // {
                //     type:"user",
                //     prompt:"Which user would you like to give coins to?",
                //     key:"user",
                //     default: msg => msg.author
                // }
                // {
                //     type:"integer",
                //     prompt:"how many coins would you like to give?",
                //     key:"amount",
                // }
            ]
        })
    }

    run(msg) {
        const sender = mongoCurrency.findUser(msg.author.id, msg.guild.id); // Get the user from the database.

        if (talkedRecently.has(msg.author.id)) {
            msg.channel.send(`Wait 1 minute before getting typing this again. ${msg.author.tag}`);
    } else {
        mongoCurrency.giveCoins(msg.author.id, msg.guild.id, randomCoins);
        let embed = new MessageEmbed()
            .setTitle("You begged and recieved " + randomCoins + " BottleCaps")
            .setDescription("Total Balance now is: " + (sender.coinsInBank + sender.coinsInWallet))
            .setColor("RANDOM")
        msg.embed(embed)
        talkedRecently.add(msg.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          talkedRecently.delete(msg.author.id);
        }, 60000);
    }

    
    }
}
