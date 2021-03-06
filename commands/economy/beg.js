const { Command, CommandoMessage } = require('discord.js-commando')
const { MessageEmbed } = require('discord.js')
const Currency = require("../../models/currency.js");
const mongoose = require('mongoose');
const Duration = require('humanize-duration')

const used = new Map() //used for cooldown mapping

module.exports = class balance extends Command {
    constructor(client) {
        super(client, {
            name:"beg",
            aliases: ["beg", "pls"],
            group: 'economy',
            memberName: 'beg',
            description: 'Beg for coins. ',
        })
    }

    run(msg) {
        const cooldown = used.get(msg.author.id);

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
    
                
            }else if (cooldown){

                //replies to the user how much time is left on their cooldown

                const remaining = Duration( cooldown -Date.now(), {units: ['m', 's'], round: true })
                msg.reply(`You must wait ${remaining} before using this command!`);

            
            }else{

                var randomCoins = Math.floor(Math.random() * 99) + 1;

                currency.wallet = currency.wallet + randomCoins;

                let embed = new MessageEmbed()
                .setTitle("You begged and recieved " + randomCoins + " BottleCaps")
                .setDescription(`Wallet Balance now is: ${currency.wallet.toLocaleString()}`)
                .setThumbnail("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.freeiconspng.com%2Fuploads%2Fbegging-png-6.png&f=1&nofb=1")
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
