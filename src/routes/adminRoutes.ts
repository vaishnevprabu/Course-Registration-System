import express from 'express';
import { AdminController } from '../controllers/AdminController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();
const adminController = new AdminController();

router.post('/department', authenticateToken, (req, res) => {
  adminController.createDepartment(req, res);
});

router.post('/course', authenticateToken, (req, res) => {
  adminController.createCourse(req, res);
});

// Get all departments
router.get('/departments', authenticateToken, (req, res) => {
  adminController.getAllDepartments(req, res);
});

// Get all courses
router.get('/courses', authenticateToken, (req, res) => {
  adminController.getAllCourses(req, res);
});

// Update department
router.put('/department/:id', authenticateToken, (req, res) => {
  adminController.updateDepartment(req, res);
});

// MISTAKE 2: Missing authenticateToken middleware - security vulnerability!
// Delete course
router.delete('/course/:id', (req, res) => {
  adminController.deleteCourse(req, res);
});

// Create student
router.post('/student', authenticateToken, (req, res) => {
  adminController.createStudent(req, res);
});

// Get all students
router.get('/students', authenticateToken, (req, res) => {
  adminController.getAllStudents(req, res);
});

// Create instructor
router.post('/instructor', authenticateToken, (req, res) => {
  adminController.createInstructor(req, res);
});


import { Request, Response } from 'express';

router.get('/', (req: Request, res: Response): void => {
  res.status(200).json({ message: "Admin route is working" });
});


export default router;
