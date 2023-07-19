import express from "express";
import cron from "node-cron";
import scrapeTeamData from "./scraper/scraper";
import { testConnection } from "./db";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Web scraper is running");
});

testConnection();

cron.schedule("*/10 * * * * *", scrapeTeamData);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
