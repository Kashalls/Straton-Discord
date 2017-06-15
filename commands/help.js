exports.name = "help";
exports.run = (client, message, args) => {

message.reply(`sounds good. Go check your messages.`);
return message.author.send(`
[Command List]

        ban : Legit bans a user.
       csgo : Get CSGO Data
       help : Display this message
       info : Get information on the bot
       kick : Just kick them, do it.
       ping : Ping Pong
      prune : message pruning
    rleague : Get Rocket League Data
        - rleague profile <name>
        - rleague id <17-digit-id>
     status : Change the LIVE status for the bot (Admin+)
        - status <link>
        - status end 
   userinfo : Get Sneeky Information on a Discord User
  vainglory : Get Vainglory User Data
        - vainglory id <id>
        - vainglory name <username>

[Social Media]
    Twitter: https://goo.gl/683HbE
    Website: https://teamstraton.com/
    `, {code: `css`});
}
