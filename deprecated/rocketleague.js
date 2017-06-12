exports.name = "rocketleague";
exports.run = (client, message, args) => {
    return message.channel.send('This API has not been setup yet. Your gonna have to wait m8. C:');
    const Discord = require("discord.js");
    const config = require('../config.json');
    const request = require('request');

    const arg = message.content.split(' ').slice(1).join(' ');

    function stats(a) {
        request('http://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/?appid=252950&key=' + config.steamKey + '&steamid=' + a, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                const stats = JSON.parse(body).playerstats.stats;
                request('http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=' + config.steamKey + '&steamids=' + a, (error, response, body) => {
                    if (!error && response.statusCode === 200) {
                        try {
                            message.channel.startTyping();
                            const profile = JSON.parse(body).response.players[0];
                            const statsmsg = new Discord.RichEmbed()
                                .setAuthor(profile.personaname + '\'s stats', profile.avatar)
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
        return message.channel.send(`
[CSGO HELP]
    Allows any user to look up key details on any 
   Steam Account that has purchased and played CSGO.
    
    Commands:
     - !csgo : Brings up this message.
     - !csgo id (profile_name) : Look up based on steam name. Does not work for spaces.
     - !csgo profile (17digitid) : Look up based on steam id. Requires 17 Digit ID Number.
`, { code: `none` });
    }
    if (args[0] == "id") {
        request('http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=' + config.steamKey + '&vanityurl=' + args[1], (error, response, body) => {
            if (!error && response.statusCode === 200) {
                const steamID64 = JSON.parse(body).response.steamid;
                stats(steamID64);
                return;
            }
        });
    }
    if (args[0] == "profile") {
        stats(args[1]);
        return;
    } else {
        return message.channel.send(`
[CSGO HELP]
    Allows any user to look up key details on any 
   Steam Account that has purchased and played CSGO.
    
    Commands:
     - !csgo : Brings up this message.
     - !csgo id (profile_name) : Look up based on steam name. Does not work for spaces.
     - !csgo profile (17digitid) : Look up based on steam id. Requires 17 Digit ID Number.
`, { code: `none` });
    }
}