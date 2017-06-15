exports.run = (client, message, args) => {

    //message.content shows the content of the message
    if (message.channel.type == 'dm' || message.channel.type == 'group') return;
    if (message.member.roles.size > 1 ) {
        return;
    } else {
        let sentMessage = message.content;
        const regex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/;
        var found = sentMessage.match(regex);

        if (!found) {
            return;
        } else {
            message.delete();
            client.channels.get('319302806744072194').send(`:x: ${member.user.username} has no rank and tried to post a link!`);
            return message.author.send(':x: Sorry about that ' +  message.author.username + `, but we don't allow posting links in our Discord unless you have a rank.`);
        }
    }
}