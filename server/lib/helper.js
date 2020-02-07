const champions = require("../en_US/championFull.json").keys;
const items = require("../en_US/item");
const runesReforged = require("../en_US/runesReforged");
const SummonerSpells = require("../en_US/summoner").data;

const championNameFinder = id => {
  return champions[id];
};

const itemNameFinder = id => {
  if (items.data[id]) return items.data[id].name;
};

const itemListParser = player => {
  let item = [];
  for (let i = 0; i <= 6; i++) {
    let index = `item${i}`;
    item.push(itemNameFinder(player[index]));
  }
  return item;
};

const runesNameFinder = id => {
  return runesReforged.filter(rune => rune.id === id)[0].key;
};
const spellNameFinder = id => {
  return Object.keys(SummonerSpells).filter(
    keys => SummonerSpells[keys].key == id
  )[0];
};

module.exports = {
  championNameFinder,
  itemListParser,
  runesNameFinder,
  spellNameFinder
};
