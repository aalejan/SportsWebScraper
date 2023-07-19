import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
  dialect: "postgres",
  protocol: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectedUnauthorized: false,
    },
  },
});

export const testConnection = () => {
  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch((err) => {
      console.error("Unable to connect to the database:", err);
    });
};

export default sequelize;
