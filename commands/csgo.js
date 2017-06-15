exports.name = "csgo";
exports.run = (client, message, args) => {

    const Discord = require("discord.js");
    const config = require('../config.json');
    const request = require('request');

    const arg = message.content.split(' ').slice(1).join(' ');

    function stats(a) {
        request('http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=730&key=' + config.steamKey + '&steamid=' + a, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                const stats = JSON.parse(body).playerstats.stats;
                request('http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=' + config.steamKey + '&steamids=' + a, (error, response, body) => {
                    if (!error && response.statusCode === 200) {
                        try {
                            message.channel.startTyping();
                            const profile = JSON.parse(body).response.players[0];
                            const statsmsg = new Discord.RichEmbed()
                                .setAuthor(profile.personaname + '\'s CS:GO Stats', profile.avatar)
                                .setColor('#593695')
                                .setURL('https://steamcommunity.com/profiles/' + a)
                                .addField('Total Hours', `${Math.floor(stats[2].value / 3600)}`, true)
                                .addField('Kills | Deaths', `${stats[0].value} | ${stats[1].value}`, true)
                                .addField('KD Ratio', `${(stats[0].value / stats[1].value).toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]}`, true)
                                .addField('Rounds Won | Played', `${stats[5].value} | ${stats[46].value}`, true)
                                .addField('Total MVPs', `${stats[99].value}`, true)
                                .addField('Headshots', `${stats[25].value}`, true)
                                .addField('Total Damage', `${stats[6].value}`, true);
                            message.channel.send({ embed: statsmsg });
                            message.channel.stopTyping();
                        } catch (e) {
                            console.log(e)
                        }
                    }
                });


            } else {
                message.channel.send(`Couldn\'t get CSGO profile of **${arg}**. That profile may be on private or friends only.`);
            }
        });
    }

    if (!args) {
        return message.channel.send('Please refer back to the help document. _!help_');
    }
    if (args[0] === 'profile' || args[0] === 'id') {
        if (args[0] == "profile") {
            if (args[1].length > 1) {
                request('http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=' + config.steamKey + '&vanityurl=' + args[1], (error, response, body) => {
                    if (!error && response.statusCode === 200) {
                        const steamID64 = JSON.parse(body).response.steamid;
                        stats(steamID64);
                        return;
                    }
                });
            } else {
                return message.channel.send('Please provide me a profile name to lookup.');
            }
        }
        if (args[0] == "id") {
            if (args[1].length = 17) {
                stats(args[1]);
                return;
            } else {
                return message.channel.send('You need to have 17-digit ID Number to provide me with.');
            }
        } else {
            return message.channel.send(`That didn't seem right, why don't you try again?`);
        }
    }
}