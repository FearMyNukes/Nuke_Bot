const { Command, CommandoMessage } = require('discord.js-commando')
const { MessageEmbed } = require('discord.js')
const Currency = require("../../models/currency.js");
const mongoose = require('mongoose');
const Duration = require('humanize-duration')



//used to round the number up so users cannot cheat the system by withdrawing smaller amounts
function roundUp(num, precision) {
    precision = Math.pow(10, precision)
    return Math.ceil(num * precision) / precision
  }

module.exports = class bwithdraw extends Command {
    constructor(client) {
        super(client, {
            name:"withdraw",
            aliases: [],
            group: 'economy',
            memberName: 'withdraw',
            description: 'withdraw an amount of coins from your bank for a 2% fee.',
            args: [
                {
                    type:"integer",
                    prompt:"How many coins would you like to withdraw?",
                    key:"amount",
                }
            ]
        })
    }

    run(msg, {amount}) {
        Currency.findOne({userID: msg.author.id, guildID: msg.guild.id}).exec(function(err, currency){
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

                if (currency.bank - amount < 0) { 
                    let embed = new MessageEmbed()
                        .setTitle("You do not have enough BottleCaps in the bank to do that")
                        .setColor("RANDOM")
                    msg.embed(embed);
                }else{                

                    currency.wallet = currency.wallet + (amount - roundUp((amount*.02), 0) );
                    currency.bank = currency.bank - amount;
                    let embed = new MessageEmbed()
                        .setTitle(`You withdrew ${amount} BottleCaps from your bank`)
                        .setDescription(`
                        New bank balance: ${currency.bank.toLocaleString()}
                        New Wallet balance: ${currency.wallet.toLocaleString()}
                        `)
                        .setThumbnail(msg.author.displayAvatarURL())
                        .setColor("RANDOM")
                    msg.embed(embed)

                    currency.save();


                }

            }

        })
   
    }
}
