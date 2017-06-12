exports.name = "vainglory";
exports.run = (client, message, args) => {

    const Discord = require("discord.js");
    const config = require('../config.json');
    const request = require('request');
    const Vainglory = require('vainglory');

    const arg = message.content.split(' ').slice(1).join(' ');
    // Defaults
    const options = {
        host: 'https://api.dc01.gamelockerapp.com/shards/',
        region: 'na',
        title: 'semc-vainglory',
    };

    const vainglory = new Vainglory(config.vaingloryAPI, options);

    if (args.length === 0) {
        return message.channel.send('Use the command like this: ' + config.prefix + 'vainglory name/id Username/ID').then((sent) => {
            sent.delete(15000);
        })
    }
    if (args[0] === 'id') {

        vainglory.players.getById(args[1]).then((player) => {
            if (player.error) {
                return message.channel.send(`:warning:  Error retrieving player data: ${player.messages}`);
            }
            try {
                message.channel.startTyping();
                const statsmsg = new Discord.RichEmbed()
                    .setAuthor(player[0].name + '\'s Vainglory Profile', 'https://cdn.iconverticons.com/files/png/e5ce9231135ebdad_256x256.png')
                    .setColor('#593695')
                    .addField('Level', `${player.stats.level}`, true)
                    .addField('Current XP', `${player.stats.xp}`, true)
                    .addField('Lifetime Gold', `${player.stats.lifetimeGold}`, true)
                    .addField('Games Played', `${player.stats.played}`, true)
                    .addField('Ranked Games Played', `${player.stats.played_ranked}`, true)
                    .addField('Wins', `${player.stats.wins}`, true)
                    .setFooter(`${player[0].rateLimit.remaining}/${player[0].rateLimit.limit} uses left out of a minute`);
                message.channel.send({ embed: statsmsg });
                message.channel.stopTyping();
            } catch (e) {
                console.log(e)
                message.channel.stopTyping();
            }
        }).catch((errors) => {
            console.log(errors);
        });

    }
    if (args[0] === 'name') {

        const target = [args[1]];

        vainglory.players.getByName(target).then((player) => {
            if (player.error) {
                return message.channel.send(`:warning:  Error retrieving player data: ${player.messages}`);
            }
            try {
                message.channel.startTyping();
                const statsmsg = new Discord.RichEmbed()
                    .setAuthor(player.data[0].attributes.name + '\'s Vainglory Profile', 'https://cdn.iconverticons.com/files/png/e5ce9231135ebdad_256x256.png')
                    .setColor('#593695')
                    .addField('Level', `${player.data[0].attributes.stats.level}`, true)
                    .addField('Current XP', `${player.data[0].attributes.stats.xp}`, true)
                    .addField('Lifetime Gold', `${player.data[0].attributes.stats.lifetimeGold}`, true)
                    .addField('Games Played', `${player.data[0].attributes.stats.played}`, true)
                    .addField('Ranked Games Played', `${player.data[0].attributes.stats.played_ranked}`, true)
                    .addField('Wins', `${player.data[0].attributes.stats.wins}`, true)
                    .setFooter(`${player.rateLimit.remaining}/${player.rateLimit.limit} uses left out of a minute`);
                message.channel.send({ embed: statsmsg });
                message.channel.stopTyping();
            } catch (e) {
                console.log(e)
                message.channel.stopTyping();
            }
        }).catch((errors) => {
            console.log(errors);
        });

    }


}