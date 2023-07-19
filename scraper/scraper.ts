import axios from "axios";
import { JSDOM } from "jsdom";
import Player from "../models/Player";
import PlayerType from "../types/PlayerType";

const baseURL = "https://www.baseball-reference.com/teams/";

const stats = [
  "pos",
  "age",
  "G",
  "PA",
  "AB",
  "R",
  "H",
  "2B",
  "3B",
  "HR",
  "RBI",
  "SB",
  "CS",
  "BB",
  "SO",
  "batting_avg",
  "onbase_perc",
  "slugging_perc",
  "onbase_plus_slugging",
  "onbase_plus_slugging_plus",
  "TB",
  "GIDP",
  "HBP",
  "SH",
  "SF",
  "IBB",
];

const statToFieldMap: { [key: string]: keyof PlayerType } = {
  pos: "pos",
  age: "age",
  G: "G",
  PA: "PA",
  AB: "AB",
  R: "R",
  H: "H",
  "2B": "doubles",
  "3B": "tripples",
  HR: "HR",
  RBI: "RBI",
  SB: "SB",
  CS: "CS",
  BB: "BB",
  SO: "SO",
  batting_avg: "battingAvg",
  onbase_perc: "onbasePerc",
  slugging_perc: "sluggingPerc",
  onbase_plus_slugging: "onbasePlusSlugging",
  onbase_plus_slugging_plus: "onbasePlusSluggingPlus",
  TB: "TB",
  GIDP: "GIDP",
  HBP: "HBP",
  SH: "SH",
  SF: "SF",
  IBB: "IBB",
};

const scrapeTeamData = async () => {
  const url = `${baseURL}${"MIA"}/2023.shtml`;

  try {
    const { data } = await axios.get(url);
    const dom = new JSDOM(data);
    const teamBatting = dom.window.document.querySelector("#team_batting");

    if (teamBatting) {
      // Get all the rows in the table
      const rows = teamBatting.querySelectorAll("tr");

      // Skip the first row (headers)
      for (let i = 1; i < rows.length; i++) {
        const row = rows[i];

        // Get all the cells in the row
        const cells = [...row.querySelectorAll("td")];

        // Make sure there are enough cells for our data

        if (cells.length >= stats.length) {
          // +2 because we're skipping the first two cells
          // Create a player object
          let player: Partial<PlayerType> = {
            name: cells[1].textContent?.trim() || "",
            pos: cells[0].textContent?.trim() || "",
          };

          // Assign each stat a value from the corresponding cell
          for (let j = 2; j < cells.length; j++) {
            const cell = cells.find(
              (cell) => cell.dataset.stat === stats[j - 1]
            );

            // If the cell exists, assign its textContent to player
            if (cell) {
              const statKey = statToFieldMap[stats[j - 1]];
              player[statKey] = cell.textContent?.trim() || "";
            }
          }

          // Insert the player into the database
          try {
            const newPlayer = await Player.create(player);
            console.log(`Inserted player ${newPlayer.dataValues.name}`);
          } catch (error) {
            console.error(`Error inserting player ${player.name}: ${error}`);
          }

          console.log(player);
        }
      }
    } else {
      console.log("Team batting table not found");
    }
  } catch (error) {
    console.error(`Error scraping data for team ${"MIA"}: ${error}`);
  }
};

export default scrapeTeamData;
