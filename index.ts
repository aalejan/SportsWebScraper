import express from "express";
import cron from "node-cron";
import sequelize, { testConnection } from "./db";
import scrapeTeamData from "./scraper/scraper";
import Player from "./models/Player"; // Ensure the path is correct

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Web scraper is running");
});

testConnection();

sequelize
  .sync()
  .then(() => {
    console.log("Database & models synced successfully.");

    // Start the cron job here to ensure it only runs after the database sync is complete
    cron.schedule("*/10 * * * * *", scrapeTeamData);
  })
  .catch((err) => {
    console.error("Unable to sync the database:", err);
  });

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
