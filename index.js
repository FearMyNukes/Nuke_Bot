const { Client } = require('discord.js-commando')
const path = require('path');
const config = require('./settings.json'); //setup this in the future buut basically it calls with config.token etc etc etc
const mongoose = require('mongoose');

mongoose.connect(config.dbCONNECT);

const client = new Client({
    //commandPrefix: '*',
    commandPrefix: '$',
    //owner: ['476060721575362570'], // can be an array of ids like: owner: ["id", "id"] -
    invite: 'https://discord.gg/QUtyJyyD',
    unknownCommandResponse: false,
})


client.registry

.registerDefaultTypes()
.registerGroups([
    ['misc', 'Misc'],
    ['moderation', 'Moderation'],
    ['games', 'Games'],
    ['fun', 'Fun'],
    ['imposter', 'Imposter'],
    ['economy', 'economy']

])
.registerDefaultGroups()
.registerDefaultCommands({
    unknownCommand: false,
})
.registerCommandsIn(path.join(__dirname, 'commands'))

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}(${client.user.id})`)
    client.user.setActivity('Try *beg | Under Development')
})

client.on('error', console.error)

client.login(config.devTOKEN)
//client.login(config.mainTOKEN)