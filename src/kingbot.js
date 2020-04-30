const Discord = require('discord.js');
const ytdl = require('ytdl-core');

//create a key file that contains the secret key of your discord api.
const { KEY } = require('./key');

const commands = require('./commands');
const client = new Discord.Client();

//Requires Discord Key and bot already in server
client.login(KEY);

client.on("ready", () => {
    console.log("King Bot is now online")
})

client.on("message", message => {
    let args = message.content.split(" ");
    const { play, kick, mute } = commands;
    switch (args[0]) {
        case play:
            if (args[1]) {
                playSong(message, args[1]);
            } else {
                message.channel.send("Please provice a youtube link");
            }
            break;

        case kick:
            console.log("called kick")
            break;
        case mute:
            console.log("called mute")
            break;
    }
})

const playSong = (message, url) => {
    message.member.voice.channel.join()
        .then(connection => {
            const dispatcher = connection.play(ytdl(url, { filter: "audioonly" }))

            dispatcher.on("error", error => {
                message.channel.send(error.message)
            })
        })
}