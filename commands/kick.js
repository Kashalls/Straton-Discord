exports.name = "kick";
exports.run = (client, message, args) => {

  if (!message.member.hasPermission("KICK_MEMBERS")) return;
    if (!message.guild.member(client.user).hasPermission("KICK_MEMBERS")) {
      return message.reply(`:x: I don't have the permissions (KICK_MEMBER) to do this.`).catch(console.error);
    }
    if (message.mentions.users.size === 0) {
      return message.channel.send(`:x: There is no user to kick!`);
    }
    let kickMember = message.guild.member(message.mentions.users.first());
    if (!kickMember) {
      return message.channel.send(`:x: You cannot kick that user!`);
    }
    kickMember.kick().then(member => {
      return message.channel.send(`:white_check_mark: ${member.user.username} was succesfully kicked.`).catch(console.error);
    })
  }