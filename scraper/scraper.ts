import axios from "axios";
import { JSDOM } from "jsdom";

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
        const cells = row.querySelectorAll("td");
        console.log(row, cells);
        // Make sure there are enough cells for our data
        console.log(cells.length, stats.length);
        if (cells.length >= stats.length) {
          // +2 because we're skipping the first two cells
          // Create a player object
          let player: { [key: string]: string } = {
            name: cells[1].textContent?.trim() || "",
            pos: cells[0].textContent?.trim() || "",
          };

          // Assign each stat a value from the corresponding cell
          for (let j = 2; j < cells.length; j++) {
            player[stats[j - 1]] = cells[j].textContent?.trim() || "";
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
