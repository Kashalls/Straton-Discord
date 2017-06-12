exports.run = (client, member) => {
  let guild = member.guild;
  // Send to Dev lobby for checksum
  client.channels.get('318430063559180289').send(`Straton was added to ${guild.name}.`);
}