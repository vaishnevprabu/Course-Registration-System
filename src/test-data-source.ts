import "reflect-metadata";
import { DataSource } from "typeorm";
import { Admin } from "./models/Admin";
import { Course } from "./models/Course";
import { Department } from "./models/Department";
import dotenv from "dotenv";

dotenv.config();

console.log("Test Database Config:", {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: "*******",
  database: process.env.TEST_DB_NAME,
});

export const TestDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "3306"),
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "admin@123",
  database: process.env.TEST_DB_NAME || "test_db",
  entities: [Admin, Course, Department],
  migrations: ["src/migrations/*.ts"],
  synchronize: false,
  logging: false, 
});
