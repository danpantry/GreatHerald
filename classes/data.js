﻿/**
 * This is a class which stores all the consts that main events return, and which are crucial to other classes.
 * Its purpose is to gather all the consts needed in other classes, so passing multiple, hard to remember arguments, to every class can be avoided.
 * In such case just pass the Data() object which was crated initially in the event and you're set.
 *
 * Stores also stuff that shold be kept in database, but I am noob and I can't into databases.
 *
 * @param message - for fetching author ID, channel ID, message contents etc
 * @param bot     - for fetching bot's ID, guilds and channels
 */

exports.Data = function (message, bot) {
    var data = this;
    data.message = message;
    data.bot = bot;
    
    data.version = 'The Great Herald beta 2.07: !lastgame command   ';

    data.server = '';
    data.logChannel = '';
    data.roleChannel = '';
    data.spamChannel = '';
    data.offTop = '247501730336604163'; //hardcoded offtop from vikmains

    data.whatServer = function (serverID) {
        switch (serverID) {
            case '207732593733402624': //vikmains
                {
                    data.server = `vikmains`;
                    data.logChannel = '315258332749234189';
                    data.roleChannel = '268354627781656577';
                    data.spamChannel = '290601371370127361';
                    data.offTop = '247501730336604163';
                    break;
                }
            case '234740225782317057': //arcytesting
                {
                    data.server = `arcytesting`;
                    data.logChannel = '310735697260707841';
                    data.roleChannel = '310735697260707841';
                    data.spamChannel = '310735697260707841';
                    data.offTop = '310735697260707841';
                    break;
                }
            default: return null; //zrobi? tu ?eby zwraca?o DM bota kiedy si? gada z nim przez DM
        }
    };

    data.welcomeMessageForViktorMains = `Greetings newcomer! We're glad you've decided to join the Evolution. ` +
        `To make your first steps here easier, I'll equip you with a few useful tips; I would also wish for you to glance over __our rules__.\n` +
        `__Viktor Bot is our custom bot__ and his commands might differ from other bots. Write **!h** or **!help** for more info.\n\n` +
        `**Useful links for newcomers:**\n` +
        `- _frequently asked questions_ - https://www.reddit.com/r/viktormains/wiki/faq\n` +
        `- _Viktor in-game clubs_ - https://www.reddit.com/r/viktormains/wiki/clubs\n` +
        `- _Viktor streams/guides/fanarts_ - https://www.reddit.com/r/viktormains/wiki/content\n\n` +
        `**Rules:**\n` +
        `1. Treat everyone with respect. Cursing is allowed as long as it is not directed towards other members of the discord in an offensive manner.\n` +
        `2. Please keep any saltiness in the designated room: #salt_mine.\n` +
        `3. Keep conversations not related to Viktor or League of Legends in #off_topic.\n` +
        `4. No racism nor hate speech.\n` +
        `5. No NSFW - this includes, but is not limited to, pornography and gore.\n` +
        `6. No spam. Memes in healthy dose please.\n\n` +
        `Moderators reserve the right to kick/bans users basing on judgement calls.`;

    data.userIsNotThisBot = function () {
        if (message.author.id !== bot.user.id)
            return true;
        return false;
    };
};