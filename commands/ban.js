exports.name = "ban";
exports.run = (client, message, args) => {

  if (!message.member.hasPermission("BAN_MEMBERS")) return;
    if (!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) {
      return message.reply(`I don't have the permissions (BAN_MEMBER) to do this.`).catch(console.error);
    }
    if (message.mentions.users.size === 0) {
      return message.reply(`there is no one to ban.`).catch(console.error);
    }
    let banMember = message.guild.member(message.mentions.users.first());
    if (!banMember) {
      return message.reply(`that user does not seem valid.`);
    }
    banMember.ban().then(member => {
      return message.reply(`${member.user.username} was succesfully banned.`).catch(console.error);
    })
  }