// models/Player.ts

import { DataTypes } from "sequelize";
import sequelize from "../db";

const Player = sequelize.define("Player", {
  teamId: {
    type: DataTypes.INTEGER,
    references: {
      model: "Team",
      key: "id",
    },
    allowNull: false,
  },
  name: DataTypes.STRING,
  pos: DataTypes.STRING,
  age: DataTypes.INTEGER,
  G: DataTypes.INTEGER,
  PA: DataTypes.INTEGER,
  AB: DataTypes.INTEGER,
  R: DataTypes.INTEGER,
  H: DataTypes.INTEGER,
  doubles: DataTypes.INTEGER,
  triples: DataTypes.INTEGER,
  HR: DataTypes.INTEGER,
  RBI: DataTypes.INTEGER,
  SB: DataTypes.INTEGER,
  CS: DataTypes.INTEGER,
  BB: DataTypes.INTEGER,
  SO: DataTypes.INTEGER,
  batting_avg: DataTypes.DECIMAL,
  onbase_perc: DataTypes.DECIMAL,
  slugging_perc: DataTypes.DECIMAL,
  onbase_plus_slugging: DataTypes.DECIMAL,
  onbase_plus_slugging_plus: DataTypes.INTEGER,
  TB: DataTypes.INTEGER,
  GIDP: DataTypes.INTEGER,
  HBP: DataTypes.INTEGER,
  SH: DataTypes.INTEGER,
  SF: DataTypes.INTEGER,
  IBB: DataTypes.INTEGER,
});

export default Player;
