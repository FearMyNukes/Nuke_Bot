const { Command, CommandoMessage } = require('discord.js-commando')
const { MessageEmbed } = require('discord.js')
const Currency = require("../../models/currency.js");
const mongoose = require('mongoose');



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
    
                // .then(result => console.log(result));
            }else if (talkedRecently.has(msg.author.id)){

                msg.reply(`Wait 1 minute before getting typing this again.`)
                    .then(msg=> { 
                        setTimeout(()=> msg.delete(), 10000)
                    })

            }else{

                currency.wallet = currency.wallet + randomCoins;

                let embed = new MessageEmbed()
                .setTitle("You begged and recieved " + randomCoins + " BottleCaps")
                .setDescription(`Wallet Balance now is: ${currency.wallet}`)
                .setColor("RANDOM")
                msg.embed(embed)

                currency.save();

                talkedRecently.add(msg.author.id);
                setTimeout(() => {
                // Removes the user from the set after a minute
                talkedRecently.delete(msg.author.id);
                }, 300000);
            }


        })
      

        






    //     const sender = mongoCurrency.findUser(msg.author.id, msg.guild.id); // Get the user from the database.

    //     if (talkedRecently.has(msg.author.id)) {
    //         msg.channel.send(`Wait 1 minute before getting typing this again. ${msg.author.tag}`);
    // } else {
    //     mongoCurrency.giveCoins(msg.author.id, msg.guild.id, randomCoins);
    //     let embed = new MessageEmbed()
    //         .setTitle("You begged and recieved " + randomCoins + " BottleCaps")
    //         .setDescription("Total Balance now is: " + (sender.coinsInBank + sender.coinsInWallet))
    //         .setColor("RANDOM")
    //     msg.embed(embed)
    //     talkedRecently.add(msg.author.id);
    //     setTimeout(() => {
    //       // Removes the user from the set after a minute
    //       talkedRecently.delete(msg.author.id);
    //     }, 60000);
    // }

    
    }
}
