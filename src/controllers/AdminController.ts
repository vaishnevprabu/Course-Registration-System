import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Course } from "../models/Course";
import { Department } from "../models/Department";

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

  async editCourse(req: Request, res: Response) {
    const { id } = req.params;
    const {
      name,
      description,
      schedule,
      studentCapacity,
      instructorCapacity,
      departmentId,
    } = req.body;

    try {
      const courseRepo = AppDataSource.getRepository(Course);
      const course = await courseRepo.findOne({
        where: { id: Number(id) },
        relations: ["department"],
      });

      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }

      if (departmentId !== undefined && departmentId !== null) {
        const departmentRepo = AppDataSource.getRepository(Department);
        const department = await departmentRepo.findOneBy({ id: Number(departmentId) });
        if (!department) {
          return res.status(404).json({ message: "Department not found" });
        }
        course.department = department;
      }

      if (name !== undefined) course.name = name;
      if (description !== undefined) course.description = description;
      if (schedule !== undefined) course.schedule = schedule;
      if (studentCapacity !== undefined) course.studentCapacity = studentCapacity;
      if (instructorCapacity !== undefined) course.instructorCapacity = instructorCapacity;

      await courseRepo.save(course);
      return res.status(200).json({ message: "Course updated successfully" });
    } catch (error: any) {
      console.error("Error updating course:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
