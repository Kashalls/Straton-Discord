exports.name = "ban";
exports.run = (client, message, args) => {

  if (!message.member.hasPermission("BAN_MEMBERS")) return;
    if (!message.guild.member(client.user).hasPermission("BAN_MEMBERS")) {
      return message.reply(`:x: I don't have the permissions (BAN_MEMBER) to do this.`).catch(console.error);
    }
    if (message.mentions.users.size === 0) {
      return message.channel.send(`:x: There is no user to ban!`);
    }
    let banMember = message.guild.member(message.mentions.users.first());
    if (!banMember) {
      return message.channel.send(`:x: You cannot ban that user!`);
    }
    banMember.ban().then(member => {
      return message.channel.send(`:white_check_mark: ${member.user.username} was succesfully banned.`).catch(console.error);
    })
  }