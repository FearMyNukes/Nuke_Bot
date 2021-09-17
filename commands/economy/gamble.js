const { Command, CommandoMessage } = require('discord.js-commando')
const { MessageEmbed } = require('discord.js')
const Currency = require("../../models/currency.js");
const mongoose = require('mongoose');


// Coin Flip Probability and payout function
function coinFlip(choice, bet){

    var result = Math.ceil(Math.random() * 2);
    var flip;

    if (result === 1){
        flip = "TAILS";
    } else {
        flip = "HEADS";
    }

    if ( flip === choice.toUpperCase() ){
        return bet * 1.80;
    } else{
        return 0;
    }
}

// Dice Roll Probability and payout function
function diceRoll(choice, bet){

    var result = Math.ceil(Math.random() * 6);

    if ( result === choice ){
        return bet * 3;
    } else {
        return 0;
    }

}


// Roulette Probability and payout function
function roulette(choice, bet){
    var result = Math.ceil(Math.random() * 38);
    var color;

    if ( result % 2 == 0 && result != 1 && result != 38 ){(color="RED")}
    else if( result % 2 == 1 && result != 1 && result != 38 ){color="BLACK"}
    else{color = "GREEN"}

    if (choice.toUpperCase() === color && color === "GREEN"){
        return bet * 17;
    } else if (choice.toUpperCase() === color){
        return bet * 2;
    } else{
        return 0;
    }

}


module.exports = class gamble extends Command {
    constructor(client) {
        super(client, {
            name:"gamble",
            aliases: ["casino"],
            group: 'economy',
            memberName: 'gamble',
            description: 'Risk your coins for a payout. ',
            args: [
                {
                    type:"string",
                    prompt:"Which Game would you like to play?",
                    key:"game"
                },                {
                    type:"string",
                    prompt:"What choice would you like to make? (Roulette: Black, Red, Green; Dice: number 1-6; Coinflip: Head, Tails)",
                    key:"choice"
                },
                {
                    type:"integer",
                    prompt:"How many bottlecaps would you like to gamble?",
                    key:"bet"
                }]

        })
    }

    run(msg, {game, choice, bet}) {

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

                currency.wallet = currency.wallet - bet;
                
                var payout; // Variable stroing the value of the game payout

                if(game.toUpperCase() === "COINFLIP" || game.toUpperCase() === "CF" || game.toUpperCase() === "FLIP"){
                    if (choice.toUpperCase() != "HEADS" || "TAILS"){
                        payout = coinFlip(choice, bet);
                    }

                }else if(game.toUpperCase() === "ROULETTE"){
                    if (choice.toUpperCase() != "GREEN" || "RED" || "BLACK"){
                        payout = roulette(choice, bet);
                    }
                   
                }else if (game.toUpperCase() === "DICE" || game.toUpperCase() === "ROLL" || game.toUpperCase() === "DIE"){
                    if (Number.isInteger(choice) && 0 < choice < 7){
                        payout = diceRoll(choice, bet);
                    }
                }

                if(payout === 0){
                    let embed = new MessageEmbed()
                    .setTitle(`You Won! your payout of ${payout} Bottlecaps have been credited to your account`)
                    .setDescription(`Wallet Balance now is: ${currency.wallet.toLocaleString()}`)
                    .setColor("RANDOM")
                    msg.embed(embed)
                }else if(payout > 0){
                    currency.wallet = currency.wallet + payout;

                    let embed = new MessageEmbed()
                    .setTitle("You Lost! your Bottlecaps have been removed from your account")
                    .setDescription(`Wallet Balance now is: ${currency.wallet.toLocaleString()}`)
                    .setColor("RANDOM")
                    msg.embed(embed)
                }else{
                    let embed = new MessageEmbed()
                    .setTitle("There was a problem with your bet selection")
                    .setColor("RANDOM")
                    msg.embed(embed)
                }


            }


        })
      

  
    
    }
}
