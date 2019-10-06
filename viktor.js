import '@babel/polyfill';
import Discord from 'discord.js';
import config from './config.json';
import { log } from './lib/log';
import { classifyMessage } from './lib/message';
import { connectToDb } from './lib/storage/db';
import { cache } from './lib/storage/cache';

const bot = new Discord.Client();

bot.on('guildCreate', guild => log.INFO(`Great Herald joined ${guild.id} guild!`))
bot.on('ready', () => ready(bot));
bot.on('message', classifyMessage);

bot.login(config.DISCORD_TOKEN);

const ready = bot => {
    cache.bot = bot;
    config.DATABASES.map(db => connectToDb(db));
    log.INFO('Great Herald started working!');
}