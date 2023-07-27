import express from "express";
import cron from "node-cron";
import sequelize, { testConnection } from "./db";
import scrapeTeamData from "./scraper/scraper";

const app = express();
const port = 3000;
// Set EJS as the view engine
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.send("Web scraper is running");
});

testConnection();

sequelize
  .sync(/*{ force: true }*/)
  .then(() => {
    console.log("Database & models synced successfully.");

    // Start the cron job here to ensure it only runs after the database sync is complete
    // cron.schedule("0 0 * * *", scrapeTeamData);
    scrapeTeamData(); //Only needs to run once a season to get historical data
  })
  .catch((err) => {
    console.error("Unable to sync the database:", err);
  });

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
