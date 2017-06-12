exports.run = (client, colors) => {
  console.log(`-----------------------------------------------`)
  console.log(`Bot Is Ready:`.bold.yellow + ` ${client.channels.size} channels, ${client.guilds.size} servers, ${client.users.size} users.`.underline.white);
  console.log(`STATUS:`.bold.yellow + ` Set Game MOTD to `.white + `Straton Games - !help`.underline.white)
  console.log(`Bot Developed by Kashall.`.italic.cyan)
  console.log(`-----------------------------------------------`)
  client.user.setGame(`Straton Games - !help`);
}