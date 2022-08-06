import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  host: process.env.DATABASE_HOST || "",
  database: process.env.DATABASE_NAME || "",
  username: process.env.DATABASE_USERNAME || "",
  password: process.env.DATABASE_PASSWORD || "",
  dialect: "postgres"
});
