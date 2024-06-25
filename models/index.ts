import CONNECT_DB from "../config/db.config";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  host: CONNECT_DB.HOST,
  database: CONNECT_DB.DB,
  dialect: "mysql",
  username: CONNECT_DB.USER,
  password: CONNECT_DB.PASSWORD,
});


export { Sequelize, sequelize };
