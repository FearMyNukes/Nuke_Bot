const { Command, CommandoMessage } = require('discord.js-commando')
const { MessageEmbed } = require('discord.js')
const Currency = require("../../models/currency.js");
const mongoose = require('mongoose');

function getUpgradePrice(upgradeTier){
    return (upgradeTier * 500)
}

module.exports = class workersbuy extends Command {
    constructor(client) {
        super(client, {
            name:"upgradeworkers",
            aliases: [],
            group: 'economy',
            memberName: 'upgradeworkers',
            description: 'Purchase an upgrade to buy more workers',
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

                var upgradePrice = getUpgradePrice(currency.workerSize/3)

                if (currency.wallet-upgradePrice < 0){

                    let embed = new MessageEmbed()
                    .setTitle(`You do not have the ${upgradePrice} BottleCaps required to Upgrade your worker count`)
                    .setColor("RED")
                    msg.embed(embed)

                }else{

                    currency.wallet = currency.wallet - upgradePrice;
                    currency.workerSize = currency.workerSize + 3;
                    currency.save();

                    let embed = new MessageEmbed()
                    .setTitle(`You purchased a worker upgrade for 3 more workers you now can have a maximum of ${currency.workerSize} workers.`)
                    .setDescription(`Your new wallet balance is: ${currency.wallet}`)
                    .setColor("RANDOM")
                    msg.embed(embed)

                }


            }


        })

    }
}
