import axios from "axios";
import { JSDOM } from "jsdom";
import Player from "../models/Player";

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

const mlbTeams = [
  "ARI", // Arizona Diamondbacks
  "ATL", // Atlanta Braves
  "BAL", // Baltimore Orioles
  "BOS", // Boston Red Sox
  "CHC", // Chicago Cubs
  "CHW", // Chicago White Sox
  "CIN", // Cincinnati Reds
  "CLE", // Cleveland Guardians (formerly Cleveland Indians)
  "COL", // Colorado Rockies
  "DET", // Detroit Tigers
  "HOU", // Houston Astros
  "KCR", // Kansas City Royals
  "LAA", // Los Angeles Angels
  "LAD", // Los Angeles Dodgers
  "MIA", // Miami Marlins
  "MIL", // Milwaukee Brewers
  "MIN", // Minnesota Twins
  "NYM", // New York Mets
  "NYY", // New York Yankees
  "OAK", // Oakland Athletics
  "PHI", // Philadelphia Phillies
  "PIT", // Pittsburgh Pirates
  "SDP", // San Diego Padres
  "SFG", // San Francisco Giants
  "SEA", // Seattle Mariners
  "STL", // St. Louis Cardinals
  "TBR", // Tampa Bay Rays
  "TEX", // Texas Rangers
  "TOR", // Toronto Blue Jays
  "WSN", // Washington Nationals
];

const scrapeTeamData = async () => {
  try {
    for (const team of mlbTeams) {
      const url = `${baseURL}${team}/2023.shtml`;
      const { data } = await axios.get(url);

      const dom = new JSDOM(data);
      const teamBatting = dom.window.document.querySelector(
        "#team_batting > tbody"
      );

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
            // Create a player object
            let player: { [key: string]: string | null | Number } = {
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
                if (stats[j - 1] === "3B") {
                  player["triples"] = Number(cell.textContent?.trim()) || null;
                } else if (stats[j - 1] === "2B") {
                  player["doubles"] = Number(cell.textContent?.trim()) || null;
                } else {
                  player[stats[j - 1]] =
                    Number(cell.textContent?.trim()) || null;
                }
              }
            }

            try {
              Player.create(player).then(() => {
                console.log(player.name);
              });
            } catch (error) {
              console.log(error);
            }

            console.log(player, team);
          }
        }
      } else {
        console.log("Team batting table not found");
      }
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 2 seconds before the next iteration
    }
  } catch (error) {
    console.error(`Error scraping data : ${error}`);
  }
};

export default scrapeTeamData;
