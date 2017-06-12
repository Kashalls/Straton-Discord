exports.run = (client, member) => {
  let guild = member.guild;
  client.channels.get('318430063559180289').send(`Straton was removed from ${guild.name}.`);
}