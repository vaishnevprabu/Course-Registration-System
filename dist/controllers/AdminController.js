"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const data_source_1 = require("../data-source");
const Course_1 = require("../models/Course");
const Department_1 = require("../models/Department");
class AdminController {
    createDepartment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, description } = req.body;
            try {
                const departmentRepo = data_source_1.AppDataSource.getRepository(Department_1.Department);
                const newDepartment = departmentRepo.create({ name, description });
                yield departmentRepo.save(newDepartment);
                return res.status(201).json({ message: "Department created successfully" });
            }
            catch (error) {
                console.error("Error creating department:", error);
                return res.status(500).json({ message: "Internal Server Error" });
            }
        });
    }
    createCourse(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, description, schedule, studentCapacity, instructorCapacity, departmentId } = req.body;
            try {
                const departmentRepo = data_source_1.AppDataSource.getRepository(Department_1.Department);
                const department = yield departmentRepo.findOneBy({ id: departmentId });
                if (!department) {
                    return res.status(404).json({ message: "Department not found" });
                }
                const courseRepo = data_source_1.AppDataSource.getRepository(Course_1.Course);
                const newCourse = courseRepo.create({
                    name,
                    description,
                    schedule,
                    studentCapacity, // Corrected camelCase
                    instructorCapacity, // Corrected camelCase
                    department,
                });
                yield courseRepo.save(newCourse);
                return res.status(201).json({ message: "Course created successfully" });
            }
            catch (error) {
                console.error("Error creating course:", error);
                return res.status(500).json({ message: "Internal Server Error" });
            }
        });
    }
}
exports.AdminController = AdminController;
