const { Kayn } = require("kayn");
const kaynApiClient = Kayn(process.env.RIOT_LOL_API_KEY)();
module.exports = kaynApiClient;
