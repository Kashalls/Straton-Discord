exports.name = "music";
exports.run = (client, message, args) => {
    const yt = require('ytdl-core');
    const config = require('../config.json');
    const commands = {
        'play': (message) => {
            if (queue[message.guild.id] === undefined) return message.channel.sendMessage(`Add some songs to the queue first with ${config.prefix}add`);
            if (!message.guild.voiceConnection) return commands.join(message).then(() => commands.play(message));
            if (queue[message.guild.id].playing) return message.channel.sendMessage('Already Playing');
            let dispatcher;
            queue[message.guild.id].playing = true;

            console.log(queue);
            (function play(song) {
                console.log(song);
                if (song === undefined) return message.channel.sendMessage('Queue is empty').then(() => {
                    queue[message.guild.id].playing = false;
                    message.member.voiceChannel.leave();
                });
                message.channel.sendMessage(`Playing: **${song.title}** as requested by: **${song.requester}**`);
                dispatcher = message.guild.voiceConnection.playStream(yt(song.url, { audioonly: true }), { passes: config.passes });
                let collector = message.channel.createCollector(m => m);
                collector.on('message', m => {
                    if (m.content.startsWith(config.prefix + 'pause')) {
                        message.channel.sendMessage('paused').then(() => { dispatcher.pause(); });
                    } else if (m.content.startsWith(config.prefix + 'resume')) {
                        message.channel.sendMessage('resumed').then(() => { dispatcher.resume(); });
                    } else if (m.content.startsWith(config.prefix + 'skip')) {
                        message.channel.sendMessage('skipped').then(() => { dispatcher.end(); });
                    } else if (m.content.startsWith('volume+')) {
                        if (Math.round(dispatcher.volume * 50) >= 100) return message.channel.sendMessage(`Volume: ${Math.round(dispatcher.volume * 50)}%`);
                        dispatcher.setVolume(Math.min((dispatcher.volume * 50 + (2 * (m.content.split('+').length - 1))) / 50, 2));
                        message.channel.sendMessage(`Volume: ${Math.round(dispatcher.volume * 50)}%`);
                    } else if (m.content.startsWith('volume-')) {
                        if (Math.round(dispatcher.volume * 50) <= 0) return message.channel.sendMessage(`Volume: ${Math.round(dispatcher.volume * 50)}%`);
                        dispatcher.setVolume(Math.max((dispatcher.volume * 50 - (2 * (m.content.split('-').length - 1))) / 50, 0));
                        message.channel.sendMessage(`Volume: ${Math.round(dispatcher.volume * 50)}%`);
                    } else if (m.content.startsWith(config.prefix + 'time')) {
                        message.channel.sendMessage(`time: ${Math.floor(dispatcher.time / 60000)}:${Math.floor((dispatcher.time % 60000) / 1000) < 10 ? '0' + Math.floor((dispatcher.time % 60000) / 1000) : Math.floor((dispatcher.time % 60000) / 1000)}`);
                    }
                });
                dispatcher.on('end', () => {
                    collector.stop();
                    play(queue[message.guild.id].songs.shift());
                });
                dispatcher.on('error', (err) => {
                    return message.channel.sendMessage('error: ' + err).then(() => {
                        collector.stop();
                        play(queue[message.guild.id].songs.shift());
                    });
                });
            })(queue[message.guild.id].songs.shift());
        },
        'join': (message) => {
            return new Promise((resolve, reject) => {
                const voiceChannel = message.member.voiceChannel;
                if (!voiceChannel || voiceChannel.type !== 'voice') return message.reply('I couldn\'t connect to your voice channel...');
                voiceChannel.join().then(connection => resolve(connection)).catch(err => reject(err));
            });
        },
        'add': (message) => {
            let url = message.content.split(' ')[1];
            if (url == '' || url === undefined) return message.channel.sendMessage(`You must add a YouTube video url, or id after ${config.prefix}add`);
            yt.getInfo(url, (err, info) => {
                if (err) return message.channel.sendMessage('Invalid YouTube Link: ' + err);
                if (!queue.hasOwnProperty(message.guild.id)) queue[message.guild.id] = {}, queue[message.guild.id].playing = false, queue[message.guild.id].songs = [];
                queue[message.guild.id].songs.push({ url: url, title: info.title, requester: message.author.username });
                message.channel.sendMessage(`added **${info.title}** to the queue`);
            });
        },
        'queue': (message) => {
            if (queue[message.guild.id] === undefined) return message.channel.sendMessage(`Add some songs to the queue first with ${config.prefix}add`);
            let tosend = [];
            queue[message.guild.id].songs.forEach((song, i) => { tosend.push(`${i + 1}. ${song.title} - Requested by: ${song.requester}`); });
            message.channel.sendMessage(`__**${message.guild.name}'s Music Queue:**__ Currently **${tosend.length}** songs queued ${(tosend.length > 15 ? '*[Only next 15 shown]*' : '')}\n\`\`\`${tosend.slice(0, 15).join('\n')}\`\`\``);
        },
        'help': (message) => {
            let tosend = ['```xl', config.prefix + 'join : "Join Voice channel of message sender"', config.prefix + 'add : "Add a valid youtube link to the queue"', config.prefix + 'queue : "Shows the current queue, up to 15 songs shown."', config.prefix + 'play : "Play the music queue if already joined to a voice channel"', '', 'the following commands only function while the play command is running:'.toUpperCase(), config.prefix + 'pause : "pauses the music"', config.prefix + 'resume : "resumes the music"', config.prefix + 'skip : "skips the playing song"', config.prefix + 'time : "Shows the playtime of the song."', 'volume+(+++) : "increases volume by 2%/+"', 'volume-(---) : "decreases volume by 2%/-"', '```'];
            message.channel.sendMessage(tosend.join('\n'));
        }

    };

    if (commands.hasOwnProperty(message.content.toLowerCase().slice(config.prefix.length).split(' ')[0])) commands[message.content.toLowerCase().slice(config.prefix.length).split(' ')[0]](message);

}