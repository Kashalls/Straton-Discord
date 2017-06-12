exports.name = "info";
exports.run = (client, message, args) => {

    const Discord = require("discord.js");
    //message.mentions.users.first()
        try {
            message.channel.startTyping();
            const botInfo = new Discord.RichEmbed()
                .setAuthor('Straton [BOT]', 'https://images-ext-1.discordapp.net/.eJwFwVEOwiAMANC7cAAKpZCyxHiWrmy6RDcC6Idmd997f_NpLzOZ5xi1TwBadlu2rkcrUqvV4w3ylSGtA6bgKScM2UeihIwQRQPOUWe_iHN5Ja_ChddIipyEbN0f9779lhs6YnNelDQhig.MSY5GFeCgf5ALmxrAb5UowgSF-c?width=80&height=80')
                .setColor('#593695')
                .setFooter('Team Straton', 'https://teamstraton.com')
                .setThumbnail('https://images-ext-1.discordapp.net/.eJwFwVEOwiAMANC7cAAKpZCyxHiWrmy6RDcC6Idmd997f_NpLzOZ5xi1TwBadlu2rkcrUqvV4w3ylSGtA6bgKScM2UeihIwQRQPOUWe_iHN5Ja_ChddIipyEbN0f9779lhs6YnNelDQhig.MSY5GFeCgf5ALmxrAb5UowgSF-c?width=80&height=80')
                .setTimestamp()
                .addField('**Version**', '2.0.2', true)
                .addField('**Library**', 'Discord.JS', true)
                .addField('**Website**', `https://teamstraton.com`, true)
                .addField('**Author**', `Kashall#1307`, true)
                .addField('**Servers**',  client.guilds.size, true)
                .addField('**Users**', client.users.size, true);
            message.channel.send({ embed: botInfo });
            message.channel.stopTyping();
        } catch (e) {
            console.log(e)
        }
}