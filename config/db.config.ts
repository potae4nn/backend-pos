import dotenv from 'dotenv';
dotenv.config();

interface Conn {
    HOST?:string,
    USER?:string,
    PASSWORD?:string,
    DB?:string
    dialect?:string,
    pool:Pool
}

interface Pool{
    max: number,
    min:number,
    acquire:number,
    idle:number
}

const CONNECT_DB:Conn = {
    HOST: process.env.NODE_ENV === "production" ? process.env.MYSQL_HOST_PROD : process.env.MYSQL_HOST_DEV,
    USER: process.env.NODE_ENV === "production" ? process.env.MYSQL_USER_PROD : process.env.MYSQL_USER_DEV,
    PASSWORD: process.env.NODE_ENV === "production" ? process.env.MYSQL_PASSWORD_PROD : process.env.MYSQL_PASSWORD_DEV,
    DB: process.env.NODE_ENV === "production" ? process.env.MYSQL_DATABASE_PROD :process.env.MYSQL_DATABASE_DEV,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };

  export default CONNECT_DB;