exports.run = (client, member) => {
    return client.channels.get('319302806744072194').send(`:wave: ${member.user.username} has joined the Straton Community!`);
}