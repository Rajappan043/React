import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();
const db = new Sequelize("health", "root", "rajappan@2004", {
  host: "localhost",
  dialect: "mysql",
});
export default db;
