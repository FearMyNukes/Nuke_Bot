const { Command, CommandoMessage } = require('discord.js-commando')
const { MessageEmbed } = require('discord.js')
const Currency = require("../../models/currency.js");
const mongoose = require('mongoose');
const Duration = require('humanize-duration')


const used = new Map() //used for cooldown mapping


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
        const cooldown = used.get(msg.author.id);

        let profileData;
        Currency.findOne({userID: msg.author.id, guildID: msg.guild.id}).exec(function(err, currency){ //this part is the most crucial to getting this to work.
            if (!currency){
                let profile = new Currency({
                    userID: (msg.author.id),
                    guildID: (msg.guild.id),
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
                Your Wallet has: ${currency.wallet} BottleCaps
                You Bank has: ${currency.bank} BottleCaps
                `)
                .setThumbnail(msg.author.displayAvatarURL())
                .setColor("RANDOM")
                msg.embed(embed)

                currency.save();
                

                //adds a cooldown on the command for this user
                used.set(msg.author.id, Date.now() + 1000 * 60);
                setTimeout(() => used.delete(msg.author.id), 1000 * 60)

            }


        })
    }
}
