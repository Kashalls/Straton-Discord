exports.name = "userinfo";
exports.run = (client, message, args) => {

    const Discord = require("discord.js");
    //message.mentions.users.first()
    if (message.mentions.users.size === 0) {
        let targetMember = message.guild.member(message.author);
        if (targetMember.presence.game === null) {
            var gamename = 'No Game :c';
        }
        if (!targetMember.presence.game === null) {
            var gamename = targetMember.presence.game.name;
        }
        try {
            message.channel.startTyping();
            const userInfo = new Discord.RichEmbed()
                .setAuthor(targetMember.user.tag, targetMember.user.avatarURL)
                .setColor('#593695')
                .setFooter('Team Straton', 'https://teamstraton.com')
                .setThumbnail(targetMember.user.avatarURL)
                .setTimestamp()
                .addField('**ID**', targetMember.id, true)
                .addField('**Nickname**', targetMember.nickname, true)
                .addField('**Status**', targetMember.presence.status, true)
                .addField('**Playing**', gamename, true)
                .addField('**Mention**', targetMember.user, true)
                .addField('**Highest Role**', targetMember.highestRole, true);
            message.channel.send({ embed: userInfo });
            message.channel.stopTyping();
        } catch (e) {
            console.log(e)
        }
    } else {
        let targetMember = message.guild.member(message.mentions.members.first());
        if (targetMember.presence.game === null) {
            var gamename = 'No Game :c';
        }
        if (!targetMember.presence.game === null) {
            var gamename = targetMember.presence.game.name;
        }
        try {
            message.channel.startTyping();
            const userInfo = new Discord.RichEmbed()
                .setAuthor(targetMember.user.tag, targetMember.user.avatarURL)
                .setColor('#593695')
                .setFooter('Team Straton', 'https://teamstraton.com')
                .setThumbnail(targetMember.user.avatarURL)
                .setTimestamp()
                .addField('**ID**', targetMember.id, true)
                .addField('**Nickname**', targetMember.nickname, true)
                .addField('**Status**', targetMember.presence.status, true)
                .addField('**Playing**', gamename, true)
                .addField('**Mention**', targetMember.user, true)
                .addField('**Highest Role**', targetMember.highestRole, true);
            message.channel.send({ embed: userInfo });
            message.channel.stopTyping();
        } catch (e) {
            console.log(e)
        }

    }
}