exports.name = "status";
exports.run = (client, message, args, colors) => {


  const config = require("../config.json");

  if (message.author.id === config.ownerID || message.author.id === config.adminID) {

    if (args[0] === 'reset') {
      client.user.setGame('Straton Games - !help');
      console.log(`STATUS: `.bold.yellow + `${message.author.username} reset the status!`.white)
      return message.channel.send(`Successfully Reset Status`);
    }
    if (args[0] === 'url') {
      try {
        client.user.setGame(`Straton Games - LIVE`, `${args[1]}`);
        message.channel.send(`Successfully set the Status URL!`);
      } catch (err) {
        console.error(`ERROR: `.bold.red + `${err}`.red);
        message.channel.send(`Something very bad happened at HQ. Notify Kashall if he isn't aware by now.`);
      }
    }
    if (args[0] === 'set') {
      try {
        client.user.setGame(`${args[0]}`, ``);
        message.channel.send(`Successfully set the Status URL!`);
      } catch (err) {
        console.error(`ERROR: `.bold.red + `${err}`.red);
        message.channel.send(`Something very bad happened at HQ. Notify Kashall if he isn't aware by now.`);
      }
    } else {
      return message.channel.send(`You can use !status reset (go back to original), !status set (set the text), !status url (set live url for stream)`);
    }
  } else {
    return;
  }
}