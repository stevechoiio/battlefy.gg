const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3005;
const routes = require("./routes");

dotenv.config();
app.use(cors());
app.get("/favicon.ico", (req, res) => res.status(204));
app.use(routes);
app.listen(port, () => console.log(`App listening on port ${port}!`));
