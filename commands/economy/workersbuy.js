const { Command, CommandoMessage } = require('discord.js-commando')
const { MessageEmbed } = require('discord.js')
const Currency = require("../../models/currency.js");
const mongoose = require('mongoose');

function getWorkerPrice(totalWorkers){
    if(totalWorkers <= 6){
        return (totalWorkers * 40 ) + 25
    } else {
        // Algorithim for finding the price of workers past 1 
        // Boils down to (.25Xln(X)*100)
        return Math.trunc((.25*totalWorkers) * Math.log(totalWorkers) * 100) 
    }
}

module.exports = class workersbuy extends Command {
    constructor(client) {
        super(client, {
            name:"workersbuy",
            aliases: ["wb"],
            group: 'economy',
            memberName: 'workersbuy',
            description: 'Buy Workers to Collect Bottlecaps for you. ',
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

                var workerPrice = getWorkerPrice(currency.workerCount);

                if(currency.wallet -  workerPrice < 0){

                let embed = new MessageEmbed()
                .setTitle(`You do not have the ${workerPrice} BottleCaps required to purchase this worker`)
                .setColor("RED")
                msg.embed(embed)
                    

                } else if (currency.workerCount + 1 > currency.workerSize) {
                    let embed = new MessageEmbed()
                    .setTitle(`You do not have the lodging for another worker do *upgradeWorkers to add more workers.`)
                    .setColor("RED")
                    msg.embed(embed)

                }else{
                    currency.workerCount = currency.workerCount + 1;
                    currency.wallet = currency.wallet - workerPrice;

                    let embed = new MessageEmbed()
                    .setTitle(`You Purchased a worker for: ${workerPrice} BottleCaps. You now have a total of ${currency.workerCount} workers.`)
                    .setColor("RANDOM")
                    msg.embed(embed)
                }
                currency.save();
            }


        })

    }
}
