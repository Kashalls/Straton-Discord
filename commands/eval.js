exports.name = "eval";
exports.run = (client, message, args) => {

    const config = require('../config.json');

    if (message.author.id !== config.ownerID) return;
    if (!message.guild || !message.member) return;
    var evalcode = message.content.split(" ").splice(1).join(" ");
    try {
        var evaled = eval(evalcode);
        if (typeof evaled !== "string")
            evaled = require("util").inspect(evaled);
        if (evaled == '4') {
            message.channel.send('**OUTPUT**:')
            return message.channel.send("\n" + "Fish" + "", { code: `js` }.then((sent) => {
                sent.delete(15000);
            }));
        }
        message.channel.send('**OUTPUT**:').then((sent) => {
            sent.delete(15000);
        })
        return message.channel.send("\n" + clean(evaled) + "", { code: `js` }).then((sent) => {
            sent.delete(15000);
        });
    } catch (err) {
        message.channel.send('**ERROR**:').then((sent) => {
            sent.delete(15000);
        });
        return message.channel.send("" + clean(err) + "", { code: `js` }).then((sent) => {
            sent.delete(15000);
        });
    }

    function clean(text) {
        if (typeof (text) === "string") {
            return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        } else {
            return text;
        }
    }
}