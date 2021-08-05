const { Command, CommandoMessage } = require('discord.js-commando')
const { MessageEmbed } = require('discord.js')
const Currency = require("../../models/currency.js");
const mongoose = require('mongoose');
const Duration = require('humanize-duration')

const used = new Map() //used for cooldown mapping

module.exports = class rob extends Command {
    constructor(client) {
        super(client, {
            name:"rob",
            aliases: ["steal"],
            group: 'economy',
            memberName: 'rob',
            description: 'Steal Money from another user. ',
            args: [
                {
                    type: "user",
                    prompt: "Who would you like to rob?",
                    key: "user"
                }
            ]
        })
    }

    run(msg, { user }) {
        const cooldown = used.get(msg.author.id);

        Currency.findOne({userID: msg.author.id}).exec(function(err, currency){ //this part is the most crucial to getting this to work.
            Currency.findOne({userID: user.id}).exec(function(err, robbed){
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
        
                } if (!robbed){
                    let profile = new Currency({
                        userID: (user.id),
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
        
                } else if (cooldown){

                    //replies to the user how much time is left on their cooldown

                    const remaining = Duration( cooldown -Date.now(), {units: ['h', 'm', 's'], round: true })
                    msg.reply(`You must wait ${remaining} before using this command!`);

                
                }else{

                    var randomAmount = Math.floor(Math.random() * (robbed.wallet * .5));

                    currency.wallet = currency.wallet + randomAmount;
                    robbed.wallet = robbed.wallet - randomAmount;
                    
                    let embed = new MessageEmbed()
                    .setTitle(`You stole ${randomAmount} from ${user.tag.slice(0,-5)}`)
                    .setThumbnail('https://webstockreview.net/images/crime-clipart-burgler-16.png')
                    .setDescription(`New wallet Balance: ${currency.wallet}`)
                    .setColor("RANDOM")
                    msg.embed(embed)

                    currency.save();
                    

                    //adds a cooldown on the command for this user
                    used.set(msg.author.id, Date.now() + 1000 * 60 * 60 * 12);
                    setTimeout(() => used.delete(msg.author.id), 1000 * 60 * 60 *  12)

                }
            })


        })
      

  
    
    }
}