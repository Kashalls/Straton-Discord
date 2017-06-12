const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");
const config = require("./config.json");

var colors = require('colors');
var commands = new Discord.Collection();

function loadCommands() {
  const commandsRequire = require("./commands");
  for (const file in commandsRequire) {
    commands.set(commandsRequire[file].name, commandsRequire[file]);
  }
}

client.on('ready', () => {
  loadCommands();
  console.log('LOG: '.bold.cyan + ' Commands Loaded')
  console.log()
  console.log(`-----------------------------------------------`)
  console.log(`Bot Is Ready:`.bold.yellow + ` ${client.channels.size} channels, ${client.guilds.size} servers, ${client.users.size} users.`.underline.white);
  console.log(`STATUS:`.bold.yellow + ` Set Game MOTD to `.white + `Straton Games - !help`.underline.white)
  console.log(`Bot Developed By:`.bold.yellow + ' Kashall'.white)
  console.log(`-----------------------------------------------`)
  client.user.setGame(`Straton Games - !help`);
});

// This loop reads the /events/ folder and attaches each event file to the appropriate event.
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    let eventFunction = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    // super-secret recipe to call events with all their proper arguments *after* the `client` var.
    client.on(eventName, (...args) => eventFunction.run(client, ...args, Discord));
  });
});

client.on("message", message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(config.prefix)) return;

  let command = message.content.split(" ")[0];
  command = command.slice(config.prefix.length);

  let args = message.content.split(" ").slice(1);
  // The list of if/else is replaced with those simple 2 lines:

  let commandFile = commands.get(command);
  if (!commandFile) {
    return message.channel.send('That command does not exist.').then((sent) => { sent.delete(15000); });
  } else {
    try {
      commandFile.run(client, message, args);
    } catch (e) {
      console.log(e)
    }
  }
});

client.login(config.token);