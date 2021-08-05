const { Command, CommandoMessage } = require('discord.js-commando')
const { MessageEmbed, DiscordAPIError } = require('discord.js')
const Currency = require("../../models/currency.js");
const mongoose = require('mongoose');
const Duration = require('humanize-duration')

module.exports = class leaderboard extends Command {
    constructor(client) {
        super(client, {
            name:"leaderboard",
            aliases: ["leader", "top"],
            group: 'economy',
            memberName: 'leaderboard',
            description: 'Check the leaderboard for the top coin balances. ',
        })
    }

    run(msg) {

        Currency.find({guildID: msg.guild.id}).sort([[("wallet" + "bank" ), 'descending']]).exec(function(err, results){ //this part is the most crucial to getting this to work.

            let embed = new MessageEmbed()
            .setTitle(`BottleCap LeaderBoard`)

            //if no results
            if (results.length === 0){
                embed.setColor("RED")
                embed.addField("No data Found", "Type *beg to get BottleCaps!")

            }else if (results.length < 10){ //less than 10 results
                embed.setColor("BLURPLE");
                for ( let i= 0; i < results.length; i++){
                    let member = msg.guild.members.cache.get(results[i].userID) || "User Left"
                    if (member === "User Left"){
                        embed.addField(`${i + 1}. ${member}`, `**BottleCaps**: ${(results[i].wallet + results[i].bank).toLocaleString()}`);
                    }else{
                        embed.addField(`${i + 1}. ${member.user.username}`, `**BottleCaps**: ${(results[i].wallet + results[i].bank).toLocaleString()}`);

                    }
                }

            }else{ //More than 10 results
                embed.setColor("BLURPLE");
                for ( i= 0; i < 10; i++){
                    let member = msg.GuildMember.fetch(results[i].userID) || "User Left"
                    if (member === "User Left"){
                        embed.addField(`${i + 1}. ${member}`, `**BottleCaps**: ${(results[i].wallet + results[i].bank).toLocaleString()}`);
                    }else{
                        embed.addField(`${i + 1}. ${member.user.username}`, `**BottleCaps**: ${(results[i].wallet + results[i].bank).toLocaleString()}`);

                    }
                }

            }
            msg.embed(embed)



        })
    }
}
