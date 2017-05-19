﻿var Commands = require('./commands.js');
var RNG = require('./rng.js');
var Input = require('./input.js');
var DearViktorAnswers = require('./dearviktoranswers.js');
var Matchup = require('./matchup.js');
var Roles = require('./roles.js');
var Race = require('./race.js');
var Post = require('./post.js');
var Swap = require('./swap.js');
var API = require('./API.js');

const version = `The Great Herald vers 2.0.0: Remastered!`;

exports.Answer = function (data) {
    var answer = this;
    var rng = new RNG.RNG();
    var input = new Input.Input();
    var post = new Post.Post(data);
    var swap = new Swap.Swap();

    answer.userMessage = data.message;

    answer.toBuild = function (title) {
        var build = [];
        build[0] = [`First back`, `> 1250 g: <:hc1:242831892427177995> + <:potion:277494945332592640>\n` +
            `< 1250 g: <:doran:277494945261027328> + <:potion:277494945332592640> / <:darkseal:298575845977620502> + <:potion:277494945332592640>\n`, false];
        build[1] = [`Default build`, `<:hc1:242831892427177995> → <:sheen:277494945500233728>/<:hc2:242831893051998218> → ` +
            `<:sheen:277494945500233728>/<:hc2:242831893051998218> → <:hc3:242831893509308416> → <:lichbane:242831894134128650> → ` +
            `<:rabadon:242831892854865922>/<:voidstaff:242831893899247616> → <:rabadon:242831892854865922>/<:voidstaff:242831893899247616> → ` +
            `<:zhonya:242831893953773569>/<:banshee:314477829238554635> (<:ionians:314861455860170763> inbetween)`, false];
        build[2] = [`VS high damage AP threats`, `like Syndra, LB, Fizz, you might consider rushing <:banshee:314477829238554635> just after <:hc1:242831892427177995>`, false];
        build[3] = [`New experimental build`, `<:hc1:242831892427177995> → <:morello:298575846464159754> → <:liandry:298576316108767232> → ` +
            `<:voidstaff:242831893899247616> → <:zhonya:242831893953773569>/<:rabadon:242831892854865922> (<:hc3:242831893509308416> + <:sorcs:314861455889661952> inbetween) - ` +
            `This build focuses on maximizing the initial ER damage, when you can't afford getting to the autoattack range.`, false];
        
        post.embed(title, build);
    }
    answer.toHelp = `\n**${data.version} **\n\nCommand list:\n` +
        `\`\`\`Viktor gameplay questions     - !build | !matchup <champion_name> | !faq\n` +
        `Clubs                         - !clubs\n` +
        `Streams                       - !dun\n\n` +
        `Live game data                - !ingame <ign>|<server> (example: !ingame arcyvilk|euw)\n` +
        `OP.gg  				       - !opgg <ign>|<server> (example: !opgg arcyvilk|euw)\n` +
        `Mastery points 		       - !mastery <ign>|<server> (example: !mastery arcyvilk|euw)\n` +
        `Ranked races [*]              - !silverrace | !goldrace | !platinumrace | !diamondrace | !masterrace\n\n` +
        `Talking with Viktor bot       - dear viktor <text> ? | hello | notice me senpai | !beep\n` +
        `Can't decide between X and Y? - !choose <option1>|<option2>|<option3> ...\n` +
        `Random pet photo              - !meow | !woof\`\`\`` +
        `**[*] Not implemented yet!**\n\n` +
        `Server, rank and stream roles - visit <#${data.roleChannel}> room for more info.\n` +
        `In case of any bugs occuring, contact Arcyvilk#5460.\n\n`;

    answer.toVersion = data.version;
    answer.toTest = `>:3`;
    answer.notImplemented = `Not implemented yet.`;


    answer.userIsAMod = function () {
        if (data.message.author.id === `165962236009906176`)
            return true;
        return false;
    };
    answer.userAllowedToUseCommand = function (cmd) {
        if (cmd.isModCommand && !answer.userIsAMod())
            return false;
        return true;
    };


    answer.toCapsLock = function () {
        if (rng.happensWithAChanceOf(7))
            return post.reactionToMessage(`:ahaok:288392049873518602`);
        if (rng.happensWithAChanceOf(14))
            return post.reactionToMessage(`:qqsob:292446164622770187`);
        if (rng.happensWithAChanceOf(40))
            return post.reactionToMessage(`🍿`);
    };
    answer.toCommand = function () {
        var keyword = input.extractKeyword(data.message.content);
        var commands = new Commands.Commands(answer);

        if (commands.listOfResponses.hasOwnProperty(keyword))
            answer.checkForModPrivileges(commands.listOfResponses[keyword]);
    };
    answer.toDearViktor = function () {
        var dearviktor = new DearViktorAnswers.DearViktorAnswers();
        if (!answer.userMessage.content.endsWith(`?`))
            return post.message(`_That_ doesn't look like question to me.`);
        if (dearviktor.arcyHappened(answer.userMessage.content))
            return post.message(dearviktor.arcyAnswers[rng.chooseRandom(dearviktor.arcyAnswers.length)]);
        return post.message(dearviktor.list[rng.chooseRandom(dearviktor.list.length)]);
    };
    answer.toEmoteReactionTrigger = function () {
        var commands = new Commands.Commands(answer);
        for (property in commands.listOfEmoteReactionResponses) {
            if (data.message.content.toLowerCase().indexOf(property) != -1 && rng.happensWithAChanceOf(commands.listOfEmoteReactionResponses[property].chanceOfTriggering))
                return post.reactionToMessage(commands.listOfEmoteReactionResponses[property].emoteResponse);
        }
    };
    answer.toKeyword = function () {
        var commands = new Commands.Commands(answer);
        for (property in commands.listOfKeywords) {
            var cmd = commands.listOfKeywords[property];
            if (!input.allKeywordsWereFoundInString(property.toString().split('+'), data.message.content))
                continue;
            if (rng.happensWithAChanceOf(cmd.chanceOfTriggering))
                return answer.sendAppropiateResponseToCommand(cmd);
        }
    };


    answer.checkForModPrivileges = function (cmd) {
        if (!answer.userAllowedToUseCommand(cmd))
            return post.toDM("```You aren\'t allowed to use this command because you ain\'t cool enough.```");
        answer.checkForBotRefusal(cmd);
    };
    answer.checkForBotRefusal = function (cmd) {
        if (rng.botRefuses()) {
            if (cmd.refusal)
                return post.message(cmd.refusal);
            return post.message(`I refuse to execute your petty command.`);
        }
        return answer.sendAppropiateResponseToCommand(cmd);
    };
    answer.sendAppropiateResponseToCommand = function (cmd) {
        if (cmd.typeOfResponse == `text`) {
            if (!cmd.hasOwnProperty(`postInChannel`))
                return post.message(cmd.triggers);
            if (cmd.postInChannel == `DM`)
                return post.toDM(cmd.triggers);
            return post.messageToChannel(cmd.triggers, cmd.postInChannel);
        }
        if (cmd.typeOfResponse == `embed`) {
            if (!cmd.hasOwnProperty(`postInChannel`))
                return post.embed(cmd.title, [[`___`, cmd.triggers, false]]);
            return post.messageToChannel(cmd.title, [[`___`, cmd.triggers, false]], cmd.postInChannel);
        }
        if (cmd.typeOfResponse == `function`) {
            answer[cmd.triggers](cmd.arguments);
        }
    };
    


    answer.toRace = function (fetchedRanks) {
        var race = new Race.Race(data, post);
        var rankDesiredAndCurrent = fetchedRanks.split(`+`);

        if (input.removeKeyword(data.message.content).startsWith(`add`))
            return race.join(rankDesiredAndCurrent);
        return race.leaderboards(rankDesiredAndCurrent[0], rankDesiredAndCurrent[1]);
    }
    answer.toLiveGameRequest = function (title) { //full rework!!!!!
        post.message(`:hourglass_flowing_sand: Getting the Live Game data. This might take a while...`);
        var _input = data.message.content;
        if (!input.hasSeparator(_input))
            return post.message(`This command requires the symbol \"**|**\" to separate region from nickname. \n_Example:_ \`\`!giveid ${data.message.author.username}**|**euw\`\``);

        var api = new API.API();
        var playerIGNAndServer = input.returnModifiedIGNAndServer(_input);
        var playerNickDecoded = input.readdSpecialSymbols(playerIGNAndServer[0]).toUpperCase();
        var server = swap.serverToEndPoint(playerIGNAndServer[1]); //TODO: this is what every Rito API command looks like - unifize it somehow

        api.extractPlayerID(server, playerIGNAndServer, playerID => {
            if (playerID.toString().startsWith(`:warning:`))
                return post.message(playerID);
            api.extractPlayersLiveGameData(server, playerID, liveGameDataAPI => {
                if (liveGameDataAPI.toString().startsWith(`:warning:`))
                    return post.message(liveGameDataAPI);
                var game = liveGameDataAPI;
                api.extractChampionData(server, championDataAPI => {
                    if (championDataAPI.toString().startsWith(`:warning:`))
                        return post.message(championDataAPI);
                    var ids = "";
                    for (var i = 0; i < game.participants.length; i++)
                        ids += "," + game.participants[i].summonerId;
                    api.extractPlayerRanksData(swap.endPointToServer(server), ids.slice(1), ranksData => {
                        if (ranksData.toString().startsWith(`:warning:`))
                            return post.message(ranksData);
                        var champions = championDataAPI;
                        var ranks = ranksData;

                        var blueTeam = ``;
                        var redTeam = ``;

                        for (var i = 0; i <= game.participants.length; i++) {
                            if (i == game.participants.length) {
                                post.embed(`${title} Live game of ${playerNickDecoded.toUpperCase()} | ${game.gameMode} ${swap.gameModeIDToName(game.gameQueueConfigId)}`,
                                    [[`:large_blue_circle: Blue Team`, blueTeam, true],
                                    [`:red_circle: Red Team`, redTeam, true]]);
                                break;
                            }
                            var player = ``;

                            var rank = `--`;
                            var wins = 0;
                            var losses = 0;
                            var winRatio = `---`;
                            if (ranks[game.participants[i].summonerId] != undefined) {
                                rank = ranks[game.participants[i].summonerId][0].tier.substring(0, 1) + swap.romanToArabic(ranks[game.participants[i].summonerId][0].entries[0].division);

                                wins = ranks[game.participants[i].summonerId][0].entries[0].wins;
                                losses = ranks[game.participants[i].summonerId][0].entries[0].losses;
                                winRatio = input.round(wins / (wins + losses) * 100, 0);
                            }
                            if (winRatio !== `---`) {
                                if (winRatio < 10)
                                    winRatio += `% `;
                                else winRatio += `%`;
                            }
                            player += `\`\`|${rank}|`;

                            var champion = `**${champions.data[game.participants[i].championId].name}**`;

                            var nick = game.participants[i].summonerName.trim().replace(/ /g, "");
                            if (nick.toLowerCase().trim() == playerNickDecoded.toLowerCase().trim())
                                player += `${winRatio}|\`\` __${champion} | ${nick}__`;
                            else player += `${winRatio}|\`\` ${champion} | ${nick}`;

                            if (game.participants[i].teamId % 200 != 0)//blue
                                blueTeam += `${player}\n`;
                            else redTeam += `${player}\n`;
                        };
                    });
                });
            });
        });
    };
    answer.toPlayerIDRequest = function () {
        var _input = data.message.content;
        if (!input.hasSeparator(_input))
            return post.message(`This command requires the symbol \"**|**\" to separate region from nickname. \n_Example:_ \`\`!giveid ${data.message.author.username}**|**euw\`\``);

        var api = new API.API();
        var playerIGNAndServer = input.returnModifiedIGNAndServer(_input);
        var playerNickDecoded = input.readdSpecialSymbols(playerIGNAndServer[0]).toUpperCase();
        var server = swap.serverToEndPoint(playerIGNAndServer[1]); //TODO: this is what every Rito API command looks like - unifize it somehow

        api.extractPlayerID(server, playerIGNAndServer, playerID => {
            if (playerID.toString().startsWith(`:warning:`))
                return post.message(playerID);
            post.message(`${playerNickDecoded} - ${playerID}`);
        });
    }
    answer.toViktorMastery = function (title) {
        var _input = data.message.content;
        if (!input.hasSeparator(_input))
            return post.message(`This command requires the symbol \"**|**\" to separate region from nickname. \n_Example:_ \`\`!mastery ${data.message.author.username}**|**euw\`\``);
        var api = new API.API();
        var playerIGNAndServer = input.returnModifiedIGNAndServer(_input);
        var playerNickDecoded = input.readdSpecialSymbols(playerIGNAndServer[0]);
        var server = swap.serverToEndPoint(playerIGNAndServer[1]); //TODO: this is what every Rito API command looks like - unifize it somehow
        
        api.extractPlayerID(server, playerIGNAndServer, playerID => {
            if (playerID.startsWith(`:warning:`))
                return post.message(playerID);
            api.extractPlayerMastery(server, playerID, masterySummary => {
                post.embed(`${title} ${playerNickDecoded.toUpperCase()}`, [[`___`, `${masterySummary}`, false]]);
            });
        });
    };
    answer.toStatusChangeRequest = function () {
        var newStatus = input.removeKeyword(data.message.content);
        post.newStatus(newStatus);
    };
    answer.toCatPicture = function () {
        var api = new API.API();
        api.extractFromURL('http://random.cat/meow', function (extractedStuff) {
            if (!api.everythingOkay(extractedStuff))
                return post.message('Unable to get a cat.');
            var cat = JSON.parse(extractedStuff).file;
            post.message(`${cat} 🐱 :3`);
        });
    };
    answer.toDogPicture = function () {
        var api = new API.API();
        api.extractFromURL('http://random.dog/woof', function (extractedStuff) {
            if (!api.everythingOkay(extractedStuff))
                return post.message('Unable to get a dog.');
            post.message(`http://random.dog/${extractedStuff} 🐶 :3`);
        });
    };
    answer.toChoose = function () {
        var thingsToChooseFrom = input.removeKeyword(data.message.content);
        if (!input.hasSeparator(thingsToChooseFrom))
            return post.message("Incorrect format of input.");
        thingsToChooseFrom = thingsToChooseFrom.split('|');
        post.message(`You should ${thingsToChooseFrom[rng.chooseRandom(thingsToChooseFrom.length)]}.`);
    };
    answer.toOPGG = function () {
        var _input = data.message.content;
        if (!input.hasSeparator(_input))
            return post.message(`This command requires the symbol \"**|**\" to separate region from nickname. \n_Example:_ !opgg ${data.message.author.username}**|**euw`);
        var playerData = input.returnModifiedIGNAndServer(_input);
        post.message("https://" + playerData[1] + ".op.gg/summoner/userName=" + playerData[0]);
    };
    answer.toMatchup = function () {
        var matchup = new Matchup.Matchup();
        var championName = input.removeKeyword(data.message.content);
        for (property in matchup.listOfChampions){
            if (championName === property)
                return post.message(matchup.listOfChampions[property]);
        }
        return post.message(`Code name [${championName.toUpperCase()}]: missing data. This matchup hasn\'t been discussed yet, it seems.`);
    };
    answer.toIAmCommand = function () {
        var roles = new Roles.Roles(answer.userMessage.member);
        roles.requestedManually = true;
        roles.getData(data);

        var desiredRole = input.removeKeyword(answer.userMessage.content);
        return roles.addRoleToUser(desiredRole);
    };
    answer.toIAmNotCommand = function () {
        var roles = new Roles.Roles(answer.userMessage.member);
        roles.requestedManually = true;
        roles.getData(data);

        var removedRole = input.removeKeyword(answer.userMessage.content);
        return roles.removeRoleFromUser(removedRole);
    };
};