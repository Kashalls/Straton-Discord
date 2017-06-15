exports.name = "prune";
exports.run = (client, message, args) => {

    if (message.member.hasPermission("MANAGE_MESSAGES")) {
        if (message.guild.member(client.user).hasPermission("MANAGE_MESSAGES")) {

            if (!args) {
                return message.channel.send(`:grey_question: Please provide a value: /prune <2-100>`);
            } else {
                let value = isNaN(args[0]);
                if (value == false) {
                    if (args[0] >= 5 && args[0] <= 100) {
                        message.channel.bulkDelete(args[0]).then(messages => {
                        return message.channel.send(`:checkered_flag: ${args} messages were cleared out.`);
                        })
                    } else {
                        return message.channel.send(`:warning: Your value has to be between 5 and 100.`);
                    }
                } else {
                    return message.channel.send(`:warning: You provided: ${args[0]}, but it has to be a number between 5 and 100!`).then((sent) => { sent.delete(15000); });
                }
            }
        } else {
            return message.channel.send(`I don't have permission to {MANAGE_MESSAGES} in this guild!`);
        }
    }
}
