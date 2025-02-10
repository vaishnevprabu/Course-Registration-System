"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Admin_1 = require("./models/Admin");
const Course_1 = require("./models/Course");
const Department_1 = require("./models/Department");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const isDevelopment = process.env.NODE_ENV === "development";
console.log("Database Config:", {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: "*******",
    database: process.env.DB_NAME,
});
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "3306"),
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "admin@123",
    database: process.env.DB_NAME || "default_db",
    entities: [Admin_1.Admin, Course_1.Course, Department_1.Department],
    migrations: isDevelopment ? ["src/migrations/*.ts"] : ["dist/migrations/*.js"],
    synchronize: isDevelopment,
    logging: isDevelopment,
});
