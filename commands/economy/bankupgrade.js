const { Command, CommandoMessage } = require('discord.js-commando')
const { MessageEmbed } = require('discord.js')
const Currency = require("../../models/currency.js");
const mongoose = require('mongoose');
const Duration = require('humanize-duration')


module.exports = class bankupgrade extends Command {
    constructor(client) {
        super(client, {
            name:"bankupgrade",
            aliases: [],
            group: 'economy',
            memberName: 'bankupgrade',
            description: 'Pay 500 Bottlecaps to increase your bank size by 100. ',
            args: [ 
                { 
                    type:"integer",
                    prompt:"How many Times would you like to upgrade your bank?",
                    key:"amount",
                    default: 1
                }
            ]
        })
    }

    run(msg, { amount}) {

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
    
            }else if( (currency.wallet - (amount * 500 ) < 0)  ) {let embed = new MessageEmbed()
                .setTitle("Insufficient Funds")
                .setColor("RANDOM")
                msg.embed(embed)

            }else{

                currency.wallet = currency.wallet - (amount * 500 );
                currency.bankSize = currency.bankSize + ( amount * 100);
                currency.save();

                let embed = new MessageEmbed()
                    .setTitle(`:fireworks: Bank Upgrade Successful :fireworks:`)
                    .setDescription(`
                    Max Bank size is now ${currency.bankSize.toLocaleString()}
                    `)
                    .setThumbnail(msg.author.displayAvatarURL())
                    .setColor("RANDOM")
                msg.embed(embed)

                

            }


        })
    }
}
