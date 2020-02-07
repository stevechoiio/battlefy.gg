const {
  championNameFinder,
  itemListParser,
  runesNameFinder,
  spellNameFinder
} = require("./helper");
const kaynApiClient = require("./kaynApiClient");

const fetchMatchBreakdown = async (match, accountId) => {
  const matchData = await kaynApiClient.Match.get(match.gameId);
  const [participant] = matchData.participantIdentities.filter(player => {
    return player.player.accountId == accountId;
  });
  const { participantId } = participant;
  const player = matchData.participants[participantId - 1].stats;

  const { gameDuration, gameMode } = matchData;

  const {
    champLevel,
    win,
    deaths,
    kills,
    totalMinionsKilled,
    assists,
    perkPrimaryStyle,
    perkSubStyle
  } = player;

  const matchBreakdown = {
    outcome: win,
    gameDuration,
    champLevel,
    championName: championNameFinder(
      matchData.participants[participantId - 1].championId
    ),
    spells: [
      spellNameFinder(matchData.participants[participantId - 1].spell1Id),
      spellNameFinder(matchData.participants[participantId - 1].spell2Id)
    ],
    deaths,
    kills,
    totalCreepScore: totalMinionsKilled,
    items: itemListParser(player),
    assists,
    perkPrimaryStyle: runesNameFinder(perkPrimaryStyle),
    perkSubStyle: runesNameFinder(perkSubStyle),
    gameMode
  };
  return matchBreakdown;
};

const searchMatchBySummonerName = async summonerName => {
  try {
    const { accountId } = await kaynApiClient.Summoner.by.name(summonerName);
    const matchList = await kaynApiClient.Matchlist.by
      .accountID(accountId)
      .query({
        endIndex: 5
      });

    const detailedMatchList = matchList.matches.map(async match => {
      return fetchMatchBreakdown(match, accountId);
    });
    const resolved = await Promise.all(detailedMatchList);
    return resolved;
  } catch (e) {
    console.error(e);
    return e;
  }
};
module.exports = searchMatchBySummonerName;
