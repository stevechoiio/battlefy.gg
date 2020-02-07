const searchMatchBySummonerName = require("../lib/util");
const router = require("express").Router();

router.get("/:id", async (req, res) => {
  try {
    const listOfMatches = await searchMatchBySummonerName(req.params.id);
    res.json(listOfMatches);
  } catch (e) {
    console.log(e);
    res.status(404);
  }
});
module.exports = router;
