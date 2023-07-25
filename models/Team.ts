// models/Team.ts
import { DataTypes } from "sequelize";
import sequelize from "../db";
import Player from "./Player";

const Team = sequelize.define("Team", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  abbreviation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Team.hasMany(Player, { foreignKey: "teamId" });

export default Team;
