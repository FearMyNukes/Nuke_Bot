const { Command, CommandoMessage } = require('discord.js-commando')
const { MessageEmbed } = require('discord.js')
const Currency = require("../../models/currency.js");
const mongoose = require('mongoose');
const Duration = require('humanize-duration')

module.exports = class deposit extends Command {
    constructor(client) {
        super(client, {
            name:"deposit",
            aliases: [],
            group: 'economy',
            memberName: 'deposit',
            description: 'Deposit an amount of coins to your bank.',
            args: [
                {
                    type:"integer",
                    prompt:"How many coins would you like to deposit?",
                    key:"amount",
                }
            ]
        })
    }

    run(msg, {amount}) {
        Currency.findOne({userID: msg.author.id}).exec(function(err, currency){
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

                if (currency.wallet - amount < 0) { 
                    let embed = new MessageEmbed()
                        .setTitle("You do not have enough BottleCaps to do that")
                        .setColor("RANDOM")
                    msg.embed(embed);
                }else if(currency.bank + amount > currency.bankSize){
                    let embed = new MessageEmbed()
                        .setTitle("You do not have enough Bank space left to do that")
                        .setDescription("Do *bankUpgrade to add more space to your bank for a fee")
                        .setColor("RANDOM")
                    msg.embed(embed);
                }else{                

                    currency.wallet = currency.wallet - amount;
                    currency.bank = currency.bank + amount;
                    let embed = new MessageEmbed()
                        .setTitle(`You deposited ${amount} BottleCaps into your bank`)
                        .setDescription(`
                        New bank balance: ${currency.bank}
                        New Wallet balance: ${currency.wallet}
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
