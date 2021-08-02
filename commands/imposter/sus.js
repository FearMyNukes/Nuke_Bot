const { Command, CommandoMessage } = require('discord.js-commando')
const { MessageEmbed } = require('discord.js')


function getGif(){
    var answers = ['https://tenor.com/view/among-us-impostor-imposter-digibyte-twerk-gif-19659754', 
    'https://tenor.com/view/reddy-red-is-sus-among-us-lime-sus-sus-gif-18672503', 
    'https://tenor.com/view/among-us-sus-hella-sus-kinda-sus-suspect-gif-19159933', 
    'https://tenor.com/view/among-us-digibyte-dgb-red-hockey-mask-gif-19018299',
    'https://tenor.com/view/madsis-madsus-gamer-noahmadsus-gamermadsus-gif-18586775',
    'https://tenor.com/view/among-us-amog-us-among-shitting-shitting-gif-19980480',
    'https://tenor.com/view/among-us-twerk-nsfw-hot-sexy-gif-19322218',
    'https://tenor.com/view/sussy-donovan-impostor-amongus-amogus-gif-20576339',
    'https://tenor.com/view/suspect-okay-ok-whatever-gif-7548218',
    'https://tenor.com/view/among-us-red-sus-suspect-among-gif-19597730',
    'https://tenor.com/view/among-us-among-us-distraction-dance-gif-18967013',
    'https://tenor.com/view/did-somebody-say-among-us-among-us-gif-18892253',
    'https://tenor.com/view/sus-af-kinda-sus-sus-among-us-digibyte-gif-19160128',
    'https://tenor.com/view/impostor-when-the-sus-is-sus-when-the-impostor-is-sus-gif-20104047',
    'https://tenor.com/view/grinch-when-the-imposter-is-sus-among-us-grinch-meme-among-us-meme-gif-19566326',
    'https://tenor.com/view/digibyte-meme-memes-funny-among-us-gif-19626976',
    'https://tenor.com/view/sus-gif-22504214',
    'https://tenor.com/view/sus-gif-22239476',
    'https://tenor.com/view/sus-gif-22065664',
    'https://tenor.com/view/sus-gif-21986545',
    'https://tenor.com/view/sus-gif-21913545',
    'https://tenor.com/view/sus-gif-21770979',
    'https://tenor.com/view/among-us-sus-sus-sus-among-sus-sussy-kleb-gif-21479875',
    'https://tenor.com/view/sus-impostor-apex-legends-apex-rampart-gif-22267145',
    'https://tenor.com/view/sus-gif-21214689',
    'https://tenor.com/view/popee-the-performer-among-us-red-sus-sus-gif-22261298',
    'https://tenor.com/view/sus-gif-21109909',
    'https://tenor.com/view/among-us-funnydance-sus-gif-22352444',
    'https://tenor.com/view/colombus-amogus-sus-sussy-colombus-sus-gif-21487739',
    'https://tenor.com/view/hot-smeggsy-blob-sus-gif-22318831',
    'https://tenor.com/view/sus-gif-20925086',
    'https://tenor.com/view/trolling-among-us-sus-gif-21892873',
    'https://tenor.com/view/11a4-mahon-sus-sussy-gif-22165333',
    'https://tenor.com/view/sus-gif-20716770',
    'https://tenor.com/view/sus-amogus-gif-21805689',
    'https://tenor.com/view/sus-amogus-sussy-impostor-gif-22529642',
    'https://tenor.com/view/among-us-sus-pee-amongusirl-gif-22501210',
    'https://tenor.com/view/fnaf-freddy-sus-gif-21769556',
    'https://tenor.com/view/kanye-sus-gif-21106687',
    'https://tenor.com/view/sus-imposter-gif-21081225',
    'https://tenor.com/view/sus-land-amogus-sus-land-among-us-gif-21806014',
    'https://tenor.com/view/amogus-sus-red-imposter-gif-22402451']

    return answers[Math.floor(Math.random() * 40)];
}

module.exports = class sus extends Command {
    constructor(client) {
        super(client, {
            name:"sus",
            aliases: ["sus", "sus"],
            group: 'fun',
            memberName: 'sus',
            description: 'sussy',
        })
    }


    

    run(msg, { user }) {
        msg.delete();
        msg.say(getGif());
    }
}