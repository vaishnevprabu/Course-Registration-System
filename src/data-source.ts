import "reflect-metadata";
import { DataSource } from "typeorm";
import { Admin } from "./models/Admin";
import { Course } from "./models/Course";
import { Department } from "./models/Department";
import dotenv from "dotenv";

dotenv.config();

const isDevelopment = process.env.NODE_ENV === "development";


console.log("Database Config:", {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: "*******",  
  database: process.env.DB_NAME,
});


export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "3306"),
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "admin@123",
  database: process.env.DB_NAME || "default_db",
  entities: [Admin, Course, Department],
  migrations: isDevelopment ? ["src/migrations/*.ts"] : ["dist/migrations/*.js"],
  synchronize: isDevelopment, 
  logging: isDevelopment,
});


AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((error) => {
    console.error("Error during Data Source initialization:", error);
  });
