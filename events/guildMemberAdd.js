exports.run = (client, member) => {
  let guild = member.guild;
  // send to default channel and then remove after.
  if (client.member.guild.id === '176516526545829888') {
    return client.channels.get('319302806744072194').send(`${member.user} has joined.`);
  } else {
    return client.channels.get('318430063559180289').send(`${member.user} has joined ${guild.name}.`);
  }
}