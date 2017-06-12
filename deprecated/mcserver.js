exports.name = "mcserver";
exports.run = (client, message, args) => {

    const Discord = require("discord.js");
    const config = require('../config.json');
    const request = require('request');

    const arg = message.content.split(' ').slice(1).join(' ');
    console.log(args)
    console.log()
    console.log(arg)
    if (!args[1]) {
        request('https://mcapi.us/server/status?ip=' + args[0], (error, response, body) => {
            if (!error && response.statusCode === 200) {
                return message.channel.send(response);
            } else {
                return message.channel.send(error);
            }
        });
    }
    if (args[1].length >= 2) {
        request('https://mcapi.us/server/status?ip=' + args[0] + '&port=' + args[1], (error, response, body) => {
            if (!error && response.statusCode === 200) {
                return message.channel.send(response);
            } else {
                return message.channel.send(error);
            }
        });
    }

}