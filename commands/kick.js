exports.name = "kick";
exports.run = (client, message, args) => {

  if (!message.member.hasPermission("KICK_MEMBERS")) return;
    if (!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) {
      return message.reply(`I don't have the permissions (KICK_MEMBER) to do this.`).catch(console.error);
    }
    if (message.mentions.users.size === 0) {
      return message.reply(`there is no one to kick.`).catch(console.error);
    }
    let banMember = message.guild.member(message.mentions.users.first());
    if (!banMember) {
      return message.reply(`that user does not seem valid.`);
    }
    banMember.ban().then(member => {
      return message.reply(`${member.user.username} was succesfully kicked.`).catch(console.error);
    })
  }