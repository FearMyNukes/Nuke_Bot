const { Command, CommandoMessage } = require('discord.js-commando')
const { MessageEmbed } = require('discord.js')
const Currency = require("../../models/currency.js");
const mongoose = require('mongoose');
const Duration = require('humanize-duration')



module.exports = class bank extends Command {
    constructor(client) {
        super(client, {
            name:"bank",
            aliases: [],
            group: 'economy',
            memberName: 'bank',
            description: 'Check your bank balance. ',
        })
    }

    run(msg) {
        let profileData;
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
                .setDescription(`Your Bank has: ${currency.bank} BottleCaps`)
                

                .setThumbnail(msg.author.displayAvatarURL())
                .setColor("RANDOM")
                msg.embed(embed)
            }


        })
    }
}
