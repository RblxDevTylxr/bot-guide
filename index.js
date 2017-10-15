/* eslint consistent-return: 0, no-console: 0 */
const Discord = require('discord.js');

const config = require('./config.json');

const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', (message) => {
  if (message.author.bot) return;

  if (message.content.indexOf(config.prefix) !== 0) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === 'ping') {
    message.channel.send('Pong...').then((msg) => {
      msg.edit(`Pong! Latency is ${msg.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
    });
  }

  if (command === 'speak') {
    if (message.author.id !== config.ownerID) return message.reply('Arrooo???');
    message.channel.send(args.join(' '));
    message.delete();
  }
});

client.login(config.token);