console.log('Beep beep!')

require('dotenv').config();

const fetch =  require('node-fetch');
const Discord = require('discord.js');
const client = new Discord.Client();

const replies = ['reject humanity, embrace monke', 'reject AI, embrace monke', 'aah aah', 'OOOOH OOOOH AAAH AAH AAAH OOGA OOGA sorry got carried away', 'hab banan 🍌']

client.login(process.env.BOTTOKEN);
client.on('ready', readyDiscord);

function readyDiscord() {
    console.log('yay');
}

client.on('message', gotMessage);

async function gotMessage(msg){
    // console.log(msg.content);
    if (msg.channel.id == '312285643223072768'){

        let tokens = msg.content.split(' ');

        if (tokens[0] == 'ooh ooh'){
            const r = Math.floor(Math.random() * replies.length);
            // msg.reply(replies[r]);
            msg.channel.send(replies[r]);
        }
        else if (tokens[0] == '!gif'){
            // msg.channel.send('gif!');
            let keywords = 'monke';
            if(tokens.length > 1){
                keywords = tokens.slice(1, tokens.length).join(" ");
            }

            let url = `https://api.tenor.com/v1/search?q=${keywords}&key=${process.env.TENORKEY}`
            let response = await fetch(url);
            let json = await response.json();
            console.log(json);
            let index = Math.floor(Math.random() * json.results.length);
            msg.channel.send(json.results[index].url);
        }
    }
}