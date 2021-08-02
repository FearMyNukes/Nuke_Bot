const { Command } = require('discord.js-commando')
const { MessageEmbed } = require('discord.js')


function getDeathMessage(player, sender){
    switch(Math.floor(Math.random() * 30)){
        case 0:
            return( player + " was shot by " + sender);
            break;
        case 1:
            return( player + " was pummeled by " + sender);
            break;
        case 2:
            return (player + " was pricked to death");
            break;
        case 3:
            return (player + " walked into a cactus whilst trying to escape " + sender);
            break;
        case 4:
            return (player + " drowned");
            break;
        case 5 :
            return (player + " drowned whilst trying to escape " + sender);
            break;
        case 6: 
            return (player + " experieneced kinetic energy");
            break;
        case 7: 
            return (player + " was shot by a skeleton");
            break;
        case 8:
            return (player + " experienced kinetic energy whilst trying to escape " + sender);
            break;
        case 9:
            return (player + " blew up");
            break;
        case 10:
            return (player + " was blown up by a creeper");
            break;
        case 11:
            return (player + " was blown up by " + sender);
            break;
        case 12:
            return (player + " was blown up by [Intentional Game Design");
            break;
        case 13:
            return (player + " hit the ground too hard");
            break;
        case 14:
            return (player + " hit the ground too hard whilst trying to escape Herobrine");
            break;
        case 15:
            return (player + " fell from a high place");
            break;
        case 16:
            return (player + " fell off a ladder");
            break;
        case 17:
            return (player + " fell off scaffolding");
            break;
        case 18:
            return (player + " fell while climbing");
            break;
        case 19:
            return ( player + " was impaled by a stalagmite");
            break;
        case 20:
            return ( player + " was squashed by a falling anvil");
            break;
        case 21:
            return ( player + " was squashed by a falling block");
            break;
        case 22:
            return ( player + " was impaled by a falling stalactite");
            break;
        case 23:
            return ( player + " went up in flames");
            break;
        case 24:
            return ( player + " walked into fire whilst fighting " + sender);
            break;
        case 25:
            return ( player + " burned to death")
            break;
        case 26:
            return ( player + " was burnt to a crisp fighting blaze");
            break;
        case 27:
            return ( player + " was burnt to a crisp fighting " + sender);
            break;
        case 28:
            return ( player + " went off with a bang");
            break;
        case 29:
            return ( player + " went off with a bang due to a firework fired by " + sender);
            break;
        case 30:
            return ( player + " fell out of the world");
            break;

    }
    return(player + sender);
}

module.exports = class kill extends Command {
    constructor(client) {
        super(client, {
            name:"kill",
            aliases: ["kill"],
            group: 'fun',
            memberName: 'kill',
            description: 'Kills the person you mention.',
            args: [
                {
                    type:"user",
                    prompt:"Which user would you like to kill?",
                    key:"user",
                    default: msg => msg.author
                }
            ]
        })
    }

    run(msg, { user }) {
        var killer = msg.author;
        let embed = new MessageEmbed()
            .setTitle(getDeathMessage(`${user.tag}`.slice(0, -5), `${killer.tag}`))
            .setColor("RANDOM")
        msg.embed(embed)
    
    }
}

