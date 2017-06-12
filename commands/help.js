exports.name = "help";
exports.run = (client, message, args) => {

message.reply(`go ahead and check your messages.`);
message.author.send(`
[Command List]

        ban : Legit bans a user.
       csgo : See stats based on id or profile.
       help : Display this message
       info : Bot-based information.
       kick : Just kick them, do it.
      music : Music Player, run this command with no arguments to see more.
       ping : Ping Pong
    profile : Get your own custom profile card! (Work in Progress)
      prune : message pruning
     status : Change the LIVE status for the bot (Admin+)
        - status <link>
        - status end 
    support : Get link to support server.
   userinfo : Get information on a user.
    `, {code: `css`});
return message.author.send(`

Social:
Twitter: https://goo.gl/683HbE
Website: https://teamstraton.com/

Support:
For support, suggestions, or bugs with Straton Bot, join the Development Server: https://goo.gl/Fmq2sS`
);
}
