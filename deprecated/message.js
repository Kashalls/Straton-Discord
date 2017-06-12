exports.run = (client, message, args, cleverio, colors) => {

    if (!message.isMentioned(client.user)) return;
    if (message.isMentioned(client.user)) {

        let command = message.content.split(" ")[0];
        command = command.slice(client.user);
        const arg = message.content.split(' ').slice(1).join(' ');
        console.log(arg)
        const config = require("../config.json");

        var cleverbot = require("cleverbot.io"),
            cleverio = new cleverbot(config.cleverioUser, config.cleverioKey);

        cleverio.setNick("StratonBot");

        cleverio.create(function (err, StratonBot) {
            cleverio.ask(arg, function (err, response) {
                console.log(`Q: `.bold.green + `"${arg}"`.white + ` - Asked by ${message.author.username}`)
                console.log(`A: `.bold.red + `"${response}"`);
                message.channel.send(response);
            });
        });
    }
}