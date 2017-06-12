exports.name = "prune";
exports.run = (client, message, args) => {

    if (message.member.hasPermission("MANAGE_MESSAGES")) {
        if (message.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) {

            if (args.length == 0 ) {
                return message.reply("You didn't seem to have put an ammount. Lets try this again... EX: /prune <2-100>"); 
            } else {
                try {
                    message.channel.bulkDelete(args[0]).then(messages => {
                        return message.channel.send(`${args} messages were cleared out.`).then((sent) => {
                            sent.delete(15000);
                        })
                    })
                } catch (err) {
                    console.error(err);
                }
            }
        } else {
            return message.channel.send(`Sorry, I don't have permission to {MANAGE_MESSAGES} in this guild!`);
        }
    }
}