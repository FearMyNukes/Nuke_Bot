const { Client } = require('discord.js-commando')
const path = require('path')

const client = new Client({
    commandPrefix: '*',
    owner: ['476060721575362570'], // can be an array of ids like: owner: ["id", "id"] 
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
    ['imposter', 'Imposter']

])
.registerDefaultGroups()
.registerDefaultCommands({
    unknownCommand: false,
})
.registerCommandsIn(path.join(__dirname, 'commands'))

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}(${client.user.id})`)
    client.user.setActivity('Try *c4 or *hangman | Under Development')
})

client.on('error', console.error)


client.login('NjY2MDU3MjY5OTI2MDM1NDk0.XhuoKw.uEgOHhzfIiqttZpSzACaHw3FAjg')