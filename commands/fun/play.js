// Command for starting a music playback session
const { Command, CommandoMessage } = require('discord.js-commando')
const { MessageEmbed } = require('discord.js')
const { Manager } = require("erela.js");

module.exports = class eightball extends Command {
    constructor(client) {
        super(client, {
            name:"play",
            aliases: ["play", "p"],
            group: 'fun',
            memberName: 'play',
            description: 'Usage: play {song} it will search youtube and play the first result.',
        })
    }

    run(msg, { user }) {
        msg.manager = new Manager({
            // Pass an array of node. Note: You do not need to pass any if you are using the default values (ones shown below).
            nodes: [
              // If you pass a object like so the "host" property is required
              {
                host: "localhost", // Optional if Lavalink is local
                port: 2333, // Optional if Lavalink is set to default
                password: "youshallnotpass", // Optional if Lavalink is set to default
              },
            ],
            // A send method to send data to the Discord WebSocket using your library.
            // Getting the shard for the guild and sending the data to the WebSocket.
            send(id, payload) {
              const guild = msg.guilds.cache.get(id);
              if (guild) guild.shard.send(payload);
            },
          })
          
            .on("nodeConnect", node => console.log(`Node ${node.options.identifier} connected`))
            .on("nodeError", (node, error) => console.log(`Node ${node.options.identifier} had an error: ${error.message}`))
            .on("trackStart", (player, track) => {
                msg.channels.cache
                .get(player.textChannel)
                .send(`Now playing: ${track.title}`);
            })
            .on("queueEnd", (player) => {
                msg.channels.cache
                .get(player.textChannel)
                .send("Queue has ended.");

                player.destroy();
            });

            // Ready event fires when the Discord.JS client is ready.
            // Use EventEmitter#once() so it only fires once.
            msg.once("ready", () => {
            console.log("I am ready!");
            // Initiate the manager.
            msg.manager.init(msg.user.id);
            });

            msg.on("raw", (d) => msg.manager.updateVoiceState(d));


            const res = msg.manager.search(
                msg.content.slice(6),
                msg.author
              );
          
              // Create a new player. This will return the player if it already exists.
              const player = msg.manager.create({
                guild: msg.guild.id,
                voiceChannel: msg.member.voice.channel.id,
                textChannel: msg.channel.id,
              });
          
              // Connect to the voice channel.
              player.connect();
          
              // Adds the first track to the queue.
              player.queue.add(res.tracks[0]);
              message.channel.send(`Enqueuing track ${res.tracks[0].title}.`);
          
              // Plays the player (plays the first track in the queue).
              // The if statement is needed else it will play the current track again
              if (!player.playing && !player.paused && !player.queue.size)
                player.play();
          
              // For playlists you'll have to use slightly different if statement
              if (
                !player.playing &&
                !player.paused &&
                player.queue.totalSize === res.tracks.length
              )
                player.play();

    }
}