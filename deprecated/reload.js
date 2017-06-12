exports.name = "reload";
exports.run = (client, message, args) => {

  const config = require("../config.json");

  if (message.author.id !== config.ownerID) return;
  if (args.length == 0) return message.reply(`I need a command to reload.`);
  
  delete require.cache[require.resolve(`./${args[0]}.js`)];
  return message.reply(`Command: ${args[0]} has been reloaded.`);

}
