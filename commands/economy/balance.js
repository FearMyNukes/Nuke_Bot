const { Command, CommandoMessage } = require('discord.js-commando')
const { MessageEmbed } = require('discord.js')
const Currency = require("../../models/currency.js");
const mongoose = require('mongoose');
const Duration = require('humanize-duration')

module.exports = class balance extends Command {
    constructor(client) {
        super(client, {
            name:"balance",
            aliases: ["bal"],
            group: 'economy',
            memberName: 'balance',
            description: 'Check your balance. ',
        })
    }

    run(msg) {

        Currency.findOne({userID: msg.author.id}).exec(function(err, currency){ //this part is the most crucial to getting this to work.
            if (!currency){
                let profile = new Currency({
                    userID: (msg.author.id),
                    guildID: (msg.guild.id),
                    username: (msg.author.tag).slice(0,-5),
                    bankSize: 1000,
                    workerSize: 3,
                    bank: 0,
                    wallet: 100,
                    workerCount: 0,
                    deathCount: 0
                });
    
                profile.save();
    
                let embed = new MessageEmbed()
                .setTitle("You didn't have an account, I just made you one. Try using this command again!")
                .setColor("RANDOM")
                msg.embed(embed)
    
            }else{

                let embed = new MessageEmbed()
                .setTitle(msg.author.tag.slice(0, -5))
                .setDescription(`
                Your Wallet has: ${currency.wallet.toLocaleString()} BottleCaps
                You Bank has: ${currency.bank.toLocaleString()} BottleCaps
                `)
                .setThumbnail(msg.author.displayAvatarURL())
                .setColor("RANDOM")
                msg.embed(embed)

                currency.save();

            }


        })
    }
}
