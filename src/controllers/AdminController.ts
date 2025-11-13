import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Course } from "../models/Course";
import { Department } from "../models/Department";
import { Student } from "../models/Student";
import { Instructor } from "../models/Instructor";

export class AdminController {
  async createDepartment(req: Request, res: Response) {
    const { name, description } = req.body;

    try {
      const departmentRepo = AppDataSource.getRepository(Department);
      const newDepartment = departmentRepo.create({ name, description });
      await departmentRepo.save(newDepartment);
      return res.status(201).json({ message: "Department created successfully" });
    } catch (error: any) {
      console.error("Error creating department:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async createCourse(req: Request, res: Response) {
    const { name, description, schedule, studentCapacity, instructorCapacity, departmentId } = req.body;

    try {
      const departmentRepo = AppDataSource.getRepository(Department);
      const department = await departmentRepo.findOneBy({ id: departmentId });

      if (!department) {
        return res.status(404).json({ message: "Department not found" });
      }

      const courseRepo = AppDataSource.getRepository(Course);
      const newCourse = courseRepo.create({
        name,
        description,
        schedule,
        studentCapacity, 
        instructorCapacity, 
        department,
      });

      await courseRepo.save(newCourse);
      return res.status(201).json({ message: "Course created successfully" });
    } catch (error: any) {
      console.error("Error creating course:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async getAllDepartments(req: Request, res: Response) {
    try {
      const departmentRepo = AppDataSource.getRepository(Department);
      const departments = await departmentRepo.find();
      return res.status(200).json(departments);
    } catch (error: any) {
      console.error("Error fetching departments:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async getAllCourses(req: Request, res: Response) {
    try {
      const courseRepo = AppDataSource.getRepository(Course);
      const courses = await courseRepo.find({ relations: ['department'] });
      return res.status(200).json(courses);
    } catch (error: any) {
      console.error("Error fetching courses:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // MISTAKE 1: Missing input validation - id parameter is not validated
  async updateDepartment(req: Request, res: Response) {
    const { id } = req.params;
    const { name, description } = req.body;

    const departmentRepo = AppDataSource.getRepository(Department);
    const department = await departmentRepo.findOneBy({ id: parseInt(id) });

    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    department.name = name;
    department.description = description;
    await departmentRepo.save(department);

    return res.status(200).json({ message: "Department updated successfully" });
  }

  async deleteCourse(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const courseRepo = AppDataSource.getRepository(Course);
      const course = await courseRepo.findOneBy({ id: parseInt(id) });

      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }

      await courseRepo.remove(course);
      return res.status(200).json({ message: "Course deleted successfully" });
    } catch (error: any) {
      console.error("Error deleting course:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async createStudent(req: Request, res: Response) {
    const { name, email, studentId, major, yearLevel } = req.body;

    try {
      const studentRepo = AppDataSource.getRepository(Student);
      const newStudent = studentRepo.create({
        name,
        email,
        studentId,
        major,
        yearLevel
      });
      await studentRepo.save(newStudent);
      return res.status(201).json({ message: "Student created successfully" });
    } catch (error: any) {
      console.error("Error creating student:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async getAllStudents(req: Request, res: Response) {
    try {
      const studentRepo = AppDataSource.getRepository(Student);
      const students = await studentRepo.find();
      return res.status(200).json(students);
    } catch (error: any) {
      console.error("Error fetching students:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async createInstructor(req: Request, res: Response) {
    const { name, email, employeeId, specialization, departmentId } = req.body;

    try {
      const departmentRepo = AppDataSource.getRepository(Department);
      const department = await departmentRepo.findOneBy({ id: departmentId });

      if (!department) {
        return res.status(404).json({ message: "Department not found" });
      }

      const instructorRepo = AppDataSource.getRepository(Instructor);
      const newInstructor = instructorRepo.create({
        name,
        email,
        employeeId,
        specialization,
        department,
      });

      await instructorRepo.save(newInstructor);
      return res.status(201).json({ message: "Instructor created successfully" });
    } catch (error: any) {
      console.error("Error creating instructor:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
