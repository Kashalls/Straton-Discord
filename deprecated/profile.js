exports.name = "profile";
exports.run = (client, message, args) => {

    var Canvas = require('canvas');
    const r = require('snekfetch');

    let Image = Canvas.Image;
    let canvas = new Canvas(400, 200);
    let ctx = canvas.getContext('2d');

    let img = new Image();
    var url = message.author.avatarURL;
    var profileName = message.author.username;
    url = url.substring(0, url.indexOf('?'));

    r.get(url).then(res => {
        var dataURL = res.body.toString('base64');
        dataURL = 'data:image/png;base64,' + dataURL;
        img.onload = function () {

            ctx.save();
            ctx.beginPath();
            ctx.arc(48, 48, 32, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(img, 16, 16, 64, 64);
            ctx.restore();

            ctx.beginPath();
            ctx.strokeStyle = '#E2C800';
            ctx.arc(48, 48, 32, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.stroke();

            ctx.font = '24px Impact';
            ctx.fillStyle = '#E2C800';
            ctx.rotate(0);
            ctx.fillText(`Team Straton`, 120, 50);
            ctx.stroke();

            var te = ctx.measureText('Team Straton');
            ctx.strokeStyle = '#E2C800';
            ctx.beginPath();
            ctx.lineTo(120, 52);
            ctx.lineTo(120 + te.width, 52);
            ctx.stroke();

            ctx.font = '12px Arial';
            ctx.fillStyle = '#E2C800';
            ctx.fillText(`Strive for Preservance.`, 126, 65);
            ctx.stroke();

            ctx.textBaseline = 'middle';
            ctx.textAlign = 'center';
            ctx.font = '18px Arial';
            ctx.fillStyle = '#FEE629';
            ctx.fillText(profileName, 48, 90);
            ctx.stroke();
            message.channel.send({ files: [{ attachment: canvas.toBuffer(), name: 'profile.jpg' }] });
        }
        img.src = dataURL;
    });
}