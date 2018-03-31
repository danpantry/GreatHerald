const serverToEndPoint = server => {
    const swap = {
        br: "br1",
        eune: "eun1",
        euw: "euw1",
        jp: "jp1",
        kr: "kr",
        lan: "la1",
        las: "la2",
        na: "na1",
        oce: "oc1",
        tr: "tr1",
        ru: "ru",
        pbe: "pbe1"
    };
    return swap.hasOwnProperty(server.toLowerCase()) ? swap.server : "?";
};
const endPointToServer = endPoint => {
    endPoint = endPoint.toLowerCase();
    const swap = {
        br1: "br",
        eun1: "eune",
        euw1: "euw",
        jp1: "jp",
        kr: "kr",
        la1: "lan",
        la2: "las",
        na1: "na",
        oc1: "oce",
        tr1: "tr",
        ru: "ru",
        pbe1: "pbe"
    }
    return swap.hasOwnProperty(endPoint.toLowerCase()) ? swap.endPoint : "?";
};
const spellIDToSpellIcon = spellID => {
    const swap = {
        1: "<:Cleanse:315829639941455872>",
        13: "<:Clarity:315829639400652801>",
        21: "<:Barrier:315829639589265408>",
        7: "<:Heal:315829640537047040>",
        14: "<:Ignite:315829640641904650>",
        4: "<:Flash:315829640302166016>",
        12: "<:Teleport:315829641057402880>",
        32: "<:Mark:315829640784510976>",
        11: "<:Smite:315829640583315457>",
        6: "<:Ghost:315829640340176896>",
        3: "<:Exhaust:315829639652179970>"
    }
    return swap.hasOwnProperty(spellID) ? swap.spellID : "❓";
};
const gameModeIDToName = gameModeID => {
    const swap =  {
        0: " - Custom game",
        8: " - Normal Twisted Treeline",
        2: " - Normal Blind Pick 5v5",
        14: " - Normal Draft Pick 5v5",
        4: " - Ranked Solo 5v5",
        42: " - Ranked Team 5v5",
        31: " - Coop vs AI Intro Bots",
        32: " - Coop vs AI Beginner Bots",
        33: " - Coop vs AI Intermediate Bots",
        400:  " - Normal Draft Pick 5v5",
        410:  " - Ranked Draft Pick 5v5",
        420:  " - Ranked Solo/Duo 5v5",
        440:  " - Ranked Flex 5v5",
        52: " - Coop vs AI Twisted Treeline"
    }
    return swap.hasOwnProperty(gameModeID) ? swap.gameModeID : "0";
};
const romanToArabic = number => {
    const swap = {
        "I": 1,
        "II": 2,
        "III": 3,
        "IV": 4,
        "V": 5
    }
    return swap.hasOwnProperty(number) ? swap.number : "?";
};
const arabicToRoman = number => {
    const swap = {
        1: "I",
        2: "II",
        3: "III",
        4: "IV",
        5: "V"
    }
    return swap.hasOwnProperty(number) ? swap.number : "?";
};
const numberToNumberEmoji = number => {
    const swap = {
        1: ":one:",
        2: ":two:",
        3: ":three:",
        4: ":four:",
        5: ":five:",
        6: ":six:",
        7: ":seven:",
        8: ":eight:",
        9: ":nine:",
        0: ":zero:"
    }
    return swap.hasOwnProperty(number) ? swap.number : "?";
};

module.exports = {
    serverToEndPoint,
    endPointToServer,
    spellIDToSpellIcon,
    gameModeIDToName,
    romanToArabic,
    arabicToRoman,
    numberToNumberEmoji
}